import groq from 'groq'

export const LinkQuery = groq`
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
`

export const ButtonQuery = groq`
link {
  ${LinkQuery}
}
`
