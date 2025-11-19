import React from 'react'
import { defineField, defineType } from 'sanity'
import pluralize from 'pluralize-esm'
import CollectionHiddenInput from '../components/inputs/CollectionHidden'
import ShopifyIcon from '../components/icons/Shopify'
import ShopifyDocumentStatus from '../components/media/ShopifyDocumentStatus'
import { definePathname } from '@repo/sanity-studio/src/utils/definePathname'
import { Package } from '@mynaui/icons-react'

const GROUPS = [

]

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: Package,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'shopifySync',
      title: 'Shopify sync',
      icon: ShopifyIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Product hidden status
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: CollectionHiddenInput,
      },
      hidden: ({ parent }) => {
        const isDeleted = parent?.store?.isDeleted
        return !isDeleted
      },
    }),
    // Title (proxy)
    /*     defineField({
          name: 'titleProxy',
          title: 'Title',
          type: 'proxyString',
          options: { field: 'store.title' },
        }),
        // Slug (proxy)
        defineField({
          name: 'slugProxy',
          title: 'Slug',
          type: 'proxyString',
          options: { field: 'store.slug.current' },
        }), */
    // Shopify collection
    defineField({
      name: 'store',
      title: 'Shopify',
      type: 'shopifyCollection',
      description: 'Collection data from Shopify (read-only)',
      group: 'shopifySync',
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'editorial',
      initialValue: ({ parent }) => parent?.store?.titleProxy,
    }),
    definePathname({
      name: "slug",
      title: "Slug",
      group: "editorial",
      description:
        "Dette er en unik adresse, der refererer til den sidste del af sidens URL.",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      group: 'editorial',
    }),
    // Page builder
    defineField({
      group: "editorial",
      title: "Indhold",
      description: "Indholdet på siden (Sektioner / Blokke)",
      name: "pageBuilder",
      type: "pageBuilder",
    }),
    defineField({
      name: "CallToAction",
      type: "CallToAction",
      group: "editorial",

      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      group: "seo",
      title: "SEO",
      description: "SEO indstillinger",
      name: "seoGroup",
      type: "seoGroup",
    }),

  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Titel (A-Å)',
      by: [{ field: 'store.title', direction: 'asc' }],
    },
    {
      name: 'titleDesc',
      title: 'Titel (Å-A)',
      by: [{ field: 'store.title', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      imageUrl: 'store.imageUrl',
      isDeleted: 'store.isDeleted',
      rules: 'store.rules',
      title: 'store.title',
    },
    prepare(selection) {
      const { imageUrl, isDeleted, rules, title } = selection
      const ruleCount = rules?.length || 0

      return {
        media: (
          <ShopifyDocumentStatus
            isDeleted={isDeleted}
            type="collection"
            url={imageUrl}
            title={title}
          />
        ),
        subtitle: ruleCount > 0 ? `Automatisk (${pluralize('regl', ruleCount, true)})` : 'Ingen regler',
        title,
      }
    },
  },
})