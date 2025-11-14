/**
 * Migration: WordPress "pages" -> Sanity "page"
 *
 * Fields mapped (adjust to your schema):
 *  - title               -> string
 *  - slug                -> slug.current
 *  - status              -> string (e.g. "publish", "draft")
 *  - order               -> number (WP menu_order)
 *  - publishedAt         -> datetime (WP date)
 *  - updatedAt           -> datetime (WP modified)
 *  - excerptHtml         -> text (kept as HTML)
 *  - contentHtml         -> text (kept as HTML)
 *  - featuredImage       -> image
 *  - parent              -> reference to another page
 *  - wpId, wpSlug        -> traceability
 *  - yoast               -> optional SEO subset if present
 *
 * Requires .env:
 *  SANITY_PROJECT_ID=3cbjn3i0
 *  SANITY_DATASET=production
 *  SANITY_TOKEN=***
 */

const { createClient } = require('@sanity/client')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

// ---------- Sanity client ----------
const client = createClient({
  projectId: '',
  dataset: '',
  token: '', // or leave undefined for unauthenticated usage
  apiVersion: '2023-10-10',
  useCdn: true,
})


// ---------- Helpers ----------
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

/** Pull featured image URL from _embed or common ACF fallback */
const getFeaturedImageUrl = (wpItem) => {
  const arr = wpItem?._embedded?.['wp:featuredmedia']
  const media = Array.isArray(arr) ? arr[0] : null
  if (!media) return null

  // Prefer 'full' size if available; fall back to top-level source_url
  const sizes = media?.media_details?.sizes
  const fullUrl = sizes?.full?.source_url
  const mainUrl = media?.source_url

  return fullUrl || mainUrl || null
}

/** Upload remote image to Sanity Assets → return asset _id */
const uploadImageToSanity = async (imageUrl, retries = 5) => {
  if (!imageUrl) return null
  try {
    await delay(400)
    const res = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: { 'User-Agent': 'Superego-Migrator/1.0 (+https://superego.nu)' },
    })
    const filename = imageUrl.split('/').pop() || 'image'
    const asset = await client.assets.upload('image', Buffer.from(res.data), { filename })
    console.log(`Uploaded image → ${asset._id} (${filename})`)
    return asset._id
  } catch (err) {
    const status = err?.response?.status || err?.statusCode
    if ((status === 429 || status === 408 || status === 503) && retries > 0) {
      const waitMs = 3000 + Math.floor(Math.random() * 2000)
      console.warn(`Image upload retry in ${waitMs}ms… (${retries} left)`)
      await delay(waitMs)
      return uploadImageToSanity(imageUrl, retries - 1)
    }
    console.error(`Image upload failed for ${imageUrl}:`, err?.message || err)
    return null
  }
}

/** Minimal HTML cleaner (optional) */
const clean = (html) => (typeof html === 'string' ? html.trim() : '')

/** Build a Sanity doc for a WP page (without parent set) */
const buildPageDoc = async (wp) => {
  const title = wp?.title?.rendered?.trim() || 'Untitled'
  const slug = (wp?.slug || '').trim()

  // ⬇️ Featured image → mainImage
  const imgUrl = getFeaturedImageUrl(wp)
  let mainImage
  if (imgUrl) {
    const assetId = await uploadImageToSanity(imgUrl)
    if (assetId) {
      mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      }
    }
  }


  // Yoast (optional, if present on your WP)
  // WP may expose "yoast_head_json" directly on the entity
  return {
    _id: `wp-page-${wp.id}`, // stable/idempotent
    _type: 'page',
    title,
    slug: slug ? { _type: 'slug', current: slug } : undefined,
    ...(mainImage ? { mainImage } : {}),
    locale: 'da',
    // parent will be set in a second pass using wp.parent
  }
}

/** First pass: create/replace all pages without parent ref */
const upsertPagesWithoutParents = async (pages) => {
  const results = []
  for (const wp of pages) {
    try {
      const doc = await buildPageDoc(wp)
      const res = await client.createOrReplace(doc)
      console.log(`Upserted page: ${res._id} (${doc.title})`)
      results.push({ wpId: wp.id, sanityId: res._id, parentWpId: wp.parent || 0 })
    } catch (e) {
      console.error(`Failed to upsert page id=${wp.id}:`, e.message)
    }
  }
  return results
}

/** Second pass: connect parent references */
const connectParents = async (map) => {
  // Build WP→Sanity lookup
  const byWpId = new Map(map.map((m) => [m.wpId, m.sanityId]))

  for (const row of map) {
    const parentWpId = row.parentWpId
    if (!parentWpId) continue

    const meId = row.sanityId
    const parentSanityId = byWpId.get(parentWpId)
    if (!parentSanityId) {
      console.warn(`Parent not found for ${meId} (parentWpId=${parentWpId}) — skipping`)
      continue
    }

    try {
      await client
        .patch(meId)
        .set({
          parent: { _type: 'reference', _ref: parentSanityId },
        })
        .commit()
      console.log(`Linked parent: ${meId} → ${parentSanityId}`)
    } catch (e) {
      console.error(`Failed to link parent for ${meId}:`, e.message)
    }
  }
}

/** Fetch WP pages with pagination */
const fetchAllWpPages = async (baseUrl, perPage = 100) => {
  let page = 1
  const all = []
  while (true) {
    const url = `${baseUrl}?_embed&per_page=${perPage}&page=${page}`
    console.log('Fetching:', url)
    const { data, headers } = await axios.get(url)
    if (!Array.isArray(data) || data.length === 0) break
    all.push(...data)

    const totalPages = parseInt(headers['x-wp-totalpages'] || '1', 10)
    if (page >= totalPages) break
    page += 1
  }
  console.log(`Fetched ${all.length} pages total.`)
  return all
}

/** Danger: delete all page docs */
const deleteDocumentsByType = async (docType) => {
  const docs = await client.fetch(`*[_type == $t]{_id}`, { t: docType })
  if (!docs.length) {
    console.log(`No documents found for type: ${docType}`)
    return
  }
  for (const d of docs) {
    await client.delete(d._id)
    console.log(`Deleted ${docType} → ${d._id}`)
  }
  console.log(`All "${docType}" documents deleted.`)
}

// ---------- Main ----------
const WP_PAGES_ENDPOINT = 'https://superego.nu/wp-json/wp/v2/pages'

const main = async () => {
  // Optionally wipe existing pages first (be careful)
  // await deleteDocumentsByType('page')

  const wpPages = await fetchAllWpPages(WP_PAGES_ENDPOINT, 1)

  // 1) Upsert all pages (no parents yet)
  const map = await upsertPagesWithoutParents(wpPages)

  // 2) Link parents
  await connectParents(map)

  console.log('Pages migration complete.')
}

main().catch((e) => {
  console.error('Fatal migration error:', e)
  process.exit(1)
})