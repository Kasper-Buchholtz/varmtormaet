import { defineField, defineType } from 'sanity'
import { Click } from '@mynaui/icons-react'
import { InputWithCharacterCount } from '@repo/sanity-studio/src/components'

export default defineType({
  name: 'collection.cta',
  title: 'Collection CTA',
  description: 'Call to action for kollektioner',
  type: 'document',
  icon: Click,
  groups: [
    {
      default: true,
      name: 'content',
      title: 'Indhold',
    },
    {
      name: 'placement',
      title: 'Placering',
    },
    {
      name: 'settings',
      title: 'Indstillinger',
    },
  ],
  fields: [
    // SETTINGS (internal)
    defineField({
      name: 'internalTitle',
      type: 'string',
      title: 'Internal Title',
      description: 'Navn for CTA (bruges kun internt)',
      validation: (Rule) => Rule.required(),
      group: 'settings',
    }),

    // CONTENT (what the user sees)
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
        maxLength: 100,
        minLength: 50,
      },
      group: 'content',
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
      description: 'Link til kollektion',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'Billede der vises i CTA',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // PLACEMENT (where it shows)
    defineField({
      name: 'appearInCollections',
      group: 'placement',
      type: 'array',
      title: 'Vis i kollektioner',
      description: 'Vælg de kollektioner hvor denne CTA skal vises',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'gridPosition',
      group: 'placement',
      type: 'number',
      title: 'Grid Position',
      description:
        'Vælg positionen for CTA i kollektionens grid (f.eks. 5 for at placere den som det 5. element). hvis positionen allerede er optaget, vil CTA blive placeret på den næste ledige position. og hvis ingen position er valgt, vil CTA blive placeret sidst i rækken.',
      validation: (Rule) => Rule.min(1).integer(),
    }),
  ],

  orderings: [
    {
      name: 'titleAsc',
      title: 'Titel (A-Å)',
      by: [{ field: 'internalTitle', direction: 'asc' }],
    },
    {
      name: 'titleDesc',
      title: 'Titel (Å-A)',
      by: [{ field: 'internalTitle', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'internalTitle',
      firstCollection: 'appearInCollections.0.title',
      gridPosition: 'gridPosition',
    },
    prepare({ title, firstCollection, gridPosition }) {
      const subtitleParts = ['Collection CTA']

      if (firstCollection) {
        subtitleParts.push(`Kollektion: ${firstCollection}`)
      }

      if (gridPosition) {
        subtitleParts.push(`Pos: ${gridPosition}`)
      }

      return {
        title,
        subtitle: subtitleParts.join(' · '),
      }
    },
  },
})