import { paddingIndicator } from '../../utils/paddingindicator'
import { FileText } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const textContainerType = defineType({
  name: 'textContainer',
  type: 'object',
  icon: FileText,
  title: 'Indholdsblok',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'innerBlocks',
      type: 'innerBlocks',
      title: 'Indhold',
      group: 'content',
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
      innerBlocks: 'innerBlocks',
      design: 'design',
    },
    prepare({ innerBlocks, design }) {
      // Find the first heading block
      const headingBlock = innerBlocks?.find((block) => block._type === 'heading')
      const headingTitle = headingBlock?.text

      // Find the first text block
      const textBlock = innerBlocks?.find((block) => block._type === 'textBlock')
      const firstText = textBlock?.body
        ?.find((block) => block._type === 'block' && block.children)
        ?.children?.find((child) => child._type === 'span')?.text

      return {
        title: headingTitle || firstText || 'Ingen overskrift',
        subtitle: `Indholdsblok | ${paddingIndicator(design)}`,
      }
    },
  },
})
