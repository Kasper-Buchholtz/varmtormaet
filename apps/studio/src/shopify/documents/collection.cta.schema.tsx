import React from 'react'
import { defineField, defineType } from 'sanity'
import { Click } from '@mynaui/icons-react'
import { InputWithCharacterCount } from '@repo/sanity-studio/src/components'

export default defineType({
  name: 'collection.cta',
  title: 'Collection CTA',
  type: 'document',
  icon: Click,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titel for CTA (bruges internt)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Billede til CTA',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
      description: 'Link til en kollektion, side eller ekstern URL',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Beskrivelse for CTA',
      rows: 3,
      components: {
        input: InputWithCharacterCount as any,
      },
      options: {
        /* @ts-expect-error */
        maxLength: 160,
        minLength: 50,
      },
    })

  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Titel (A-Å)',
      by: [{ field: 'store.title', direction: 'asc' }],
    },
    {
      name: 'titleDesc',
      title: 'Titel (Å-A)',
      by: [{ field: 'store.title', direction: 'desc' }],
    },
  ],
})