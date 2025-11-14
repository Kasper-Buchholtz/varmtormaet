import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { HeadingProps } from '@/types/Heading.types'
import { cn } from '@/utils/twMerge'
import { clean } from '@/utils/sanitize'

/**
 *
 * @returns: En overskriftskomponent med brugerdefineret styling
 * @example: <Heading >Overskrift</Heading>
 * @alias: Heading
 * @summary: Denne komponent bruges til at oprette en ny overskrift med brugerdefinerede stilarter.
 * @version: 1.1.0
 * @property: [text, size, fontFamily, hyphens, tag, spacing, maxWidth, clamp]
 * @author: Kasper Buchholtz
 *
 **/

const Heading_Variants = cva(' rwx ', {
  variants: {
    text: {
      balance: 'text-balance',
      pretty: 'text-pretty',
      nowrap: 'text-nowrap',
      wrap: 'text-wrap',
    },
    size: {
      '2xl': 'text-giant font-bold leading-none tracking-normal', // h1 - 2xl
      xl: 'text-huge leading-none tracking-normal font-bold', // h2 - xl
      lg: 'text-large leading-tight tracking-tight font-bold', // h3 - lg
      md: 'text-medium leading-none tracking-tight font-bold', // h4 - md
      sm: 'text-increased leading-none tracking-tight font-bold', // h5 - sm
      xs: 'text-regular font-bold', // h6 - xs
    },
    fontFamily: {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    },
    hyphens: {
      none: 'hyphens-none',
      auto: 'hyphens-auto',
      manual: 'hyphens-manual',
    },
    tag: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      span: 'span',
      p: 'p',
    },
    spacing: {
      large: 'mb-12',
      default: 'mb-8',
      small: 'mb-4',
      none: '',
    },
    maxWidth: {
      default: 'max-w-prose',
      none: '',
    },
    clamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
      6: 'line-clamp-6',
      none: '',
    },
  },
  defaultVariants: {
    size: 'xl',
    fontFamily: 'sans',
    tag: 'h2',
    spacing: 'none',
    maxWidth: 'default',
    clamp: 'none',
    text: 'balance',
    hyphens: 'manual',
  },
})
type ExtendedHeadingProps = HeadingProps & VariantProps<typeof Heading_Variants>

const Heading: React.FC<ExtendedHeadingProps> = ({
  size,
  text,
  children,
  clamp,
  tag,
  hyphens,
  fontFamily,
  spacing,
  className,
  maxWidth,
  dangerouslySetInnerHTML,
  data,
  ...props
}) => {
  const HeadingTag = tag || data?.tag || 'h2'
  return (
    <HeadingTag
      data-size={size}
      data-tag={tag}
      {...props}
      className={clean(
        cn(
          className,
          Heading_Variants({
            text,
            fontFamily,
            clamp,
            spacing,
            hyphens,
            maxWidth,
            size: size ?? ((data ? clean(data?.size) : 'xl') as any),
          }),
        ),
      )}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </HeadingTag>
  )
}

export default Heading
