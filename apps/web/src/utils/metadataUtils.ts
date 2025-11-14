import { Metadata } from 'next'
import { clean } from './sanitize'
import { client } from '@/sanity/lib/sanity.client'
import Appconfig from '@repo/utils/src/superego.config'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/documents/siteSettings.query'
import { resolveHref } from '@repo/utils/src/resolveHref'

export async function metaData(params: { locale: string }, page): Promise<Metadata> {
  const settings = await client.fetch(SITE_SETTINGS_QUERY, {
    locale: params.locale,
  })

  const DEFAULT_TITLE = 'Siden kunne ikke findes'
  const DEFAULT_DESCRIPTION = 'Siden du leder efter kunne ikke findes'

  if (!page) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    }
  }

  const { seoGroup, title } = page
  const seoTitle = clean(seoGroup?.seoTitle || title || settings?.siteTitle || DEFAULT_TITLE)
  const seoDescription = clean(
    seoGroup?.seoDescription || settings?.siteDescription || DEFAULT_DESCRIPTION,
  )
  const image =
    (seoGroup?.seoImage?.asset?.url as string) || (page?.mainImage?.asset?.url as string)
  const seoImage = image ? [{ url: image }] : []
  const googleID = clean(settings?.googleTagManager?.verification)

  const hreflangs = Appconfig.i18n.locales.map((locale) => ({
    rel: 'alternate',
    href: `/${locale.id}`, // Construct URL for each locale
    hreflang: locale.id,
  }))

  return {
    metadataBase: new URL(Appconfig.WebsiteUrl),
    title: seoTitle,
    description: seoDescription,
    robots: {
      ...(page.seoGroup?.radioField === 'hidden' && {
        index: false,
        follow: false,
      }),
      ...(page.seoGroup?.radioField === 'private' && {
        index: false,
        follow: true,
      }),
      ...(page.seoGroup?.radioField === 'public' && {
        index: true,
        follow: true,
      }),
    },
    keywords: Array.isArray(seoGroup?.seoKeywords) ? seoGroup.seoKeywords.join(',') : '',
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      ...(seoImage.length && { images: seoImage }),
      locale: params.locale,
      url: Appconfig.WebsiteUrl,
      type: 'website',
      alternateLocale: Appconfig.i18n.locales.map((locale) => locale.id),
      siteName: settings?.siteTitle || Appconfig.siteTitle,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      ...(seoImage.length && { images: seoImage }),
      site: Appconfig.WebsiteUrl,
      images: seoImage,
    },
    verification: {
      google: googleID,
    },
    creator: 'Superego Holstebro',
    other: {
      'theme-color': '#000000',
    },
    alternates: {
      canonical: Appconfig.WebsiteUrl + resolveHref(params.locale, page._type, page.slug.current),
      languages: hreflangs.reduce((acc, lang) => {
        acc[lang.hreflang] = lang.href
        return acc
      }, {}),
    },
  }
}
