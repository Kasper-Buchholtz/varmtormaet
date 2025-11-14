import { groq } from 'next-sanity'
import { MediaObjectQuery } from '../molecules/MediaObject.query'

export const MediaType_QUERY = groq`
  _type == "MediaType" => {
    ${MediaObjectQuery},
    ...,
    _type,
    }
`
