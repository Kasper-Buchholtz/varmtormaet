import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import { Cog } from '@mynaui/icons-react'
import redirects from './settings/redirects.structure'
import SiteSettings from './settings/SiteSettings.structure'
import JsonLDs from './settings/json-ld/JsonLD.structure'

export default defineStructure<ListItemBuilder>((S, context) =>
  S.listItem()
    .title(' Indstillinger')
    .icon(Cog)
    .id('indstillinger')
    .child(
      S.list()
        .title('Indstillinger')
        .items([SiteSettings(S, context), redirects(S, context), JsonLDs(S, context)]),
    ),
)
