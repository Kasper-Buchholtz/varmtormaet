import { defineArrayMember, defineField, defineType } from 'sanity'
import { File } from '@mynaui/icons-react'
import Appconfig from '@repo/utils/src/superego.config'
import { isUniqueOtherThanLanguage } from '@repo/utils/src/isUniqueOtherThanLanguage'
import { definePathname } from '@repo/sanity-studio/src/utils/definePathname'

export default defineType({
  name: 'article',
  title: 'Artikel',
  type: 'document',
  icon: File,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'settings', title: 'SideIndstillinger' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'settings',
    }),
    definePathname({
      name: 'slug',
      title: 'Slug',
      description: 'Dette er en unik adresse, der refererer til den sidste del af sidens URL.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        isUnique: isUniqueOtherThanLanguage,
        prefix: Appconfig.WebsiteUrl + '/artikler',
      },
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
    }),
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: Appconfig.i18n.defaultLocaleId,
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      description: 'Vælg en kategori',
      to: [{ type: 'category' }],
      group: 'settings',
    }),
    defineField({
      name: 'mainImage',
      title: 'Udvalgt billede',
      type: 'image',
      group: 'settings',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Udgivelsesdato',
      description: 'Dato og tidspunkt for begivenheden',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      group: 'content',
      description: 'Sidens Tekst indhold',
      type: 'array',
      of: [defineArrayMember({ type: 'block', title: 'blockContent' })],
    }),
    defineField({
      group: 'seo',
      name: 'seoGroup',
      title: 'SEO',
      description: 'SEO indstillinger',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.title',
      date: 'date',
      image: 'mainImage',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Udgivet: ${new Date(selection.date).toLocaleDateString()}`,
        media: selection.image,
      }
    },
  },
})
