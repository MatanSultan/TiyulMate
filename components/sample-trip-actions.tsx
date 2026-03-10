'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { type Locale } from '@/lib/i18n'

type SampleTripActionsProps = {
  locale: Locale
  sampleId: string
  createAccountLabel: string
  useAsBaseLabel: string
  generateSimilarLabel: string
}

export function SampleTripActions({
  locale,
  sampleId,
  createAccountLabel,
  useAsBaseLabel,
  generateSimilarLabel,
}: SampleTripActionsProps) {
  const { user } = useAuth()
  const builderHref = user ? `/${locale}/dashboard/trip-wizard?sample=${sampleId}` : `/${locale}/auth/sign-up?sample=${sampleId}`
  const accountHref = user ? `/${locale}/dashboard/trip-wizard?sample=${sampleId}` : `/${locale}/auth/sign-up?sample=${sampleId}`

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild className="rounded-full px-6">
        <Link href={builderHref}>
          {useAsBaseLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" className="rounded-full px-6">
        <Link href={builderHref}>{generateSimilarLabel}</Link>
      </Button>
      {!user ? (
        <Button asChild variant="ghost" className="rounded-full px-3">
          <Link href={accountHref}>{createAccountLabel}</Link>
        </Button>
      ) : null}
    </div>
  )
}
