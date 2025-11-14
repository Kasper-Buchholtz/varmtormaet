import { PanelTopInactive } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'
export const Hero3Type = defineType({
  name: 'Hero3',
  type: 'object',
  icon: PanelTopInactive,
  groups: [
    { title: 'Media', name: 'media' },
    { title: 'Design', name: 'design' },
    { title: 'Content', name: 'content' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  description:
    'Banneret fungerer som et sidehoved, der skaber blikfang fra første øjekast og gør siden overskuelig.',
  title: 'Hero 3',
  fields: [
    defineField({
      group: 'content',
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      group: 'content',
      name: 'title',
      type: 'string',
      title: 'Titel',
    }),
    defineField({
      group: 'media',
      name: 'MediaObject',
      title: 'Medie',
      type: 'MediaObject',
    }),
    defineField({
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
    defineField({
      group: 'design',
      name: 'design',
      title: 'Design',
      type: 'design',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Ingen titel',
        type: 'Hero',
        subtitle: 'Topbanner',
        media,
      }
    },
  },
})
