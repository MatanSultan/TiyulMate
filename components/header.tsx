'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { locales, isRTL, type Locale, t } from '@/lib/i18n'
import { ChevronDown } from 'lucide-react'

export function Header({ locale = 'en' }: { locale?: Locale }) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [localeOpen, setLocaleOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const switchLocale = (newLocale: Locale) => {
    // Remove locale prefix from current path
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setLocaleOpen(false)
  }

  const rtl = isRTL(locale)
  const dir = rtl ? 'rtl' : 'ltr'

  return (
    <header className="border-b border-border bg-background" dir={dir}>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary shrink-0">
            TiyulMate
          </Link>
          <nav className={`flex items-center gap-4 sm:gap-6 ${rtl ? 'flex-row-reverse' : ''}`}>
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLocaleOpen(!localeOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                {locale.toUpperCase()}
                <ChevronDown className={`h-4 w-4 transition-transform ${localeOpen ? 'rotate-180' : ''}`} />
              </button>
              {localeOpen && (
                <div className={`absolute ${rtl ? 'right-0' : 'left-0'} mt-2 w-32 bg-card border border-border rounded-lg shadow-lg z-50`}>
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`block w-full text-${rtl ? 'right' : 'left'} px-4 py-2 text-sm hover:bg-muted ${
                        loc === locale ? 'font-bold text-primary' : ''
                      }`}
                    >
                      {loc === 'en' ? 'English' : loc === 'he' ? 'עברית' : 'العربية'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Links */}
            {user ? (
              <>
                <Link href={`/${locale}/dashboard`} className="text-sm font-medium hover:text-primary transition-colors">
                  {t('nav.dashboard', locale)}
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t('nav.logout', locale)}
                </Button>
              </>
            ) : (
              <>
                <Link href={`/${locale}/auth/login`} className="text-sm font-medium hover:text-primary transition-colors">
                  {t('nav.login', locale)}
                </Link>
                <Button size="sm" asChild>
                  <Link href={`/${locale}/auth/sign-up`}>{t('nav.signup', locale)}</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
