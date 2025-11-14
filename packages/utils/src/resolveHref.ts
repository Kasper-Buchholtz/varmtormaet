export function resolveHref(locale?: string, documentType?: string, slug?: string): string {
  const langPrefix = locale && locale !== 'da' ? `/${locale}` : '' // Danish is the default
  switch (documentType) {
    case 'page':
      return slug ? `${langPrefix}/${slug}`.replace(/\/{2,}/g, '/') : langPrefix || '/'
    case 'event':
      return slug ? `${langPrefix}/begivenheder/${slug}`.replace(/\/{2,}/g, '/') : langPrefix || '/'
    case 'article':
      return slug ? `${langPrefix}/artikler/${slug}`.replace(/\/{2,}/g, '/') : langPrefix || '/'
    case 'project':
      return slug ? `${langPrefix}/projekter/${slug}`.replace(/\/{2,}/g, '/') : langPrefix || '/'
    case '/':
      return slug && locale !== 'da' ? `/${locale}` : '/'
    default:
      console.warn('Invalid document type:', documentType)
      return langPrefix || '/'
  }
}

/**
 * Resolves the human-readable name for a given document type.
 *
 * @param documentType - The type of the document to resolve.
 *                        Possible values are 'page', 'event', or 'article'.
 * @returns The resolved name of the document type in a specific language:
 *          - 'Side' for 'page'
 *          - 'Begivenheder' for 'event'
 *          - 'Nyhed' for 'article'
 *          Returns `undefined` if the document type is invalid or not provided.
 *
 * @remarks
 * Logs a warning to the console if an invalid document type is provided.
 */
export function resolveHomeHref(locale?: string): string {
  return locale && locale !== 'da' ? `/${locale}` : '/'
}
