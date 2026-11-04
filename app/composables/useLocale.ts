import { isValidLocale, normalizeLocale, type SupportedLocale } from '~/utils/translations'

export function useLocale() {
  const cookie = useCookie<SupportedLocale>('kristal-locale', {
    default: () => 'tr',
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365 // 1 year
  })

  // Ensure cookie value is strictly validated against tampering
  if (!isValidLocale(cookie.value)) {
    cookie.value = 'tr'
  }

  // Sync legacy localStorage to cookie on client side if they differ
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem('kristal-locale')
      if (isValidLocale(saved) && cookie.value !== saved) {
        cookie.value = saved
      }
    } catch {
      // Ignore storage errors in restricted privacy contexts
    }
  }

  const setLocale = (lang: SupportedLocale) => {
    const safeLang = normalizeLocale(lang)
    cookie.value = safeLang
    if (import.meta.client) {
      try {
        localStorage.setItem('kristal-locale', safeLang)
      } catch {
        // Ignore storage errors in restricted privacy contexts
      }
    }
  }

  return {
    locale: cookie,
    setLocale
  }
}
