import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../../utils/defineStructure'
import { Database } from '@mynaui/icons-react'
import Organization from './Organization.structure'
import LocalBusiness from './LocalBusiness.structure'

export default defineStructure<ListItemBuilder>((S, context) =>
  S.listItem()
    .title('Strukturerede data')
    .icon(Database)
    .id('strukturerede-data')
    .child(
      S.list()
        .title('Strukturerede data og markering')
        .items([Organization(S, context), LocalBusiness(S, context)]),
    ),
)
