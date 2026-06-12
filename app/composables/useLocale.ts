export function useLocale() {
  const cookie = useCookie<'tr' | 'en'>('kristal-locale', {
    default: () => 'tr',
    path: '/',
    maxAge: 60 * 60 * 24 * 365 // 1 year
  })

  // Sync legacy localStorage to cookie on client side if they differ
  if (import.meta.client) {
    const saved = localStorage.getItem('kristal-locale')
    if ((saved === 'tr' || saved === 'en') && cookie.value !== saved) {
      cookie.value = saved
    }
  }

  const setLocale = (lang: 'tr' | 'en') => {
    cookie.value = lang
    if (import.meta.client) {
      localStorage.setItem('kristal-locale', lang)
    }
  }

  return {
    locale: cookie,
    setLocale
  }
}
