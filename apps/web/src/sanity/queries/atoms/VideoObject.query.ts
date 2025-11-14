import groq from 'groq'
export const videoObject = groq`
videoObject {
  ...,
  video {
    asset-> {
      _id,
      url,
      _type,
      altText,
      description,
      title
    }
  },
  image
}
`
