import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../organisms/Carousel'
import Section from './Section'
import Photo from '../atoms/Photo'
import { Gallery } from 'sanity.types'

/**
 *
 * @returns: En sektion med galleri.
 * @example: <GallerySection />
 * @alias: GallerySection
 * @summary: Denne komponent bruges til at oprette en ny sektion med galleri.
: src/components/sections/GallerySection.tsx
 * @version: 1.0.0
 * @property: [section]
 * @author: Kasper Buchholtz
 *
 **/

type GallerySectionType = {
  data: Gallery
}
const GallerySection = ({ data }: GallerySectionType) => {
  return (
    <Section data={data}>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="col-span-full"
      >
        <CarouselContent>
          {data.images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="overflow-hidden rounded-lg aspect-w-16 aspect-h-12">
                <Photo image={image} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  )
}

export default GallerySection
