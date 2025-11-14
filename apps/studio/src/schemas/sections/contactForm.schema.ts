import { paddingIndicator } from '../../utils/paddingindicator'
import { Envelope } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

const contactFormType = defineType({
  name: 'contactFormType',
  title: 'Kontaktformular',
  icon: Envelope,
  type: 'object',
  groups: [
    { title: 'Content', name: 'content' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'string',
      group: 'content',
    }),
    // choose reference
    defineField({
      type: 'reference',
      name: 'formular',
      to: [{ type: 'formular' }],
      title: 'Vælg formular',
      description: 'Vælg en formular fra formularer',
    }),

    defineField({
      name: 'design',
      type: 'design',
      title: 'Design',
    }),
    defineField({
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      description: 'description',
      design: 'design',
    },
    prepare({ title, description, design }) {
      return {
        title: title,
        subtitle: description + ' | ' + paddingIndicator(design),
        media: Envelope,
      }
    },
  },
})

export { contactFormType }
