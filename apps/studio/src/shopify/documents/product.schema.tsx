import pluralize from 'pluralize-esm'
import ShopifyIcon from '../components/icons/Shopify'
import ProductHiddenInput from '../components/inputs/ProductHidden'
import ShopifyDocumentStatus from '../components/media/ShopifyDocumentStatus'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { getPriceRange } from '../../utils/getPriceRange'
import { Tag } from '@mynaui/icons-react'

const GROUPS = [
  {
    name: 'editorial',
    title: 'Redaktionel',
    default: true,
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
]

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: Tag,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: ProductHiddenInput,
      },
      group: GROUPS.map((group) => group.name),
      hidden: ({ parent }) => {
        const isActive = parent?.store?.status === 'active'
        const isDeleted = parent?.store?.isDeleted
        return !parent?.store || (isActive && !isDeleted)
      },
    }),
    // Title (proxy)
    defineField({
      name: 'titleProxy',
      title: 'Title',
      group: 'editorial',
      type: 'proxyString',
      // @ts-expect-error
      options: { field: 'store.title' },
    }),
    // Slug (proxy)
    defineField({
      name: 'slugProxy',
      title: 'Slug',
      group: 'editorial',
      type: 'proxyString',
      // @ts-expect-error
      options: { field: 'store.slug.current' },
    }),
    defineField({
      name: "productDescription",
      group: 'editorial',
      title: 'Produkt Beskrivelse',
      description: 'Denne Beskrivelse er for produktet - overskriver den fra Shopify hvis den er udfyldt',
      type: "blockContent",
    }),
    defineField({
      name: 'store',
      title: 'Shopify',
      type: 'shopifyProduct',
      description: 'Produktdata fra Shopify (skrivebeskyttet)',
      group: 'shopifySync',
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
    {
      name: 'priceDesc',
      title: 'Pris (Højeste først)',
      by: [{ field: 'store.priceRange.minVariantPrice', direction: 'desc' }],
    },
    {
      name: 'priceAsc',
      title: 'Pris (Laveste først)',
      by: [{ field: 'store.priceRange.minVariantPrice', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      options: 'store.options',
      previewImageUrl: 'store.previewImageUrl',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'store.title',
      variants: 'store.variants',
    },
    prepare(selection) {
      const { isDeleted, options, previewImageUrl, priceRange, status, title, variants } = selection
      const optionCount = options?.length
      const variantCount = variants?.length

      let description = [
        variantCount ? pluralize('variant', variantCount, true) : 'Ingen variants',
        optionCount ? pluralize('option', optionCount, true) : 'Ingen options',
      ]

      let subtitle = getPriceRange(priceRange)
      if (status !== 'active') {
        subtitle = '(Ikke tilgængelig i Shopify)'
      }
      if (isDeleted) {
        subtitle = '(Slettet fra Shopify)'
      }

      return {
        description: description.join(' / '),
        subtitle,
        title,
        media: (
          <ShopifyDocumentStatus
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="product"
            url={previewImageUrl}
            title={title}
          />
        ),
      }
    },
  },
})