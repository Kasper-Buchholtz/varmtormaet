import { getClient } from '@/sanity/lib/sanity.client'
import { groq } from 'next-sanity'
const client = getClient()

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const redirects = await generateRedirects()
    return redirects
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'vimeo.com',
      },
      {
        protocol: 'https',
        hostname: 'superego.nu',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.codepen.io',
      },
    ],
  },
  skipTrailingSlashRedirect: true,
  trallingSlash: false,
}
module.exports = nextConfig

// Fetch redirects from Sanity and format them for Next.js
async function generateRedirects() {
  const query = groq`
    *[_type == 'redirect'] {
      subLinks[] {
        isInternal,
        "sourceUrl": sourceUrl.current,
        "destinationUrl": destinationUrl.current,
        "source": source->slug.current,
        "destination": destinationPage->slug.current,
      }
    }
  `
  const results = await client.fetch(query)
  // Log the raw results from Sanity for debugging
  // console.log('Raw results from Sanity:', results)
  const redirects = results.flatMap(
    (redirect) =>
      redirect.subLinks
        .filter(
          (link) => (link.source || link.sourceUrl) && (link.destination || link.destinationUrl),
        ) // Ensure both source/sourceUrl and destination/destinationUrl are present
        .map((link) => {
          const formattedSource = `${link.source || link.sourceUrl}`
          const formattedDestination = link.isInternal
            ? `${link.destination || link.destinationUrl}`
            : link.destinationUrl // Add leading slash for internal links, external link remains unchanged
          // Check if destination exists to prevent null values
          if (!formattedDestination) {
            // console.warn(`Missing destination for source: ${formattedSource}`);
            return null // Skip this redirect if destination is missing
          }
          return {
            source: formattedSource,
            destination: formattedDestination,
            permanent: true,
          }
        })
        .filter(Boolean), // Filter out any null redirects
  )
  // Log the formatted redirects for Next.js
  // console.log('Formatted redirects:', redirects)
  return redirects
}
