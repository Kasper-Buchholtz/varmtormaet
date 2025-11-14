import { groq } from 'next-sanity'

export const NAVIGATION_QUERY = groq`
*[_type == "navigation" && locale == $locale][0] {
  locale,
  links[] {
    link {
      ...,
      internalLink-> {
        _type,
        slug,
        title,
        locale,
        "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value-> {
          title,
          slug,
          locale,
          _type
        }
      }
    },
    "links": subLinks[] {
      "link": {
        ...,
        internalLink-> {
          _type,
          slug,
          locale,
          title,
          "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value-> {
            title,
            slug,
            locale,
            _type
          }
        }
      }
    }
  }
}

`
