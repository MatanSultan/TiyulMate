import { type Locale } from '@/lib/i18n'

type AuthCopy = {
  loginTitle: string
  loginBody: string
  signUpTitle: string
  signUpBody: string
  signUpSuccessTitle: string
  signUpSuccessBody: string
  email: string
  password: string
  repeatPassword: string
  login: string
  loginLoading: string
  signUp: string
  signUpLoading: string
  noAccount: string
  haveAccount: string
  confirmEmail: string
  passwordsMismatch: string
}

type LandingCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  primaryCta: string
  secondaryCta: string
  whyTitle: string
  whyBody: string
  reasons: string[]
  exampleTitle: string
  exampleBody: string
  finalTitle: string
  finalBody: string
}

type ShareCopy = {
  title: string
  body: string
  linkLabel: string
  copy: string
  copied: string
  preview: string
  generate: string
  generating: string
  instructionsTitle: string
  instructions: string[]
}

export const siteCopy: Record<Locale, { auth: AuthCopy; landing: LandingCopy; share: ShareCopy }> = {
  en: {
    auth: {
      loginTitle: 'Welcome back',
      loginBody: 'Log in to continue planning premium AI-powered trips across Israel.',
      signUpTitle: 'Create your account',
      signUpBody: 'Join TiyulMate to save your trips, refine them with AI, and access them on any device.',
      signUpSuccessTitle: 'Check your inbox',
      signUpSuccessBody: 'We sent a confirmation link to your email. Once you confirm, you can sign in and start planning.',
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Repeat password',
      login: 'Log in',
      loginLoading: 'Logging in...',
      signUp: 'Create account',
      signUpLoading: 'Creating account...',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      confirmEmail: 'Please confirm your email before signing in.',
      passwordsMismatch: 'Passwords do not match',
    },
    landing: {
      heroEyebrow: 'Premium AI travel for Israel',
      heroTitle: 'Plan smarter trips in Israel with an AI guide that actually understands your pace.',
      heroBody: 'TiyulMate turns a few trip preferences into a polished, multilingual itinerary with trail ideas, route context, and shareable plans that stay synced to your account.',
      primaryCta: 'Create your account',
      secondaryCta: 'See example trips',
      whyTitle: 'Why hikers choose TiyulMate',
      whyBody: 'Instead of piecing together tabs and maps manually, you get an AI-first planning experience designed for real trips in Israel.',
      reasons: [
        'Personalized itineraries based on region, time, interests, and mobility needs.',
        'Saved trips in Supabase so your plans follow you across devices.',
        'Multilingual experience in English, Hebrew, and Arabic with polished RTL support.',
      ],
      exampleTitle: 'From quick nature escapes to carefully planned multi-day journeys',
      exampleBody: 'Use the platform for family outings, accessible trail discovery, photography-focused trips, or intense hiking adventures.',
      finalTitle: 'Start building a trip that feels made for you',
      finalBody: 'Create an account, answer a few guided questions, and let TiyulMate generate a premium itinerary in your language.',
    },
    share: {
      title: 'Share this trip',
      body: 'Create a public link so friends or family can view the latest version of your itinerary.',
      linkLabel: 'Public share link',
      copy: 'Copy',
      copied: 'Copied',
      preview: 'Preview link',
      generate: 'Generate share link',
      generating: 'Generating...',
      instructionsTitle: 'How sharing works',
      instructions: [
        'Generate a public link tied to this trip.',
        'Send it to anyone who should be able to view the plan.',
        'They can open the trip without logging in.',
      ],
    },
  },
  he: {
    auth: {
      loginTitle: 'ברוך שובך',
      loginBody: 'התחבר כדי להמשיך לתכנן טיולים חכמים ופרימיום ברחבי ישראל.',
      signUpTitle: 'צור חשבון',
      signUpBody: 'הצטרף ל-TiyulMate כדי לשמור טיולים, לשפר אותם עם AI, ולגשת אליהם מכל מכשיר.',
      signUpSuccessTitle: 'בדוק את תיבת הדואר שלך',
      signUpSuccessBody: 'שלחנו קישור אימות למייל שלך. אחרי האישור תוכל להתחבר ולהתחיל לתכנן.',
      email: 'אימייל',
      password: 'סיסמה',
      repeatPassword: 'הקלד סיסמה שוב',
      login: 'התחבר',
      loginLoading: 'מתחבר...',
      signUp: 'צור חשבון',
      signUpLoading: 'יוצר חשבון...',
      noAccount: 'אין לך חשבון?',
      haveAccount: 'כבר יש לך חשבון?',
      confirmEmail: 'יש לאשר את כתובת האימייל לפני הכניסה.',
      passwordsMismatch: 'הסיסמאות אינן תואמות',
    },
    landing: {
      heroEyebrow: 'פלטפורמת AI פרימיום לטיולים בישראל',
      heroTitle: 'תכנן טיולים חכמים בישראל עם מדריך AI שמבין באמת את הקצב והצרכים שלך.',
      heroBody: 'TiyulMate הופך כמה העדפות קצרות למסלול טיול מעוצב, רב-לשוני ואישי עם רעיונות לשבילים, הקשר מסלול ואפשרות שיתוף.',
      primaryCta: 'צור חשבון',
      secondaryCta: 'ראה דוגמאות לטיולים',
      whyTitle: 'למה מטיילים בוחרים ב-TiyulMate',
      whyBody: 'במקום להרכיב ידנית עשרות לשוניות ומפות, אתה מקבל חוויית תכנון AI שמיועדת לטיולים אמיתיים בישראל.',
      reasons: [
        'מסלולים מותאמים אישית לפי אזור, זמן, תחומי עניין וצרכי ניידות.',
        'שמירת טיולים ב-Supabase כך שהמידע זמין מכל מכשיר.',
        'חוויה רב-לשונית מלאה בעברית, אנגלית וערבית עם תמיכת RTL מוקפדת.',
      ],
      exampleTitle: 'מטיולי טבע קצרים ועד מסעות מרובי ימים שתוכננו בקפידה',
      exampleBody: 'השתמש בפלטפורמה לטיולים משפחתיים, חיפוש מסלולים נגישים, מסלולי צילום או מסעות הליכה מאתגרים.',
      finalTitle: 'התחל לבנות טיול שמרגיש כאילו נוצר בדיוק בשבילך',
      finalBody: 'צור חשבון, ענה על כמה שאלות מודרכות, ותן ל-TiyulMate ליצור עבורך מסלול פרימיום בשפה שלך.',
    },
    share: {
      title: 'שתף את הטיול',
      body: 'צור קישור ציבורי כדי שחברים או משפחה יוכלו לצפות בגרסה העדכנית של המסלול.',
      linkLabel: 'קישור שיתוף ציבורי',
      copy: 'העתק',
      copied: 'הועתק',
      preview: 'תצוגה מקדימה',
      generate: 'צור קישור שיתוף',
      generating: 'יוצר...',
      instructionsTitle: 'איך השיתוף עובד',
      instructions: [
        'יוצרים קישור ציבורי שמחובר לטיול הזה.',
        'שולחים אותו לכל מי שצריך לראות את התוכנית.',
        'הם יכולים לפתוח את הטיול גם בלי להתחבר.',
      ],
    },
  },
  ar: {
    auth: {
      loginTitle: 'مرحباً بعودتك',
      loginBody: 'سجّل الدخول لمتابعة تخطيط رحلات مميزة ومدعومة بالذكاء الاصطناعي في إسرائيل.',
      signUpTitle: 'أنشئ حسابك',
      signUpBody: 'انضم إلى TiyulMate لحفظ رحلاتك وتحسينها بالذكاء الاصطناعي والوصول إليها من أي جهاز.',
      signUpSuccessTitle: 'تحقق من بريدك الإلكتروني',
      signUpSuccessBody: 'أرسلنا رابط تأكيد إلى بريدك الإلكتروني. بعد التأكيد يمكنك تسجيل الدخول والبدء بالتخطيط.',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      repeatPassword: 'أعد إدخال كلمة المرور',
      login: 'تسجيل الدخول',
      loginLoading: 'جارٍ تسجيل الدخول...',
      signUp: 'إنشاء حساب',
      signUpLoading: 'جارٍ إنشاء الحساب...',
      noAccount: 'ليس لديك حساب؟',
      haveAccount: 'هل لديك حساب بالفعل؟',
      confirmEmail: 'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.',
      passwordsMismatch: 'كلمتا المرور غير متطابقتين',
    },
    landing: {
      heroEyebrow: 'منصة سفر ذكية ومميزة لإسرائيل',
      heroTitle: 'خطط رحلات أذكى في إسرائيل مع دليل ذكاء اصطناعي يفهم وتيرتك واحتياجاتك فعلاً.',
      heroBody: 'يحوّل TiyulMate بعض التفضيلات السريعة إلى خطة رحلة شخصية ومتعددة اللغات مع اقتراحات مسارات وسياق طريق وروابط قابلة للمشاركة.',
      primaryCta: 'أنشئ حسابك',
      secondaryCta: 'شاهد رحلات مثال',
      whyTitle: 'لماذا يختار المتنزهون TiyulMate',
      whyBody: 'بدلاً من جمع عشرات الصفحات والخرائط يدوياً، تحصل على تجربة تخطيط ذكية مصممة لرحلات حقيقية في إسرائيل.',
      reasons: [
        'خطط مخصصة حسب المنطقة والوقت والاهتمامات واحتياجات الحركة.',
        'حفظ الرحلات في Supabase حتى ترافقك خططك عبر جميع الأجهزة.',
        'تجربة متعددة اللغات بالكامل بالعربية والعبرية والإنجليزية مع دعم RTL متقن.',
      ],
      exampleTitle: 'من رحلات طبيعة سريعة إلى مسارات متعددة الأيام مخطط لها بعناية',
      exampleBody: 'استخدم المنصة للرحلات العائلية أو المسارات الميسّرة أو رحلات التصوير أو مغامرات المشي المكثفة.',
      finalTitle: 'ابدأ في بناء رحلة تبدو وكأنها صممت خصيصاً لك',
      finalBody: 'أنشئ حساباً، أجب عن بعض الأسئلة الموجهة، ودع TiyulMate ينشئ لك خطة مميزة بلغتك.',
    },
    share: {
      title: 'شارك هذه الرحلة',
      body: 'أنشئ رابطاً عاماً ليتمكن الأصدقاء أو العائلة من مشاهدة أحدث نسخة من خطتك.',
      linkLabel: 'رابط مشاركة عام',
      copy: 'نسخ',
      copied: 'تم النسخ',
      preview: 'معاينة الرابط',
      generate: 'إنشاء رابط مشاركة',
      generating: 'جارٍ الإنشاء...',
      instructionsTitle: 'كيف تعمل المشاركة',
      instructions: [
        'أنشئ رابطاً عاماً مرتبطاً بهذه الرحلة.',
        'أرسله إلى أي شخص يجب أن يرى الخطة.',
        'يمكنه فتح الرحلة بدون تسجيل الدخول.',
      ],
    },
  },
}
