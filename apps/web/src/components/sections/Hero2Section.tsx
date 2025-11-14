'use client'
import React, { useState } from 'react'
import Heading from '@/components/atoms/Heading'
import Section from '@/components/sections/Section'
import { Hero2 } from 'sanity.types'

/**
 *
 * @returns: En sektion med en hero.
 * @example: <Hero2 />
 * @alias: Hero2
 * @summary: Denne komponent bruges til at vise en hero.
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

interface Hero2Props {
  data?: Hero2
}

const Hero2Section = ({ data, ...props }: Hero2Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const OpenModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Section
        {...props}
        className="max-h-screen pt-40 md:pt-30"
        paddingTop="none"
        paddingBottom="none"
      >
        {data?.design?.color?.color === 'dark' ? (
          <div className="bg-superego-green col-span-full h-screen/1.6 lg:h-screen/1.2 absolute top-0 right-0 w-full" />
        ) : data?.design?.color?.color === 'purple' ? (
          <div className="bg-superego-purple col-span-full h-screen/1.6 lg:h-screen/1.2 absolute top-0 right-0 w-full" />
        ) : (
          <div className="bg-superego-green col-span-full h-screen/1.6 lg:h-screen/1.2 absolute top-0 right-0 w-full" />
        )}
        <div className="col-span-full rounded-xl overflow-hidden h-screen/1.6 lg:h-screen/1.2 relative">
          {/* <Media data={data?.MediaObject?.media} /> */}

          <div className="absolute z-10 w-full h-full translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 right-1/2 bg-superego-black/45" />

          <div className="absolute z-20 w-full px-4 text-center translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2 text-superego-light-base">
            <Heading spacing="small" tag="h1" size="2xl">
              {data.title}
            </Heading>

            {data?.MediaObject?.media.videoObject && (
              <button onClick={OpenModal} className="z-40 text-white ">
                Afspil video
              </button>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}

export default Hero2Section
