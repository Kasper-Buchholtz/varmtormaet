import { pageBuilderQuery } from '../organisms/PageBuilder.query'
import { groq } from 'next-sanity'
import { SEO_QUERY } from '../organisms/seo.query'
import { ImageQuery } from '../atoms/Image.query'

// GROQ Page Query
export const PAGE_QUERY = groq`
*[_type == "page" && slug.current == $slug && locale == $locale][0] {
  ...,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      slug,
      locale
    },
  },
  _type,
  ${SEO_QUERY},
  ${pageBuilderQuery},
  mainImage {
    ${ImageQuery}
  }
}
`
