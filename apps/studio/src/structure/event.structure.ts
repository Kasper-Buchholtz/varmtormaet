import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import { Calendar, CalendarDown, CalendarUp } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Begivenheder')
    .icon(Calendar)
    .child(
      S.list()
        .title('Begivenheder')
        .id('events')
        .items([
          S.listItem()
            .id('upcomingEvents')
            .title('Kommende begivenheder')
            .icon(CalendarUp)
            .child(
              S.documentTypeList('event')
                .title('Kommende begivenheder')
                .filter('_type == "event" && date >= now()')
                .child((documentId) => S.document().documentId(documentId).schemaType('event')),
            ),
          S.listItem()
            .id('pastEvents')
            .title('Tidligere begivenheder')
            .icon(CalendarDown)
            .child(
              S.documentTypeList('event')
                .title('Tidligere begivenheder')
                .filter('_type == "event" && date < now()')
                .child((documentId) => S.document().documentId(documentId).schemaType('event')),
            ),
          S.listItem()
            .id('allEvents')
            .title('Alle')
            .child(
              S.documentTypeList('event')
                .title('Alle begivenheder')
                .child((documentId) => S.document().documentId(documentId).schemaType('event')),
            ),
        ]),
    ),
)
