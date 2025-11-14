import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../utils/defineStructure'
import { Cog } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .icon(Cog)
    .title('Sideindstillinger')
    .child(S.document().schemaType('settings').views([S.view.form()])),
)
