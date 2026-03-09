'use client'

import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Compass, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { LogoLockup } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { siteCopy } from '@/lib/site-copy'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = resolveLocale(params.locale as string) as Locale
  const copy = siteCopy[locale].auth
  const sampleId = searchParams.get('sample')

  const authErrorText =
    locale === 'he'
      ? 'פרטי ההתחברות שגויים או שכתובת האימייל עדיין לא אומתה.'
      : locale === 'ar'
        ? 'بيانات تسجيل الدخول غير صحيحة أو أن البريد الإلكتروني لم يتم تأكيده بعد.'
        : 'Your login details are incorrect or your email has not been confirmed yet.'

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError
      router.push(sampleId ? `/${locale}/dashboard/trip-wizard?sample=${sampleId}` : `/${locale}/dashboard`)
    } catch (err) {
      setError(err instanceof Error ? authErrorText : copy.confirmEmail)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden lg:block">
          <div className="travel-panel rounded-[2.35rem] p-10">
            <LogoLockup locale={locale} />
            <h1 className="brand-display mt-8 text-balance text-5xl text-foreground">{copy.loginTitle}</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">{copy.loginBody}</p>

            <div className="mt-8 grid gap-4">
              <Card className="travel-card-soft rounded-[1.65rem] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">TiyulMate</p>
                    <p className="text-sm text-muted-foreground">{copy.sampleNotice}</p>
                  </div>
                </div>
              </Card>

              <Card className="travel-card-soft rounded-[1.65rem] p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/60 text-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{copy.confirmEmail}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{copy.noAccount} {copy.signUp}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <Card className="travel-card rounded-[2.2rem] p-0">
          <CardHeader className="space-y-4 pb-0">
            <LogoLockup locale={locale} compact showTagline={false} />
            <div className="space-y-3">
              <CardTitle className="text-3xl">{copy.loginTitle}</CardTitle>
              <CardDescription className="text-base leading-7">{copy.loginBody}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              {sampleId && (
                <div className="rounded-[1.35rem] border border-primary/20 bg-primary/8 p-4 text-sm text-foreground">
                  {copy.sampleNotice}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">{copy.email}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">{copy.password}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl"
                />
              </div>

              {error && (
                <div className="rounded-[1.35rem] border border-destructive/35 bg-destructive/8 p-4 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" className="h-12 w-full rounded-full" disabled={isLoading}>
                {isLoading ? copy.loginLoading : copy.login}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {copy.noAccount}{' '}
                <Link
                  href={sampleId ? `/${locale}/auth/sign-up?sample=${sampleId}` : `/${locale}/auth/sign-up`}
                  className="font-semibold text-primary hover:underline"
                >
                  {copy.signUp}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
