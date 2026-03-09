'use client'

import Image from 'next/image'
import { ExternalLink, MapPin } from 'lucide-react'
import { LogoMark } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type Locale } from '@/lib/i18n'
import { tripCopy } from '@/lib/trip-copy'
import {
  getGoogleMapsUrl,
  getTripCoverImage,
  getTripMapQuery,
  normalizeDayEntries,
  normalizeStringArray,
  stringifyUnknown,
  type TripRecord,
} from '@/lib/trip-model'
import { getEnabledPreferenceLabels } from '@/lib/trip-options'

function renderList(values: string[]) {
  return (
    <ul className="space-y-3">
      {values.map((value) => (
        <li key={value} className="flex gap-3 text-sm leading-7 text-foreground/88">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
          <span>{value}</span>
        </li>
      ))}
    </ul>
  )
}

export function TripItinerary({ trip, locale }: { trip: TripRecord; locale: Locale }) {
  const copy = tripCopy[locale].detail
  const labels = {
    bestTime: locale === 'he' ? 'הזמן המומלץ' : locale === 'ar' ? 'أفضل وقت' : 'Best time',
    start: locale === 'he' ? 'יציאה' : locale === 'ar' ? 'الانطلاق' : 'Start',
    weather: locale === 'he' ? 'מזג אוויר' : locale === 'ar' ? 'الطقس' : 'Weather',
    tags: locale === 'he' ? 'תגיות' : locale === 'ar' ? 'الوسوم' : 'Tags',
    checklist: locale === 'he' ? 'צ׳קליסט' : locale === 'ar' ? 'قائمة تجهيزات' : 'Checklist',
    accessibility: locale === 'he' ? 'נגישות' : locale === 'ar' ? 'إمكانية الوصول' : 'Accessibility',
    practicalNotes: locale === 'he' ? 'הערות פרקטיות' : locale === 'ar' ? 'ملاحظات عملية' : 'Practical notes',
  }
  const itinerary = trip.itinerary || {}
  const days = normalizeDayEntries(itinerary, locale)
  const coverImage = getTripCoverImage(trip)
  const mapQuery = getTripMapQuery(itinerary)
  const checklist = normalizeStringArray(itinerary.checklist)
  const accessibilityNotes = normalizeStringArray(itinerary.accessibility_notes)
  const practicalNotes = normalizeStringArray(itinerary.practical_notes)
  const hikingTips = normalizeStringArray(itinerary.hiking_tips)
  const tags = normalizeStringArray(itinerary.tags)
  const preferenceBadges = getEnabledPreferenceLabels(trip.preferences, locale, 8)
  const hasItinerary =
    days.length > 0 ||
    Boolean(
      itinerary.overview ||
        itinerary.hiking_tips ||
        itinerary.best_time ||
        itinerary.who_its_for ||
        itinerary.weather_note,
    )

  if (!hasItinerary) {
    return null
  }

  return (
    <div className="space-y-6">
      {coverImage && (
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-card/60">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <Image
          src={coverImage}
            alt={trip.title}
            width={1600}
            height={900}
            className="h-64 w-full object-cover sm:h-80"
            unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="travel-kicker bg-black/40 text-white backdrop-blur-md">
              <LogoMark className="h-4 w-4" />
              {copy.aiBadge}
            </div>
        </div>
      </div>
      )}

      {preferenceBadges.length > 0 && (
        <Card className="travel-card rounded-[1.75rem] p-6">
          <div className="flex flex-wrap gap-2">
            {preferenceBadges.map((badge) => (
              <span key={badge} className="travel-chip">
                {badge}
              </span>
            ))}
          </div>
        </Card>
      )}

      {(itinerary.overview || itinerary.vibe || itinerary.who_its_for) && (
        <Card className="travel-card rounded-[1.75rem] p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.overview}</p>
          {itinerary.overview && <p className="text-base leading-8 text-foreground/88">{stringifyUnknown(itinerary.overview)}</p>}
          {itinerary.vibe && <p className="mt-4 text-sm leading-7 text-muted-foreground">{stringifyUnknown(itinerary.vibe)}</p>}
          {itinerary.who_its_for && (
            <p className="mt-4 text-sm font-medium text-foreground">{stringifyUnknown(itinerary.who_its_for)}</p>
          )}
        </Card>
      )}

      {(itinerary.best_time || itinerary.weather_note || itinerary.starting_area) && (
        <div className="grid gap-4 lg:grid-cols-3">
          {itinerary.best_time && (
            <Card className="travel-card-soft rounded-[1.5rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{labels.bestTime}</p>
              <p className="mt-3 text-sm leading-7 text-foreground/88">{stringifyUnknown(itinerary.best_time)}</p>
            </Card>
          )}
          {itinerary.starting_area && (
            <Card className="travel-card-soft rounded-[1.5rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{labels.start}</p>
              <p className="mt-3 text-sm leading-7 text-foreground/88">{stringifyUnknown(itinerary.starting_area)}</p>
            </Card>
          )}
          {itinerary.weather_note && (
            <Card className="travel-card-soft rounded-[1.5rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{labels.weather}</p>
              <p className="mt-3 text-sm leading-7 text-foreground/88">{stringifyUnknown(itinerary.weather_note)}</p>
            </Card>
          )}
        </div>
      )}

      {mapQuery && (
        <Card className="travel-card rounded-[1.75rem] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.route}</p>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{mapQuery}</span>
              </div>
              {itinerary.route?.start && (
                <p className="text-sm text-muted-foreground">
                  {stringifyUnknown(itinerary.route.start)}
                  {itinerary.route?.end ? ` -> ${stringifyUnknown(itinerary.route.end)}` : ''}
                </p>
              )}
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <a href={getGoogleMapsUrl(mapQuery)} target="_blank" rel="noreferrer">
                {copy.openMap}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>
      )}

      {(tags.length > 0 || checklist.length > 0 || accessibilityNotes.length > 0 || practicalNotes.length > 0 || hikingTips.length > 0) && (
        <div className="grid gap-4 xl:grid-cols-2">
          {tags.length > 0 && (
            <Card className="travel-card rounded-[1.75rem] p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{labels.tags}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-foreground/85">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {checklist.length > 0 && (
            <Card className="travel-card rounded-[1.75rem] p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{labels.checklist}</p>
              {renderList(checklist)}
            </Card>
          )}

          {accessibilityNotes.length > 0 && (
            <Card className="travel-card rounded-[1.75rem] p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{labels.accessibility}</p>
              {renderList(accessibilityNotes)}
            </Card>
          )}

          {practicalNotes.length > 0 && (
            <Card className="travel-card rounded-[1.75rem] p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{labels.practicalNotes}</p>
              {renderList(practicalNotes)}
            </Card>
          )}

          {hikingTips.length > 0 && (
            <Card className="travel-panel rounded-[1.75rem] bg-primary/5 p-6 xl:col-span-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.tips}</p>
              {renderList(hikingTips)}
            </Card>
          )}
        </div>
      )}

      {days.length > 0 && (
        <div className="grid gap-4">
          {days.map((day, index) => (
            <Card key={day.key} className="travel-card rounded-[1.75rem] p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
                    {locale === 'he' ? `יום ${index + 1}` : locale === 'ar' ? `اليوم ${index + 1}` : `Day ${index + 1}`}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground">{day.label}</h3>
                </div>
                {(day.data.distance || day.data.hiking_time || day.data.drive_time) && (
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {day.data.distance && <span className="travel-chip">{day.data.distance}</span>}
                    {day.data.hiking_time && <span className="travel-chip">{day.data.hiking_time}</span>}
                    {day.data.drive_time && <span className="travel-chip">{day.data.drive_time}</span>}
                  </div>
                )}
              </div>

              {day.summary && <p className="mb-4 text-sm leading-7 text-muted-foreground">{day.summary}</p>}

              {day.bullets.length > 0 && renderList(day.bullets)}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
