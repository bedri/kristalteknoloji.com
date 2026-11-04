import { useLocale } from './useLocale'
import { resolveTranslation } from '~/utils/translations'

export function useTranslate() {
  const { locale } = useLocale()

  const t = (key: string): string => {
    return resolveTranslation(key, locale.value)
  }

  return { t, locale }
}
