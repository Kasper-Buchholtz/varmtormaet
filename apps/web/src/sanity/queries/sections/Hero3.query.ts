import groq from 'groq'
import { DesignQuery } from '@/sanity/queries/atoms/Design.query'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObject.query'
export const hero3Query = groq`
_type == "Hero3" => {
  title, 
  subtitle,
  _type,
  ...,
  ${MediaObjectQuery},
  ${DesignQuery},
}
`
