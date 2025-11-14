import { Planet, Telephone, UserWaves } from '@mynaui/icons-react'
import IconPickerInput from '@repo/sanity-studio/src/components/IconsField'
import Icon from '@repo/sanity-web/src/components/Icons'
import Appconfig from '@repo/utils/src/superego.config'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Indstillinger',
  type: 'document',
  groups: [
    { title: 'Kontakt oplysninger', name: 'contact', icon: Telephone, default: true },
    { title: 'Sociale medier', name: 'social', icon: UserWaves },
  ],
  description: 'Footer indstillinger',

  fields: [
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: Appconfig.i18n.defaultLocaleId,
    }),
    defineField({
      name: 'object',
      group: 'contact',
      type: 'object',
      description: 'Kontakt oplysninger',
      title: 'Kontakt oplysninger',
      fields: [
        defineField({
          name: 'companyName',
          title: 'Virksomhedsnavn',
          type: 'string',
        }),
        defineField({
          name: 'adressBook',
          type: 'object',
          options: {
            columns: 2,
          },
          fields: [
            defineField({
              name: 'street',
              type: 'string',
              title: 'Gade + nr',
            }),
            defineField({
              name: 'zip',
              type: 'string',
              title: 'Postnummer + by',
            }),
          ],
        }),
        defineField({
          name: 'telephone',
          type: 'string',
          title: 'Telefon',
          description: 'Telefonnummer',
        }),
        defineField({
          name: 'email',
          type: 'email',
          title: 'Email',
          description: 'Email address',
        }),
        defineField({
          name: 'cvr',
          type: 'string',
          title: 'CVR',
          description: 'CVR nummer for virksomheden eks. 12345678',
        }),
      ],
    }),
    defineField({
      name: 'social',
      group: 'social',
      title: 'Sociale medier',
      description: 'Tilføj links til sociale medier',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Ikoner',
              components: {
                input: IconPickerInput as any,
              },
              initialValue: 'facebook',
              options: {
                layout: 'dropdown',
                // Custom options that will be passed to your component
                /* @ts-expect-error */
                allowedGroups: ['social'], // Only show these groups
                showGroupFilter: true, // Show group filter buttons
                itemsPerLoad: 12, // Override default items per load
                columns: 6, // Override default column count
              },
            }),
            defineField({
              name: 'url',
              hidden: ({ parent }) => !parent?.platform,
              type: 'url',
              title: 'URL',
              description: 'URL for the selected social media platform',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
              media: 'platform',
            },
            prepare({ title, subtitle, media }) {
              return {
                title,
                media: media ? <Icon type={media as any} /> : null,
                subtitle,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Åbningstider',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Dag',
              type: 'string',
              options: {
                list: [
                  { title: 'Mandag', value: 'mandag' },
                  { title: 'Tirsdag', value: 'tirsdag' },
                  { title: 'Onsdag', value: 'onsdag' },
                  { title: 'Torsdag', value: 'torsdag' },
                  { title: 'Fredag', value: 'fredag' },
                  { title: 'Lørdag', value: 'lørdag' },
                  { title: 'Søndag', value: 'søndag' },
                ],
              },
            }),
            defineField({
              name: 'hours',
              title: 'Åbningstider',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'day',
              subtitle: 'hours',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      locale: 'locale',
    },
    prepare(locale) {
      return {
        title: `Footer — ${locale.locale}`,
      }
    },
  },
})
