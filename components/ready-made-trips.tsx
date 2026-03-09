'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Clock3, MapPin, Sparkles, TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { type Locale } from '@/lib/i18n'
import { getLocalizedSampleTrips, type SampleTripId } from '@/lib/sample-trips'
import { siteCopy } from '@/lib/site-copy'
import { getDifficultyLabel, getDurationLabel, getRegionLabel } from '@/lib/trip-options'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ReadyMadeTrips({ locale = 'en' }: { locale?: Locale }) {
  const { user } = useAuth()
  const copy = siteCopy[locale].landing
  const samples = useMemo(() => getLocalizedSampleTrips(locale), [locale])
  const [selectedId, setSelectedId] = useState<SampleTripId>(samples[0]?.id || 'family-springs')

  const selectedSample = samples.find((sample) => sample.id === selectedId) || samples[0]
  const baseHref = user ? `/${locale}/dashboard/trip-wizard` : `/${locale}/auth/sign-up`
  const getSampleHref = (sampleId: string) => `${baseHref}?sample=${sampleId}`

  if (!selectedSample) {
    return null
  }

  return (
    <section className="py-8">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-card/82 p-0 shadow-[0_38px_110px_-68px_rgba(15,23,42,0.6)]">
          <div className="relative h-72 bg-gradient-to-br from-primary/18 via-accent/10 to-secondary/16 sm:h-80">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedSample.coverImageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                {selectedSample.theme}
              </div>
              <h3 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {selectedSample.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/82">{selectedSample.summary}</p>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.35rem] bg-muted/35 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                  <MapPin className="h-3.5 w-3.5" />
                  {getRegionLabel(selectedSample.seed.region, locale)}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{selectedSample.audience}</p>
              </div>
              <div className="rounded-[1.35rem] bg-muted/35 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                  <Clock3 className="h-3.5 w-3.5" />
                  {getDurationLabel(selectedSample.seed.duration_type, locale)}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{selectedSample.durationNote}</p>
              </div>
              <div className="rounded-[1.35rem] bg-muted/35 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {getDifficultyLabel(selectedSample.seed.difficulty, locale)}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{selectedSample.seed.startingArea}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.readyMadePreview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedSample.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-3">
                {selectedSample.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-7 text-foreground/88">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full px-6">
                <Link href={getSampleHref(selectedSample.id)}>
                  {copy.readyMadeUseBase}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href={getSampleHref(selectedSample.id)}>{copy.readyMadeGenerateSimilar}</Link>
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {samples.map((sample, index) => {
            const active = sample.id === selectedSample.id

            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => setSelectedId(sample.id)}
                className="text-left"
              >
                <Card
                  className={`h-full rounded-[1.75rem] border p-5 transition-all duration-300 ${
                    active
                      ? 'border-primary bg-primary/8 shadow-[0_28px_90px_-60px_var(--color-primary)]'
                      : 'border-white/10 bg-card/78 hover:-translate-y-1 hover:border-primary/35'
                  }`}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{sample.theme}</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{sample.title}</h3>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {getDurationLabel(sample.seed.duration_type, locale)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{sample.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {sample.badges.slice(0, 3).map((badge) => (
                      <span key={badge} className="rounded-full bg-muted/50 px-3 py-1 text-xs text-foreground/80">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{getRegionLabel(sample.seed.region, locale)}</span>
                    <span>{copy.readyMadePreview}</span>
                  </div>
                </Card>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
