import '@/styles/global.css'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { SanityLive } from '@/sanity/lib/sanity.live'
import { client } from '@/sanity/lib/sanity.client'
import Script from 'next/script'
import Appconfig from '@repo/utils/src/superego.config'
import { Inter, PT_Serif } from 'next/font/google'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/documents/siteSettings.query'
import Schema from '@/components/global/Schema'
import { ORGANIZATION_QUERY } from '@/sanity/queries/documents/json-ld/Organization.query'
import { clean } from '@/utils/sanitize'
import { resolveHref } from '@repo/utils/src/resolveHref'
import { PostHogProvider } from '@/components/global/PHProviders'
const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const serif = PT_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}) {
  const locale = (await params).locale || Appconfig.i18n.defaultLocaleId || 'da'
  const settings = await client.fetch(SITE_SETTINGS_QUERY, { locale })
  const SchemaOrg = await client.fetch(ORGANIZATION_QUERY)
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang={locale} className={` ${sans.variable} ${serif.variable}`}>
      <head>
        <Script
          id="show-headScripts"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: settings?.headScripts,
          }}
        />
        <GoogleTagManager gtmId={settings?.googleTagManager?.id} />
      </head>
      <body className={isDev ? 'debug-screens' : undefined}>
        <PostHogProvider>
          {children}
        </PostHogProvider>

        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <SanityLive />
          </>
        )}
        <Schema
          as="organization"
          title={clean(SchemaOrg?.name)}
          description={clean(SchemaOrg?.description)}
          baseURL={clean(Appconfig.WebsiteUrl + '/')}
          path={clean(resolveHref(locale, '/'))}
          sameAs={[...SchemaOrg?.sameAs?.map((url: string) => clean(url)) || []]}
          logo={clean(SchemaOrg?.logo?.asset?.url)}
          email={clean(SchemaOrg?.email)}
          telephone={clean(SchemaOrg?.telephone)}
          faxNumber={clean(SchemaOrg?.faxNumber)}
          foundingDate={clean(SchemaOrg?.foundingDate)}
          founder={clean(SchemaOrg?.founder)}
          address={{
            addressCountry: clean(SchemaOrg?.address?.addressCountry || 'DK'),
            postalCode: clean(SchemaOrg?.address?.postalCode),
            streetAddress: clean(SchemaOrg?.address?.streetAddress),
            addressLocality: clean(SchemaOrg?.address?.addressLocality),
            addressRegion: clean(SchemaOrg?.address?.addressRegion),
          }}
        />

      </body>
    </html>
  )
}
