import Link from 'next/link'
import { Clock3, MapPin, Sparkles, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Locale } from '@/lib/i18n'
import { getDetailedSampleTrip } from '@/lib/sample-catalog'
import { getDifficultyLabel, getDurationLabel, getRegionLabel } from '@/lib/trip-options'

type Action = {
  href: string
  label: string
}

type SampleTripSummaryCardProps = {
  locale: Locale
  sampleId?: string | null
  eyebrow?: string
  hint?: string
  primaryAction?: Action
  secondaryAction?: Action
  className?: string
}

export function SampleTripSummaryCard({
  locale,
  sampleId,
  eyebrow,
  hint,
  primaryAction,
  secondaryAction,
  className = '',
}: SampleTripSummaryCardProps) {
  const sample = getDetailedSampleTrip(locale, sampleId)

  if (!sample) {
    return null
  }

  return (
    <Card className={`travel-card overflow-hidden rounded-[1.9rem] p-0 ${className}`}>
      <div className="relative h-48">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sample.coverImageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          {eyebrow ? <p className="travel-kicker bg-black/30 text-white backdrop-blur-md">{eyebrow}</p> : null}
          <h2 className="brand-display mt-3 text-balance text-3xl text-white">{sample.title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/84">{sample.summary}</p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="travel-card-soft rounded-[1.25rem] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              <MapPin className="h-3.5 w-3.5" />
              {getRegionLabel(sample.seed.region, locale)}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{sample.seed.startingArea}</p>
          </div>
          <div className="travel-card-soft rounded-[1.25rem] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              <Clock3 className="h-3.5 w-3.5" />
              {getDurationLabel(sample.seed.duration_type, locale)}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{sample.durationNote}</p>
          </div>
          <div className="travel-card-soft rounded-[1.25rem] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              <TrendingUp className="h-3.5 w-3.5" />
              {getDifficultyLabel(sample.seed.difficulty, locale)}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{sample.audience}</p>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {sample.badges.map((badge) => (
              <span key={badge} className="travel-chip">
                {badge}
              </span>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-foreground/86">
            <Sparkles className="h-4 w-4 text-primary" />
            {sample.vibe}
          </p>
          {hint ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{hint}</p> : null}
        </div>

        {primaryAction || secondaryAction ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            {primaryAction ? (
              <Button asChild className="rounded-full px-5">
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
            ) : null}
            {secondaryAction ? (
              <Button asChild variant="outline" className="rounded-full px-5">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  )
}
