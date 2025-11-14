import { groq } from 'next-sanity'

export const FOOTER_QUERY = groq`
    *[_type == "footer" && locale == $locale][0] {
      title,
      locale,
      object {
        companyName,
        adressBook{
          street,
          zip
        },
        telephone,
        email,
        cvr
      },
      social[] {
        platform,
        url
      },
      openingHours[] {
        day,
        hours
      }
    }
`
