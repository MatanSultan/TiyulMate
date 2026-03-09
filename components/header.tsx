'use client'

import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useMemo, useState } from 'react'
import { LogoLockup } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/use-auth'
import { brandCopy } from '@/lib/brand-copy'
import { getLocaleLabel, resolveLocale, t, type Locale } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'

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
  const brand = brandCopy[locale]

  const navItems = user
    ? [{ href: `/${locale}/dashboard`, label: t('nav.dashboard', locale) }]
    : [
        { href: `/${locale}/auth/login`, label: t('nav.login', locale) },
        { href: `/${locale}/auth/sign-up`, label: t('nav.signup', locale), primary: true },
      ]

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="group inline-flex items-center gap-3">
          <LogoLockup
            locale={locale}
            compact
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
            subtitleClassName="text-[0.68rem] text-muted-foreground"
          />
        </Link>

        <div className="hidden lg:flex">{renderNavigation()}</div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={locale === 'he' || locale === 'ar' ? 'left' : 'right'}
            className="border-white/15 bg-background/92 backdrop-blur-2xl"
          >
            <div className="mt-10 space-y-6">
              <div className="space-y-4">
                <LogoLockup locale={locale} />
                <p className="max-w-sm text-sm leading-7 text-muted-foreground">{brand.mobileTitle}</p>
              </div>
              {renderNavigation(true)}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
