import React from 'react'
import Heading from '../atoms/Heading'
import Section from './Section'
import { Button } from '../atoms/Button'
import { CallToAction2 } from 'sanity.types'

/**
 * @returns: En sektion med en eller flere call-to-action elementer.
 * @example: <CallToActionSection2 />
 * @alias: CallToActionSection2
 * @summary: Denne komponent bruges til at oprette en sektion med en eller flere call-to-action elementer.
 * @version: 1.0.0
 * @property: [section]
 * @author: Emilie Hjøllund
 **/

type CallToActionSection2Props = {
  data: CallToAction2
}

const CallToActionSection2 = ({ data }: CallToActionSection2Props) => {
  return (
    <Section data={data}>
      {/* Heading on the left, taking up 12 columns */}
      <div className="flex justify-center w-full col-start-1 text-center sm:col-start-1 sm:-col-end-1 md:text-left -col-end-1 md:col-start-2 md:col-end-7 lg:col-start-2 lg:col-end-7 xl:col-start-5 xl:col-end-13 align-center md:max-w-prose ">
        <Heading text="balance" spacing="none" size="lg" tag="h3">
          {data?.heading}
        </Heading>
      </div>

      {/* Buttons on the right, each taking up 6 columns */}
      <div className="flex items-center justify-center col-start-1 space-x-4 -col-end-1 md:col-start-7 md:col-end-12 lg:col-start-7 lg:col-end-12 xl:col-start-13 xl:col-end-21 align-center">
        <div className="flex flex-col justify-center w-full gap-4 md:flex-row">
          {data?.links?.map((link, index) => (
            <Button
              key={index}
              link={link}
              variant={index === 0 ? 'primary' : 'secondary'}
              className="w-full md:w-1/2"
            >
              {link?.label}
            </Button>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default CallToActionSection2
