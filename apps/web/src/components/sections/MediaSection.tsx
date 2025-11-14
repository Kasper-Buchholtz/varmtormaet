'use client'
import React from 'react'
import Section from '@/components/sections/Section'
import Media from '../organisms/Media'
import { MediaType } from 'sanity.types'
import { FadeUp } from '../interactions/AnimateFadeIn'

/**
 *
 * @returns: En sektion med media.
 * @example: <Media />
 * @alias: Media
 * @summary: Denne komponent bruges til at vise en sektion med media.
 * @version: 1.0.0
 * @property: [section]
 * @todo: Tilføj flere mediatyper
 * @author: Kasper Buchholtz
 *
 **/

type MediaSectionProps = {
  data: MediaType
}
const MediaSection = ({ data }: MediaSectionProps) => {
  return (
    <Section data={data}>
      <FadeUp asChild duration={2}>
        <div className="max-h-screen/1.6 bg-red-500 col-span-full">
          <Media data={data.MediaObject.media} photo={{ aspectRatio: '16/9' }} />
        </div>
      </FadeUp>
    </Section>
  )
}

export default MediaSection
