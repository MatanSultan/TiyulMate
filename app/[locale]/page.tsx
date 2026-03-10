import type { Metadata } from 'next'
import { Bot, Compass, Globe2, MapPinned, ShieldCheck, Star, SunMedium } from 'lucide-react'
import { Header } from '@/components/header'
import { LandingActions } from '@/components/landing-actions'
import { LogoMark } from '@/components/logo-mark'
import { ReadyMadeTrips } from '@/components/ready-made-trips'
import { Card } from '@/components/ui/card'
import { brandCopy } from '@/lib/brand-copy'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { marketingCopy } from '@/lib/marketing-copy'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolveLocale(resolvedParams.locale) as Locale
  const copy = marketingCopy[locale].landing

  return {
    title: `TiyulMate | ${copy.heroTitle}`,
    description: copy.heroBody,
    openGraph: {
      title: 'TiyulMate',
      description: copy.heroBody,
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params
  const locale = resolveLocale(resolvedParams.locale) as Locale
  const copy = marketingCopy[locale].landing
  const brand = brandCopy[locale]

  const featureCards = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: copy.benefits[0].title,
      body: copy.benefits[0].body,
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      title: copy.heroMetrics[0].value,
      body: copy.heroMetrics[0].label,
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: copy.heroMetrics[2].value,
      body: copy.heroMetrics[2].label,
    },
  ]

  return (
    <>
      <Header locale={locale} />

      <main className="app-shell">
        <section className="px-4 pb-10 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1.04fr_0.96fr]">
            <div className="travel-panel animate-float-up rounded-[2.5rem] p-8 sm:p-10">
              <div className="travel-kicker">
                <LogoMark className="h-4 w-4" />
                {copy.heroEyebrow}
              </div>

              <h1 className="brand-display mt-6 max-w-3xl text-balance text-5xl text-foreground sm:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.heroBody}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LandingActions locale={locale} browseLabel={copy.heroPrimaryCta} accountLabel={copy.heroSecondaryCta} />
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">{copy.heroTrust}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {copy.heroMetrics.map((metric) => (
                  <Card key={metric.label} className="travel-card-soft rounded-[1.5rem] p-5">
                    <p className="text-2xl font-semibold tracking-tight text-foreground">{metric.value}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{metric.label}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <Card className="travel-card hero-mockup overflow-hidden rounded-[2.3rem] p-0">
                <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="p-6 sm:p-8">
                    <div className="travel-kicker">
                      <Compass className="h-3.5 w-3.5" />
                      {copy.previewEyebrow}
                    </div>
                    <h2 className="brand-display mt-5 text-balance text-4xl text-foreground">{copy.previewTitle}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.previewBody}</p>

                    <ul className="mt-6 space-y-3">
                      {copy.previewBullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-7 text-foreground/88">
                          <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative overflow-hidden bg-[linear-gradient(165deg,rgba(255,248,235,0.84),rgba(232,198,142,0.34),rgba(44,106,107,0.14))] p-6 sm:p-8">
                    <div className="absolute inset-x-6 top-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-foreground/55">
                      <span>{brand.previewLabel}</span>
                      <span>{copy.heroMetrics[1].value}</span>
                    </div>

                    <div className="relative mt-10 space-y-4">
                      <div className="travel-card rounded-[1.8rem] p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-foreground">TiyulMate</p>
                            <p className="mt-1 text-xs text-muted-foreground">{brand.tagline}</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <LogoMark className="h-9 w-9" />
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {copy.previewBadges.map((badge) => (
                            <span key={badge} className="travel-chip">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="travel-card-dark rounded-[1.8rem] p-5">
                        <p className="text-sm font-semibold text-white/90">{copy.readyMadeTitle}</p>
                        <p className="mt-2 text-xs leading-6 text-white/72">{copy.readyMadeBody}</p>
                      </div>

                      <div className="travel-card rounded-[1.6rem] p-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[1.2rem] bg-muted/55 p-4">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                              <SunMedium className="h-3.5 w-3.5" />
                              {copy.heroMetrics[1].label}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{copy.benefits[2].body}</p>
                          </div>
                          <div className="rounded-[1.2rem] bg-muted/55 p-4">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                              <MapPinned className="h-3.5 w-3.5" />
                              {copy.heroMetrics[2].label}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{copy.heroTrust}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                {featureCards.map((feature) => (
                  <Card key={feature.title} className="travel-card rounded-[1.8rem] p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.body}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
            {copy.trustBar.map((item) => (
              <Card key={item} className="travel-card-soft rounded-[1.5rem] p-4 text-center text-sm font-medium text-foreground/86">
                {item}
              </Card>
            ))}
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="travel-kicker">
                  <Compass className="h-3.5 w-3.5" />
                  {copy.stepsTitle}
                </p>
                <h2 className="brand-display mt-4 text-balance text-4xl text-foreground">{copy.stepsTitle}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{copy.stepsBody}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {copy.steps.map((step, index) => (
                <Card key={step.title} className="travel-card rounded-[1.9rem] p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="sample-trips" className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="travel-kicker">
                  <LogoMark className="h-4 w-4" />
                  {copy.readyMadeEyebrow}
                </p>
                <h2 className="brand-display mt-4 text-balance text-4xl text-foreground">{copy.readyMadeTitle}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{copy.readyMadeBody}</p>
            </div>
            <ReadyMadeTrips locale={locale} />
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.3rem] p-8 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="travel-panel rounded-[2.2rem] p-8">
                <div className="travel-kicker">
                  <Compass className="h-3.5 w-3.5" />
                  {copy.whyTitle}
                </div>
                <h2 className="brand-display mt-5 text-balance text-4xl text-foreground">{copy.whyTitle}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy.whyBody}</p>
              </div>
              <div className="space-y-4">
                {copy.reasons.map((reason, index) => (
                  <Card key={reason} className="travel-card rounded-[1.7rem] p-5">
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-7 text-foreground/88">{reason}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="travel-kicker">
                  <SunMedium className="h-3.5 w-3.5" />
                  {copy.benefitsTitle}
                </p>
                <h2 className="brand-display mt-4 text-balance text-4xl text-foreground">{copy.benefitsTitle}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{copy.benefitsBody}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {copy.benefits.map((benefit) => (
                  <Card key={benefit.title} className="travel-card rounded-[1.7rem] p-5">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{benefit.body}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.3rem] travel-card p-8 sm:p-10">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="travel-kicker">
                  <MapPinned className="h-3.5 w-3.5" />
                  {copy.socialProofTitle}
                </p>
                <h2 className="brand-display mt-4 text-balance text-4xl text-foreground">{copy.socialProofTitle}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{copy.socialProofBody}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {copy.testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="travel-card-soft rounded-[1.75rem] p-6">
                  <div className="flex items-center gap-2 text-primary">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-foreground/88">"{testimonial.quote}"</p>
                  <div className="mt-5">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-[2.4rem] travel-panel p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="travel-kicker">
                  <LogoMark className="h-4 w-4" />
                  TiyulMate
                </div>
                <h2 className="brand-display mt-5 text-balance text-4xl text-foreground">{copy.finalTitle}</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{copy.finalBody}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <LandingActions
                  locale={locale}
                  browseLabel={copy.finalSecondaryCta}
                  accountLabel={copy.finalPrimaryCta}
                  finalPrimary
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
