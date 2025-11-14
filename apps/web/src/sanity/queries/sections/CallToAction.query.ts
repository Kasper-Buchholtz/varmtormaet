import groq from 'groq'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObject.query'
import { DesignQuery } from '@/sanity/queries/atoms/Design.query'
import { ButtonQuery } from '@/sanity/queries/atoms/Button.query'
export const CallToActionQuery = groq`
  _type == 'CallToAction' => {
    ...,
    callToActions[] {
      ...,
      ${ButtonQuery},
      ${MediaObjectQuery},
    },
    ${DesignQuery},
  }
`
