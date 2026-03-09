'use client'

import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Menu, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { getLocaleLabel, resolveLocale, t, type Locale } from '@/lib/i18n'

function buildLocalizedPath(pathname: string, targetLocale: Locale) {
  const nextPath = pathname.replace(/^\/(en|he|ar)(?=\/|$)/, '')
  return `/${targetLocale}${nextPath || ''}` || `/${targetLocale}`
}

export function Header({ locale: localeProp }: { locale?: Locale }) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [open, setOpen] = useState(false)

  const locale = useMemo(() => resolveLocale(localeProp || (params?.locale as string | undefined)), [localeProp, params])

  const navItems = user
    ? [
        { href: `/${locale}/dashboard`, label: t('nav.dashboard', locale) },
      ]
    : [
        { href: `/${locale}/auth/login`, label: t('nav.login', locale) },
        { href: `/${locale}/auth/sign-up`, label: t('nav.signup', locale), primary: true },
      ]

  const tagline = locale === 'he'
    ? 'טיולי AI בישראל'
    : locale === 'ar'
      ? 'رحلات ذكية في إسرائيل'
      : 'AI travel for Israel'

  const mobileTitle = locale === 'he'
    ? 'תכנון טיולים חכם'
    : locale === 'ar'
      ? 'تخطيط رحلات ذكي'
      : 'AI-first trip planning'

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(`/${locale}`)
  }

  const renderNavigation = (mobile = false) => (
    <div className={`flex ${mobile ? 'flex-col items-stretch gap-3' : 'items-center gap-2 lg:gap-3'}`}>
      <div className={`flex ${mobile ? 'flex-col gap-2' : 'items-center gap-2'}`}>
        {navItems.map((item) =>
          item.primary ? (
            <Button key={item.href} asChild className="rounded-full px-5">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ) : (
            <Button key={item.href} asChild variant="ghost" className="rounded-full">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ),
        )}
      </div>

      <div className={`flex ${mobile ? 'flex-col gap-2' : 'items-center gap-2'}`}>
        {(['en', 'he', 'ar'] as Locale[]).map((targetLocale) => (
          <Button
            key={targetLocale}
            variant={targetLocale === locale ? 'secondary' : 'ghost'}
            className="rounded-full"
            onClick={() => {
              router.push(buildLocalizedPath(pathname, targetLocale))
              setOpen(false)
            }}
          >
            {getLocaleLabel(targetLocale)}
          </Button>
        ))}
      </div>

      {user && (
        <Button variant="outline" className="rounded-full" onClick={handleLogout}>
          {t('nav.logout', locale)}
        </Button>
      )}
    </div>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="group inline-flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground shadow-[0_18px_50px_-24px_var(--color-primary)] transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-foreground">TiyulMate</span>
            <span className="text-xs uppercase tracking-[0.28em] text-primary/70">{tagline}</span>
          </div>
        </Link>

        <div className="hidden lg:flex">{renderNavigation()}</div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={locale === 'he' || locale === 'ar' ? 'left' : 'right'} className="border-white/10 bg-background/95 backdrop-blur-xl">
            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">TiyulMate</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">{mobileTitle}</h2>
              </div>
              {renderNavigation(true)}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
