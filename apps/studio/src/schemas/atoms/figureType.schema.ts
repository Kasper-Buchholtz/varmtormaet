import { defineField, defineType } from 'sanity'

export const figureType = defineType({
  name: 'figure',
  type: 'image',
  title: 'Figure',
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: `Describe the image for people who can't see it`,
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: `Text that's displayed with the image`,
    }),
  ],
  options: {
    hotspot: true,
  },
})
