import { defineField, defineType } from 'sanity'
export const Color = defineType({
  type: 'object',
  name: 'color',
  title: 'Farve',
  fields: [
    defineField({
      name: 'color',
      type: 'string',
      title: 'Farve',
      options: {
        layout: 'radio',
        list: [
          { title: 'Lys', value: 'light' },
          { title: 'Mørk', value: 'dark' },
          { title: 'Lilla', value: 'purple' },
        ],
      },
      initialValue: 'light',
    }),
  ],
})
