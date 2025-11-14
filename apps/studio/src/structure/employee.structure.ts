import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import { Briefcase, UsersGroup } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Medarbejdere')
    .icon(UsersGroup)
    .id('medarbejdere')
    .child(
      S.list()
        .title('Medarbejdere og stillinger')
        .items([
          S.listItem()
            .title('Medarbejdere')
            .icon(UsersGroup)
            .child(
              S.documentTypeList('employee')
                .title('Medarbejdere')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('employee')
                    .views([S.view.form().id('employeeEditor')]),
                ),
            ),
          S.listItem()
            .title('Afdelinger')
            .icon(Briefcase)
            .child(
              S.documentTypeList('department')
                .title('Afdelinger')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('department')
                    .views([S.view.form().id('departmentEditor')]),
                ),
            ),
        ]),
    ),
)
