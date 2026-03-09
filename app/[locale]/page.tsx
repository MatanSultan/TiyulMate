import Link from 'next/link'
import { ArrowRight, Bot, Compass, Globe2, MapPinned, ShieldCheck, Sparkles } from 'lucide-react'
import { Header } from '@/components/header'
import { ReadyMadeTrips } from '@/components/ready-made-trips'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { siteCopy } from '@/lib/site-copy'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params
  const locale = resolveLocale(resolvedParams.locale) as Locale
  const copy = siteCopy[locale].landing

  const featureCards = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: locale === 'he' ? 'AI שמבין טיולים בישראל' : locale === 'ar' ? 'ذكاء اصطناعي يفهم الرحلات في إسرائيل' : 'AI that understands Israel trips',
      body: locale === 'he'
        ? 'המערכת בונה מסלולים לפי אזור, זמן, קצב, שפה, נגישות והעדפות אישיות.'
        : locale === 'ar'
          ? 'يبني النظام الرحلات حسب المنطقة والوقت والوتيرة واللغة وإمكانية الوصول والتفضيلات الشخصية.'
          : 'Build trips around region, timing, pace, language, accessibility, and personal interests.',
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      title: locale === 'he' ? 'חוויה רב-לשונית מלאה' : locale === 'ar' ? 'تجربة متعددة اللغات بالكامل' : 'Fully multilingual experience',
      body: locale === 'he'
        ? 'אנגלית, עברית וערבית עם חוויית RTL/LTR עקבית בכל המוצר.'
        : locale === 'ar'
          ? 'الإنجليزية والعبرية والعربية مع تجربة RTL/LTR متسقة في كل المنتج.'
          : 'English, Hebrew, and Arabic with consistent RTL/LTR behavior across the full product.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: locale === 'he' ? 'שמור ומסונכרן בכל מכשיר' : locale === 'ar' ? 'محفوظ ومتزامن على كل جهاز' : 'Saved and synced on every device',
      body: locale === 'he'
        ? 'הטיולים נשמרים בחשבון שלך כך שתוכל לחזור אליהם מכל מקום.'
        : locale === 'ar'
          ? 'يتم حفظ الرحلات في حسابك حتى تتمكن من العودة إليها من أي مكان.'
          : 'Your trips live in your account so you can pick them up from any device.',
    },
  ]

  return (
    <>
      <Header locale={locale} />

      <main className="app-shell">
        <section className="px-4 pb-14 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-float-up rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(28,102,159,0.18),rgba(75,197,185,0.08),rgba(255,255,255,0.62))] p-8 shadow-[0_44px_120px_-60px_rgba(15,23,42,0.55)] glass-panel sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                <Sparkles className="h-3.5 w-3.5" />
                {copy.heroEyebrow}
              </div>
              <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.heroBody}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href={`/${locale}/auth/sign-up`}>
                    {copy.primaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                  <Link href="#example-trips">{copy.secondaryCta}</Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <Card className="rounded-[1.5rem] border-white/10 bg-card/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">AI-first</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {locale === 'he' ? 'יצירת טיולים חכמה ומיידית.' : locale === 'ar' ? 'تخطيط ذكي وفوري للرحلات.' : 'Instant AI-generated trip planning.'}
                  </p>
                </Card>
                <Card className="rounded-[1.5rem] border-white/10 bg-card/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Supabase</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {locale === 'he' ? 'טיולים נשמרים ומסתנכרנים בין מכשירים.' : locale === 'ar' ? 'رحلات محفوظة ومتزامنة بين الأجهزة.' : 'Trips stay saved and synced across devices.'}
                  </p>
                </Card>
                <Card className="rounded-[1.5rem] border-white/10 bg-card/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Accessible</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {locale === 'he' ? 'כולל שיקולי נגישות, ניידות וכיסא גלגלים.' : locale === 'ar' ? 'يشمل احتياجات الوصول والحركة والكراسي المتحركة.' : 'Supports accessible, wheelchair-friendly, and low-mobility planning.'}
                  </p>
                </Card>
              </div>
            </div>

            <div className="grid gap-4">
              {featureCards.map((feature) => (
                <Card key={feature.title} className="rounded-[1.9rem] border-white/10 bg-card/82 p-6 shadow-[0_32px_90px_-60px_rgba(15,23,42,0.55)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{feature.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-white/10 bg-card/80 p-8 shadow-[0_32px_90px_-60px_rgba(15,23,42,0.55)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                  <Compass className="h-3.5 w-3.5" />
                  {copy.whyTitle}
                </div>
                <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground">{copy.whyTitle}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy.whyBody}</p>
              </div>
              <div className="space-y-4">
                {copy.reasons.map((reason, index) => (
                  <Card key={reason} className="rounded-[1.5rem] border-white/10 bg-muted/25 p-5">
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-7 text-foreground/88">{reason}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="example-trips" className="px-4 pb-6 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.exampleTitle}</p>
                <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground">{copy.exampleTitle}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{copy.exampleBody}</p>
            </div>
          </div>
          <ReadyMadeTrips locale={locale} />
        </section>

        <section className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-white/10 bg-[linear-gradient(145deg,rgba(28,102,159,0.18),rgba(75,197,185,0.08),rgba(255,255,255,0.58))] p-8 shadow-[0_44px_120px_-60px_rgba(15,23,42,0.55)] glass-panel sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                  <MapPinned className="h-3.5 w-3.5" />
                  TiyulMate
                </div>
                <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground">{copy.finalTitle}</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{copy.finalBody}</p>
              </div>
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={`/${locale}/auth/sign-up`}>
                  {copy.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
