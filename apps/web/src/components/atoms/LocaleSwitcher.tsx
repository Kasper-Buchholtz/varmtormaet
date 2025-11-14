import { useParams } from 'next/navigation'
import Link from 'next/link'
import Appconfig from '@repo/utils/src/superego.config'
import { cn } from '@/utils/twMerge'
import useLocaleData from '@/hooks/useLocaleData'
import { resolveHref } from '@repo/utils/src/resolveHref'
import Heading from './Heading'
import { cva, VariantProps } from 'class-variance-authority'

/**
 *
 * @returns: En LocaleSwitcher-komponent der skifter mellem forskellige sprog
 * @example: <LocaleSwitcher locale={locale} />
 * @summary: Denne komponent bruges til at skifte mellem forskellige sprog på siden ved at navigere til en anden URL
 * @version: 1.0.0
 * @property: [locale]
 * @autor: Kasper Buchholtz
 *
 **/

const LocaleSwitcher_Variants = cva('group/languageSwitcher my-auto w-fit', {
  variants: {
    position: {
      absolute: 'absolute',
      relative: 'relative',
    },
    view: {
      mobile: 'sm:hidden',
      desktop: 'hidden sm:block',
      default: '',
    },
  },
  defaultVariants: {
    position: 'relative',
    view: 'default',
  },
})

type Props = VariantProps<typeof LocaleSwitcher_Variants> & {
  className?: string
}

const LocaleSwitcher = ({ position, className, view }: Props) => {
  const params = useParams()

  const currentLocale = params.locale
  // Catch-all can be undefined (on /[locale]), string (1 segment), or array (multi-path)
  let slug: string

  if (!params.slug) {
    slug = '' // for the root page
  } else if (Array.isArray(params.slug)) {
    slug = params.slug.join('/')
  } else {
    slug = params.slug // just in case it's a string
  }
  const rawSlug = params.slug

  const theslug = Array.isArray(rawSlug)
    ? rawSlug.join('/')
    : typeof rawSlug === 'string'
      ? rawSlug
      : '' // fallback to empty string for homepage

  const data = useLocaleData(currentLocale, slug)
  const translations = data?.localeInfo?._translations ?? []
  console.log('params.locale:', currentLocale)
  console.log('params.slug:', rawSlug, ' → normalized:', theslug)

  type Translation = { locale: string; slug: string; _type: string }

  const translationMap: Record<string, Translation> = translations.reduce(
    (acc, t) => {
      if (t?.locale && t?.slug) acc[t.locale] = t
      return acc
    },
    {} as Record<string, Translation>,
  )

  const sortedLocales = [...Appconfig.i18n.locales].sort((a, b) => {
    if (a.id === 'da') return -1
    if (b.id === 'da') return 1
    return a.id.localeCompare(b.id)
  })

  return (
    <div
      className={cn(
        className,
        LocaleSwitcher_Variants({
          position,
          view,
        }),
      )}
    >
      <ul className="flex justify-end w-full gap-3 uppercase">
        {sortedLocales.map(({ id, title }) => {
          const translation = translationMap[id]
          const isDefaultLocale = id === Appconfig.i18n.defaultLocaleId

          const href = translation?.slug
            ? resolveHref(isDefaultLocale ? undefined : id, translation._type, translation.slug)
            : isDefaultLocale
              ? '/'
              : `/${id}`
          const isActive = currentLocale === id

          return (
            <li key={id}>
              <Link
                href={href}
                locale={id}
                className={cn(
                  'block hover:text-superego-dark transition-all',
                  isActive ? 'text-superego-dark' : 'text-superego-dark/40',
                )}
                title={`Skift sproget til ${title}`}
              >
                <Heading tag="span" size="xs">
                  {id}
                </Heading>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LocaleSwitcher
