export type Locale = 'en' | 'he' | 'ar'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'he', 'ar']

export const isRTL = (locale: Locale): boolean => locale === 'he' || locale === 'ar'

export function resolveLocale(locale?: string | null): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
}

export function getLocaleLabel(locale: Locale): string {
  if (locale === 'he') return 'עברית'
  if (locale === 'ar') return 'العربية'
  return 'English'
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Log in',
    'nav.signup': 'Create account',
    'nav.logout': 'Log out',
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'wizard.prev': 'Previous',
    'wizard.next': 'Next',
  },
  he: {
    'nav.home': 'בית',
    'nav.dashboard': 'לוח הבקרה',
    'nav.login': 'התחברות',
    'nav.signup': 'יצירת חשבון',
    'nav.logout': 'התנתקות',
    'common.back': 'חזרה',
    'common.save': 'שמירה',
    'common.cancel': 'ביטול',
    'common.loading': 'טוען...',
    'common.error': 'משהו השתבש',
    'wizard.prev': 'הקודם',
    'wizard.next': 'הבא',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.dashboard': 'لوحة الرحلات',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.logout': 'تسجيل الخروج',
    'common.back': 'عودة',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.loading': 'جارٍ التحميل...',
    'common.error': 'حدث خطأ ما',
    'wizard.prev': 'السابق',
    'wizard.next': 'التالي',
  },
} satisfies Record<Locale, Record<string, string>>

export function t(key: string, locale: Locale = defaultLocale): string {
  const table = translations as Record<Locale, Record<string, string>>
  return table[locale][key] || table[defaultLocale][key] || key
}
