import groq from 'groq'
const videoObject = groq`
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
  image {
    ...,
    "altText": asset->.altText,
    "description": asset->.description,
    "title": asset->.title
  }
}


`
