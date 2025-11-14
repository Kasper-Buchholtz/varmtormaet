import { Click } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { paddingIndicator } from '../../utils/paddingindicator'

const CallToAction2 = defineType({
  name: 'CallToAction2',
  title: 'Call to action 2',
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
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      description:
        'Overskriften er det første, brugeren ser, og skal være kort og præcis. Den skal beskrive, hvad brugeren får ud af at klikke på knappen.',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      description: 'Tilføj op til 2 links',
      type: 'array',
      validation(rule) {
        return rule.required().min(1).max(2)
      },
      of: [
        defineArrayMember({
          name: 'link',
          title: 'Link',
          type: 'link',
          validation: (Rule) => Rule.required(),
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
      links: 'links',
      design: 'design',
    },
    prepare({ links, design }) {
      return {
        subtitle: 'Call to action | ' + paddingIndicator(design),
        title: `Antal ${Object?.keys(links)?.length} Knapper `,
      }
    },
  },
})

export { CallToAction2 }
