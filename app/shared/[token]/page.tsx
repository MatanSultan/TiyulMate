'use client'

import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, AlertCircle } from 'lucide-react'
import type { Trip } from '@/hooks/use-trips'

export default function SharedTrip({ params }: { params: { token: string } }) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSharedTrip = async () => {
      try {
        const supabase = createClient()

        // Find share link
        const { data: shareData, error: shareError } = await supabase
          .from('share_links')
          .select('trip_id')
          .eq('token', params.token)
          .single()

        if (shareError) {
          setError('Share link not found')
          return
        }

        // Fetch trip
        const { data: tripData, error: tripError } = await supabase
          .from('trips')
          .select('*')
          .eq('id', shareData.trip_id)
          .single()

        if (tripError) {
          setError('Trip not found')
          return
        }

        setTrip(tripData as Trip)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trip')
      } finally {
        setLoading(false)
      }
    }

    fetchSharedTrip()
  }, [params.token])

  if (loading) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-center text-muted-foreground">Loading...</p>
        </main>
      </>
    )
  }

  if (error || !trip) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-12">
          <Card className="p-8 text-center border-destructive/50 bg-destructive/10">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h2 className="text-xl font-semibold text-foreground">{error || 'Trip not found'}</h2>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/">Back to Home</Link>
            </Button>
          </Card>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <Card className="mb-8 p-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">{trip.title}</h1>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Region</p>
                <p className="font-semibold text-foreground">{trip.region}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold text-foreground capitalize">{trip.duration_type}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Difficulty</p>
              <p>
                <span className="inline-block rounded bg-primary/10 px-3 py-1 font-semibold text-primary">
                  {trip.difficulty}
                </span>
              </p>
            </div>
          </div>

          {Object.keys(trip.itinerary || {}).length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Itinerary</h2>
              <div className="space-y-4">
                {Object.entries(trip.itinerary || {}).map(([day, activities]: any) => {
                  // Skip non-day entries
                  if (!day.toLowerCase().includes('day')) return null

                  return (
                    <Card key={day} className="p-6 bg-card/50">
                      <h3 className="font-semibold text-foreground mb-4 capitalize">{day}</h3>
                      {Array.isArray(activities) ? (
                        <ul className="space-y-2">
                          {activities.map((activity: string, idx: number) => (
                            <li key={idx} className="flex gap-2 text-muted-foreground">
                              <span className="text-primary">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">{activities}</p>
                      )}
                    </Card>
                  )
                })}
              </div>

              {trip.itinerary?.hiking_tips && (
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Hiking Tips</h3>
                  <p className="text-muted-foreground">{trip.itinerary.hiking_tips}</p>
                </Card>
              )}

              {(trip.itinerary?.estimated_distance || trip.itinerary?.estimated_elevation_gain) && (
                <Card className="p-6 bg-card/50">
                  <h3 className="font-semibold text-foreground mb-4">Trip Stats</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {trip.itinerary?.estimated_distance && (
                      <div>
                        <p className="text-sm text-muted-foreground">Total Distance</p>
                        <p className="text-lg font-semibold text-foreground">{trip.itinerary.estimated_distance}</p>
                      </div>
                    )}
                    {trip.itinerary?.estimated_elevation_gain && (
                      <div>
                        <p className="text-sm text-muted-foreground">Elevation Gain</p>
                        <p className="text-lg font-semibold text-foreground">{trip.itinerary.estimated_elevation_gain}</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Card className="p-8 text-center bg-card/50">
              <p className="text-muted-foreground">
                No itinerary has been generated for this trip yet
              </p>
            </Card>
          )}
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <p className="text-foreground">
            Want to plan your own trip? <Link href="/auth/sign-up" className="font-semibold text-primary hover:underline">Create an account</Link> to start planning.
          </p>
        </Card>
      </main>
    </>
  )
}
