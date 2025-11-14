const documentTypeLabels: Record<string, Record<string, string>> = {
  page: {
    en: 'Page',
    da: 'Side',
  },
  event: {
    en: 'Event',
    da: 'Begivenheder',
  },
  article: {
    en: 'Article',
    da: 'Nyhed',
  },
}

export function resolveDocumentType(
  documentType?: string,
  locale: string = 'da',
): string | undefined {
  if (!documentType || !documentTypeLabels[documentType]) {
    console.warn('Invalid document type:', documentType)
    return undefined
  }
  return documentTypeLabels[documentType][locale] || documentTypeLabels[documentType]['en']
}
