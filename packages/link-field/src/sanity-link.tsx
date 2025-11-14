import React, { type ForwardedRef, forwardRef } from 'react'
import { generateHref } from './helpers/generateHref'
import { getLinkText } from './helpers/getLinkText'
import { isCustomLink, isEmailLink, isPhoneLink } from './helpers/typeGaurds'
import { InternalLink, LinkValue } from './types'
import Link from 'next/link'

type LinkProps = {
  link?: LinkValue
  label?: string
  hrefResolver?: (link: InternalLink) => string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>

const SanityLink = forwardRef(
  ({ link, hrefResolver, children, ...props }: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    if (!link) {
      return null
    }

    // If no link text is provided, try and find a fallback
    if (!children) {
      // eslint-disable-next-line no-param-reassign
      children = getLinkText(link)
    }

    return (
      <Link
        href={
          link.type === 'internal'
            ? generateHref[link.type]?.(link, hrefResolver)
            : generateHref[isCustomLink(link) ? 'custom' : link.type]?.(link)
        }
        target={!isPhoneLink(link) && !isEmailLink(link) && link.blank ? '_blank' : undefined}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    )
  },
)

SanityLink.displayName = 'Link'

export { SanityLink, type LinkProps }
