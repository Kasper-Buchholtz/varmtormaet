import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../utils/defineStructure'
import { PanelTop } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .icon(PanelTop)
    .title('Navigation')
    .child(S.document().schemaType('navigation').views([S.view.form()])),
)
