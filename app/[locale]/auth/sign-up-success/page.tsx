import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { siteCopy } from '@/lib/site-copy'

interface SignUpSuccessProps {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ sample?: string }>
}

export default async function SignUpSuccessPage({ params, searchParams }: SignUpSuccessProps) {
  const resolvedParams = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const locale = resolveLocale(resolvedParams.locale) as Locale
  const copy = siteCopy[locale].auth
  const sampleId = resolvedSearchParams?.sample

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl rounded-[2rem] border-white/10 bg-card/82 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)]">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <Sparkles className="h-7 w-7" />
          </div>
          <CardTitle className="text-3xl">{copy.signUpSuccessTitle}</CardTitle>
          <CardDescription className="text-base leading-7">{copy.signUpSuccessBody}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild className="rounded-full px-6">
            <Link href={sampleId ? `/${locale}/auth/login?sample=${sampleId}` : `/${locale}/auth/login`}>{copy.login}</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
