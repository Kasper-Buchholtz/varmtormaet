import { CalendarUp } from '@mynaui/icons-react'
import { definePathname } from '@repo/sanity-studio/src/utils/definePathname'
import { isUniqueOtherThanLanguage } from '@repo/utils/src/isUniqueOtherThanLanguage'
import Appconfig from '@repo/utils/src/superego.config'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Begivenhed',
  type: 'document',
  icon: CalendarUp,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Titlen på siden',
      group: 'content',
    }),
    definePathname({
      name: 'slug',
      title: 'Slug',
      description: 'Dette er en unik adresse, der refererer til den sidste del af sidens URL.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        isUnique: isUniqueOtherThanLanguage,
        prefix: Appconfig.WebsiteUrl + '/begivenheder/',
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
      name: 'mainImage',
      type: 'image',
      title: 'Udvalgt billede',
      description: 'Billedet der vises i "begivenheder" oversigten og på selve begivenheden',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Beskrivelse',
      description: 'En kort beskrivelse af begivenheden',
      group: 'content',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Dato',
      description: 'Dato og tidspunkt for begivenheden',
      group: 'content',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      group: 'pageBuilder',
      name: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden',
      type: 'pageBuilder',
    }),

    defineField({
      group: 'seo',
      title: 'SEO',
      description: 'SEO indstillinger',
      name: 'seoGroup',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      image: 'mainImage',
    },
    prepare: ({ title, date, image }) => ({
      title: title,
      subtitle: date
        ? new Date(date).toLocaleDateString('da-DK', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Ingen dato angivet',
      media: image,
    }),
  },
})
