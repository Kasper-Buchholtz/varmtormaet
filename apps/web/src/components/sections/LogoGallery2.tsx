'use client'
import React from 'react'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../organisms/Carousel'
import Photo from '../atoms/Photo'
import { LogoGallery2 as LogoGallery2_Types } from 'sanity.types'

type LogoGallery2Props = {
  data: LogoGallery2_Types
}

const LogoGallery2 = ({ data }: LogoGallery2Props) => {
  return (
    <Section data={data}>
      <div className="col-span-full">
        {data?.title?.text && (
          <Heading
            data={data.title}
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: data.title.text }}
          />
        )}
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="col-span-full"
      >
        <CarouselContent>
          {data.images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
              <div className="overflow-hidden rounded-lg ">
                <Photo image={image} aspectRatio="16/12" />
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

export default LogoGallery2
