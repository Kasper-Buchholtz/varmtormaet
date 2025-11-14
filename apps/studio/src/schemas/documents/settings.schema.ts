import { InputWithCharacterCount } from '@repo/sanity-studio/src/components/inputWithCharactersCount'
import { Book, Code, Search, Tag } from '@mynaui/icons-react'
import Appconfig from '@repo/utils/src/superego.config'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Indstillinger',
  groups: [
    { title: 'Generelt', name: 'general', icon: Book, default: true },
    { title: 'Scripts', name: 'scripts', icon: Code },
    { title: 'Meta + GTM', name: 'meta', icon: Tag },
  ],
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Sidetitel',
      group: 'general',
      type: 'string',
      description: 'Sidens titel — Vi anbefaler at holde det mellem 50 og 70 tegn.',
      components: {
        input: InputWithCharacterCount as any,
      },
      options: {
        /* @ts-ignore */
        maxLength: 70,
        minLength: 50,
      },
    }),
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: Appconfig.i18n.defaultLocaleId,
    }),
    defineField({
      name: 'siteDescription',
      title: 'Sidebeskrivelse',
      type: 'text',
      group: 'general',
      description: 'Beskrivelse af siden — Vi anbefaler at holde det mellem 50 og 160 tegn.',
      components: {
        input: InputWithCharacterCount as any,
      },
      validation: (Rule) => Rule.max(65).warning('Maks 160 tegn'),
      options: {
        /* @ts-ignore */
        maxLength: 160,
        minLength: 0,
      },
    }),
    defineField({
      name: 'headScripts',
      title: 'Head Scripts',
      type: 'text',
      description: 'Her kan du indsætte scripts, der skal placeres i head-sektionen på alle sider.',
      group: 'scripts',
    }),
    defineField({
      name: 'bodyScripts',
      title: 'Body Scripts',
      type: 'text',
      description: 'Her kan du indsætte scripts, der skal placeres i body-sektionen på alle sider.',
      group: 'scripts',
    }),
    defineField({
      name: 'footerScripts',
      title: 'Footer Scripts',
      type: 'text',
      description:
        'Her kan du indsætte scripts, der skal placeres i footer-sektionen på alle sider.',
      group: 'scripts',
    }),
    defineField({
      type: 'object',
      name: 'googleTagManager',
      group: 'meta',
      title: 'Google Tag Manager',
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          name: 'id',
          title: 'ID',
          type: 'string',
          description: 'Indsæt Google Tag Manager ID (GTM-XXXXXX) - Husk at inkludere GTM-',
          validation: (Rule) =>
            Rule.info('Indsæt Google Tag Manager ID (GTM-XXXXXX) - Husk at inkludere GTM-'),
        }),
        defineField({
          name: 'verification',
          title: 'Verifikation',
          type: 'string',
          description: 'Indsæt Google Search Console verifikationskode (xxxxxxxxxxx-xxxx)',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      locale: 'locale',
    },
    prepare(locale) {
      return {
        title: `Indstillinger — ${locale.locale}`,
      }
    },
  },
})
