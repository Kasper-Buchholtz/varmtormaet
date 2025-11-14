import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import { FileText, Tag } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Artikler')
    .icon(FileText)
    .id('artikler')
    .child(
      S.list()
        .title('Artikler og Kategorier')
        .items([
          S.listItem()
            .title('Artikler')
            .icon(FileText)
            .child(
              S.documentTypeList('article')
                .title('Artikler')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('article')
                    .views([S.view.form().id('articleEditor')]),
                ),
            ),
          S.listItem()
            .title('Kategori')
            .icon(Tag)
            .child(
              S.documentTypeList('category')
                .title('Kategori')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('category')
                    .views([S.view.form().id('categoryEditor')]),
                ),
            ),
        ]),
    ),
)
