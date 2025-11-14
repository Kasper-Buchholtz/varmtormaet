/**
 * Migration: WordPress "medarbejdere" -> Sanity "employee"
 * - Fetches employees from WP (with _embed)
 * - Uploads featured image to Sanity
 * - Creates employee docs with proper image reference
 *
 * Requires:
 *  SANITY_PROJECT_ID
 *  SANITY_DATASET
 *  SANITY_TOKEN
 */

const { createClient } = require('@sanity/client')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

// --- Sanity client ---
const client = createClient({
  projectId: '',
  dataset: '',
  token: '', // or leave undefined for unauthenticated usage
  apiVersion: '2023-10-10',
  useCdn: true,
})

// --- Helpers ---
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

/** Extract the featured image URL from a WP post with _embed */
const getFeaturedImageUrl = (wpItem) => {
  // Prefer the embedded media if present
  const embedded = wpItem?._embedded?.['wp:featuredmedia']
  if (Array.isArray(embedded) && embedded[0]?.source_url) {
    return embedded[0].source_url
  }
  // Fallback: try ACF field if you store images there (adjust if needed)
  if (wpItem?.acf?.medarbejder_billede?.url) {
    return wpItem.acf.medarbejder_billede.url
  }
  return null
}

/** Upload an image to Sanity and return the asset _id (or null on failure) */
const uploadImageToSanity = async (imageUrl, retries = 5) => {
  if (!imageUrl) return null
  try {
    // Be nice to both WP & Sanity rate limits
    await delay(500)

    // Download file as arraybuffer
    const res = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const filename = imageUrl.split('/').pop() || 'image.jpg'

    const asset = await client.assets.upload(
      'image',
      Buffer.from(res.data),
      { filename }
    )

    console.log(`Uploaded image → ${asset._id} (${filename})`)
    return asset._id
  } catch (err) {
    // Handle 429s from Sanity with a backoff
    const status = err?.response?.status || err?.statusCode
    if ((status === 429 || status === 408 || status === 503) && retries > 0) {
      const waitMs = 3000 + Math.floor(Math.random() * 2000)
      console.warn(`Rate/timeout uploading image. Retrying in ${waitMs}ms… (${retries} left)`)
      await delay(waitMs)
      return uploadImageToSanity(imageUrl, retries - 1)
    }
    console.error(`Image upload failed for ${imageUrl}:`, err.message)
    return null
  }
}

/** Create a Sanity employee doc from a WP item */
const createEmployee = async (wpItem) => {
  const title = wpItem?.title?.rendered?.trim() || 'Ukendt navn'
  const email = wpItem?.acf?.medarbejder_email || 'no-mail@found.dk'
  const phone = wpItem?.acf?.medarbejder_telefonnummer || '00000000'
  const position = wpItem?.acf?.medarbejder_stilling || ''

  // Get the image URL from _embed (or ACF fallback)
  const imgUrl = getFeaturedImageUrl(wpItem)
  let imageField = undefined

  if (imgUrl) {
    const assetId = await uploadImageToSanity(imgUrl)
    if (assetId) {
      imageField = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      }
    }
  }



  // If you want to avoid duplicates, consider createIfNotExists keyed by a stable _id:
  // const docId = `employee-wp-${wpItem.id}`

  const doc = {
    _type: 'employee',
    title,
    email,
    phone,
    position,
    ...(imageField ? { image: imageField } : {}), // only set if we have one
    // Optionally keep a pointer to the original WP id:
  }

  const created = await client.create(doc)
  console.log(`Employee created: ${created._id} (${title})`)
}

/** Fetch employees from WP & migrate */
const migrateEmployees = async (perPage = 100, page = 1) => {
  const url = `https://superego.nu/wp-json/wp/v2/medarbejdere?_embed&per_page=${perPage}&page=${page}`
  console.log('Fetching:', url)

  const { data, headers } = await axios.get(url)
  const totalPages = parseInt(headers['x-wp-totalpages'] || '1', 10)

  for (const item of data) {
    try {
      await createEmployee(item)
    } catch (e) {
      console.error(`Failed to migrate employee id=${item.id}:`, e.message)
    }
  }

  if (page < totalPages) {
    await migrateEmployees(perPage, page + 1)
  } else {
    console.log('All employees migrated - migration complete.')
  }
}

/** Danger: delete all employee docs */
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

const main = async () => {
  // --- EITHER: wipe and re-import (be careful!)
  // await deleteDocumentsByType('employee')

  // --- OR: just run migration
  await migrateEmployees(100, 1) // perPage, page
}

main().catch((e) => {
  console.error('Fatal migration error:', e)
  process.exit(1)
})