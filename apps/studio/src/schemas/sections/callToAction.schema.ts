import { paddingIndicator } from '../../utils/paddingindicator'
import { Click } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

const CallToAction = defineType({
  name: 'CallToAction',
  title: 'Call to action',
  description:
    'Call to actions er fremtrædende bokse eller knapper, der opfordrer brugeren til at udføre en bestemt handling, f.eks. at klikke videre på relaterede sider på hjemmesiden eller tage kontakt til Jer. Call to actions gør oplevelsen mere intuitiv og flydende for brugeren.',
  type: 'object',
  icon: Click,
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'content',
      name: 'callToActions',
      title: 'Call to actions',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'callToAction',
          title: 'Call to action',
          type: 'object',
          groups: [
            { title: 'Medie', name: 'medie' },
            { title: 'Tekst', name: 'text' },
            { title: 'Link', name: 'link' },
          ],
          fields: [
            // heading
            defineField({
              group: 'text',
              name: 'heading',
              title: 'Overskrift',
              type: 'string',
              description:
                'Overskriften er det første, brugeren ser, og skal være kort og præcis. Den skal beskrive, hvad brugeren får ud af at klikke på knappen.',
            }),
            // subheading
            defineField({
              group: 'text',
              name: 'subheading',
              title: 'Underoverskrift',
              type: 'string',
              description:
                'Underoverskriften er en kort beskrivelse af overskriften og skal uddybe, hvad brugeren får ud af at klikke på knappen.',
            }),
            // link
            defineField({
              group: 'link',
              name: 'link',
              title: 'Link',
              type: 'link',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              group: 'medie',
              name: 'MediaObject',
              title: 'Medie',
              type: 'MediaObject',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'design',
      type: 'design',
      group: 'design',
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
      title: 'Call to action',
      amountofCTAs: 'callToActions',
      media: 'callToActions.0.image',
      design: 'design',
    },
    prepare({ amountofCTAs, media, design }) {
      return {
        subtitle: 'Call to action' + ' | ' + paddingIndicator(design),
        title: `Antal ${Object.keys(amountofCTAs).length}`,
        media: media,
      }
    },
  },
})

export { CallToAction }
