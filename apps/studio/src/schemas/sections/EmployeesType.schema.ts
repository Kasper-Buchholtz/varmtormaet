import { paddingIndicator } from '../../utils/paddingindicator'
import { UsersGroup } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const EmployeesType = defineType({
  name: 'EmployeesType',
  icon: UsersGroup,
  title: 'Medarbejdere',
  description: 'Viser en liste af medarbejdere',
  type: 'object',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'content',
      name: 'heading',
      type: 'heading',
      title: 'Overskrift',
    }),
    defineField({
      group: 'content',
      name: 'view',
      title: 'Visning',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Afdeling', value: 'department' },
          { title: 'Alle', value: 'all' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'manual', // Set "public" as the default value
    }),
    defineField({
      group: 'content',
      name: 'employees',
      title: 'Medarbejdere',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'manual',
      of: [{ type: 'reference', to: [{ type: 'employee' }] }],
    }),
    defineField({
      group: 'content',
      name: 'department',
      title: 'Afdeling',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'department',
      of: [{ type: 'reference', to: [{ type: 'department' }] }],
    }),
    defineField({
      name: 'design',
      type: 'design',
      group: 'content',
    }),
    defineField({
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'heading.text',
      design: 'design',
    },
    prepare({ title, design }) {
      return {
        title: title,
        subtitle: 'Medarbejdere' + ' | ' + paddingIndicator(design),
      }
    },
  },
})
