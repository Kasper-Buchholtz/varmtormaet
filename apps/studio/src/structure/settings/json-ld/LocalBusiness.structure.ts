import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../../utils/defineStructure'
import { PanelBottom } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .icon(PanelBottom)
    .title('Lokal Virksomhed')
    .child(S.document().schemaType('localBusiness').views([S.view.form()])),
)
