import groq from 'groq'
import { ImageQuery } from '@/sanity/queries/atoms/Image.query'
export const GalleryQuery = groq`
    _type == 'Gallery' => {
    ...,
    images[]{
      _key,
      // ${ImageQuery},
      alt,
        _ref,
        ...,
        "altText": asset->altText,
        "description": asset->description,
        "title": asset->title,
    },
  }`
