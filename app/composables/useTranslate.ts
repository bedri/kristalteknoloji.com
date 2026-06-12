import { useLocale } from './useLocale'
import { translations } from '~/utils/translations'

export function useTranslate() {
  const { locale } = useLocale()
  
  const t = (key: string): string => {
    const keys = key.split('.')
    let current: any = translations[locale.value]
    
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k]
      } else {
        // Fallback to Turkish if the translation key does not exist in the active language
        let fallback: any = translations['tr']
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk]
          } else {
            return key
          }
        }
        return fallback
      }
    }
    return current
  }

  return { t, locale }
}
