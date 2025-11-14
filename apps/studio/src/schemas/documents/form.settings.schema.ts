// schemas/formularSettings.js
import { defineType, defineField } from 'sanity'
import { Envelope } from '@mynaui/icons-react'

export default defineType({
  name: 'formularSettings',
  title: 'Formularindstillinger',
  type: 'document',
  icon: Envelope,
  fields: [
    defineField({
      name: 'defaultRecipientEmail',
      title:
        'Standard modtager-email på formularer. Bruges kun hvis der ikke er angivet en modtager-email på formularen.',
      type: 'string',
      validation: (Rule) => Rule.email().required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Formularindstillinger',
        subtitle: 'Global opsætning for formularer',
        media: Envelope,
      }
    },
  },
})
