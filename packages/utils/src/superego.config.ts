/**
 * Konfigurationsobjekt for applikationen.
 *
 * @property {string} WebsiteUrl - Den fulde URL til hjemmesiden.
 * @property {string} siteTitle - Sidens titel.
 * @property {Object} i18n - Indstillinger for internationalisering.
 * @property {Array<{ id: string; title: string }>} i18n.locales - Liste over understøttede sprog med deres ID og titler.
 * @property {string} i18n.defaultLocaleId - ID for standardsproget.
 * @property {string} siteName - Sidens navn uden specialtegn eller mellemrum - bruges til sanity. (Må ikke have trailing slash)
 * @property {string} studioUrl - Den fulde URL til Sanity Studio. (Må ikke have trailing slash)
 */

const Appconfig = {
  WebsiteUrl: 'http://localhost:3000',
  studioUrl: 'http://localhost:3333',
  siteTitle: 'sanity turbo',
  siteName: 'sanity-turbo',
  i18n: {
    locales: [
      { id: 'da', title: 'Dansk' },
      // { id: 'en', title: 'English' },
    ],
    defaultLocaleId: 'da',
  },
}
export default Appconfig
