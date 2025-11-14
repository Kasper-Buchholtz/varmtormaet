import '@repo/dashboard/global.css'
import Appconfig from '@repo/utils/src/superego.config'
import * as resolve from '../../src/lib/sanity.resolve'
import { pages } from '@repo/sanity-studio/src/plugins/navigator/index'

export const pagesTool = pages({
  i18n: Appconfig.i18n,
  title: 'Visuel redigering',
  resolve,
  previewUrl: {
    origin: Appconfig.WebsiteUrl,
    previewMode: {
      enable: '/api/draft-mode/enable',
    },
  },
  creatablePages: [
    {
      title: 'Sider',
      type: 'page',
    },
    {
      title: 'Artikler',
      type: 'article',
    },
    {
      title: 'Event',
      type: 'event',
    },
  ],
})
