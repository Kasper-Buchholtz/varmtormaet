import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import { UsersGroup, Envelope } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Formularer')
    .icon(UsersGroup)
    .id('Formularer')
    .child(
      S.list()
        .title('Formularer')
        .items([
          // Formular-liste
          S.listItem()
            .title('Formularer')
            .icon(UsersGroup)
            .child(
              S.documentTypeList('formular')
                .title('Formularer')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('formular')
                    .views([S.view.form().id('formularEditor')]),
                ),
            ),

          // Global formular-indstillinger (singleton)
          S.listItem()
            .title('Formularindstillinger')
            .icon(Envelope)
            .child(
              S.editor()
                .id('formularSettings')
                .schemaType('formularSettings')
                .documentId('formularSettings'),
            ),
        ]),
    ),
)
