import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2025-07-01', // or any recent date
  token: process.env.SANITY_API_TOKEN!, // must have write access
  useCdn: false,
})

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

type WebhookBody = {
  operation: 'create' | 'update' | 'delete' | string
  _id: string
  vendor?: string | null
}

export async function POST(req: NextRequest) {
  // 1. Verify secret from Sanity webhook
  const secretHeader = req.headers.get('x-webhook-secret')
  if (!secretHeader || secretHeader !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid webhook secret' }, { status: 401 })
  }

  const body = (await req.json()) as WebhookBody

  // Only care about create/update with a vendor
  if (!body.vendor || body.operation === 'delete') {
    return NextResponse.json({ message: 'Nothing to do' }, { status: 200 })
  }

  const vendor = body.vendor.trim()
  if (!vendor) {
    return NextResponse.json({ message: 'Empty vendor' }, { status: 200 })
  }

  const slug = slugify(vendor)
  const brandId = `brand-${slug}`

  try {
    const tx = sanityClient.transaction()

    // Create brand doc if it doesn't exist
    tx.createIfNotExists({
      _id: brandId,
      _type: 'brand',
      title: vendor,
      shopifyVendor: vendor,
      slug: { _type: 'slug', current: slug },
    })

    // Keep vendor fields up to date
    tx.patch(brandId, (patch) =>
      patch.set({
        title: vendor,
        shopifyVendor: vendor,
      }),
    )

    await tx.commit()

    return NextResponse.json({ message: `Brand synced for vendor "${vendor}"` }, { status: 200 })
  } catch (err) {
    console.error('Failed to sync brand from webhook', err)
    // Return 200 so Sanity doesn’t retry forever if the error is permanent
    return NextResponse.json(
      { message: 'Error syncing brand', error: (err as Error).message },
      { status: 200 },
    )
  }
}
