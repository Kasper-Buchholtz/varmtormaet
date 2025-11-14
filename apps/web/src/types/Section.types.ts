export type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
  ref?: any
  data?: any
}

interface Section {
  _type: string
  amount?: number
  design?: {
    padding?: {
      spacingTop?: string
      spacingBottom?: string
    }
    color?: {
      color?: string
    }
  }
  innerBlocks?: any[]
  [key: string]: any // To allow additional properties specific to different section types
}
export interface PageBuilderTypes {
  sections: Section[]
}
