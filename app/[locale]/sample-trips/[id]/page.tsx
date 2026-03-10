import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, Compass, MapPin, Route, Sparkles } from 'lucide-react'
import { Header } from '@/components/header'
import { SampleTripActions } from '@/components/sample-trip-actions'
import { Card } from '@/components/ui/card'
import { brandCopy } from '@/lib/brand-copy'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { marketingCopy } from '@/lib/marketing-copy'
import { getDetailedSampleTrip } from '@/lib/sample-catalog'
import { getDifficultyLabel, getDurationLabel, getRegionLabel } from '@/lib/trip-options'

interface SamplePreviewPageProps {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: SamplePreviewPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolveLocale(resolvedParams.locale) as Locale
  const sample = getDetailedSampleTrip(locale, resolvedParams.id)

  if (!sample) {
    return {}
  }

  return {
    title: `${sample.title} | TiyulMate`,
    description: sample.summary,
    openGraph: {
      title: sample.title,
      description: sample.summary,
      images: sample.coverImageUrl ? [{ url: sample.coverImageUrl }] : undefined,
    },
  }
}

export default async function SamplePreviewPage({ params }: SamplePreviewPageProps) {
  const resolvedParams = await params
  const locale = resolveLocale(resolvedParams.locale) as Locale
  const copy = marketingCopy[locale].samplePreview
  const brand = brandCopy[locale]
  const sample = getDetailedSampleTrip(locale, resolvedParams.id)

  if (!sample) {
    notFound()
  }

  return (
    <>
      <Header locale={locale} />

      <main className="app-shell px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-center justify-between gap-4">
            <Link href={`/${locale}#sample-trips`} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <ArrowLeft className={`h-4 w-4 ${locale === 'he' || locale === 'ar' ? 'rotate-180' : ''}`} />
              {copy.backToGallery}
            </Link>
            <span className="travel-kicker">{copy.eyebrow}</span>
          </div>

          <section className="travel-panel overflow-hidden rounded-[2.5rem] p-0">
            <div className="grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
              <div className="relative min-h-[420px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${sample.coverImageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                  <p className="travel-kicker bg-black/25 text-white backdrop-blur-md">{sample.theme}</p>
                  <h1 className="brand-display mt-5 max-w-3xl text-balance text-5xl text-white sm:text-6xl">{sample.title}</h1>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-white/84">{sample.summary}</p>
                </div>
              </div>

              <div className="space-y-6 p-8 sm:p-10">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="travel-card-soft rounded-[1.5rem] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.region}</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{getRegionLabel(sample.seed.region, locale)}</p>
                  </Card>
                  <Card className="travel-card-soft rounded-[1.5rem] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.duration}</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{getDurationLabel(sample.seed.duration_type, locale)}</p>
                  </Card>
                  <Card className="travel-card-soft rounded-[1.5rem] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.difficulty}</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{getDifficultyLabel(sample.seed.difficulty, locale)}</p>
                  </Card>
                  <Card className="travel-card-soft rounded-[1.5rem] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.startArea}</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{sample.seed.startingArea}</p>
                  </Card>
                </div>

                <Card className="travel-card rounded-[1.7rem] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.bestFor}</p>
                  <p className="mt-3 text-base leading-7 text-foreground/88">{sample.audience}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {sample.badges.map((badge) => (
                      <span key={badge} className="travel-chip">
                        {badge}
                      </span>
                    ))}
                  </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="travel-card rounded-[1.7rem] p-6">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                      <Sparkles className="h-3.5 w-3.5" />
                      {copy.vibe}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground/88">{sample.vibe}</p>
                  </Card>
                  <Card className="travel-card rounded-[1.7rem] p-6">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                      <Compass className="h-3.5 w-3.5" />
                      {copy.pace}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground/88">{sample.pace}</p>
                  </Card>
                </div>

                <div className="travel-card-soft rounded-[1.7rem] p-6">
                  <p className="text-sm leading-7 text-muted-foreground">{copy.accountPrompt}</p>
                  <div className="mt-5">
                    <SampleTripActions
                      locale={locale}
                      sampleId={sample.id}
                      createAccountLabel={copy.createAccount}
                      useAsBaseLabel={copy.useAsBase}
                      generateSimilarLabel={copy.generateSimilar}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
            <Card className="travel-card rounded-[2rem] p-6 sm:p-8">
              <p className="travel-kicker">
                <MapPin className="h-4 w-4" />
                {copy.highlights}
              </p>
              <ul className="mt-5 space-y-3">
                {sample.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-7 text-foreground/88">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.practicalNotes}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                    {sample.practicalNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.bring}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sample.bring.map((item) => (
                      <span key={item} className="travel-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="travel-card rounded-[2rem] p-6 sm:p-8">
              <p className="travel-kicker">
                <Route className="h-4 w-4" />
                {copy.routePreview}
              </p>
              <div className="mt-5 space-y-4">
                {sample.routeOutline.map((stop, index) => (
                  <div key={stop.title} className="travel-card-soft rounded-[1.5rem] p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{stop.title}</p>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{stop.summary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.7rem] bg-muted/40 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.whyThisWorks}</p>
                <p className="mt-3 text-sm leading-7 text-foreground/88">{sample.whyItWorks}</p>
              </div>
            </Card>
          </section>

          <section className="travel-panel rounded-[2.2rem] p-8 sm:p-10">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="travel-kicker">{brand.previewLabel}</p>
                <h2 className="brand-display mt-4 text-balance text-4xl text-foreground">{copy.moreSamples}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{copy.accountPrompt}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <SampleTripActions
                  locale={locale}
                  sampleId={sample.id}
                  createAccountLabel={copy.createAccount}
                  useAsBaseLabel={copy.useAsBase}
                  generateSimilarLabel={copy.generateSimilar}
                />
                <Link href={`/${locale}#sample-trips`} className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/70 px-6 py-3 text-sm font-medium text-foreground shadow-[0_18px_45px_-30px_rgba(91,65,43,0.28)] backdrop-blur-sm hover:border-primary/25 hover:bg-white">
                  {copy.moreSamples}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
