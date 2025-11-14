import groq from 'groq'
export const ImageQuery = groq`
    ...,
    "altText": asset->.altText,
    "altDescription": asset->.description,
    "altTitle": asset->.title
`
