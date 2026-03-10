'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Clock3, MapPin, Sparkles, TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { LogoMark } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type Locale } from '@/lib/i18n'
import { marketingCopy } from '@/lib/marketing-copy'
import { getDetailedSampleTrip, getLocalizedSampleTrips, type SampleTripId } from '@/lib/sample-catalog'
import { getDifficultyLabel, getDurationLabel, getRegionLabel } from '@/lib/trip-options'

export function ReadyMadeTrips({ locale = 'en' }: { locale?: Locale }) {
  const { user } = useAuth()
  const copy = marketingCopy[locale].landing
  const samples = useMemo(() => getLocalizedSampleTrips(locale), [locale])
  const [selectedId, setSelectedId] = useState<SampleTripId>(samples[0]?.id || 'family-springs')

  const selectedSample = samples.find((sample) => sample.id === selectedId) || samples[0]
  const selectedDetail = useMemo(() => getDetailedSampleTrip(locale, selectedId), [locale, selectedId])
  const baseHref = user ? `/${locale}/dashboard/trip-wizard` : `/${locale}/auth/sign-up`
  const getBaseHref = (sampleId: string) => `${baseHref}?sample=${sampleId}`
  const getPreviewHref = (sampleId: string) => `/${locale}/sample-trips/${sampleId}`

  if (!selectedSample || !selectedDetail) {
    return null
  }

  return (
    <section className="py-6">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="travel-card overflow-hidden rounded-[2.25rem] p-0">
          <div className="relative h-72 bg-gradient-to-br from-secondary/45 via-primary/15 to-accent/15 sm:h-80">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedSample.coverImageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="travel-kicker bg-black/30 text-white backdrop-blur-md">
                <LogoMark className="h-4 w-4" />
                {selectedSample.theme}
              </div>
              <h3 className="brand-display mt-4 max-w-2xl text-balance text-4xl text-white">{selectedSample.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/82">{selectedSample.summary}</p>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="travel-card-soft rounded-[1.35rem] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                  <MapPin className="h-3.5 w-3.5" />
                  {getRegionLabel(selectedSample.seed.region, locale)}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{selectedSample.audience}</p>
              </div>
              <div className="travel-card-soft rounded-[1.35rem] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                  <Clock3 className="h-3.5 w-3.5" />
                  {getDurationLabel(selectedSample.seed.duration_type, locale)}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{selectedSample.durationNote}</p>
              </div>
              <div className="travel-card-soft rounded-[1.35rem] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {getDifficultyLabel(selectedSample.seed.difficulty, locale)}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{selectedSample.seed.startingArea}</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_0.92fr]">
              <div>
                <p className="travel-kicker">
                  <LogoMark className="h-4 w-4" />
                  {copy.readyMadePreview}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedSample.badges.map((badge) => (
                    <span key={badge} className="travel-chip">
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

              <div className="travel-card-soft rounded-[1.7rem] p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                  <Sparkles className="h-3.5 w-3.5" />
                  {selectedDetail.pace}
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground/88">{selectedDetail.vibe}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{selectedDetail.whyItWorks}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="rounded-full px-6">
                <Link href={getPreviewHref(selectedSample.id)}>
                  {copy.readyMadePreview}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href={getBaseHref(selectedSample.id)}>{copy.readyMadeUseBase}</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full px-3">
                <Link href={getBaseHref(selectedSample.id)}>{copy.readyMadeGenerateSimilar}</Link>
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {samples.map((sample, index) => {
            const active = sample.id === selectedSample.id

            return (
              <Card
                key={sample.id}
                className={`rounded-[1.85rem] border p-5 transition-all duration-300 ${
                  active
                    ? 'travel-panel border-primary/30 shadow-[0_36px_96px_-62px_rgba(156,98,67,0.42)]'
                    : 'travel-card hover:-translate-y-1 hover:border-primary/35'
                }`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <button type="button" onClick={() => setSelectedId(sample.id)} className="w-full text-left">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{sample.theme}</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{sample.title}</h3>
                    </div>
                    <span className="travel-chip">{getDurationLabel(sample.seed.duration_type, locale)}</span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{sample.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {sample.badges.slice(0, 3).map((badge) => (
                      <span key={badge} className="rounded-full bg-muted/55 px-3 py-1 text-xs text-foreground/80">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{getRegionLabel(sample.seed.region, locale)}</span>
                    <span>{getDifficultyLabel(sample.seed.difficulty, locale)}</span>
                  </div>
                </button>

                <div className="mt-5 flex flex-col gap-3">
                  <Button asChild variant={active ? 'default' : 'outline'} className="rounded-full">
                    <Link href={getPreviewHref(sample.id)}>{copy.readyMadePreview}</Link>
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link href={getBaseHref(sample.id)}>{copy.readyMadeUseBase}</Link>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
