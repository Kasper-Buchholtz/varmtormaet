import { groq } from 'next-sanity'
import { ImageQuery } from '../atoms/Image.query'

export const SEO_QUERY = groq` // Inuse
seoGroup {
  seoImage {
    ${ImageQuery}
  },
  seoKeywords,
  seoTitle,
  seoDescription,
  radioField,
  ...
}
`
