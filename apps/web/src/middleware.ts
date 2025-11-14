import Appconfig from '@repo/utils/src/superego.config'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Cache locale IDs for better performance
const getLocaleIds = (() => {
  let cachedLocaleIds: string[] | null = null
  return () => {
    if (!cachedLocaleIds) {
      cachedLocaleIds = Appconfig?.i18n?.locales?.map((locale) => locale.id).filter(Boolean) || []
    }
    return cachedLocaleIds
  }
})()

// Helper to detect locale from Accept-Language header
function detectLocaleFromHeaders(request: NextRequest): string | null {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return null

  const supportedLocales = getLocaleIds()
  const preferredLocales = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim().toLowerCase())

  // Find first matching locale
  for (const preferred of preferredLocales) {
    // Check exact match first
    if (supportedLocales.includes(preferred)) {
      return preferred
    }
    // Check language part only (e.g., 'en' from 'en-US')
    const langOnly = preferred.split('-')[0]
    if (supportedLocales.includes(langOnly)) {
      return langOnly
    }
  }

  return null
}

// Helper to extract locale from pathname
function extractLocaleFromPath(pathname: string): {
  locale: string | null
  pathWithoutLocale: string
} {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  const supportedLocales = getLocaleIds()

  if (firstSegment && supportedLocales.includes(firstSegment)) {
    return {
      locale: firstSegment,
      pathWithoutLocale: '/' + segments.slice(1).join('/'),
    }
  }

  return {
    locale: null,
    pathWithoutLocale: pathname,
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams

  // Skip middleware for specific paths
  const shouldSkip = [
    '/api/',
    '/public/',
    '/static/',
    '/_next/',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/studio',
    '/super-login',
  ].some((path) => pathname.startsWith(path))

  // Skip for file extensions (static assets)
  const hasFileExtension = /\.[^\/]+$/.test(pathname)

  if (shouldSkip || hasFileExtension) {
    return NextResponse.next()
  }

  // Early validation with detailed error handling
  if (!Appconfig?.i18n?.locales?.length) {
    console.error('i18n configuration is missing or empty:', {
      hasAppconfig: !!Appconfig,
      hasI18n: !!Appconfig?.i18n,
      hasLocales: !!Appconfig?.i18n?.locales,
      localesLength: Appconfig?.i18n?.locales?.length,
    })
    return NextResponse.next()
  }

  const defaultLocaleId = Appconfig.i18n.defaultLocaleId
  if (!defaultLocaleId) {
    console.error('Default locale ID is not configured')
    return NextResponse.next()
  }

  // Extract locale information
  const { locale: currentLocale, pathWithoutLocale } = extractLocaleFromPath(pathname)

  // If locale is already present, continue
  if (currentLocale) {
    // Optional: Validate that the locale is still supported
    if (!getLocaleIds().includes(currentLocale)) {
      console.warn(`Unsupported locale detected: ${currentLocale}`)
      // Redirect to default locale
      const searchString = searchParams.toString()
      return NextResponse.redirect(
        new URL(
          `/${defaultLocaleId}${pathWithoutLocale}${searchString ? `?${searchString}` : ''}`,
          request.url,
        ),
      )
    }
    return NextResponse.next()
  }

  // Determine best locale for user
  let targetLocale = defaultLocaleId

  // Try to detect from Accept-Language header for better UX
  const detectedLocale = detectLocaleFromHeaders(request)
  if (detectedLocale) {
    targetLocale = detectedLocale
  }

  // Optional: Check for locale preference in cookies
  const cookieLocale = request.cookies.get('preferred-locale')?.value
  if (cookieLocale && getLocaleIds().includes(cookieLocale)) {
    targetLocale = cookieLocale
  }

  // Rewrite URL with detected/default locale
  const searchString = searchParams.toString()
  const targetUrl = new URL(
    `/${targetLocale}${pathname}${searchString ? `?${searchString}` : ''}`,
    request.url,
  )

  // Use rewrite for seamless experience
  return NextResponse.rewrite(targetUrl)
}

export const config = {
  // Much simpler - just match everything and handle exclusions in code
  matcher: ['/((?!_next/static|_next/image).*)', '/'],
}
