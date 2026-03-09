'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'
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
  const locale = resolveLocale(params.locale as string) as Locale
  const copy = siteCopy[locale].auth

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
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/${locale}/auth/login`,
        },
      })

      if (signUpError) throw signUpError
      router.push(`/${locale}/auth/sign-up-success`)
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.confirmEmail)
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
          <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight text-foreground">{copy.signUpTitle}</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">{copy.signUpBody}</p>
        </div>

        <Card className="rounded-[2rem] border-white/10 bg-card/82 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)]">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl">{copy.signUpTitle}</CardTitle>
            <CardDescription className="text-base leading-7">{copy.signUpBody}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-5">
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
                <div className="rounded-[1.25rem] border border-destructive/40 bg-destructive/8 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" className="h-12 w-full rounded-full" disabled={isLoading}>
                {isLoading ? copy.signUpLoading : copy.signUp}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {copy.haveAccount}{' '}
                <Link href={`/${locale}/auth/login`} className="font-semibold text-primary hover:underline">
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
