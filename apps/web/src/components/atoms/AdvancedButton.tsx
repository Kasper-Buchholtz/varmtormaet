import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { AdvancedButtonProps } from '@/types/AdvancedButton.types'
import { cn } from '@/utils/twMerge'

/**
 *
 * @returns: En knap-komponent med brugerdefineret styling
 * @example:
 * <AdvancedButton variant="primary">Knap</AdvancedButton>
 * <AdvancedButton variant="primary"><Link>Knap</Link></AdvancedButton>
 * <AdvancedButton variant="primary"><Icon /><Link>Knap</Link></AdvancedButton>
 * @alias: AdvancedButton
 * @summary: Denne komponent bruges til at oprette en ny knap med brugerdefinerede stilarter.
 * @version: 1.0.0
 * @property: [variant, asChild]
 * @author: Kasper Buchholtz
 *
 **/

type ExtendedAdvancedButtonProps = VariantProps<typeof advancedButton_Variants> &
  AdvancedButtonProps

const advancedButton_Variants = cva(
  'inline-flex items-center gap-4 justify-center rounded-md cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', // whitespace-nowrap
  {
    variants: {
      variant: {
        primary: 'bg-superego-green px-4 py-2 text-superego-light-light hover:bg-superego-green/90',
        secondary: 'bg-superego-dark px-4 py-2 text-superego-light-light hover:bg-superego-dark/80',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

const AdvancedButton = ({
  className,
  variant,
  asChild = false,
  ref,
  ...props
}: ExtendedAdvancedButtonProps) => {
  const Comp = (asChild ? Slot : 'button') as React.ElementType
  return (
    <Comp
      className={`text-regular ${cn(advancedButton_Variants({ variant, className }))}`}
      ref={ref}
      {...props}
    />
  )
}

AdvancedButton.displayName = 'Button'

export { AdvancedButton, advancedButton_Variants }
