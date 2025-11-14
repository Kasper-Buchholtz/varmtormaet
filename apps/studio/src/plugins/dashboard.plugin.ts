import '@repo/dashboard/global.css'
import HeroWidget from '@repo/dashboard/hero-widget'
import LinksWidget from '@repo/dashboard/links-widget'
import ProjectManagerWidget from '@repo/dashboard/project-manager-widget'
import SuperegoWidget from '@repo/dashboard/superego-widget'
import Appconfig from '@repo/utils/src/superego.config'
import { dashboardTool } from '@sanity/dashboard'

export const dashboard = dashboardTool({
  title: 'Startside',
  widgets: [
    {
      name: 'HeroWidget',
      component: () => HeroWidget({ NEXT_PUBLIC_BASE_URL: Appconfig.WebsiteUrl }),
      layout: { width: 'full' },
    },
    {
      name: 'links',
      component: () => LinksWidget({ NEXT_PUBLIC_BASE_URL: Appconfig.WebsiteUrl }),
      layout: { width: 'auto', height: 'large' },
    },
    {
      name: 'ProjectManagerWidget',
      component: () => ProjectManagerWidget({ NEXT_PUBLIC_BASE_URL: Appconfig.WebsiteUrl }),
      layout: { width: 'medium', height: 'large' },
    },
    {
      name: 'SuperegoWidget',
      component: SuperegoWidget,
      layout: { width: 'medium', height: 'large' },
    },
  ],
})
