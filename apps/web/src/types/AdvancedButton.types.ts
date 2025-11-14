import { HtmlHTMLAttributes } from 'react'

export type AdvancedButtonProps = {
  asChild?: boolean
  props?: React.AnchorHTMLAttributes<HTMLAnchorElement>
  className?: string
  children?: any
  onClick?: () => void
  ref?: React.ForwardedRef<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: any
  [key: string]: HtmlHTMLAttributes<HTMLButtonElement> | any
}
