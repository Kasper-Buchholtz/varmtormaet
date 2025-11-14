import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../utils/defineStructure'
import { CornerUpRight } from '@mynaui/icons-react'
import ImportRedirects from '../../components/ImportRedirects'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .icon(CornerUpRight)
    .title('Redirects')
    .child(
      S.document()
        .schemaType('redirect')
        .title('Redirects')
        .views([S.view.form(), S.view.component(ImportRedirects).title('EXCEL upload')]),
    ),
)
