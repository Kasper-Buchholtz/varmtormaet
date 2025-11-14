import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/twMerge'
import React from 'react'

/**
 *
 * @returns: En Card-komponent ...
 * @example: <Card />
 * @alias: Card
 * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
 **/

const CardVariants = cva(' ', {
  variants: {
    column: {
      half: 'col-span-full sm:col-span-4 md:col-span-6 xl:col-span-12',
      third: 'col-span-full sm:col-span-4 md:col-span-4 xl:col-span-8',
      quarter: 'col-span-full sm:col-span-2 md:col-span-3 xl:col-span-6',
      full: 'col-span-full',
    },
    group: {
      defualt: 'group',
      card: 'group/card',
    },
    borderBottom: {
      defualt: 'border-b pb-8 border-gray-200',
      none: 'border-none',
    },
  },
  defaultVariants: {
    column: 'quarter',
    group: 'defualt',
    borderBottom: 'none',
  },
})

type CardProps = VariantProps<typeof CardVariants> & {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

const Card: React.FC<CardProps> = ({ children, as, className, column, borderBottom, ...props }) => {
  const CardTag = as || 'li'
  return (
    <CardTag {...props} className={cn(CardVariants({ className, column, borderBottom }))}>
      {children}
    </CardTag>
  )
}

export default Card
