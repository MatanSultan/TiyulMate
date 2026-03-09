'use client'

import { useAuth } from '@/hooks/use-auth'
import { useTrips } from '@/hooks/use-trips'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { Plus, MapPin, Clock, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const { user, loading: userLoading } = useAuth()
  const { trips, isLoading: tripsLoading, error: tripsError } = useTrips()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  useEffect(() => {
    if (!userLoading && !user) {
      router.push(`/${locale}/auth/login`)
    }
  }, [user, userLoading, router, locale])

  if (userLoading) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header />
        </Suspense>
        <main className="mx-auto max-w-7xl px-4 py-12">
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
      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.user_metadata?.full_name || 'Hiker'}!
              </h1>
              <p className="mt-2 text-muted-foreground">
                Plan your next adventure or review your existing trips
              </p>
            </div>
            <Button size="lg" asChild className="gap-2">
              <Link href={`/${locale}/dashboard/trip-wizard`}>
                <Plus className="h-4 w-4" />
                Plan New Trip
              </Link>
            </Button>
          </div>
        </div>

        {tripsError && (
          <Card className="mb-8 border-destructive/50 bg-destructive/10 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Error loading trips</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Unable to load your trips. Please try again later.
                </p>
              </div>
            </div>
          </Card>
        )}

        {tripsLoading ? (
          <p className="text-center text-muted-foreground">Loading your trips...</p>
        ) : trips && trips.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.filter(Boolean).map((trip) => (
              // `trip` is now guaranteed non-null because of the filter
              <Card
                key={trip!.id}
                className="flex flex-col overflow-hidden border-border hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{trip.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="capitalize">{trip.duration_type}</span>
                    </div>
                    <div className="text-xs">
                      <span className="inline-block rounded bg-primary/10 px-2 py-1 text-primary capitalize">
                        {trip.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border px-6 py-4 flex gap-2">
                  <Button size="sm" variant="outline" asChild className="flex-1">
                    <Link href={`/${locale}/dashboard/trip/${trip.id}`}>View</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild className="flex-1">
                    <Link href={`/${locale}/dashboard/trip/${trip.id}/share`}>Share</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground">No trips yet</h3>
            <p className="mt-2 text-muted-foreground">
              Create your first hiking trip to get started
            </p>
            <Button asChild className="mt-6">
              <Link href={`/${locale}/dashboard/trip-wizard`}>Plan Your First Trip</Link>
            </Button>
          </Card>
        )}
      </main>
    </>
  )
}
