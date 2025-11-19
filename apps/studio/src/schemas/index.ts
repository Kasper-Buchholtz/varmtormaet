import { SchemaTypeDefinition } from 'sanity'
import * as Documents from '../schemas/documents/_index'
import * as Atoms from '../schemas/atoms/_index'
import * as Sections from '../schemas/sections/_index'
import * as Modules from '../schemas/modules/_index'

// Shopify Types
import { collectionRuleType } from '../shopify/objects/shopify/collectionRuleType'
import { inventoryType } from '../shopify/objects/shopify/inventoryType'
import { optionType } from '../shopify/objects/shopify/optionType'
import { priceRangeType } from '../shopify/objects/shopify/priceRangeType'
import { shopifyCollectionType } from '../shopify/objects/shopify/shopifyCollectionType'
import { shopifyProductType } from '../shopify/objects/shopify/shopifyProductType'
import { shopifyProductVariantType } from '../shopify/objects/shopify/shopifyProductVariantType'
import collectionType from '../shopify/documents/collection.schema'
import productType from '../shopify/documents/product.schema'
import productVariant from '../shopify/documents/productVariant.schema'
import { placeholderStringType } from '../shopify/objects/shopify/placeholderStringType'
import proxyStringType from '../shopify/objects/shopify/proxyStringType'
import collectionCta from '../shopify/documents/collection.cta.schema'

const documentTypes = [...Object.values(Documents)]
const sectionTypes = [...Object.values(Sections)]
const atomTypes = [...Object.values(Atoms)]
const moduleTypes = [...Object.values(Modules)]

export const schema: { types: SchemaTypeDefinition[]; templates: any } = {
  types: [
    ...documentTypes, // Documents
    ...atomTypes, // Atoms
    ...sectionTypes, // Sections
    ...moduleTypes, // Modules
    collectionType,
    collectionCta,
    productType,
    productVariant,
    proxyStringType,
    shopifyProductType,
    priceRangeType,
    shopifyCollectionType,
    optionType,
    shopifyProductVariantType,
    inventoryType,
    collectionRuleType,
    placeholderStringType,
  ],
  templates: (prev: Array<{ id: string; [key: string]: any }>) => [
    ...prev.filter(
      (template: { id: string }) => !['page', 'article', 'event'].includes(template.id),
    ),
    // Add custom templates here
    // example below
    // {
    //   id: 'kind-match',
    //   title: 'Kind Match',
    //   schemaType: 'article',
    //   value: (params: { value: any }) => ({
    //     // kind will be prefilled
    //     kind: params.value,
    //     pagebuilder: [],
    //   }),
    // },
  ],
}
