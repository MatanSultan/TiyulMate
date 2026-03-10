'use client'

import Link from 'next/link'
import { ArrowLeft, Check, Copy, ExternalLink, Loader2, Share2 } from 'lucide-react'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { resolveLocale, t, type Locale } from '@/lib/i18n'
import { buildShareUrl, getClientSiteUrl } from '@/lib/site-url'
import { siteCopy } from '@/lib/site-copy'
import { createClient } from '@/lib/supabase/client'
import { buildSharedTripRow } from '@/lib/shared-trip'
import type { TripRecord } from '@/lib/trip-model'

function createShareToken() {
  return crypto.randomUUID().replace(/-/g, '')
}

function buildUiText(locale: Locale) {
  return {
    loading: t('common.loading', locale),
    back: t('common.back', locale),
    notFound: locale === 'he' ? 'הטיול לא נמצא' : locale === 'ar' ? 'الرحلة غير موجودة' : 'Trip not found',
    loadError:
      locale === 'he'
        ? 'טעינת השיתוף נכשלה'
        : locale === 'ar'
          ? 'فشل تحميل إعدادات المشاركة'
          : 'Failed to load share settings',
    shareError:
      locale === 'he'
        ? 'יצירת קישור השיתוף נכשלה'
        : locale === 'ar'
          ? 'فشل إنشاء رابط المشاركة'
          : 'Failed to generate share link',
  }
}

export default function ShareTripPage() {
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const locale = resolveLocale(params.locale as string) as Locale
  const tripId = params.id as string
  const copy = siteCopy[locale].share
  const uiText = useMemo(() => buildUiText(locale), [locale])

  const [trip, setTrip] = useState<TripRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shareLink, setShareLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [creating, setCreating] = useState(false)

  const baseUrl = useMemo(
    () => getClientSiteUrl(),
    [],
  )

  useEffect(() => {
    if (!userLoading && !user) {
      router.push(`/${locale}/auth/login`)
    }
  }, [locale, router, user, userLoading])

  useEffect(() => {
    const fetchTripAndShareLink = async () => {
      if (!user) return

      try {
        const supabase = createClient()
        const { data: tripData, error: tripError } = await supabase
          .from('trips')
          .select('*')
          .eq('id', tripId)
          .eq('user_id', user.id)
          .single()

        if (tripError) throw tripError
        setTrip(tripData as TripRecord)

        const { data: shareData, error: shareFetchError } = await supabase
          .from('share_links')
          .select('token')
          .eq('trip_id', tripId)
          .maybeSingle()

        if (shareFetchError) throw shareFetchError

        if (shareData?.token) {
          setShareLink(buildShareUrl(shareData.token, baseUrl))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : uiText.loadError)
      } finally {
        setLoading(false)
      }
    }

    if (user && tripId && baseUrl) {
      fetchTripAndShareLink()
    }
  }, [baseUrl, tripId, uiText.loadError, user])

  const generateShareLink = async () => {
    if (!trip) return

    try {
      setCreating(true)
      setError(null)
      const supabase = createClient()

      const { data: existingShare, error: existingShareError } = await supabase
        .from('share_links')
        .select('token')
        .eq('trip_id', trip.id)
        .maybeSingle()

      if (existingShareError) throw existingShareError

      if (existingShare?.token) {
        setShareLink(buildShareUrl(existingShare.token, baseUrl))
        return
      }

      const token = createShareToken()
      const { error: shareError } = await supabase
        .from('share_links')
        .insert({
          trip_id: trip.id,
          token,
        })

      if (shareError) throw shareError

      // Also insert/update the shared_trips table for public access
      try {
        const sharedTripRow = buildSharedTripRow(trip, token, true)
        const { error: sharedTripError } = await supabase
          .from('shared_trips')
          .upsert(
            {
              trip_id: sharedTripRow.trip_id,
              user_id: sharedTripRow.user_id,
              token: sharedTripRow.token,
              title: sharedTripRow.title,
              region: sharedTripRow.region,
              duration_type: sharedTripRow.duration_type,
              language_code: sharedTripRow.language_code,
              snapshot: sharedTripRow.snapshot,
              is_active: true,
            },
            { onConflict: 'trip_id' },
          )

        if (sharedTripError) {
          console.error('Failed to sync to shared_trips:', sharedTripError)
          // Continue anyway - share_links is the primary table
        }
      } catch (syncError) {
        console.error('Error syncing to shared_trips:', syncError)
        // Continue anyway - share_links is the primary table
      }

      setShareLink(buildShareUrl(token, baseUrl))
    } catch (err) {
      setError(err instanceof Error ? err.message : uiText.shareError)
    } finally {
      setCreating(false)
    }
  }

  const copyToClipboard = async () => {
    if (!shareLink) return

    await navigator.clipboard.writeText(shareLink)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  if (userLoading || loading) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header locale={locale} />
        </Suspense>
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">{uiText.loading}</p>
        </main>
      </>
    )
  }

  if (!trip) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header locale={locale} />
        </Suspense>
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="rounded-[2rem] border-destructive/40 bg-destructive/8 p-8 text-center text-destructive">
            {error || uiText.notFound}
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

      <main className="app-shell mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="rounded-full">
          <Link href={`/${locale}/dashboard/trip/${trip.id}`}>
            <ArrowLeft className="h-4 w-4" />
            {uiText.back}
          </Link>
        </Button>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[2rem] border-white/10 bg-card/82 p-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)] sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
              <Share2 className="h-3.5 w-3.5" />
              {copy.title}
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{trip.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{copy.body}</p>

            <div className="mt-8 space-y-4">
              <label className="block text-sm font-medium text-foreground">{copy.linkLabel}</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input readOnly value={shareLink} placeholder={`${baseUrl}/shared/...`} className="h-12 rounded-2xl" />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full px-5"
                  onClick={copyToClipboard}
                  disabled={!shareLink}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? copy.copied : copy.copy}
                </Button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" className="rounded-full px-6" onClick={generateShareLink} disabled={creating}>
                  {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
                  {creating ? copy.generating : copy.generate}
                </Button>

                {shareLink && (
                  <Button asChild variant="outline" className="rounded-full px-6">
                    <Link href={shareLink}>
                      {copy.preview}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>

              {error && (
                <Card className="rounded-[1.25rem] border-destructive/40 bg-destructive/8 p-4 text-sm text-destructive">
                  {error}
                </Card>
              )}
            </div>
          </Card>

          <Card className="rounded-[2rem] border-white/10 bg-card/82 p-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.instructionsTitle}</p>
            <ol className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              {copy.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </main>
    </>
  )
}
