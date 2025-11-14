export function iconByLocale(locale: string) {
  switch (locale) {
    case 'da':
      return () => '🇩🇰'
    case 'en':
      return () => '🇬🇧'
    case 'es':
      return () => '🇪🇸'
    case 'no':
      return () => '🇳🇴'
    case 'sv':
      return () => '🇸🇪'
    case 'de':
      return () => '🇩🇪'
    case 'fr':
      return () => '🇫🇷'
    case 'it':
      return () => '🇮🇹'
    case 'nl':
      return () => '🇳🇱'
    case 'pl':
      return () => '🇵🇱'
    case 'pt':
      return () => '🇵🇹'
    case 'ru':
      return () => '🇷🇺'
    case 'zh':
      return () => '🇨🇳'
    case 'ja':
      return () => '🇯🇵'
    case 'ko':
      return () => '🇰🇷'
    case 'ar':
      return () => '🇸🇦'
    case 'se':
      return () => '🇸🇪'
    case 'fi':
      return () => '🇫🇮'
    default:
      return () => '🌍'
  }
}
