import { Heading } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const headingType = defineType({
  name: 'heading',
  type: 'object',
  icon: Heading,
  title: 'Overskrift',
  description:
    'Overskrifter bruges på hjemmesiden til at give brugeren en idé om emnet, og hjælper til at skabe et godt overblik, så det er let at finde det indhold, man leder efter',
  fieldsets: [
    {
      name: 'textSettings',
      title: 'Overskrift Indstillinger',
      description: 'Her kan du justere overskriftens størrelse og HTML tag',
      options: {
        collapsed: true,
        columns: 2,
      },
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Overskrift',
      type: 'string',
      description: 'Overskriftens tekst',
    }),
    defineField({
      name: 'tag',
      fieldset: 'textSettings',
      title: 'Tag',
      description: 'HTML tag',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'H5', value: 'h5' },
          { title: 'H6', value: 'h6' },
          { title: 'Span', value: 'span' },
        ],
      },
      initialValue: 'h3',
    }),
    defineField({
      name: 'size',
      title: 'Størrelse',
      description: 'Størrelse på overskriften',
      type: 'string',
      fieldset: 'textSettings',
      options: {
        layout: 'dropdown',
        list: [
          { title: 'XL', value: 'xl' },
          { title: 'LG', value: 'lg' },
          { title: 'MD', value: 'md' },
          { title: 'SM', value: 'sm' },
          { title: 'XS', value: 'xs' },
        ],
      },
      initialValue: 'lg',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      tag: 'tag',
    },
    prepare({ title, tag }) {
      return {
        title: title,
        subtitle: `Overskirft | ${tag}`,
      }
    },
  },
})
