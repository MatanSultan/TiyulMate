'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { type Locale } from '@/lib/i18n'

type LandingActionsProps = {
  locale: Locale
  browseLabel: string
  accountLabel: string
  finalPrimary?: boolean
}

export function LandingActions({ locale, browseLabel, accountLabel, finalPrimary = false }: LandingActionsProps) {
  const { user } = useAuth()
  const accountHref = user ? `/${locale}/dashboard/trip-wizard` : `/${locale}/auth/sign-up`

  if (finalPrimary) {
    return (
      <>
        <Button asChild size="lg" className="rounded-full px-6">
          <Link href={accountHref}>
            {accountLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full px-6">
          <Link href="#sample-trips">{browseLabel}</Link>
        </Button>
      </>
    )
  }

  return (
    <>
      <Button asChild size="lg" className="rounded-full px-6">
        <Link href="#sample-trips">
          {browseLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="rounded-full px-6">
        <Link href={accountHref}>{accountLabel}</Link>
      </Button>
    </>
  )
}
