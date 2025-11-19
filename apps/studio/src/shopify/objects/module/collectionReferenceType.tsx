
import {PackageIcon} from '@sanity/icons'
import {defineField} from 'sanity'


export const collectionReferenceType = defineField({
  name: 'collectionReference',
  title: 'Collection',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'collection',
      type: 'reference',
      weak: true,
      to: [{type: 'collection'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showBackground',
      type: 'boolean',
      description: 'Use Shopify collection image as background (if available)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      collectionTitle: 'collection.store.title',
      imageUrl: 'collection.store.imageUrl',
      isDeleted: 'collection.store.isDeleted',
    },
    prepare({collectionTitle, imageUrl, isDeleted}) {
      return {
        subtitle: 'Collection',
        title: collectionTitle,
      }
    },
  },
})
