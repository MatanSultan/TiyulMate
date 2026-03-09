'use client'

import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Compass, MapPinned } from 'lucide-react'
import { useState } from 'react'
import { LogoLockup } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { siteCopy } from '@/lib/site-copy'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = resolveLocale(params.locale as string) as Locale
  const copy = siteCopy[locale].auth
  const sampleId = searchParams.get('sample')

  const signUpErrorText =
    locale === 'he'
      ? 'לא הצלחנו ליצור חשבון כרגע. בדקו שהאימייל תקין ונסו שוב.'
      : locale === 'ar'
        ? 'تعذر إنشاء الحساب الآن. تأكدوا من صحة البريد الإلكتروني وحاولوا مرة أخرى.'
        : 'We could not create your account right now. Check your email address and try again.'

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError(copy.passwordsMismatch)
      setIsLoading(false)
      return
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/${locale}/auth/login${sampleId ? `?sample=${sampleId}` : ''}`,
        },
      })

      if (signUpError) throw signUpError
      router.push(sampleId ? `/${locale}/auth/sign-up-success?sample=${sampleId}` : `/${locale}/auth/sign-up-success`)
    } catch (err) {
      setError(err instanceof Error ? signUpErrorText : copy.confirmEmail)
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
            <h1 className="brand-display mt-8 text-balance text-5xl text-foreground">{copy.signUpTitle}</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">{copy.signUpBody}</p>

            <div className="mt-8 grid gap-4">
              <Card className="travel-card-soft rounded-[1.65rem] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{copy.sampleNotice}</p>
                    <p className="text-sm text-muted-foreground">{copy.signUpBody}</p>
                  </div>
                </div>
              </Card>

              <Card className="travel-card-soft rounded-[1.65rem] p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/60 text-foreground">
                    <MapPinned className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{copy.confirmEmail}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{copy.haveAccount} {copy.login}</p>
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
              <CardTitle className="text-3xl">{copy.signUpTitle}</CardTitle>
              <CardDescription className="text-base leading-7">{copy.signUpBody}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSignUp} className="space-y-5">
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

              <div className="grid gap-2">
                <Label htmlFor="repeat-password">{copy.repeatPassword}</Label>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="h-12 rounded-2xl"
                />
              </div>

              {error && (
                <div className="rounded-[1.35rem] border border-destructive/35 bg-destructive/8 p-4 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" className="h-12 w-full rounded-full" disabled={isLoading}>
                {isLoading ? copy.signUpLoading : copy.signUp}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {copy.haveAccount}{' '}
                <Link
                  href={sampleId ? `/${locale}/auth/login?sample=${sampleId}` : `/${locale}/auth/login`}
                  className="font-semibold text-primary hover:underline"
                >
                  {copy.login}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
