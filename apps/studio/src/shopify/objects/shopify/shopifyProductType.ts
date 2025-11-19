import { defineArrayMember, defineField } from 'sanity'

export const shopifyProductType = defineField({
  name: 'shopifyProduct',
  title: 'Shopify',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  readOnly: true,
  fieldsets: [
    {
      name: 'status',
      title: 'Status',
    },
    {
      name: 'organization',
      title: 'Organization',
      options: {
        columns: 2,
      },
    },
    {
      name: 'variants',
      title: 'Variants',
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
  ],
  fields: [
    defineField({
      fieldset: 'status',
      name: 'createdAt',
      type: 'string',
    }),
    defineField({
      fieldset: 'status',
      name: 'updatedAt',
      type: 'string',
    }),
    defineField({
      fieldset: 'status',
      name: 'status',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['active', 'archived', 'draft'],
      },
    }),
    defineField({
      fieldset: 'status',
      name: 'isDeleted',
      title: 'Slettet fra Shopify?',
      type: 'boolean',
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Title displayed in both cart and checkout',
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'number',
      description: 'Shopify Product ID',
    }),
    defineField({
      name: 'gid',
      title: 'GID',
      type: 'string',
      description: 'Shopify Product GID',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Shopify Product handle',
    }),
    defineField({
      name: 'descriptionHtml',
      title: 'HTML Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      fieldset: 'organization',
      name: 'productType',
      type: 'string',
    }),
    defineField({
      fieldset: 'organization',
      name: 'vendor',
      type: 'string',
    }),
    defineField({
      fieldset: 'organization',
      name: 'tags',
      type: 'string',
    }),
    defineField({
      name: 'category',
      type: 'string',
      fieldset: 'organization',
    }),
    defineField({
      name: 'priceRange',
      type: 'priceRange',
    }),
    defineField({
      name: 'previewImageUrl',
      title: 'Preview Image URL',
      type: 'string',
      description: 'Image displayed in both cart and checkout',
    }),
    defineField({
      name: 'options',
      type: 'array',
      of: [{ type: 'option' }],
    }),
    // Variants
    defineField({
      fieldset: 'variants',
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          title: 'Variant',
          type: 'reference',
          weak: true,
          to: [{ type: 'productVariant' }],
        },
      ],
    }),
    defineField({
      name: 'shop',
      type: 'object',
      description: 'Shop data',
      fields: [
        defineField({
          name: 'domain',
          type: 'string',
        }),
      ],
    }),
  ],
})
