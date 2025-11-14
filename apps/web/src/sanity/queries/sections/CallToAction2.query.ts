import groq from 'groq'
import { DesignQuery } from '@/sanity/queries/atoms/Design.query'
export const CallToActionQuery2 = groq`
_type == "CallToAction2" => {
  ...,
  links[] {
    ...,
    internalLink-> {
      _type,
      slug,
      title,
      locale,
      "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value-> {
        title,
        slug,
        locale
      }
    },
    file {
      asset-> {
        ...
      }
    }
  },
  ${DesignQuery}
}

`
