'use client'

import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'
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
      ? 'פרטי ההתחברות שגויים או שעדיין לא אישרת את כתובת האימייל.'
      : locale === 'ar'
        ? 'بيانات تسجيل الدخول غير صحيحة أو أن البريد الإلكتروني لم يتم تأكيده بعد.'
        : 'Your login details are incorrect or your email is not confirmed yet.'

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
        <div className="hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(28,102,159,0.16),rgba(75,197,185,0.08),rgba(255,255,255,0.62))] p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)] glass-panel lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
            <Sparkles className="h-3.5 w-3.5" />
            TiyulMate
          </div>
          <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight text-foreground">{copy.loginTitle}</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">{copy.loginBody}</p>
        </div>

        <Card className="rounded-[2rem] border-white/10 bg-card/82 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)]">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl">{copy.loginTitle}</CardTitle>
            <CardDescription className="text-base leading-7">{copy.loginBody}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {sampleId && (
                <div className="rounded-[1.25rem] border border-primary/25 bg-primary/8 p-3 text-sm text-foreground">
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
                <div className="rounded-[1.25rem] border border-destructive/40 bg-destructive/8 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" className="h-12 w-full rounded-full" disabled={isLoading}>
                {isLoading ? copy.loginLoading : copy.login}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {copy.noAccount}{' '}
                <Link href={sampleId ? `/${locale}/auth/sign-up?sample=${sampleId}` : `/${locale}/auth/sign-up`} className="font-semibold text-primary hover:underline">
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
