import groq from 'groq'

const EventCardQuery = groq`
  title, 
  "slug": slug.current,
  date,
  mainImage,
  _type,
  description
`
const Manual = groq`
  view == "manual" => events[]->{
    ${EventCardQuery}
  }
`
const All = groq`
  view == "all" => *[_type == "event"] {
    ${EventCardQuery}
  }
`
const Newest = groq`
  view == "newest" => *[_type == "event"] | order(date desc)[0...(6)]{
    ${EventCardQuery}
  }
`

export const EventTypeQuery = groq`
  _type == "EventType" => {
    amount,
    ...,
    heading,
    "events": select(
      ${All},
      ${Manual},
      ${Newest}
    )
  }
`
