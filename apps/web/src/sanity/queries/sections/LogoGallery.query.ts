import groq from 'groq'
import { ImageQuery } from '@/sanity/queries/atoms/Image.query'
export const LogoGalleryQuery = groq`
_type == "LogoGallery" => {
  ...,
  _type,
  heading,
  images[] {
    // ${ImageQuery},
  }
}
`
