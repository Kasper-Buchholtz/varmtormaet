import Appconfig from '@repo/utils/src/superego.config'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Indstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: Appconfig.i18n.defaultLocaleId,
    }),
    defineField({
      name: 'links',
      title: 'Menupunkter',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'links',
          title: 'Menupunkt',
          type: 'object',
          preview: {
            select: {
              title: 'link.label',
              subtitle: 'subLinks',
              url: 'link',
              icon: 'link.icon',
            },
            prepare(selection) {
              const { title, subtitle, url } = selection
              return {
                title,
                subtitle:
                  subtitle && subtitle.length > 0
                    ? `Antal underpunkter: ${subtitle.length}`
                    : url && url.internalLink
                      ? url.internalLink._ref
                      : '',
                media: selection.icon,
              }
            },
          },
          fields: [
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
            defineField({
              name: 'subLinks',
              title: 'Underpunkter',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'link',
                  title: 'Sublink',
                  type: 'link',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      locale: 'locale',
    },
    prepare({ locale }) {
      return {
        title: `Navigation — ${locale}`,
      }
    },
  },
})
