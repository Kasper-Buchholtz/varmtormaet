import { paddingIndicator } from '../../utils/paddingindicator'
import { ImageRectangle } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'
export const Gallery = defineType({
  name: 'Gallery',
  type: 'object',
  title: 'Galleri',
  icon: ImageRectangle,
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Billeder',
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          title: 'Billede',
          options: {
            hotspot: true,
          },
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'design',
      title: 'Design',
      type: 'design',
    }),
    defineField({
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
  preview: {
    select: {
      images: 'images',
      design: 'design',
    },
    prepare(selection) {
      const { images, design } = selection
      return {
        title: `Galleri med ${Object.keys(images).length} billeder`,
        subtitle: `Galleri | ${paddingIndicator(design)} `,
      }
    },
  },
})
