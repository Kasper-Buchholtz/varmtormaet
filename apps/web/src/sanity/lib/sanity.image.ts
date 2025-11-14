import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '@/sanity/lib/sanity.api'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  // Ensure that source image contains a valid reference and asset information
  if (!source?.asset?._ref) {
    return undefined
  }

  // The builder will use crop and hotspot if they are defined in the asset document
  return imageBuilder.image(source).auto('format').fit('fill') // Ensure the image is cropped according to hotspot/crop
}

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source).format('webp')
}
