import React, { type ElementType, type ForwardedRef, forwardRef } from 'react'
import { generateHref } from '../helpers/generateHref'
import { getLinkText } from '../helpers/getLinkText'
import { isCustomLink, isEmailLink, isPhoneLink } from '../helpers/typeGaurds'
import { InternalLink, LinkValue } from '../types'

type LinkProps = {
  link?: LinkValue
  as?: ElementType
  hrefResolver?: (link: InternalLink) => string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>

const Link = forwardRef(
  (
    { link, as: Component = 'a', hrefResolver, children, ...props }: LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    if (!link) {
      return null
    }

    // If no link text is provided, try and find a fallback
    if (!children) {
      // eslint-disable-next-line no-param-reassign
      children = getLinkText(link)
    }

    const href = (() => {
      if (link.type === 'internal') {
        return generateHref.internal(link, hrefResolver)
      } else if (isCustomLink(link)) {
        return generateHref.custom(link)
      } else if (link.type in generateHref) {
        return generateHref[link.type](link as any)
      }
      return undefined
    })()

    return (
      <Component
        href={href}
        target={!isPhoneLink(link) && !isEmailLink(link) && link.blank ? '_blank' : undefined}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Link.displayName = 'Link'

export { Link, type LinkProps }
