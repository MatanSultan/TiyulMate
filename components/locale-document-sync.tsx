'use client'

import { useEffect } from 'react'
import { isRTL, resolveLocale, type Locale } from '@/lib/i18n'

export function LocaleDocumentSync({ locale }: { locale?: Locale | string }) {
  useEffect(() => {
    const resolvedLocale = resolveLocale(locale)
    const root = document.documentElement
    root.lang = resolvedLocale
    root.dir = isRTL(resolvedLocale) ? 'rtl' : 'ltr'
  }, [locale])

  return null
}
