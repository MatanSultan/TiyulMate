'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { createTrip, useTrips } from '@/hooks/use-trips'
import { t, type Locale } from '@/lib/i18n'

type Step = 'region' | 'duration' | 'difficulty' | 'preferences' | 'review'

const REGIONS = ['Golan Heights', 'Galilee', 'Carmel', 'Judean Hills', 'Dead Sea', 'Negev', 'Eilat']
const DURATIONS = ['1 day', '2-3 days', '4-7 days', 'multi-week']
const DIFFICULTIES = ['Easy', 'Moderate', 'Hard', 'Expert']
const OTHER_OPTION = 'Other'

interface TripData {
  title: string
  region: string
  duration_type: string
  difficulty: string
  customRegion: string
  customDuration: string
  customDifficulty: string
  preferences: {
    waterFeatures: boolean
    camping: boolean
    viewpoints: boolean
    archaeological: boolean
    wildflowers: boolean
    photography: boolean
  }
  otherPreferences: string
}

const PREFERENCE_OPTIONS: Array<{ key: keyof TripData['preferences']; label: string }> = [
  { key: 'waterFeatures', label: 'Water features (waterfalls, springs)' },
  { key: 'camping', label: 'Camping opportunities' },
  { key: 'viewpoints', label: 'Scenic viewpoints' },
  { key: 'archaeological', label: 'Archaeological sites' },
  { key: 'wildflowers', label: 'Wildflowers and nature' },
  { key: 'photography', label: 'Photography spots' },
]

export default function TripWizard() {
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as Locale
  const { mutate } = useTrips()
  const [step, setStep] = useState<Step>('region')
  const [tripData, setTripData] = useState<TripData>({
    title: '',
    region: '',
    duration_type: '',
    difficulty: '',
    customRegion: '',
    customDuration: '',
    customDifficulty: '',
    preferences: {
      waterFeatures: false,
      camping: false,
      viewpoints: false,
      archaeological: false,
      wildflowers: false,
      photography: false,
    },
    otherPreferences: '',
  })
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const steps: Step[] = ['region', 'duration', 'difficulty', 'preferences', 'review']
  const progress = steps.indexOf(step) + 1
  const totalSteps = steps.length

  const resolvedRegion = tripData.region === OTHER_OPTION ? tripData.customRegion.trim() : tripData.region
  const resolvedDuration = tripData.duration_type === OTHER_OPTION ? tripData.customDuration.trim() : tripData.duration_type
  const resolvedDifficulty = tripData.difficulty === OTHER_OPTION ? tripData.customDifficulty.trim() : tripData.difficulty

  useEffect(() => {
    if (!userLoading && !user) {
      router.push(`/${locale}/auth/login`)
    }
  }, [locale, router, user, userLoading])

  const handleNext = () => {
    if (step === 'region' && !resolvedRegion) {
      setError('Please choose a region or write your own.')
      return
    }

    if (step === 'duration' && !resolvedDuration) {
      setError('Please choose a duration or write your own.')
      return
    }

    if (step === 'difficulty' && !resolvedDifficulty) {
      setError('Please choose a difficulty or write your own.')
      return
    }

    setError(null)
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    }
  }

  const handlePrev = () => {
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setError(null)
      setStep(steps[currentIndex - 1])
    }
  }

  const handleCreate = async () => {
    try {
      setIsCreating(true)
      setError(null)

      if (!tripData.title.trim() || !resolvedRegion || !resolvedDuration || !resolvedDifficulty) {
        setError('Please fill in all required fields')
        return
      }

      await createTrip({
        title: tripData.title.trim(),
        region: resolvedRegion,
        duration_type: resolvedDuration,
        difficulty: resolvedDifficulty,
        preferences: {
          ...tripData.preferences,
          otherPreferences: tripData.otherPreferences.trim(),
        },
        itinerary: {},
      })

      mutate()
      router.push(`/${locale}/dashboard`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create trip')
    } finally {
      setIsCreating(false)
    }
  }

  const renderChoiceButton = (
    value: string,
    currentValue: string,
    onClick: () => void,
    label = value,
  ) => (
    <button
      key={value}
      onClick={onClick}
      className={`rounded-lg border-2 p-4 text-left transition-all ${
        currentValue === value
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
      type="button"
    >
      <span className="font-medium text-foreground">{label}</span>
    </button>
  )

  if (userLoading) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header />
        </Suspense>
        <main className="mx-auto max-w-2xl px-4 py-12">
          <p className="text-center text-muted-foreground">Loading...</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
        <Header />
      </Suspense>

      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">{t('wizard.title', locale)}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{`Step ${progress} of ${totalSteps}`}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${(progress / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {step === 'region' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">Where do you want to hike?</h2>
                <div className="grid gap-3">
                  {REGIONS.map((region) =>
                    renderChoiceButton(region, tripData.region, () => setTripData({ ...tripData, region })),
                  )}
                  {renderChoiceButton(
                    OTHER_OPTION,
                    tripData.region,
                    () => setTripData({ ...tripData, region: OTHER_OPTION }),
                    'Other location',
                  )}
                </div>
                {tripData.region === OTHER_OPTION && (
                  <div className="mt-4">
                    <Input
                      value={tripData.customRegion}
                      onChange={(e) => setTripData({ ...tripData, customRegion: e.target.value })}
                      placeholder="Write your location"
                      className="text-base"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'duration' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">How long is your trip?</h2>
                <div className="grid gap-3">
                  {DURATIONS.map((duration) =>
                    renderChoiceButton(duration, tripData.duration_type, () => setTripData({ ...tripData, duration_type: duration })),
                  )}
                  {renderChoiceButton(
                    OTHER_OPTION,
                    tripData.duration_type,
                    () => setTripData({ ...tripData, duration_type: OTHER_OPTION }),
                    'Other duration',
                  )}
                </div>
                {tripData.duration_type === OTHER_OPTION && (
                  <div className="mt-4">
                    <Input
                      value={tripData.customDuration}
                      onChange={(e) => setTripData({ ...tripData, customDuration: e.target.value })}
                      placeholder="Write number of days or trip length"
                      className="text-base"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'difficulty' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">What&apos;s your fitness level?</h2>
                <div className="grid gap-3">
                  {DIFFICULTIES.map((difficulty) =>
                    renderChoiceButton(difficulty, tripData.difficulty, () => setTripData({ ...tripData, difficulty })),
                  )}
                  {renderChoiceButton(
                    OTHER_OPTION,
                    tripData.difficulty,
                    () => setTripData({ ...tripData, difficulty: OTHER_OPTION }),
                    'Other difficulty',
                  )}
                </div>
                {tripData.difficulty === OTHER_OPTION && (
                  <div className="mt-4">
                    <Input
                      value={tripData.customDifficulty}
                      onChange={(e) => setTripData({ ...tripData, customDifficulty: e.target.value })}
                      placeholder="Write your fitness level or difficulty"
                      className="text-base"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">What interests you?</h2>
                <div className="space-y-3">
                  {PREFERENCE_OPTIONS.map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-card/50"
                    >
                      <input
                        type="checkbox"
                        checked={tripData.preferences[key]}
                        onChange={(e) =>
                          setTripData({
                            ...tripData,
                            preferences: {
                              ...tripData.preferences,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-foreground">{label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-foreground">Other interests</label>
                  <Input
                    value={tripData.otherPreferences}
                    onChange={(e) => setTripData({ ...tripData, otherPreferences: e.target.value })}
                    placeholder="Anything else the trip should include?"
                    className="text-base"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-6 text-2xl font-semibold text-foreground">Give your trip a name</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Trip Name</label>
                    <Input
                      value={tripData.title}
                      onChange={(e) => setTripData({ ...tripData, title: e.target.value })}
                      placeholder="e.g., Family Weekend Hike"
                      className="text-base"
                    />
                  </div>

                  <div className="mt-6 space-y-2 rounded-lg bg-card/50 p-4">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{t('wizard.region', locale)}:</span>
                      <span className="font-medium text-right text-foreground">{resolvedRegion}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{t('trip.duration', locale)}:</span>
                      <span className="font-medium text-right text-foreground">{resolvedDuration}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{t('wizard.difficulty', locale)}:</span>
                      <span className="font-medium text-right text-foreground">{resolvedDifficulty}</span>
                    </div>
                    {tripData.otherPreferences.trim() && (
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Other:</span>
                        <span className="font-medium text-right text-foreground">{tripData.otherPreferences.trim()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 'region'}
            >
              Previous
            </Button>

            {step === 'review' ? (
              <Button
                onClick={handleCreate}
                disabled={isCreating || !tripData.title.trim()}
              >
                {isCreating ? 'Creating...' : 'Create Trip'}
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </Card>
      </main>
    </>
  )
}
