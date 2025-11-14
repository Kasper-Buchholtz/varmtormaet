import { groq } from 'next-sanity'

export const isPortableTextQuery = groq`
body[] {
  ...,
  markDefs[] {
    ...,
    _type == "link" => {
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
    }
  }
}

`
