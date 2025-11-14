import { Briefcase } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'department',
  title: 'Afdeling',
  icon: Briefcase,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      description: 'titel på afdelingen',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: { title: any }) {
      const { title } = selection
      return {
        title: title,
      }
    },
  },
})
