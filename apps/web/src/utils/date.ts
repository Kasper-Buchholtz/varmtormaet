export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('da-DK', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getCurrentDate(): string {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getDanishDate(date: string): string {
  return new Date(date).toLocaleDateString('da-DK', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
