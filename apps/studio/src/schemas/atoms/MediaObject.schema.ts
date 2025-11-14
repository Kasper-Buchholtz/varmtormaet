import { defineField, defineType } from 'sanity'

export const MediaObject = defineType({
  title: 'Medie',
  name: 'MediaObject',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      type: 'object',
      title: 'Medie',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'select',
          type: 'string',
          title: 'Vælg medie',
          options: {
            layout: 'dropdown',
            list: [
              { title: 'Billede', value: 'image' },
              { title: 'Video', value: 'video' },
              { title: 'Vimeo', value: 'vimeo' },
            ],
          },
          initialValue: 'image',
        }),
        /* Billede */
        defineField({
          name: 'imageObject',
          title: 'Billede',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Billede',
              options: {
                hotspot: true,
              },
            }),
          ],
          hidden: ({ parent }) => parent?.select !== 'image',
        }),
        /* Video */
        defineField({
          name: 'videoObject',
          title: 'Video',
          description: 'Vælg en video',
          type: 'object',
          hidden: ({ parent }) => parent?.select !== 'video',
          fields: [
            defineField({
              name: 'video',
              type: 'file',
              title: 'Video',
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
        /* Vimeo */
        defineField({
          name: 'vimeoObject',
          title: 'Vimeo',
          description: 'Vælg en Vimeo video',
          type: 'object',
          hidden: ({ parent }) => parent?.select !== 'vimeo',
          fields: [
            defineField({
              name: 'vimeo',
              type: 'url',
              title: 'Vimeo',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                  allowRelative: false,
                }),
            }),
          ],
        }),
      ],
    }),
  ],
})
