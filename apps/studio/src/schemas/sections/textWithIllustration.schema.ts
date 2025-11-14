import { SquareHalf } from '@mynaui/icons-react'
import { paddingIndicator } from '../../utils/paddingindicator'
import { defineField, defineType } from 'sanity'

export const textWithIllustration = defineType({
  name: 'textWithIllustration',
  type: 'object',
  title: 'Tekst og medie',
  icon: SquareHalf,
  description:
    'Blokken er en kombination af tekst og medie, der præsenterer information på en visuelt tiltalende måde ved at inkludere både ord og billede. Det giver besøgende en mere informativ og engagerende oplevelse af hjemmesiden. På længere sider anbefales det at anvende tekst- og medie-blokken i kombination med andre tekstopsætninger',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'Medie', name: 'media' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'innerBlocks',
      title: 'Indhold',
      type: 'innerBlocks',
      group: 'content',
    }),
    defineField({
      group: 'media',
      name: 'MediaObject',
      title: 'Medie',
      type: 'MediaObject',
    }),
    defineField({
      group: 'media',
      name: 'flip',
      title: 'Spejlvend ',
      type: 'boolean',
      description: 'Vend om på tekst og billede',
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
      innerBlocks: 'innerBlocks',
      media: 'MediaObject.media.imageObject.image',
      design: 'design',
    },
    prepare({ innerBlocks, media, design }) {
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
        subtitle: 'Tekst og medie' + ' | ' + paddingIndicator(design),
        media,
      }
    },
  },
})
