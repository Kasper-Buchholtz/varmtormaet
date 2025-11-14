import groq from 'groq'
import { InnerBlocksQuery } from '@/sanity/queries/molecules/InnerBlocks.query'

export const textContainerQuery = groq`
    _type == "textContainer" => {
      ...,
    ${InnerBlocksQuery}
    }

`
