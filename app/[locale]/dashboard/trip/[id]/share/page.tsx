'use client'

import { useAuth } from '@/hooks/use-auth'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Loader } from 'lucide-react'
import type { Trip } from '@/hooks/use-trips'

export default function ShareTrip() {
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const id = params?.id as string | undefined
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shareToken, setShareToken] = useState<string | null>(null)
  const [shareLink, setShareLink] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!userLoading && !user) {
      router.push(`/${locale}/auth/login`)
    }
  }, [user, userLoading, router, locale])

  useEffect(() => {
    console.debug('ShareTrip id param', id)

    const fetchTripAndShareLink = async () => {
      try {
        const supabase = createClient()

        // Fetch trip
        const { data: tripData, error: tripError } = await supabase
          .from('trips')
          .select('*')
          .eq('id', id)
          .single()

        if (tripError) throw tripError
        setTrip(tripData as Trip)

        // Check for existing share link
        const { data: shareData } = await supabase
          .from('share_links')
          .select('token')
          .eq('trip_id', id)
          .single()

        if (shareData) {
          setShareToken(shareData.token)
          setShareLink(`${window.location.origin}/shared/${shareData.token}`)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.error('Error fetching trip or share link:', message)
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    if (user && id) {
      fetchTripAndShareLink()
    }
  }, [user, id])

  const generateShareLink = async () => {
    if (!trip) return

    try {
      setCreating(true)
      const token = `share_${Math.random().toString(36).slice(2)}_${Date.now()}`
      const supabase = createClient()

      // Create share link
      const { error } = await supabase.from('share_links').insert({
        trip_id: trip.id,
        token,
      })

      if (error) throw error

      setShareToken(token)
      const newLink = `${window.location.origin}/shared/${token}`
      setShareLink(newLink)
    } catch (err) {
      console.error('Error creating share link:', err)
    } finally {
      setCreating(false)
    }
  }

  const copyToClipboard = async () => {
    if (shareLink) {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (userLoading || loading) {
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

  if (!trip) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header />
        </Suspense>
        <main className="mx-auto max-w-2xl px-4 py-12">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              {error ? `Error: ${error}` : 'Trip not found'}
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href={`/${locale}/dashboard`}>Back to Dashboard</Link>
            </Button>
          </Card>
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
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/${locale}/dashboard/trip/${trip.id}`} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Trip
          </Link>
        </Button>

        <Card className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{trip.title}</h1>
          <p className="text-muted-foreground mb-8">Share this trip with friends and family</p>

          {shareToken ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Share Link
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="gap-2 flex-shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg bg-card/50 border border-border p-4">
                <h3 className="font-semibold text-foreground mb-2">How to share:</h3>
                <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Copy the link above</li>
                  <li>Send it to anyone you want to share your trip with</li>
                  <li>They can view your itinerary without needing to log in</li>
                </ol>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href={shareLink}>Preview Share Link</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-6">
                Generate a shareable link to let others view your trip
              </p>
              <Button
                onClick={generateShareLink}
                disabled={creating}
                className="gap-2"
              >
                {creating && <Loader className="h-4 w-4 animate-spin" />}
                {creating ? 'Generating...' : 'Generate Share Link'}
              </Button>
            </div>
          )}
        </Card>
      </main>
    </>
  )
}
