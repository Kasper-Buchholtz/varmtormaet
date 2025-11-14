import { defineField, defineType } from 'sanity'

export const Padding = defineType({
  type: 'object',
  name: 'padding',
  title: 'Padding',
  options: {
    columns: 2,
  },
  fields: [
    defineField({
      name: 'spacingTop',
      type: 'string',
      title: 'Afstand til toppen',
      options: {
        layout: 'radio',
        list: [
          { title: 'Normal', value: 'default' },
          { title: 'Ingen', value: 'none' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'spacingBottom',
      type: 'string',
      title: 'Afstand til bunden',
      options: {
        layout: 'radio',
        list: [
          { title: 'Normal', value: 'default' },
          { title: 'Ingen', value: 'none' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
