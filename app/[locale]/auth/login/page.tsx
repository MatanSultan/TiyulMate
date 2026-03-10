'use client'

import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { LogoLockup } from '@/components/logo-mark'
import { SampleTripSummaryCard } from '@/components/sample-trip-summary-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { marketingCopy } from '@/lib/marketing-copy'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = resolveLocale(params.locale as string) as Locale
  const copy = marketingCopy[locale].auth
  const sampleId = searchParams.get('sample')

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
    } catch {
      setError(copy.loginError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <div className="travel-panel rounded-[2.35rem] p-8 sm:p-10">
            <LogoLockup locale={locale} />
            <h1 className="brand-display mt-8 text-balance text-5xl text-foreground">{copy.loginTitle}</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">{copy.loginBody}</p>

            <div className="mt-8 grid gap-4">
              {copy.loginPoints.map((point) => (
                <Card key={point} className="travel-card-soft rounded-[1.65rem] p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-7 text-foreground/88">{point}</p>
                  </div>
                </Card>
              ))}

              <Card className="travel-card-soft rounded-[1.65rem] p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/60 text-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{copy.confirmEmail}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {sampleId ? copy.sampleNotice : copy.loginPoints[2]}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {sampleId ? (
            <SampleTripSummaryCard
              locale={locale}
              sampleId={sampleId}
              eyebrow={copy.sampleCardEyebrow}
              hint={copy.sampleCardHint}
              primaryAction={{ href: `/${locale}/sample-trips/${sampleId}`, label: copy.previewSample }}
              secondaryAction={{ href: `/${locale}/auth/sign-up?sample=${sampleId}`, label: copy.signUp }}
            />
          ) : null}
        </div>

        <Card className="travel-card rounded-[2.2rem] p-0">
          <CardHeader className="space-y-4 pb-0">
            <LogoLockup locale={locale} compact showTagline={false} />
            <div className="space-y-3">
              <CardTitle className="text-3xl">{copy.loginTitle}</CardTitle>
              <CardDescription className="text-base leading-7">{copy.loginBody}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {sampleId ? (
              <div className="rounded-[1.35rem] border border-primary/20 bg-primary/8 p-4 text-sm text-foreground">
                {copy.sampleNotice}
              </div>
            ) : null}

            <form onSubmit={handleLogin} className="space-y-5">
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

              {error ? (
                <div className="rounded-[1.35rem] border border-destructive/35 bg-destructive/8 p-4 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

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
