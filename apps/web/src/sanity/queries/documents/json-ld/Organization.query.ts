import { groq } from 'next-sanity'

export const ORGANIZATION_QUERY = groq`
*[_type == "organization"][0] {
  _id,
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": legalName,
  url,
  email,
  telephone,
  faxNumber,
  description,
  logo {
    asset-> {
      url,
      ...,
    },
    ...,
  },
    foundingDate,
  founder,
  taxID,
  vatID,
  duns,
  slogan,
  address {
    "@type": "PostalAddress",
    ...,
    streetAddress,
    postalCode,
    addressLocality,
    addressRegion,
    addressCountry
  },
  sameAs
}
`
