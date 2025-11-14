import { ExtendedSectionProps } from '@/components/sections/Section'

export type TextContainerProps = ExtendedSectionProps & {
  data?: Record<string, unknown>
  hasChild?: boolean
  children?: React.ReactNode
  [key: string]: any
}
