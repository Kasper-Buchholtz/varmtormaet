import { File } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'
import { definePathname } from '@repo/sanity-studio/src/utils/definePathname'
import { isUniqueOtherThanLanguage } from '@repo/utils/src/isUniqueOtherThanLanguage'
import Appconfig from '@repo/utils/src/superego.config'

export default defineType({
  name: 'page',
  title: 'Side',
  type: 'document',
  description: 'Siderne på hjemmesiden',
  liveEdit: false,
  icon: File,
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
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: Appconfig.i18n.defaultLocaleId,
    }),
    definePathname({
      name: 'slug',
      title: 'Slug',
      description: 'Dette er en unik adresse, der refererer til den sidste del af sidens URL.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        prefix: Appconfig.WebsiteUrl,
        isUnique: isUniqueOtherThanLanguage,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Udvalgt billede',
      description: 'Et billede, der repræsenterer siden.',
      type: 'image',
    }),
    defineField({
      group: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden (Sektioner / Blokke)',
      name: 'pageBuilder',
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
      slug: 'slug.current',
      media: 'mainImage',
      locale: 'locale',
    },
    prepare({ title, slug, media, locale }) {
      return {
        title: title,
        subtitle: slug ? `/${slug.startsWith('/') ? slug.slice(1) : slug}` : 'Mangler slug',
        media: media,
      }
    },
  },
})
