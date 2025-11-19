import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

// import { Calendar, CalendarDown, CalendarUp } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Kollektioner CTA')
    .schemaType('collection.cta')
    .child(S.documentTypeList('collection.cta')),
)
