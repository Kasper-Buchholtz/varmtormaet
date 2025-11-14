export type AccordionProps = {
  title: string
  unfloded?: 'true' | 'false' | boolean | any
  children: React.ReactNode | React.ReactNode[] | any
  className?: string
}

export type AccordionContextType = {
  isOpen: 'true' | 'false'
  toggle: () => void
}
