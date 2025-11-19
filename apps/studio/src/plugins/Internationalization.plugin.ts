import '@repo/dashboard/global.css'
import Appconfig from '@repo/utils/src/superego.config'
import { documentInternationalization } from '@sanity/document-internationalization'

export const documentInternationalizationTool = documentInternationalization({
  supportedLanguages: [...Appconfig.i18n.locales],
  schemaTypes: ['page', 'navigation', 'footer', 'article', 'event', 'settings'],
  languageField: 'locale',
  allowCreateMetaDoc: true,
})
