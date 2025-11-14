import groq from 'groq'
import { DesignQuery } from '@/sanity/queries/atoms/Design.query'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObject.query'
export const hero2Query = groq`
_type == "Hero2" => {
  title, 
  _type,
  ${MediaObjectQuery},
  ${DesignQuery},
}
`
