import { Briefcase, Image, InfoCircle, Telephone, UserSquare } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'employee',
  title: 'Medarbejder',
  type: 'document',
  description: 'Siderne på hjemmesiden',
  icon: UserSquare,
  orderings: [
    {
      title: 'Prioritet',
      name: 'priorityAsc',
      by: [{ field: 'priority', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      description: 'Navnet på medarbejder',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      description: 'Email til medarbejderen',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      description: 'Telefonnummer til medarbejderen',
      type: 'string',
    }),
    defineField({
      name: 'image',
      options: {
        hotspot: true,
      },
      title: 'Billede',
      description: 'Billede af medarbejderen',
      type: 'image',
    }),
    defineField({
      name: 'position',
      title: 'Stilling',
      description: 'Stillingen på medarbejderen',
      type: 'string',
    }),
    defineField({
      name: 'departments',
      description: 'Vælg en afdeling for medarbejderen',
      title: 'Afdeling',
      type: 'reference',
      to: [{ type: 'department' }],
    }),
    defineField({
      name: 'priority',
      title: 'Prioritet',
      description: 'Jo lavere tal, jo højere op vises medarbejderen (f.eks. 1 for CEO)',
      type: 'number',
      initialValue: 100,
      validation: (Rule) => Rule.min(0).integer(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection: { title: any; media: any; position: any }) {
      const { title, media, position } = selection
      return {
        title: title,
        media: media,
      }
    },
  },
})
