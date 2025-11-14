import { TextJustify } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'
export const textType = defineType({
  name: 'textBlock',
  type: 'object',
  icon: TextJustify,
  description:
    'Tekstblokken anvendes til generel brødtekst, der giver brugeren den relevante information. Afsnittene anbefales at være kortfattede og opdelte med bl.a. overskrifter og medier.',
  title: 'Brødtekst',
  fields: [
    defineField({
      name: 'body',
      title: 'Brødtekst',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      body: 'body',
    },
    prepare({ body }) {
      // Ensure body is an array and find the first block with text
      const firstTextBlock =
        body
          ?.find((block) => block._type === 'block' && block.children)
          ?.children?.find((child) => child._type === 'span')?.text || 'No content'

      return {
        title: firstTextBlock,
        subtitle: 'Brødtekst',
      }
    },
  },
})
