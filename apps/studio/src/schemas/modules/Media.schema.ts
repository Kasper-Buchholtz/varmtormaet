import { defineField, defineType } from 'sanity'

export const Media = defineType({
  type: 'object',
  name: 'media',
  title: 'Media',
  options: {},
  fields: [
    defineField({
      name: 'image',
      title: 'Billede',
      type: 'image',
    }),
    defineField({
      name: 'file',
      title: 'Video',
      type: 'file',
    }),
  ],
})
