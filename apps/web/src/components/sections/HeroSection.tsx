'use client'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Media from '@/components/organisms/Media'
import Section from '@/components/sections/Section'
import Modal from '../molecules/Modal'
import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Hero } from 'sanity.types'

/**
 *
 * @returns: En sektion med en heroSection.
 * @example: <HeroSection />
 * @alias: HeroSection
 * @summary: Denne komponent bruges til at vise en heroSection.
 * @version: 1.0.0
 * @property: [title, image, video, altText, text, data]
 * @author: Kasper Buchholtz
 *
 **/

interface HeroSectionProps {
  data?: Hero
}

const before =
  'before:bg-linear-to-b before:from-dark/0 before:to-dark/60 before:absolute before:inset-0 before:z-10 '

const HeroSection: React.FC<HeroSectionProps> = ({ data, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const OpenModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Section
        {...props}
        data={data}
        paddingX="none"
        className={`h-screen relative place-content-center overflow-hidden ${before}`}
      >
        <div className="absolute w-full h-full">
          <Media data={data?.MediaObject?.media} />
        </div>
        <div className="z-10 col-start-1 text-center -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-3 lg:-col-end-3 xl:col-start-6 xl:-col-end-6 2xl:col-start-6 2xl:-col-end-6">
          <Heading tag="h1" size="2xl" fontFamily="sans">
            {data?.title}
          </Heading>
          <Paragraph>{data?.subtitle}</Paragraph>
          {data?.MediaObject?.media.videoObject && (
            <button onClick={OpenModal} className="relative z-40 text-white">
              Afspil video
            </button>
          )}
          <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full pointer-events-none">
            {data?.MediaObject?.media?.videoObject?.video && (
              <AnimatePresence mode="sync">
                {isOpen && (
                  <Modal openModal={OpenModal}>
                    <Media data={data?.MediaObject?.media} />
                  </Modal>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}

export default HeroSection
