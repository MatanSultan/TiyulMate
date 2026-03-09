import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { ReadyMadeTrips } from '@/components/ready-made-trips'
import { MapPin, Zap, Share2, ArrowRight, Compass } from 'lucide-react'
import { t, type Locale } from '@/lib/i18n'

interface HomeProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const locale = (params.lang || 'en') as Locale

  return (
    <>
      <Header locale={locale} />
      <main className="flex flex-col">
        {/* Premium Hero Section */}
        <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-40 lg:px-8">
          {/* Animated background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-1/4 h-96 w-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-0 left-1/4 h-96 w-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
          </div>

          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Compass className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {locale === 'en' ? 'Explore Israel' : locale === 'he' ? 'גלה את ישראל' : 'استكشف إسرائيل'}
              </span>
            </div>

            <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {locale === 'en'
                ? 'Your Perfect Hiking Adventure Awaits'
                : locale === 'he'
                ? 'הרפתקת ההליכה המושלמת שלך מחכה'
                : 'مغامرة المشي المثالية تنتظرك'}
            </h1>

            <p className="mb-10 text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
             {locale === 'en'
  ? "AI-powered trip planning tailored to your preferences, fitness level, and available time. Discover Israel's most beautiful trails."
  : locale === 'he'
  ? 'תכנון טיול מונע על ידי AI המותאם לעדפותיך, רמת הכושר שלך והזמן הזמין. גלה את שבילי ישראל היפים ביותר.'
  : 'تخطيط الرحلات بتقنية الذكاء الاصطناعي المخصص لتفضيلاتك ومستوى لياقتك والوقت المتاح. اكتشف أجمل مسارات إسرائيل.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base h-12 px-8 group">
                <Link href={`/${locale}/auth/sign-up`} className="flex items-center gap-2">
                  {t('landing.cta', locale)}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base h-12 px-8">
                <Link href="#ready-made">{t('landing.cta2', locale)}</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary/50" />
                <span>{locale === 'en' ? 'No credit card required' : locale === 'he' ? 'אינו דורש כרטיס אשראי' : 'لا يتطلب بطاقة ائتمان'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary/50" />
                <span>{locale === 'en' ? 'Free to get started' : locale === 'he' ? 'חינם להתחיל' : 'مجاني للبدء'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary/50" />
                <span>{locale === 'en' ? 'AI-powered recommendations' : locale === 'he' ? 'המלצות מונעות על ידי AI' : 'توصيات بتقنية الذكاء الاصطناعي'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20 sm:px-6 sm:py-32 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
                {t('landing.features', locale)}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {locale === 'en'
                  ? 'Everything you need for an unforgettable hiking experience'
                  : locale === 'he'
                  ? 'כל מה שאתה צריך לחוויית טיול בלתי נשכחת'
                  : 'كل ما تحتاجه لتجربة رحلة لا تنسى'}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {t('landing.feature1', locale)}
                </h3>
                <p className="text-muted-foreground">
                  {t('landing.feature1_desc', locale)}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-4 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {t('landing.feature2', locale)}
                </h3>
                <p className="text-muted-foreground">
                  {t('landing.feature2_desc', locale)}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-4 group-hover:scale-110 transition-transform">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {t('landing.feature3', locale)}
                </h3>
                <p className="text-muted-foreground">
                  {t('landing.feature3_desc', locale)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ready-Made Trips Section */}
        <section id="ready-made">
          <ReadyMadeTrips locale={locale} />
        </section>

        {/* Final CTA Section */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-3xl opacity-30" />
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 text-center">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
                {locale === 'en'
                  ? 'Ready to Start Your Adventure?'
                  : locale === 'he'
                  ? 'מוכנים להתחיל את ההרפתקה שלכם?'
                  : 'هل أنت مستعد لبدء مغامرتك؟'}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground max-w-xl mx-auto">
                {locale === 'en'
                  ? 'Join thousands of hikers who use TiyulMate for their trail planning.'
                  : locale === 'he'
                  ? 'הצטרף לאלפי הולכים שמשתמשים ב-TiyulMate לתכנון השבילים שלהם.'
                  : 'انضم إلى آلاف المتنزهين الذين يستخدمون TiyulMate لتخطيط مساراتهم.'}
              </p>
              <Button size="lg" asChild className="group">
                <Link href={`/${locale}/auth/sign-up`} className="flex items-center gap-2">
                  {t('landing.cta', locale)}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="font-semibold text-foreground">TiyulMate</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {locale === 'en'
                    ? 'AI-powered hiking trip planner for Israel'
                    : locale === 'he'
                    ? 'מתכנן טיולי הליכה מונע על ידי AI בישראל'
                    : 'مخطط رحلات المشي بتقنية الذكاء الاصطناعي في إسرائيل'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{locale === 'en' ? 'Product' : locale === 'he' ? 'מוצר' : 'المنتج'}</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">{t('landing.features', locale)}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{locale === 'en' ? 'Resources' : locale === 'he' ? 'משאבים' : 'الموارد'}</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">{locale === 'en' ? 'Blog' : locale === 'he' ? 'בלוג' : 'المدونة'}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{locale === 'en' ? 'Legal' : locale === 'he' ? 'משפטי' : 'قانوني'}</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">{locale === 'en' ? 'Privacy' : locale === 'he' ? 'פרטיות' : 'الخصوصية'}</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-border pt-8">
              <p className="text-center text-sm text-muted-foreground">
                © 2026 TiyulMate. {locale === 'en' ? 'All rights reserved.' : locale === 'he' ? 'כל הזכויות שמורות.' : 'جميع الحقوق محفوظة.'}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
