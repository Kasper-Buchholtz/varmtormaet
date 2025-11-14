import { groq } from 'next-sanity'

export const LOCALE_QUERY = groq`
*[(slug.current == $slug || (!defined(slug.current) && $slug == "")) && locale == $locale][0] {
  "slug": slug.current,
  locale,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      "slug": slug.current,
      locale
    },
  },
}
`
