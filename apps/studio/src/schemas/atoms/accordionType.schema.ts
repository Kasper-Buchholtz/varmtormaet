import { PanelTopOpen } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const accordionType = defineType({
  name: 'accordion',
  type: 'object',
  title: 'Accordions',
  icon: PanelTopOpen,
  description:
    'Udfoldelige faner, som kan indeholde en overskrift og uddybende tekst. En accordion hjælper med at spare plads og gør hjemmesiden mere overskuelig og lettere at navigere i.',
  fields: [
    defineField({
      name: 'accordions',
      title: 'Accordions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Accordion',
          name: 'accordionObject',
          icon: PanelTopOpen,
          fields: [
            defineField({
              name: 'title',
              title: 'Titel',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Brødtekst',
              type: 'blockContent',
            }),
            defineField({
              name: 'unfloded',
              description:
                'Hvis denne er sat til "Ja", vil accordionen være udfoldet som standard.',
              title: 'Udfoldet',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              unfloded: 'unfloded',
            },
            prepare({ title, unfloded }) {
              return {
                title: title,
                subtitle: `Foldet ud: ${unfloded ? 'Ja' : 'Nej'}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'turnIntoStructuredData',
      title: 'Lav om til struktureret data (Google Schema markup)',
      type: 'boolean',
      description:
        'Hvis denne er sat til, vil accordionen blive lavet om til struktureret data, som Google kan forstå.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'Accordion',
      subtitle: 'Accordions',
      accordions: 'accordions',
    },
    prepare({ title, accordions }) {
      return {
        title: 'Accordion',
        subtitle: `Der er ${accordions.length} accordions i denne sektion.`,
      }
    },
  },
})
