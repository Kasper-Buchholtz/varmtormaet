import groq from 'groq'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObject.query'

export const heroQuery = groq`
_type == "hero" => {
  title, 
  subtitle,
  _type,
  ${MediaObjectQuery},
}
`
