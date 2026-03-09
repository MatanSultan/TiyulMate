import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Compass,
  Globe2,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import { Header } from '@/components/header'
import { ReadyMadeTrips } from '@/components/ready-made-trips'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { siteCopy } from '@/lib/site-copy'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params
  const locale = resolveLocale(resolvedParams.locale) as Locale
  const copy = siteCopy[locale].landing

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
        <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-float-up rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(28,102,159,0.18),rgba(75,197,185,0.08),rgba(255,255,255,0.62))] p-8 shadow-[0_44px_120px_-60px_rgba(15,23,42,0.55)] glass-panel sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                <Sparkles className="h-3.5 w-3.5" />
                {copy.heroEyebrow}
              </div>
              <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.heroBody}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href={`/${locale}/auth/sign-up`}>
                    {copy.heroPrimaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                  <Link href="#sample-trips">{copy.heroSecondaryCta}</Link>
                </Button>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">{copy.heroTrust}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {copy.heroMetrics.map((metric) => (
                  <Card key={metric.label} className="rounded-[1.5rem] border-white/10 bg-card/70 p-5">
                    <p className="text-xl font-semibold tracking-tight text-foreground">{metric.value}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{metric.label}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-card/82 shadow-[0_32px_90px_-60px_rgba(15,23,42,0.55)]">
                <div className="border-b border-white/10 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.previewEyebrow}</p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{copy.previewTitle}</h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Compass className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.previewBody}</p>
                </div>

                <div className="grid gap-4 p-6 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-muted/25 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">AI Flow</p>
                    <ul className="mt-4 space-y-3">
                      {copy.previewBullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-7 text-foreground/88">
                          <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(155deg,rgba(28,102,159,0.14),rgba(75,197,185,0.08),rgba(255,255,255,0.78))] p-5">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>TiyulMate</span>
                      <span>AI</span>
                    </div>
                    <div className="mt-5 space-y-4">
                      {copy.previewBadges.map((badge) => (
                        <div key={badge} className="rounded-[1rem] border border-white/15 bg-white/55 px-4 py-3 text-sm text-foreground/88">
                          {badge}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                {featureCards.map((feature) => (
                  <Card key={feature.title} className="rounded-[1.7rem] border-white/10 bg-card/82 p-6 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.55)]">
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

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-white/10 bg-card/80 p-8 shadow-[0_32px_90px_-60px_rgba(15,23,42,0.55)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                  <Compass className="h-3.5 w-3.5" />
                  {copy.whyTitle}
                </div>
                <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground">{copy.whyTitle}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy.whyBody}</p>
              </div>
              <div className="space-y-4">
                {copy.reasons.map((reason, index) => (
                  <Card key={reason} className="rounded-[1.5rem] border-white/10 bg-muted/25 p-5">
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
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
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.benefitsTitle}</p>
                <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground">{copy.benefitsTitle}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{copy.benefitsBody}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {copy.benefits.map((benefit) => (
                  <Card key={benefit.title} className="rounded-[1.6rem] border-white/10 bg-card/80 p-5">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{benefit.body}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-white/10 bg-card/80 p-8 shadow-[0_32px_90px_-60px_rgba(15,23,42,0.55)] sm:p-10">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.socialProofTitle}</p>
                <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground">{copy.socialProofTitle}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{copy.socialProofBody}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {copy.testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="rounded-[1.65rem] border-white/10 bg-muted/25 p-6">
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

        <section id="sample-trips" className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.readyMadeEyebrow}</p>
                <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground">{copy.readyMadeTitle}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{copy.readyMadeBody}</p>
            </div>
            <ReadyMadeTrips locale={locale} />
          </div>
        </section>

        <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-white/10 bg-[linear-gradient(145deg,rgba(28,102,159,0.18),rgba(75,197,185,0.08),rgba(255,255,255,0.58))] p-8 shadow-[0_44px_120px_-60px_rgba(15,23,42,0.55)] glass-panel sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                  <MapPinned className="h-3.5 w-3.5" />
                  TiyulMate
                </div>
                <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground">{copy.finalTitle}</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{copy.finalBody}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href={`/${locale}/auth/sign-up`}>
                    {copy.finalPrimaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                  <Link href="#sample-trips">{copy.finalSecondaryCta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
