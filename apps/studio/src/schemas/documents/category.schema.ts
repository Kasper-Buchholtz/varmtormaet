import { Tag } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategori',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      description: 'Navnet på medarbejder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
