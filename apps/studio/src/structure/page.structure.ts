import { ListItemBuilder } from 'sanity/structure'
import Appconfig from '@repo/utils/src/superego.config'
import { Folder } from '@mynaui/icons-react'
import { iconByLocale } from '../utils/iconByLocale'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) => {
  const locales = Appconfig.i18n.locales

  // Only one locale – no language switching needed
  if (locales.length === 1) {
    return S.listItem().title('Sider').icon(Folder).child(S.documentTypeList('page'))
  }

  // Multiple locales – show language-specific lists and "missing language"
  return S.listItem()
    .title('Sider')
    .icon(Folder)
    .child(
      S.list()
        .title('Sprog')
        .items([
          ...locales.map((locale) =>
            S.listItem()
              .title(locale.title)
              .icon(iconByLocale(locale.id))
              .child(
                S.documentTypeList('page')
                  .title(locale.title)
                  .filter('_type == "page" && locale == $locale')
                  .params({ locale: locale.id }),
              ),
          ),
          S.listItem()
            .title('Mangler sprog')
            .icon(iconByLocale('missing'))
            .child(
              S.documentTypeList('page')
                .title('Mangler sprog')
                .filter('_type == "page" && !defined(locale)'),
            ),
        ]),
    )
})
