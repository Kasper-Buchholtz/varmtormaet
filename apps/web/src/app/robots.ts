import type { MetadataRoute } from 'next'
import Appconfig from '@repo/utils/src/superego.config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${new URL(`${Appconfig.WebsiteUrl}/sitemap.xml`)}`,
  }
}
