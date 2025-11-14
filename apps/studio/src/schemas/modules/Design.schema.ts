import { defineField, defineType } from 'sanity'
export const Design = defineType({
  type: 'object',
  name: 'design',
  title: 'Design indstillinger',
  fields: [
    defineField({
      name: 'padding',
      title: 'Afstand',
      type: 'padding',
    }),
    defineField({
      name: 'color',
      title: 'Farve',
      type: 'color',
    }),
  ],
})
