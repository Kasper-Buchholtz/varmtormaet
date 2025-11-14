import React from 'react'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import Photo from '../atoms/Photo'
import { LogoGallery as LogoGallery_Types } from 'sanity.types'

/**
 *
 * @returns: En sektion med en logo galleri.
 * @example: <LogoGallery />
 * @alias: LogoGallery
 * @summary: Denne komponent bruges til at vise et galleri med logoer
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

type LogoGalleryProps = {
  data: LogoGallery_Types
}
const LogoGallery = ({ data }: LogoGalleryProps) => {
  return (
    <Section data={data}>
      <div className="col-span-full">
        {data?.title?.text && (
          <Heading
            data={data.title}
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: data?.title?.text }}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 bg-white shadow-lg col-span-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:p-12 md:flex-row rounded-2xl">
        {data.images.map((image, index) => (
          <div key={index}>
            <Photo image={image} aspectRatio="7/5" />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default LogoGallery
