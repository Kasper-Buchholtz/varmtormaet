import groq from 'groq'
import { ArticlesTypeQuery } from '@/sanity/queries/sections/ArticlesType.query'
import { CallToActionQuery } from '@/sanity/queries/sections/CallToAction.query'
import { CallToActionQuery2 } from '@/sanity/queries/sections/CallToAction2.query'
import { ContactFormTypeQuery } from '@/sanity/queries/sections/ContactFormType.query'
import { EmployeesTypeQuery } from '@/sanity/queries/sections/EmployeesType.query'
import { EventTypeQuery } from '@/sanity/queries/sections/EventType.query'
import { GalleryQuery } from '@/sanity/queries/sections/Gallery.query'
import { LogoGalleryQuery } from '@/sanity/queries/sections/LogoGallery.query'
import { LogoGallery2Query } from '@/sanity/queries/sections/LogoGallery2.query'
import { heroQuery } from '@/sanity/queries/sections/Hero.query'
import { textContainerQuery } from '@/sanity/queries/sections/textContainer.query'
import { textWithIllustrationQuery } from '@/sanity/queries/sections/TextWithIllustration.query'
import { hero2Query } from '@/sanity/queries/sections/Hero2.query'
import { hero3Query } from '@/sanity/queries/sections/Hero3.query'
import { MediaType_QUERY } from '../sections/MediaType.query'

export const pageBuilderQuery = groq`
  pageBuilder[] {
    ${textWithIllustrationQuery},
    ${EventTypeQuery},
    ${ArticlesTypeQuery},
    ${ContactFormTypeQuery},
    ${heroQuery},
    ${hero2Query},
    ${hero3Query},
    ${textContainerQuery},
    ${CallToActionQuery},
    ${CallToActionQuery2},
    ${EmployeesTypeQuery},
    ${GalleryQuery},
    ${LogoGalleryQuery},
    ${LogoGallery2Query},
    ${MediaType_QUERY}
  }
`
