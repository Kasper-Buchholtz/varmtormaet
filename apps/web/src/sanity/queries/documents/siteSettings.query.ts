import { groq } from 'next-sanity'

export const SITE_SETTINGS_QUERY = groq`
*[_type == "settings" && locale == $locale][0] {
  ...,
  bodyScripts,
  siteTitle,
  siteDescription,
  footerScripts,
  headScripts,
  googleTagManager {
    id,
    verification,
  }
}
`
