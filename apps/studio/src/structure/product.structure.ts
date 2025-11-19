import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import { InfoCircle } from '@mynaui/icons-react'

// import { Calendar, CalendarDown, CalendarUp } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Produkter')
    .schemaType('product')
    .child(
      S.documentTypeList('product')
        .defaultLayout('detail')
        .title('Produkter')
        .child(async (id) =>
          S.list()
            .title('Produkt')
            .canHandleIntent(
              (intentName, params) => intentName === 'edit' && params.type === 'product',
            )
            .items([
              // Details
              S.listItem()
                .title('Detaljer')
                .icon(InfoCircle)
                .schemaType('product')
                .id(id)
                .child(S.document().schemaType('product').documentId(id)),
              // Product variants
              S.listItem()
                .title('Varianter')
                .schemaType('productVariant')
                .child(
                  S.documentList()
                    .title('Variant')
                    .schemaType('productVariant')
                    .filter(
                      `
                  _type == "productVariant"
                  && store.productId == $productId
                `,
                    )
                    .params({
                      productId: Number(id.replace('shopifyProduct-', '')),
                    })
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'edit' && params.type === 'productVariant',
                    ),
                ),
            ]),
        ),
    ),
)
