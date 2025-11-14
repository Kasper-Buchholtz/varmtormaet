type Design = {
  padding?: {
    spacingTop?: string
    spacingBottom?: string
  }
}

export function paddingIndicator(design?: Design): string {
  if (!design || !design.padding) return ''

  const { spacingTop, spacingBottom } = design.padding

  const top = spacingTop !== 'none' ? 'Top' : null
  const bottom = spacingBottom !== 'none' ? 'Bund' : null

  if (top && bottom) return 'Afstand: Top, bund'
  if (top) return 'Afstand: Top'
  if (bottom) return 'Afstand: Bund'

  return 'Afstand: Ingen'
}
