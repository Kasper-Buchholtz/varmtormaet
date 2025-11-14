import { groq } from 'next-sanity'

export const redirectQuery = groq`
 *[_type == 'redirect']{
    subLinks[]{
      "destination": destinationPage->{
        ...,
      },
          "source": source->{
        ...,
      },
    }
  }
`
