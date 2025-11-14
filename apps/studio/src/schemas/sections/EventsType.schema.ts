import { paddingIndicator } from '../../utils/paddingindicator'
import { CalendarCheck } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'
export const EventType = defineType({
  name: 'EventType',
  title: 'Begivenheder',
  description: 'Viser en liste af begivenheder',
  type: 'object',
  icon: CalendarCheck,
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'content',
      name: 'heading',
      title: 'Overskrift',
      type: 'heading',
    }),
    defineField({
      group: 'content',
      name: 'view',
      title: 'Visning',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Nyeste', value: 'newest' },
          { title: 'Alle', value: 'all' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'manual', // Set "public" as the default value
    }),
    defineField({
      group: 'content',
      name: 'events',
      title: 'Begivenheder',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'manual',
      validation: (Rule) => Rule.unique(),
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }),
    defineField({
      group: 'content',
      name: 'amount',
      type: 'number',
      hidden: ({ parent }) => parent?.view !== 'newest',
      title: 'Antal begivenheder',
      initialValue: 4,
    }),
    defineField({
      name: 'design',
      type: 'design',
      group: 'design',
    }),
    defineField({
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'heading.text',
      design: 'design',
    },
    prepare({ title, design }) {
      return {
        title: title,
        subtitle: 'Begivenheder' + ' | ' + paddingIndicator(design),
      }
    },
  },
})
