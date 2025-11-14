import { defineQuery, groq } from 'next-sanity'
import { ButtonQuery } from '@/sanity/queries/atoms/Button.query'
import { isPortableTextQuery } from '../atoms/isPortableText.query'

export const InnerBlocksQuery = defineQuery(`
innerBlocks[] {
  ...,
  _type == "button" => {
    ${ButtonQuery}, 
    style
  },
  _type == "accordion" => {
    accordions[] {
      ...,
      ${isPortableTextQuery}
      },
    },
    ${isPortableTextQuery}
  }

`)
