import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../utils/defineStructure'
import { Click } from '@mynaui/icons-react'

// import { Calendar, CalendarDown, CalendarUp } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Call to Actions')
    .icon(Click)
    .child(
      S.list()
        .title('Sprog')
        .items([
          S.listItem()
            .title('Kollektioner CTA')
            .schemaType('collection.cta')
            .child(S.documentTypeList('collection.cta')),
          S.listItem()
            .title('Footer CTA')
            .schemaType('footer.cta')
            .child(S.documentTypeList('footer.cta')),
        ]),
    ),
)
