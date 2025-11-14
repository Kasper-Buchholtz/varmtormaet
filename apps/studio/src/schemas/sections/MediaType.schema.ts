import { ImageRectangle } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const MediaType = defineType({
  name: 'MediaType',
  type: 'object',
  icon: ImageRectangle,
  description: 'En medie blok til billeder og video.',
  title: 'MediaType',
  groups: [
    { title: 'Medie', name: 'media' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'media',
      name: 'MediaObject',
      title: 'Medie',
      type: 'MediaObject',
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
      title: 'select',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        media,
      }
    },
  },
})
