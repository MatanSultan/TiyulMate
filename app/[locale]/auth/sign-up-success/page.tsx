import Link from 'next/link'
import { CheckCircle2, Compass } from 'lucide-react'
import { LogoLockup } from '@/components/logo-mark'
import { SampleTripSummaryCard } from '@/components/sample-trip-summary-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { marketingCopy } from '@/lib/marketing-copy'

interface SignUpSuccessProps {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ sample?: string }>
}

export default async function SignUpSuccessPage({ params, searchParams }: SignUpSuccessProps) {
  const resolvedParams = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const locale = resolveLocale(resolvedParams.locale) as Locale
  const copy = marketingCopy[locale].auth
  const sampleId = resolvedSearchParams?.sample

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.96fr_1.04fr]">
        <Card className="travel-panel rounded-[2.35rem] p-0">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto">
              <LogoLockup locale={locale} />
            </div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <Compass className="h-7 w-7" />
            </div>
            <CardTitle className="brand-display text-4xl text-foreground">{copy.signUpSuccessTitle}</CardTitle>
            <CardDescription className="mx-auto max-w-xl text-base leading-7">{copy.signUpSuccessBody}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-2">
            <Button asChild className="rounded-full px-6">
              <Link href={sampleId ? `/${locale}/auth/login?sample=${sampleId}` : `/${locale}/auth/login`}>{copy.login}</Link>
            </Button>
          </CardContent>
        </Card>

        {sampleId ? (
          <SampleTripSummaryCard
            locale={locale}
            sampleId={sampleId}
            eyebrow={copy.sampleCardEyebrow}
            hint={copy.sampleCardHint}
            primaryAction={{ href: `/${locale}/sample-trips/${sampleId}`, label: copy.previewSample }}
            secondaryAction={{ href: `/${locale}/auth/login?sample=${sampleId}`, label: copy.login }}
          />
        ) : (
          <Card className="travel-card rounded-[2rem] p-6">
            <LogoLockup locale={locale} compact showTagline={false} />
            <div className="mt-4 space-y-4">
              {copy.signUpPoints.map((point) => (
                <div key={point} className="travel-card-soft rounded-[1.45rem] p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-7 text-foreground/88">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
