import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/twMerge'
import React from 'react'
import { SanityImage, SanityImageProps } from '@/components/atoms/SanityImage'

/**
 *
 * @returns: En Photo-komponent til at vise billeder. på en mere effektiv måde.
 * @example: <Photo image={image} height={1080} width={1920} objectFit="cover" className="p-20" />
 * @alias: Photo
 * @summary: Denne komponent bruges til at vise billeder på en mere effektiv måde.
 * @version: 2.0.0
 * @property: [image, width, height, objectFit, className]
 * @author: Kasper Buchholtz
 *
 **/

const PhotoVariants = cva('w-full h-full', {
  variants: {
    objectFit: {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    objectFit: 'cover',
  },
})

export type PhotoProps = SanityImageProps &
  VariantProps<typeof PhotoVariants> & {
    className?: string
  }

const Photo = ({ image, objectFit, className = '', ...props }: PhotoProps) => {
  return (
    <SanityImage image={image} className={cn(PhotoVariants({ objectFit, className }))} {...props} />
  )
}

export default Photo
