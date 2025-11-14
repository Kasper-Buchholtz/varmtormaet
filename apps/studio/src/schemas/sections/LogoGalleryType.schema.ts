import { paddingIndicator } from '../../utils/paddingindicator'
import { Album } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const LogoGallery = defineType({
  name: 'LogoGallery',
  type: 'object',
  title: 'Logo Galleri',
  icon: Album,
  fields: [
    {
      name: 'title',
      type: 'heading',
      title: 'Titel',
      description: 'Titel på logogalleriet',
    },
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
      image: 'images.0',
      title: 'title',
      design: 'design',
    },
    prepare(selection) {
      const { images, image, design } = selection

      return {
        title: `Logo Galleri med ${Object.keys(images).length} billeder`,
        subtitle: `Logo Galleri | ${paddingIndicator(design)}`,
        media: image,
      }
    },
  },
})
