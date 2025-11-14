import { Language } from '@sanity/document-internationalization'

// Extended Language type to include slug and locale
export type ExtendedLanguage = Omit<Language, 'id'> & {
  _type: string
  slug: {
    current: string
  }
  locale: string
}

// Props for LocaleSwitcher
export type LanguageProps = {
  locale: {
    _translations: ExtendedLanguage[]
    locale: string
  }
}

// Add type for Appconfig.i18n.locales
export type AppConfigLocales = {
  id: string
  title: string
}
