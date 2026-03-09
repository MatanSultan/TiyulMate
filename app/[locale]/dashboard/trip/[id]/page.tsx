'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Bot, Copy, Loader2, MapPin, Pencil, Share2, Sparkles, Trash2 } from 'lucide-react'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { TripItinerary } from '@/components/trip-itinerary'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/use-auth'
import { deleteTrip, duplicateTrip, updateTrip } from '@/hooks/use-trips'
import { resolveLocale, t, type Locale } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'
import { tripCopy } from '@/lib/trip-copy'
import { asTripPreferences, getTripCoverImage, normalizeDayEntries, normalizeStringArray, type TripRecord } from '@/lib/trip-model'
import {
  DIFFICULTIES,
  DURATIONS,
  getDifficultyLabel,
  getDurationLabel,
  getEnabledPreferenceLabels,
  getPreferenceOptions,
  getRegionLabel,
  REGIONS,
} from '@/lib/trip-options'

type EditableDayState = {
  key: string
  title: string
  summary: string
  bulletsText: string
}

type EditableTripState = {
  title: string
  region: string
  duration_type: string
  difficulty: string
  coverImageUrl: string
  mapQuery: string
  startingArea: string
  plannerNotes: string
  overview: string
  vibe: string
  whoItsFor: string
  bestTime: string
  weatherNote: string
  tagsText: string
  checklistText: string
  practicalNotesText: string
  accessibilityNotesText: string
  hikingTipsText: string
  days: EditableDayState[]
  preferences: ReturnType<typeof createPreferenceState>
}

function createPreferenceState(preferences?: Record<string, unknown>) {
  const normalized = asTripPreferences(preferences)

  return {
    familyFriendly: Boolean(normalized.familyFriendly),
    kidsFriendly: Boolean(normalized.kidsFriendly),
    strollerFriendly: Boolean(normalized.strollerFriendly),
    dogFriendly: Boolean(normalized.dogFriendly),
    romantic: Boolean(normalized.romantic),
    waterFeatures: Boolean(normalized.waterFeatures),
    camping: Boolean(normalized.camping),
    viewpoints: Boolean(normalized.viewpoints),
    archaeological: Boolean(normalized.archaeological),
    wildflowers: Boolean(normalized.wildflowers),
    photography: Boolean(normalized.photography),
    accessibleRoutes: Boolean(normalized.accessibleRoutes),
    wheelchairFriendly: Boolean(normalized.wheelchairFriendly),
    lowMobilityFriendly: Boolean(normalized.lowMobilityFriendly),
    otherPreferences: typeof normalized.otherPreferences === 'string' ? normalized.otherPreferences : '',
  }
}

function createEditableState(trip: TripRecord): EditableTripState {
  const itinerary = trip.itinerary || {}

  return {
    title: trip.title,
    region: trip.region,
    duration_type: trip.duration_type,
    difficulty: trip.difficulty,
    coverImageUrl: typeof itinerary.cover_image_url === 'string' ? itinerary.cover_image_url : '',
    mapQuery:
      typeof (itinerary.route?.map_query || itinerary.map_query) === 'string'
        ? String(itinerary.route?.map_query || itinerary.map_query)
        : '',
    startingArea:
      typeof (itinerary.route?.start || itinerary.starting_area) === 'string'
        ? String(itinerary.route?.start || itinerary.starting_area)
        : '',
    plannerNotes: typeof itinerary.planner_notes === 'string' ? itinerary.planner_notes : '',
    overview: typeof itinerary.overview === 'string' ? itinerary.overview : '',
    vibe: typeof itinerary.vibe === 'string' ? itinerary.vibe : '',
    whoItsFor: typeof itinerary.who_its_for === 'string' ? itinerary.who_its_for : '',
    bestTime: typeof itinerary.best_time === 'string' ? itinerary.best_time : '',
    weatherNote: typeof itinerary.weather_note === 'string' ? itinerary.weather_note : '',
    tagsText: normalizeStringArray(itinerary.tags).join('\n'),
    checklistText: normalizeStringArray(itinerary.checklist).join('\n'),
    practicalNotesText: normalizeStringArray(itinerary.practical_notes).join('\n'),
    accessibilityNotesText: normalizeStringArray(itinerary.accessibility_notes).join('\n'),
    hikingTipsText: normalizeStringArray(itinerary.hiking_tips).join('\n'),
    days: normalizeDayEntries(itinerary, trip.language_code || 'en').map((day) => ({
      key: day.key,
      title: day.label,
      summary: day.summary,
      bulletsText: day.bullets.join('\n'),
    })),
    preferences: createPreferenceState(trip.preferences),
  }
}

function buildUiText(locale: Locale) {
  return {
    loading: t('common.loading', locale),
    tripNotFound: locale === 'he' ? 'הטיול לא נמצא' : locale === 'ar' ? 'الرحلة غير موجودة' : 'Trip not found',
    loadTripError: locale === 'he' ? 'טעינת הטיול נכשלה' : locale === 'ar' ? 'فشل تحميل الرحلة' : 'Failed to load trip',
    generateError: locale === 'he' ? 'יצירת המסלול נכשלה' : locale === 'ar' ? 'فشل إنشاء المسار' : 'Failed to generate itinerary',
    saveError: locale === 'he' ? 'שמירת הטיול נכשלה' : locale === 'ar' ? 'فشل حفظ الرحلة' : 'Failed to save trip',
    deleteError: locale === 'he' ? 'מחיקת הטיול נכשלה' : locale === 'ar' ? 'فشل حذف الرحلة' : 'Failed to delete trip',
    createdStatus:
      locale === 'he'
        ? 'הטיול נוצר ונפתח בהצלחה.'
        : locale === 'ar'
          ? 'تم إنشاء الرحلة وفتحها بنجاح.'
          : 'Your trip has been created and opened successfully.',
    regeneratedStatus:
      locale === 'he'
        ? 'המסלול עודכן על ידי AI.'
        : locale === 'ar'
          ? 'تم تحديث المسار بواسطة الذكاء الاصطناعي.'
          : 'The itinerary was refreshed with AI.',
    savedStatus:
      locale === 'he'
        ? 'השינויים נשמרו.'
        : locale === 'ar'
          ? 'تم حفظ التغييرات.'
          : 'Your changes have been saved.',
    duplicatedStatus:
      locale === 'he'
        ? 'נוצר עותק חדש של הטיול.'
        : locale === 'ar'
          ? 'تم إنشاء نسخة جديدة من الرحلة.'
          : 'A duplicate trip was created.',
    duplicateError:
      locale === 'he' ? 'שכפול הטיול נכשל' : locale === 'ar' ? 'فشل نسخ الرحلة' : 'Failed to duplicate trip',
    duplicateAction:
      locale === 'he' ? 'שכפל טיול' : locale === 'ar' ? 'انسخ الرحلة' : 'Duplicate trip',
    languageHint:
      locale === 'he'
        ? 'כל יצירה מחדש תבוצע בשפה הפעילה כרגע.'
        : locale === 'ar'
          ? 'كل عملية توليد جديدة ستتم باللغة النشطة حالياً.'
          : 'Every AI regeneration uses the currently selected language.',
  }
}

export default function TripDetailPage() {
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = resolveLocale(params.locale as string) as Locale
  const tripId = params.id as string
  const copy = tripCopy[locale].detail
  const uiText = useMemo(() => buildUiText(locale), [locale])
  const editorLabels = useMemo(
    () => ({
      startingArea: locale === 'he' ? 'אזור יציאה' : locale === 'ar' ? 'منطقة الانطلاق' : 'Starting area',
      plannerNotes: locale === 'he' ? 'הערות ל-AI' : locale === 'ar' ? 'ملاحظات للذكاء الاصطناعي' : 'Notes for the AI',
      overview: locale === 'he' ? 'סיכום' : locale === 'ar' ? 'الملخص' : 'Overview',
      vibe: locale === 'he' ? 'אווירה' : locale === 'ar' ? 'الأجواء' : 'Vibe',
      whoItsFor: locale === 'he' ? 'למי זה מתאים' : locale === 'ar' ? 'لمن تناسب الرحلة' : 'Who it is for',
      bestTime: locale === 'he' ? 'הזמן המומלץ' : locale === 'ar' ? 'أفضل وقت' : 'Best time',
      weather: locale === 'he' ? 'הערת מזג אוויר' : locale === 'ar' ? 'ملاحظة طقس' : 'Weather note',
      tags: locale === 'he' ? 'תגיות' : locale === 'ar' ? 'وسوم' : 'Tags',
      checklist: locale === 'he' ? 'צ׳קליסט' : locale === 'ar' ? 'قائمة تجهيزات' : 'Checklist',
      practicalNotes: locale === 'he' ? 'הערות פרקטיות' : locale === 'ar' ? 'ملاحظات عملية' : 'Practical notes',
      accessibility: locale === 'he' ? 'הערות נגישות' : locale === 'ar' ? 'ملاحظات إمكانية الوصول' : 'Accessibility notes',
      hikingTips: locale === 'he' ? 'טיפים' : locale === 'ar' ? 'نصائح' : 'Tips',
      timeline: locale === 'he' ? 'ציר זמן' : locale === 'ar' ? 'الجدول اليومي' : 'Timeline',
      dayTitle: locale === 'he' ? 'כותרת יום' : locale === 'ar' ? 'عنوان اليوم' : 'Day title',
      daySummary: locale === 'he' ? 'סיכום יום' : locale === 'ar' ? 'ملخص اليوم' : 'Day summary',
      dayBullets: locale === 'he' ? 'פעילויות / נקודות עיקריות' : locale === 'ar' ? 'الأنشطة / النقاط الرئيسية' : 'Activities / highlights',
    }),
    [locale],
  )

  const [trip, setTrip] = useState<TripRecord | null>(null)
  const [draft, setDraft] = useState<EditableTripState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDuplicating, setIsDuplicating] = useState(false)

  const coverImage = useMemo(() => (trip ? getTripCoverImage(trip) : null), [trip])
  const preferenceBadges = useMemo(
    () => (trip ? getEnabledPreferenceLabels(trip.preferences, locale, 6) : []),
    [locale, trip],
  )

  useEffect(() => {
    if (!userLoading && !user) {
      router.push(`/${locale}/auth/login`)
    }
  }, [locale, router, user, userLoading])

  useEffect(() => {
    const fetchTrip = async () => {
      if (!user) return

      try {
        const supabase = createClient()
        const { data, error: fetchError } = await supabase
          .from('trips')
          .select('*')
          .eq('id', tripId)
          .eq('user_id', user.id)
          .single()

        if (fetchError) throw fetchError

        const nextTrip = data as TripRecord
        setTrip(nextTrip)
        setDraft(createEditableState(nextTrip))
      } catch (err) {
        setError(err instanceof Error ? err.message : uiText.loadTripError)
      } finally {
        setLoading(false)
      }
    }

    if (user && tripId) {
      fetchTrip()
    }
  }, [tripId, uiText.loadTripError, user])

  useEffect(() => {
    if (searchParams.get('fresh') === '1') {
      setStatus(uiText.createdStatus)
    }
  }, [searchParams, uiText.createdStatus])

  const handleGenerateItinerary = async () => {
    if (!trip || !draft) return

    try {
      setIsGenerating(true)
      setError(null)
      setStatus(null)

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: trip.id,
          title: draft.title,
          region: draft.region,
          duration: draft.duration_type,
          difficulty: draft.difficulty,
          preferences: draft.preferences,
          startingArea: draft.startingArea,
          plannerNotes: draft.plannerNotes,
          mapQuery: draft.mapQuery,
          coverImageUrl: draft.coverImageUrl,
          locale,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload.error || uiText.generateError)
      }

      const updatedTrip = payload as TripRecord
      setTrip(updatedTrip)
      setDraft(createEditableState(updatedTrip))
      setStatus(uiText.regeneratedStatus)
    } catch (err) {
      setError(err instanceof Error ? err.message : uiText.generateError)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!trip || !draft) return

    try {
      setIsSaving(true)
      setError(null)
      setStatus(null)

      const updatedTrip = await updateTrip(trip.id, {
        title: draft.title.trim(),
        region: draft.region,
        duration_type: draft.duration_type,
        difficulty: draft.difficulty,
        language_code: locale,
        preferences: draft.preferences,
        itinerary: {
          ...trip.itinerary,
          overview: draft.overview.trim(),
          vibe: draft.vibe.trim(),
          who_its_for: draft.whoItsFor.trim(),
          best_time: draft.bestTime.trim(),
          weather_note: draft.weatherNote.trim(),
          tags: normalizeStringArray(draft.tagsText),
          checklist: normalizeStringArray(draft.checklistText),
          practical_notes: normalizeStringArray(draft.practicalNotesText),
          accessibility_notes: normalizeStringArray(draft.accessibilityNotesText),
          hiking_tips: normalizeStringArray(draft.hikingTipsText),
          planner_notes: draft.plannerNotes.trim(),
          starting_area: draft.startingArea.trim(),
          cover_image_url: draft.coverImageUrl.trim(),
          map_query: draft.mapQuery.trim(),
          route: {
            ...(trip.itinerary?.route || {}),
            start: draft.startingArea.trim(),
            map_query: draft.mapQuery.trim() || trip.itinerary?.route?.map_query || '',
          },
          ...Object.fromEntries(
            draft.days.map((day, index) => [
              day.key || `day_${index + 1}`,
              {
                title: day.title.trim(),
                summary: day.summary.trim(),
                activities: normalizeStringArray(day.bulletsText),
              },
            ]),
          ),
        },
      })

      const nextTrip = updatedTrip as TripRecord
      setTrip(nextTrip)
      setDraft(createEditableState(nextTrip))
      setEditMode(false)
      setStatus(uiText.savedStatus)
    } catch (err) {
      setError(err instanceof Error ? err.message : uiText.saveError)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDuplicate = async () => {
    if (!trip) return

    try {
      setIsDuplicating(true)
      setError(null)
      const duplicated = await duplicateTrip(
        trip,
        locale === 'he' ? `${trip.title} (עותק)` : locale === 'ar' ? `${trip.title} (نسخة)` : `${trip.title} (Copy)`,
      )
      setStatus(uiText.duplicatedStatus)
      router.push(`/${locale}/dashboard/trip/${duplicated.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : uiText.duplicateError)
    } finally {
      setIsDuplicating(false)
    }
  }

  const handleDelete = async () => {
    if (!trip) return

    try {
      setIsDeleting(true)
      await deleteTrip(trip.id)
      router.push(`/${locale}/dashboard`)
    } catch (err) {
      setError(err instanceof Error ? err.message : uiText.deleteError)
      setIsDeleting(false)
    }
  }

  if (userLoading || loading) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header locale={locale} />
        </Suspense>
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">{uiText.loading}</p>
        </main>
      </>
    )
  }

  if (!trip || !draft) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header locale={locale} />
        </Suspense>
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="rounded-[2rem] border-destructive/40 bg-destructive/8 p-8 text-center text-destructive">
            {error || uiText.tripNotFound}
          </Card>
        </main>
      </>
    )
  }

  return (
    <>
      <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
        <Header locale={locale} />
      </Suspense>

      <main className="app-shell mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="rounded-full">
          <Link href={`/${locale}/dashboard`}>
            <ArrowLeft className="h-4 w-4" />
            {t('common.back', locale)}
          </Link>
        </Button>

        <div className="mt-6 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-card/82 shadow-[0_40px_120px_-64px_rgba(15,23,42,0.58)]">
              <div className="relative h-72 bg-gradient-to-br from-primary/16 via-accent/10 to-secondary/10 sm:h-96">
                {coverImage && (
                  <Image
                    src={coverImage}
                    alt={trip.title}
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur">
                    <Bot className="h-3.5 w-3.5" />
                    {copy.aiBadge}
                  </div>
                  <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">{trip.title}</h1>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm text-white backdrop-blur">
                      <MapPin className="h-4 w-4" />
                      {getRegionLabel(trip.region, locale)}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm text-white backdrop-blur">
                      <Sparkles className="h-4 w-4" />
                      {getDurationLabel(trip.duration_type, locale)}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm text-white backdrop-blur">
                      {getDifficultyLabel(trip.difficulty, locale)}
                    </span>
                    {preferenceBadges.map((badge) => (
                      <span key={badge} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm text-white backdrop-blur">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 p-6 sm:p-8">
                {status && (
                  <Card className="mb-4 rounded-[1.25rem] border-primary/25 bg-primary/8 p-4 text-sm text-foreground">
                    {status}
                  </Card>
                )}

                {error && (
                  <Card className="mb-4 rounded-[1.25rem] border-destructive/40 bg-destructive/8 p-4 text-sm text-destructive">
                    {error}
                  </Card>
                )}

                {editMode ? (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-foreground">{copy.tripName}</label>
                        <Input
                          value={draft.title}
                          onChange={(event) => setDraft((current) => (current ? { ...current, title: event.target.value } : current))}
                          className="h-12 rounded-2xl"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{copy.region}</label>
                        <select
                          value={draft.region}
                          onChange={(event) => setDraft((current) => (current ? { ...current, region: event.target.value } : current))}
                          className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm text-foreground"
                        >
                          {REGIONS.map((region) => (
                            <option key={region} value={region}>{getRegionLabel(region, locale)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{copy.duration}</label>
                        <select
                          value={draft.duration_type}
                          onChange={(event) => setDraft((current) => (current ? { ...current, duration_type: event.target.value } : current))}
                          className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm text-foreground"
                        >
                          {DURATIONS.map((duration) => (
                            <option key={duration} value={duration}>{getDurationLabel(duration, locale)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{copy.difficulty}</label>
                        <select
                          value={draft.difficulty}
                          onChange={(event) => setDraft((current) => (current ? { ...current, difficulty: event.target.value } : current))}
                          className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm text-foreground"
                        >
                          {DIFFICULTIES.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>{getDifficultyLabel(difficulty, locale)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{copy.mapQuery}</label>
                        <Input
                          value={draft.mapQuery}
                          onChange={(event) => setDraft((current) => (current ? { ...current, mapQuery: event.target.value } : current))}
                          placeholder={copy.mapQueryPlaceholder}
                          className="h-12 rounded-2xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-foreground">{copy.imageUrl}</label>
                        <Input
                          value={draft.coverImageUrl}
                          onChange={(event) => setDraft((current) => (current ? { ...current, coverImageUrl: event.target.value } : current))}
                          placeholder={copy.imageUrlPlaceholder}
                          className="h-12 rounded-2xl"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.startingArea}</label>
                        <Input
                          value={draft.startingArea}
                          onChange={(event) => setDraft((current) => (current ? { ...current, startingArea: event.target.value } : current))}
                          className="h-12 rounded-2xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.plannerNotes}</label>
                        <Textarea
                          value={draft.plannerNotes}
                          onChange={(event) => setDraft((current) => (current ? { ...current, plannerNotes: event.target.value } : current))}
                          className="min-h-28 rounded-[1.5rem]"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-medium text-foreground">{copy.preferences}</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {getPreferenceOptions(locale).map(({ key, label }) => {
                          const checked = Boolean(draft.preferences[key])

                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() =>
                                setDraft((current) =>
                                  current
                                    ? {
                                        ...current,
                                        preferences: {
                                          ...current.preferences,
                                          [key]: !checked,
                                        },
                                      }
                                    : current,
                                )
                              }
                              className={`rounded-[1.25rem] border p-4 text-left ${
                                checked ? 'border-primary bg-primary/8' : 'border-border/80 hover:border-primary/35'
                              }`}
                            >
                              {label}
                            </button>
                          )
                        })}
                      </div>
                      <Input
                        value={draft.preferences.otherPreferences}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? {
                                  ...current,
                                  preferences: {
                                    ...current.preferences,
                                    otherPreferences: event.target.value,
                                  },
                                }
                              : current,
                          )
                        }
                        placeholder={tripCopy[locale].wizard.otherPreferencesPlaceholder}
                        className="mt-4 h-12 rounded-2xl"
                      />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.overview}</label>
                        <Textarea
                          value={draft.overview}
                          onChange={(event) => setDraft((current) => (current ? { ...current, overview: event.target.value } : current))}
                          className="min-h-28 rounded-[1.5rem]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.vibe}</label>
                        <Textarea
                          value={draft.vibe}
                          onChange={(event) => setDraft((current) => (current ? { ...current, vibe: event.target.value } : current))}
                          className="min-h-28 rounded-[1.5rem]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.whoItsFor}</label>
                        <Textarea
                          value={draft.whoItsFor}
                          onChange={(event) => setDraft((current) => (current ? { ...current, whoItsFor: event.target.value } : current))}
                          className="min-h-24 rounded-[1.5rem]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.bestTime}</label>
                        <Input
                          value={draft.bestTime}
                          onChange={(event) => setDraft((current) => (current ? { ...current, bestTime: event.target.value } : current))}
                          className="h-12 rounded-2xl"
                        />
                      </div>

                      <div className="lg:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.weather}</label>
                        <Textarea
                          value={draft.weatherNote}
                          onChange={(event) => setDraft((current) => (current ? { ...current, weatherNote: event.target.value } : current))}
                          className="min-h-24 rounded-[1.5rem]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.tags}</label>
                        <Textarea
                          value={draft.tagsText}
                          onChange={(event) => setDraft((current) => (current ? { ...current, tagsText: event.target.value } : current))}
                          className="min-h-24 rounded-[1.5rem]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.checklist}</label>
                        <Textarea
                          value={draft.checklistText}
                          onChange={(event) => setDraft((current) => (current ? { ...current, checklistText: event.target.value } : current))}
                          className="min-h-24 rounded-[1.5rem]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.practicalNotes}</label>
                        <Textarea
                          value={draft.practicalNotesText}
                          onChange={(event) => setDraft((current) => (current ? { ...current, practicalNotesText: event.target.value } : current))}
                          className="min-h-24 rounded-[1.5rem]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.accessibility}</label>
                        <Textarea
                          value={draft.accessibilityNotesText}
                          onChange={(event) => setDraft((current) => (current ? { ...current, accessibilityNotesText: event.target.value } : current))}
                          className="min-h-24 rounded-[1.5rem]"
                        />
                      </div>

                      <div className="lg:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-foreground">{editorLabels.hikingTips}</label>
                        <Textarea
                          value={draft.hikingTipsText}
                          onChange={(event) => setDraft((current) => (current ? { ...current, hikingTipsText: event.target.value } : current))}
                          className="min-h-24 rounded-[1.5rem]"
                        />
                      </div>
                    </div>

                    {draft.days.length > 0 && (
                      <div>
                        <p className="mb-3 text-sm font-medium text-foreground">{editorLabels.timeline}</p>
                        <div className="space-y-4">
                          {draft.days.map((day, index) => (
                            <Card key={day.key} className="rounded-[1.5rem] border-white/10 bg-muted/20 p-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{`${editorLabels.dayTitle} ${index + 1}`}</p>
                              <Input
                                value={day.title}
                                onChange={(event) =>
                                  setDraft((current) =>
                                    current
                                      ? {
                                          ...current,
                                          days: current.days.map((entry) =>
                                            entry.key === day.key ? { ...entry, title: event.target.value } : entry,
                                          ),
                                        }
                                      : current,
                                  )
                                }
                                className="mt-3 h-12 rounded-2xl"
                              />
                              <label className="mb-2 mt-4 block text-sm font-medium text-foreground">{editorLabels.daySummary}</label>
                              <Textarea
                                value={day.summary}
                                onChange={(event) =>
                                  setDraft((current) =>
                                    current
                                      ? {
                                          ...current,
                                          days: current.days.map((entry) =>
                                            entry.key === day.key ? { ...entry, summary: event.target.value } : entry,
                                          ),
                                        }
                                      : current,
                                  )
                                }
                                className="min-h-24 rounded-[1.5rem]"
                              />
                              <label className="mb-2 mt-4 block text-sm font-medium text-foreground">{editorLabels.dayBullets}</label>
                              <Textarea
                                value={day.bulletsText}
                                onChange={(event) =>
                                  setDraft((current) =>
                                    current
                                      ? {
                                          ...current,
                                          days: current.days.map((entry) =>
                                            entry.key === day.key ? { ...entry, bulletsText: event.target.value } : entry,
                                          ),
                                        }
                                      : current,
                                  )
                                }
                                className="min-h-24 rounded-[1.5rem]"
                              />
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button className="rounded-full px-6" onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                        {copy.save}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full px-6"
                        onClick={() => {
                          setDraft(createEditableState(trip))
                          setEditMode(false)
                        }}
                      >
                        {copy.cancel}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <TripItinerary trip={trip} locale={locale} />
                )}

                {!editMode && Object.keys(trip.itinerary || {}).length === 0 && (
                  <Card className="rounded-[1.75rem] border-white/10 bg-card/80 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.noItineraryTitle}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.noItineraryBody}</p>
                    <Button className="mt-5 rounded-full" onClick={handleGenerateItinerary} disabled={isGenerating}>
                      {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
                      {copy.generate}
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <Card className="rounded-[2rem] border-white/10 bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.actions}</p>
              <div className="mt-4 flex flex-col gap-3">
                <Button className="justify-start rounded-full" onClick={() => setEditMode(true)}>
                  <Pencil className="h-4 w-4" />
                  {copy.edit}
                </Button>
                <Button variant="outline" className="justify-start rounded-full" onClick={handleDuplicate} disabled={isDuplicating}>
                  {isDuplicating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Copy className="h-4 w-4" />}
                  {uiText.duplicateAction}
                </Button>
                <Button variant="outline" className="justify-start rounded-full" onClick={handleGenerateItinerary} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
                  {copy.regenerate}
                </Button>
                <Button asChild variant="outline" className="justify-start rounded-full">
                  <Link href={`/${locale}/dashboard/trip/${trip.id}/share`}>
                    <Share2 className="h-4 w-4" />
                    {copy.shareTrip}
                  </Link>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="justify-start rounded-full">
                      <Trash2 className="h-4 w-4" />
                      {copy.delete}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[1.75rem] border-white/10 bg-background/95">
                    <AlertDialogHeader>
                      <AlertDialogTitle>{copy.deleteTitle}</AlertDialogTitle>
                      <AlertDialogDescription>{copy.deleteBody}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-full">{copy.cancel}</AlertDialogCancel>
                      <AlertDialogAction
                        className="rounded-full bg-destructive text-destructive-foreground"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
                        {copy.deleteConfirm}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-white/10 bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.language}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{uiText.languageHint}</p>
            </Card>
          </aside>
        </div>
      </main>
    </>
  )
}
