'use client'

import { Brain, Clock3, Compass, MapPin, TrendingUp } from 'lucide-react'
import { Suspense, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { LogoMark } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/use-auth'
import { createTrip, useTrips } from '@/hooks/use-trips'
import { resolveLocale, t, type Locale } from '@/lib/i18n'
import { getSampleTripSeed } from '@/lib/sample-trips'
import { tripCopy } from '@/lib/trip-copy'
import { type TripPreferences } from '@/lib/trip-model'
import {
  DIFFICULTIES,
  DURATIONS,
  getDifficultyLabel,
  getDurationLabel,
  getEnabledPreferenceLabels,
  getPreferenceOptions,
  getRegionLabel,
  getSuggestedTripTitle,
  REGIONS,
} from '@/lib/trip-options'

type Step = 'region' | 'duration' | 'difficulty' | 'preferences' | 'review'

const OTHER_OPTION = '__other__'
const STEPS: Step[] = ['region', 'duration', 'difficulty', 'preferences', 'review']

interface TripWizardData {
  title: string
  region: string
  duration_type: string
  difficulty: string
  customRegion: string
  customDuration: string
  customDifficulty: string
  startingArea: string
  plannerNotes: string
  coverImageUrl: string
  mapQuery: string
  preferences: TripPreferences & {
    familyFriendly: boolean
    kidsFriendly: boolean
    strollerFriendly: boolean
    dogFriendly: boolean
    romantic: boolean
    waterFeatures: boolean
    camping: boolean
    viewpoints: boolean
    archaeological: boolean
    wildflowers: boolean
    photography: boolean
    accessibleRoutes: boolean
    wheelchairFriendly: boolean
    lowMobilityFriendly: boolean
    otherPreferences: string
  }
}

function buildUiText(locale: Locale) {
  return {
    loading: t('common.loading', locale),
    previous: t('wizard.prev', locale),
    next: t('wizard.next', locale),
    preview: locale === 'he' ? 'תצוגה מקדימה' : locale === 'ar' ? 'معاينة' : 'Preview',
    untitledTrip: locale === 'he' ? 'טיול ללא שם' : locale === 'ar' ? 'رحلة بدون اسم' : 'Untitled trip',
    selectRegion: locale === 'he' ? 'בחר אזור' : locale === 'ar' ? 'اختر منطقة' : 'Select a region',
    selectDuration: locale === 'he' ? 'בחר משך' : locale === 'ar' ? 'اختر مدة' : 'Select a duration',
    selectDifficulty: locale === 'he' ? 'בחר רמת קושי' : locale === 'ar' ? 'اختر مستوى الصعوبة' : 'Select a difficulty',
    completeStep:
      locale === 'he'
        ? 'אנא השלם את השלב הזה לפני שממשיכים.'
        : locale === 'ar'
          ? 'يرجى إكمال هذه الخطوة قبل المتابعة.'
          : 'Please complete this step before continuing.',
    finishSetup:
      locale === 'he'
        ? 'אנא השלם את פרטי הטיול לפני היצירה.'
        : locale === 'ar'
          ? 'يرجى إكمال إعدادات الرحلة قبل الإنشاء.'
          : 'Please finish the trip setup before generating.',
    failedGenerate: locale === 'he' ? 'יצירת הטיול נכשלה' : locale === 'ar' ? 'فشل إنشاء الرحلة' : 'Failed to generate trip',
    mapQueryPlaceholder:
      locale === 'he'
        ? 'לדוגמה: Banias Waterfall Israel'
        : locale === 'ar'
          ? 'مثال: Banias Waterfall Israel'
          : 'Example: Banias Waterfall Israel',
    imagePlaceholder:
      locale === 'he'
        ? 'הדבק קישור לתמונת כיסוי של הטיול'
        : locale === 'ar'
          ? 'ألصق رابط صورة غلاف للرحلة'
          : 'Paste an image URL for the trip cover',
    startingAreaLabel: locale === 'he' ? 'אזור יציאה' : locale === 'ar' ? 'منطقة الانطلاق' : 'Starting area',
    startingAreaPlaceholder:
      locale === 'he'
        ? 'מאיפה אתם יוצאים?'
        : locale === 'ar'
          ? 'من أين ستنطلقون؟'
          : 'Where are you starting from?',
    plannerNotesLabel: locale === 'he' ? 'הערות ל-AI' : locale === 'ar' ? 'ملاحظات للذكاء الاصطناعي' : 'Notes for the AI',
    plannerNotesPlaceholder:
      locale === 'he'
        ? 'מה חשוב שהטיול ירגיש? אילו מגבלות או העדפות נוספות יש?'
        : locale === 'ar'
          ? 'كيف يجب أن تشعر الرحلة؟ ما القيود أو التفضيلات الإضافية؟'
          : 'What should the trip feel like? Any constraints or extra preferences?',
    selectedPreferences: locale === 'he' ? 'דגשים שנבחרו' : locale === 'ar' ? 'التفضيلات المختارة' : 'Selected preferences',
    noPreferencesYet:
      locale === 'he'
        ? 'עדיין לא בחרת דגשים מיוחדים.'
        : locale === 'ar'
          ? 'لم يتم اختيار تفضيلات إضافية بعد.'
          : 'No extra preferences selected yet.',
    sampleLoaded:
      locale === 'he'
        ? 'הדוגמה שבחרת נטענה ומוכנה להתאמה אישית.'
        : locale === 'ar'
          ? 'تم تحميل النموذج الذي اخترته وهو جاهز للتخصيص.'
          : 'Your selected sample has been loaded and is ready to personalize.',
    sampleHint:
      locale === 'he'
        ? 'אפשר לשנות כל שדה לפני היצירה.'
        : locale === 'ar'
          ? 'يمكنك تعديل كل حقل قبل الإنشاء.'
          : 'You can change every field before generation.',
    reviewHint:
      locale === 'he'
        ? 'כל מה שתכתוב כאן נשמר ונשלח גם ל-AI.'
        : locale === 'ar'
          ? 'كل ما تكتبه هنا يتم حفظه وإرساله أيضًا إلى الذكاء الاصطناعي.'
          : 'Everything you add here is saved and also sent to the AI.',
  }
}

export default function TripWizardPage() {
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = resolveLocale(params.locale as string) as Locale
  const copy = tripCopy[locale].wizard
  const { mutate } = useTrips()
  const [step, setStep] = useState<Step>('region')
  const [error, setError] = useState<string | null>(null)
  const [sampleNotice, setSampleNotice] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [tripData, setTripData] = useState<TripWizardData>({
    title: '',
    region: '',
    duration_type: '',
    difficulty: '',
    customRegion: '',
    customDuration: '',
    customDifficulty: '',
    startingArea: '',
    plannerNotes: '',
    coverImageUrl: '',
    mapQuery: '',
    preferences: {
      familyFriendly: false,
      kidsFriendly: false,
      strollerFriendly: false,
      dogFriendly: false,
      romantic: false,
      waterFeatures: false,
      camping: false,
      viewpoints: false,
      archaeological: false,
      wildflowers: false,
      photography: false,
      accessibleRoutes: false,
      wheelchairFriendly: false,
      lowMobilityFriendly: false,
      otherPreferences: '',
    },
  })

  const uiText = useMemo(() => buildUiText(locale), [locale])
  const resolvedRegion = tripData.region === OTHER_OPTION ? tripData.customRegion.trim() : tripData.region
  const resolvedDuration = tripData.duration_type === OTHER_OPTION ? tripData.customDuration.trim() : tripData.duration_type
  const resolvedDifficulty = tripData.difficulty === OTHER_OPTION ? tripData.customDifficulty.trim() : tripData.difficulty
  const suggestedTitle = useMemo(() => getSuggestedTripTitle(resolvedRegion, locale), [resolvedRegion, locale])
  const regionOptions = useMemo(
    () => REGIONS.map((region) => ({ value: region, label: getRegionLabel(region, locale) })),
    [locale],
  )
  const durationOptions = useMemo(
    () => DURATIONS.map((duration) => ({ value: duration, label: getDurationLabel(duration, locale) })),
    [locale],
  )
  const difficultyOptions = useMemo(
    () => DIFFICULTIES.map((difficulty) => ({ value: difficulty, label: getDifficultyLabel(difficulty, locale) })),
    [locale],
  )
  const previewRegion = resolvedRegion ? getRegionLabel(resolvedRegion, locale) : ''
  const previewDuration = resolvedDuration ? getDurationLabel(resolvedDuration, locale) : ''
  const previewDifficulty = resolvedDifficulty ? getDifficultyLabel(resolvedDifficulty, locale) : ''
  const selectedPreferences = getEnabledPreferenceLabels(tripData.preferences, locale)
  const progress = STEPS.indexOf(step) + 1

  const generationMessages = useMemo(
    () => [
      copy.generatingBody,
      locale === 'he'
        ? 'מתאימים מסלול לפי האזור, רמת הקושי ותחומי העניין שלך.'
        : locale === 'ar'
          ? 'نطابق المسارات مع المنطقة ومستوى الصعوبة واهتماماتك.'
          : 'Matching trails to your region, difficulty, and interests.',
      locale === 'he'
        ? 'מארגנים המלצות יומיות, קצב טיול ונקודות מפה.'
        : locale === 'ar'
          ? 'نجهز توصيات يومية وإيقاع الرحلة ونقاط الخريطة.'
          : 'Preparing daily recommendations, pacing, and route hints.',
    ],
    [copy.generatingBody, locale],
  )

  useEffect(() => {
    if (!userLoading && !user) {
      const sampleId = searchParams.get('sample')
      router.push(sampleId ? `/${locale}/auth/login?sample=${sampleId}` : `/${locale}/auth/login`)
    }
  }, [locale, router, searchParams, user, userLoading])

  useEffect(() => {
    const sample = getSampleTripSeed(searchParams.get('sample'))
    if (!sample) return

    setTripData((current) => ({
      ...current,
      title: sample.title[locale],
      region: sample.region,
      duration_type: sample.duration_type,
      difficulty: sample.difficulty,
      startingArea: sample.startingArea,
      plannerNotes: sample.plannerNotes[locale],
      coverImageUrl: sample.coverImageUrl,
      mapQuery: sample.mapQuery,
      preferences: {
        ...current.preferences,
        ...sample.preferences,
        otherPreferences:
          typeof sample.preferences.otherPreferences === 'string'
            ? sample.preferences.otherPreferences
            : current.preferences.otherPreferences,
      },
    }))
    setSampleNotice(uiText.sampleLoaded)
  }, [locale, searchParams, uiText.sampleLoaded])

  useEffect(() => {
    if (!isGenerating) return

    const timer = window.setInterval(() => {
      setGenerationStep((current) => (current + 1) % generationMessages.length)
    }, 1800)

    return () => window.clearInterval(timer)
  }, [generationMessages.length, isGenerating])

  const canContinue = () => {
    if (step === 'region') return Boolean(resolvedRegion)
    if (step === 'duration') return Boolean(resolvedDuration)
    if (step === 'difficulty') return Boolean(resolvedDifficulty)
    return true
  }

  const handleNext = () => {
    if (!canContinue()) {
      setError(uiText.completeStep)
      return
    }

    setError(null)
    setStep(STEPS[Math.min(STEPS.indexOf(step) + 1, STEPS.length - 1)])
  }

  const handlePrev = () => {
    setError(null)
    setStep(STEPS[Math.max(STEPS.indexOf(step) - 1, 0)])
  }

  const handleGenerateTrip = async () => {
    try {
      setIsGenerating(true)
      setError(null)

      if (!resolvedRegion || !resolvedDuration || !resolvedDifficulty) {
        throw new Error(uiText.finishSetup)
      }

      const createdTrip = await createTrip({
        title: tripData.title.trim() || suggestedTitle,
        region: resolvedRegion,
        duration_type: resolvedDuration,
        difficulty: resolvedDifficulty,
        language_code: locale,
        preferences: tripData.preferences,
        itinerary: {
          cover_image_url: tripData.coverImageUrl.trim(),
          map_query: tripData.mapQuery.trim(),
          language: locale,
          starting_area: tripData.startingArea.trim(),
          planner_notes: tripData.plannerNotes.trim(),
          route: {
            map_query: tripData.mapQuery.trim(),
            start: tripData.startingArea.trim(),
          },
        },
      })

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: createdTrip.id,
          title: tripData.title.trim() || suggestedTitle,
          region: resolvedRegion,
          duration: resolvedDuration,
          difficulty: resolvedDifficulty,
          preferences: tripData.preferences,
          startingArea: tripData.startingArea.trim(),
          plannerNotes: tripData.plannerNotes.trim(),
          mapQuery: tripData.mapQuery.trim(),
          coverImageUrl: tripData.coverImageUrl.trim(),
          locale,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(
          payload.error ||
            (locale === 'he'
              ? 'יצירת המסלול נכשלה'
              : locale === 'ar'
                ? 'فشل إنشاء المسار'
                : 'Failed to generate itinerary'),
        )
      }

      await mutate()
      router.push(`/${locale}/dashboard/trip/${createdTrip.id}?fresh=1`)
    } catch (err) {
      setError(err instanceof Error ? err.message : uiText.failedGenerate)
      setIsGenerating(false)
    }
  }

  const renderChoiceCard = ({
    icon,
    label,
    active,
    onClick,
  }: {
    icon: ReactNode
    label: string
    active: boolean
    onClick: () => void
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-[1.5rem] border p-5 text-left transition-all ${
        active
          ? 'travel-panel border-primary/35 shadow-[0_28px_82px_-52px_rgba(156,98,67,0.38)]'
          : 'travel-card border-border/80 bg-card/70 hover:border-primary/40 hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary'}`}>
          {icon}
        </div>
        <span className="font-medium text-foreground">{label}</span>
      </div>
    </button>
  )

  if (userLoading) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header locale={locale} />
        </Suspense>
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">{uiText.loading}</p>
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
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="travel-panel animate-float-up rounded-[2.35rem] p-8">
              <div className="travel-kicker">
                <LogoMark className="h-4 w-4" />
                {copy.aiBadge}
              </div>

              <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h1 className="brand-display text-balance text-5xl text-foreground">
                    {copy.smartQuestions}
                  </h1>
                  <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">{copy.subtitle}</p>
                </div>

                <div className="travel-card min-w-[220px] rounded-[1.5rem] p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">{`${copy.stepLabel} ${progress}`}</span>
                    <span className="font-semibold text-foreground">{`${progress}/${STEPS.length}`}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/50">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
                      style={{ width: `${(progress / STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {sampleNotice && (
              <Card className="travel-card rounded-[1.5rem] border-primary/25 bg-primary/8 p-4 text-sm text-foreground">
                <p>{sampleNotice}</p>
                <p className="mt-1 text-muted-foreground">{uiText.sampleHint}</p>
              </Card>
            )}

            {error && (
              <Card className="rounded-[1.5rem] border-destructive/40 bg-destructive/8 p-4 text-sm text-destructive">
                {error}
              </Card>
            )}

            <Card className="travel-card rounded-[2rem] p-6 sm:p-8">
              {step === 'region' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">{copy.regionQuestion}</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {regionOptions.map((region) =>
                      renderChoiceCard({
                        icon: <MapPin className="h-5 w-5" />,
                        label: region.label,
                        active: tripData.region === region.value,
                        onClick: () => setTripData((current) => ({ ...current, region: region.value })),
                      }),
                    )}
                    {renderChoiceCard({
                      icon: <Compass className="h-5 w-5" />,
                      label: copy.otherLocation,
                      active: tripData.region === OTHER_OPTION,
                      onClick: () => setTripData((current) => ({ ...current, region: OTHER_OPTION })),
                    })}
                  </div>
                  {tripData.region === OTHER_OPTION && (
                    <Input
                      value={tripData.customRegion}
                      onChange={(event) => setTripData((current) => ({ ...current, customRegion: event.target.value }))}
                      placeholder={copy.customLocationPlaceholder}
                      className="h-12 rounded-2xl"
                    />
                  )}
                </div>
              )}

              {step === 'duration' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">{copy.durationQuestion}</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {durationOptions.map((duration) =>
                      renderChoiceCard({
                        icon: <Clock3 className="h-5 w-5" />,
                        label: duration.label,
                        active: tripData.duration_type === duration.value,
                        onClick: () => setTripData((current) => ({ ...current, duration_type: duration.value })),
                      }),
                    )}
                    {renderChoiceCard({
                      icon: <Clock3 className="h-5 w-5" />,
                      label: copy.otherDuration,
                      active: tripData.duration_type === OTHER_OPTION,
                      onClick: () => setTripData((current) => ({ ...current, duration_type: OTHER_OPTION })),
                    })}
                  </div>
                  {tripData.duration_type === OTHER_OPTION && (
                    <Input
                      value={tripData.customDuration}
                      onChange={(event) => setTripData((current) => ({ ...current, customDuration: event.target.value }))}
                      placeholder={copy.customDurationPlaceholder}
                      className="h-12 rounded-2xl"
                    />
                  )}
                </div>
              )}

              {step === 'difficulty' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">{copy.difficultyQuestion}</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {difficultyOptions.map((difficulty) =>
                      renderChoiceCard({
                        icon: <TrendingUp className="h-5 w-5" />,
                        label: difficulty.label,
                        active: tripData.difficulty === difficulty.value,
                        onClick: () => setTripData((current) => ({ ...current, difficulty: difficulty.value })),
                      }),
                    )}
                    {renderChoiceCard({
                      icon: <TrendingUp className="h-5 w-5" />,
                      label: copy.otherDifficulty,
                      active: tripData.difficulty === OTHER_OPTION,
                      onClick: () => setTripData((current) => ({ ...current, difficulty: OTHER_OPTION })),
                    })}
                  </div>
                  {tripData.difficulty === OTHER_OPTION && (
                    <Input
                      value={tripData.customDifficulty}
                      onChange={(event) => setTripData((current) => ({ ...current, customDifficulty: event.target.value }))}
                      placeholder={copy.customDifficultyPlaceholder}
                      className="h-12 rounded-2xl"
                    />
                  )}
                </div>
              )}

              {step === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{copy.preferencesQuestion}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.preferencesBody}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {getPreferenceOptions(locale).map(({ key, label }) => {
                      const checked = Boolean(tripData.preferences[key])

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            setTripData((current) => ({
                              ...current,
                              preferences: {
                                ...current.preferences,
                                [key]: !checked,
                              },
                            }))
                          }
                          className={`rounded-[1.25rem] border p-4 text-left ${
                            checked ? 'travel-card-soft border-primary/30 bg-primary/8' : 'travel-card border-border/80 hover:border-primary/35'
                          }`}
                        >
                          <span className="font-medium text-foreground">{label}</span>
                        </button>
                      )
                    })}
                  </div>

                  <Input
                    value={tripData.preferences.otherPreferences}
                    onChange={(event) =>
                      setTripData((current) => ({
                        ...current,
                        preferences: {
                          ...current.preferences,
                          otherPreferences: event.target.value,
                        },
                      }))
                    }
                    placeholder={copy.otherPreferencesPlaceholder}
                    className="h-12 rounded-2xl"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">{uiText.startingAreaLabel}</label>
                      <Input
                        value={tripData.startingArea}
                        onChange={(event) => setTripData((current) => ({ ...current, startingArea: event.target.value }))}
                        placeholder={uiText.startingAreaPlaceholder}
                        className="h-12 rounded-2xl"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-foreground">{uiText.plannerNotesLabel}</label>
                      <Textarea
                        value={tripData.plannerNotes}
                        onChange={(event) => setTripData((current) => ({ ...current, plannerNotes: event.target.value }))}
                        placeholder={uiText.plannerNotesPlaceholder}
                        className="min-h-28 rounded-[1.5rem]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{copy.reviewTitle}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.autoRedirect}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{uiText.reviewHint}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">{copy.tripName}</label>
                      <Input
                        value={tripData.title}
                        onChange={(event) => setTripData((current) => ({ ...current, title: event.target.value }))}
                        placeholder={suggestedTitle || copy.tripName}
                        className="h-12 rounded-2xl"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">{copy.mapQuery}</label>
                      <Input
                        value={tripData.mapQuery}
                        onChange={(event) => setTripData((current) => ({ ...current, mapQuery: event.target.value }))}
                        placeholder={uiText.mapQueryPlaceholder}
                        className="h-12 rounded-2xl"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">{uiText.startingAreaLabel}</label>
                      <Input
                        value={tripData.startingArea}
                        onChange={(event) => setTripData((current) => ({ ...current, startingArea: event.target.value }))}
                        placeholder={uiText.startingAreaPlaceholder}
                        className="h-12 rounded-2xl"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">{copy.imageUrl}</label>
                      <Input
                        value={tripData.coverImageUrl}
                        onChange={(event) => setTripData((current) => ({ ...current, coverImageUrl: event.target.value }))}
                        placeholder={uiText.imagePlaceholder}
                        className="h-12 rounded-2xl"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-foreground">{uiText.plannerNotesLabel}</label>
                      <Textarea
                        value={tripData.plannerNotes}
                        onChange={(event) => setTripData((current) => ({ ...current, plannerNotes: event.target.value }))}
                        placeholder={uiText.plannerNotesPlaceholder}
                        className="min-h-28 rounded-[1.5rem]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 rounded-[1.5rem] border border-border/70 bg-muted/30 p-5 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.regionQuestion}</p>
                      <p className="mt-2 font-medium text-foreground">{previewRegion}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.durationQuestion}</p>
                      <p className="mt-2 font-medium text-foreground">{previewDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{copy.difficultyQuestion}</p>
                      <p className="mt-2 font-medium text-foreground">{previewDifficulty}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full px-6"
                  onClick={handlePrev}
                  disabled={step === 'region' || isGenerating}
                >
                  {uiText.previous}
                </Button>

                {step === 'review' ? (
                  <Button type="button" className="rounded-full px-6" onClick={handleGenerateTrip} disabled={isGenerating}>
                    <Brain className="h-4 w-4" />
                    {copy.create}
                  </Button>
                ) : (
                  <Button type="button" className="rounded-full px-6" onClick={handleNext}>
                    {uiText.next}
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="travel-card rounded-[2rem] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{copy.generatingTitle}</p>
                  <p className="text-sm text-muted-foreground">{generationMessages[generationStep]}</p>
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary ${isGenerating ? 'animate-shimmer' : ''}`}
                  style={{ width: isGenerating ? '100%' : `${(progress / STEPS.length) * 100}%` }}
                />
              </div>
            </Card>

            <Card className="travel-card rounded-[2rem] p-6">
              <p className="travel-kicker">{uiText.preview}</p>
              <div className="mt-4 space-y-4">
                <div className="travel-card-soft rounded-[1.5rem] p-5">
                  <p className="text-sm text-muted-foreground">{copy.tripName}</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">{tripData.title.trim() || suggestedTitle || uiText.untitledTrip}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="travel-card-soft rounded-[1.25rem] p-4">
                    <p className="text-sm text-muted-foreground">{copy.regionQuestion}</p>
                    <p className="mt-1 font-medium text-foreground">{previewRegion || uiText.selectRegion}</p>
                  </div>
                  <div className="travel-card-soft rounded-[1.25rem] p-4">
                    <p className="text-sm text-muted-foreground">{copy.durationQuestion}</p>
                    <p className="mt-1 font-medium text-foreground">{previewDuration || uiText.selectDuration}</p>
                  </div>
                  <div className="travel-card-soft rounded-[1.25rem] p-4 sm:col-span-2">
                    <p className="text-sm text-muted-foreground">{copy.difficultyQuestion}</p>
                    <p className="mt-1 font-medium text-foreground">{previewDifficulty || uiText.selectDifficulty}</p>
                  </div>
                  <div className="travel-card-soft rounded-[1.25rem] p-4 sm:col-span-2">
                    <p className="text-sm text-muted-foreground">{uiText.startingAreaLabel}</p>
                    <p className="mt-1 font-medium text-foreground">{tripData.startingArea || uiText.startingAreaPlaceholder}</p>
                  </div>
                </div>

                <div className="travel-card-soft rounded-[1.25rem] p-4">
                  <p className="text-sm text-muted-foreground">{uiText.selectedPreferences}</p>
                  {selectedPreferences.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedPreferences.map((label) => (
                        <span key={label} className="travel-chip">
                          {label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{uiText.noPreferencesYet}</p>
                  )}
                </div>

                {(tripData.preferences.otherPreferences || tripData.plannerNotes) && (
                  <div className="travel-card-soft rounded-[1.25rem] p-4">
                    <p className="text-sm text-muted-foreground">{uiText.plannerNotesLabel}</p>
                    <p className="mt-1 font-medium text-foreground">{tripData.preferences.otherPreferences || tripData.plannerNotes}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
