import { defineField, defineType } from 'sanity'

export const SectionSettings = defineType({
  type: 'object',
  name: 'SectionSettings',
  title: 'Sektion indstillinger',
  options: {},
  fields: [
    defineField({
      name: 'anchor',
      description: 'Anker link til sektionen bruges sådan: `#<anchor>`',
      type: 'slug',
    }),
  ],
})
