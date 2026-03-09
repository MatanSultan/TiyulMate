import { type Locale } from '@/lib/i18n'

type BrandCopy = {
  tagline: string
  mobileTitle: string
  previewLabel: string
}

export const brandCopy: Record<Locale, BrandCopy> = {
  en: {
    tagline: 'Journeys across Israel, shaped around you.',
    mobileTitle: 'Plan a thoughtful route, not just another generic itinerary.',
    previewLabel: 'Trip dossier',
  },
  he: {
    tagline: 'טיולים ברחבי ישראל, מותאמים בדיוק לכם.',
    mobileTitle: 'תכננו מסלול עם אופי, לא עוד תבנית גנרית.',
    previewLabel: 'תיק הטיול',
  },
  ar: {
    tagline: 'رحلات في أنحاء إسرائيل مصممة حولكم بدقة.',
    mobileTitle: 'خططوا لمسار له طابع حقيقي، لا لقالب عام ومتكرر.',
    previewLabel: 'ملف الرحلة',
  },
}
