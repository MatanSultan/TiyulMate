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
  sampleNotice: string
}

type LandingMetric = {
  value: string
  label: string
}

type LandingBenefit = {
  title: string
  body: string
}

type LandingTestimonial = {
  quote: string
  name: string
  role: string
}

type LandingCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  heroPrimaryCta: string
  heroSecondaryCta: string
  heroTrust: string
  heroMetrics: LandingMetric[]
  previewEyebrow: string
  previewTitle: string
  previewBody: string
  previewBullets: string[]
  previewBadges: string[]
  whyTitle: string
  whyBody: string
  reasons: string[]
  benefitsTitle: string
  benefitsBody: string
  benefits: LandingBenefit[]
  socialProofTitle: string
  socialProofBody: string
  testimonials: LandingTestimonial[]
  readyMadeEyebrow: string
  readyMadeTitle: string
  readyMadeBody: string
  readyMadePreview: string
  readyMadeUseBase: string
  readyMadeGenerateSimilar: string
  finalTitle: string
  finalBody: string
  finalPrimaryCta: string
  finalSecondaryCta: string
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
  loading: string
  back: string
  notFound: string
  loadError: string
  shareError: string
}

type PublicShareCopy = {
  sharedTrip: string
  backHome: string
  ctaBody: string
  ctaLink: string
  notFound: string
  loadError: string
}

export const siteCopy: Record<
  Locale,
  {
    auth: AuthCopy
    landing: LandingCopy
    share: ShareCopy
    publicShare: PublicShareCopy
  }
> = {
  en: {
    auth: {
      loginTitle: 'Welcome back',
      loginBody: 'Sign in to keep planning premium AI-powered trips across Israel, pick up saved itineraries on any device, and continue from your last idea.',
      signUpTitle: 'Create your TiyulMate account',
      signUpBody: 'Save your trips, generate in your language, personalize every detail, and share polished itineraries with one account.',
      signUpSuccessTitle: 'Check your inbox',
      signUpSuccessBody: 'We sent a confirmation link to your email. Once you confirm, you can sign in and continue planning.',
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
      sampleNotice: 'Your selected sample trip will be waiting for you after sign in.',
    },
    landing: {
      heroEyebrow: 'Premium AI trip planning for Israel',
      heroTitle: 'Plan a trip in Israel that feels built by a local expert and tailored by AI.',
      heroBody: 'TiyulMate turns your pace, family needs, accessibility requirements, starting area, and interests into a polished trip plan with route ideas, practical notes, map links, and a shareable itinerary that stays tied to your account.',
      heroPrimaryCta: 'Create your account',
      heroSecondaryCta: 'Explore sample trips',
      heroTrust: 'Used for family escapes, accessible day trips, romantic weekends, dog-friendly outings, and last-minute nature plans across Israel.',
      heroMetrics: [
        { value: '3 languages', label: 'English, Hebrew, Arabic' },
        { value: 'AI-first', label: 'Personalized itinerary generation' },
        { value: '1 account', label: 'Trips synced across devices' },
      ],
      previewEyebrow: 'What the product feels like',
      previewTitle: 'A guided planner that moves from idea to trip in minutes',
      previewBody: 'Instead of starting from a blank page, users answer a few smart questions and immediately get a premium trip dossier with suggested flow, highlights, accessibility considerations, and practical “what to bring” guidance.',
      previewBullets: [
        'Guided setup with personalized preferences and accessibility support',
        'Beautiful trip pages with editable summaries, notes, tags, and route hints',
        'Shareable links for friends and family with a polished public trip view',
      ],
      previewBadges: ['AI-guided setup', 'Public share links', 'Accessible planning', 'Google Maps foundation'],
      whyTitle: 'Why travelers choose TiyulMate',
      whyBody: 'Most trip planners stop at generic suggestions. TiyulMate focuses on Israel-specific planning with multilingual UX, personal context, and a guided product flow that feels closer to a premium travel concierge.',
      reasons: [
        'Itinerary generation that respects region, duration, difficulty, starting point, and real interests.',
        'Accessibility-aware planning for stroller-friendly, wheelchair-friendly, and low-mobility needs.',
        'Persistent trip data in Supabase so every trip is saved to the authenticated user.',
      ],
      benefitsTitle: 'Built to turn curiosity into action',
      benefitsBody: 'The product is designed to increase confidence quickly: fewer tabs, more clarity, better guidance, and a much cleaner path from inspiration to a shared plan.',
      benefits: [
        {
          title: 'Guided, low-friction setup',
          body: 'The planner asks only the questions that actually improve the itinerary and keeps the flow feeling intelligent and fast.',
        },
        {
          title: 'Trip details you can keep refining',
          body: 'Users can edit titles, summaries, tags, notes, checklist items, and preferences without losing the AI-generated structure.',
        },
        {
          title: 'Designed for real decision-making',
          body: 'Map queries, practical notes, suggested timing, and who-the-trip-is-for cues make the output feel usable, not generic.',
        },
      ],
      socialProofTitle: 'The product position users immediately understand',
      socialProofBody: 'TiyulMate feels like the premium, AI-first way to plan Israel trips when you want less browsing, fewer compromises, and clearer trip confidence.',
      testimonials: [
        {
          quote: 'We used it to turn a vague “maybe Galilee this weekend” idea into a realistic family trip with stops, timing, and a route everyone could handle.',
          name: 'Maya',
          role: 'Family trip planner',
        },
        {
          quote: 'The accessibility angle changes everything. It finally feels like the planner is considering mobility, not just pretty destinations.',
          name: 'Samer',
          role: 'Accessible travel user',
        },
        {
          quote: 'The public trip page made it easy to send one clean link instead of a bunch of screenshots and map pins.',
          name: 'Noa',
          role: 'Weekend organizer',
        },
      ],
      readyMadeEyebrow: 'Start from a strong example',
      readyMadeTitle: 'Use curated sample trips as a fast path to your perfect plan',
      readyMadeBody: 'Preview stronger examples, understand what TiyulMate can generate, and use any sample as the base for your own AI trip.',
      readyMadePreview: 'Preview sample trip',
      readyMadeUseBase: 'Use this as a base',
      readyMadeGenerateSimilar: 'Generate something similar',
      finalTitle: 'Create an account and turn your next idea into a polished trip plan',
      finalBody: 'Join once, save every trip, edit every detail, and generate premium itineraries in English, Hebrew, or Arabic whenever inspiration hits.',
      finalPrimaryCta: 'Start planning',
      finalSecondaryCta: 'See the sample gallery',
    },
    share: {
      title: 'Share this trip',
      body: 'Create a public link so anyone with the URL can view the latest version of your itinerary.',
      linkLabel: 'Public share link',
      copy: 'Copy',
      copied: 'Copied',
      preview: 'Preview link',
      generate: 'Generate share link',
      generating: 'Generating...',
      instructionsTitle: 'How sharing works',
      instructions: [
        'Generate one public token for this trip.',
        'Share the link with friends, family, or collaborators.',
        'Anyone with the link can open the public trip page without logging in.',
      ],
      loading: 'Loading...',
      back: 'Back',
      notFound: 'Trip not found',
      loadError: 'Failed to load share settings',
      shareError: 'Failed to generate share link',
    },
    publicShare: {
      sharedTrip: 'Shared trip',
      backHome: 'Back to home',
      ctaBody: 'Want your own AI-powered trip planner?',
      ctaLink: 'Create an account',
      notFound: 'Trip not found',
      loadError: 'Failed to load trip',
    },
  },
  he: {
    auth: {
      loginTitle: 'ברוך שובך',
      loginBody: 'התחבר כדי להמשיך לתכנן טיולים חכמים ברחבי ישראל, לחזור למסלולים השמורים שלך מכל מכשיר, ולהמשיך בדיוק מהמקום שבו עצרת.',
      signUpTitle: 'צור חשבון TiyulMate',
      signUpBody: 'שמור את הטיולים שלך, צור מסלולים בשפה שלך, התאם כל פרט, ושתף תוצרי AI מלוטשים מחשבון אחד.',
      signUpSuccessTitle: 'בדוק את תיבת המייל שלך',
      signUpSuccessBody: 'שלחנו קישור אימות לכתובת שלך. אחרי האימות תוכל להתחבר ולהמשיך לתכנן.',
      email: 'אימייל',
      password: 'סיסמה',
      repeatPassword: 'הקלד סיסמה שוב',
      login: 'התחברות',
      loginLoading: 'מתחבר...',
      signUp: 'יצירת חשבון',
      signUpLoading: 'יוצר חשבון...',
      noAccount: 'אין לך חשבון?',
      haveAccount: 'כבר יש לך חשבון?',
      confirmEmail: 'יש לאשר את כתובת האימייל לפני ההתחברות.',
      passwordsMismatch: 'הסיסמאות אינן תואמות',
      sampleNotice: 'דוגמת הטיול שבחרת תחכה לך מיד אחרי ההתחברות.',
    },
    landing: {
      heroEyebrow: 'פלטפורמת AI פרימיום לטיולים בישראל',
      heroTitle: 'תכנן טיול בישראל שמרגיש כאילו נבנה על ידי מומחה מקומי והותאם בדיוק עבורך.',
      heroBody: 'TiyulMate הופכת אזור, משך, קצב, נגישות, אזור יציאה ותחומי עניין למסלול טיול מעוצב עם רעיונות לעצירות, הערות פרקטיות, קישורי מפות ודף טיול שאפשר לשתף בקלות.',
      heroPrimaryCta: 'יצירת חשבון',
      heroSecondaryCta: 'לצפייה בדוגמאות',
      heroTrust: 'מתאים לטיולים משפחתיים, מסלולים נגישים, סופי שבוע רומנטיים, יציאות עם כלבים, וטיולים ספונטניים ברחבי ישראל.',
      heroMetrics: [
        { value: '3 שפות', label: 'עברית, אנגלית, ערבית' },
        { value: 'AI-first', label: 'יצירת מסלולים מותאמת אישית' },
        { value: 'חשבון אחד', label: 'טיולים מסונכרנים בכל מכשיר' },
      ],
      previewEyebrow: 'כך מרגישה החוויה',
      previewTitle: 'מתכנון ראשוני למסלול מוכן תוך דקות',
      previewBody: 'במקום להתחיל מדף ריק, המשתמש עונה על כמה שאלות חכמות ומקבל מיד תיק טיול עשיר עם קצב מומלץ, נקודות שיא, שיקולי נגישות והמלצות “מה להביא”.',
      previewBullets: [
        'הגדרת טיול מודרכת עם התאמה אישית ושיקולי נגישות',
        'עמודי טיול יפים עם עריכה של סיכום, תגיות, הערות וצ’קליסט',
        'קישורי שיתוף ציבוריים עם דף טיול נעים לצפייה גם בלי התחברות',
      ],
      previewBadges: ['תהליך AI מודרך', 'קישורי שיתוף', 'תכנון נגיש', 'בסיס ל-Google Maps'],
      whyTitle: 'למה מטיילים בוחרים ב-TiyulMate',
      whyBody: 'רוב המוצרים נותנים המלצות כלליות. TiyulMate מתמקדת בטיולים אמיתיים בישראל, עם חוויית שימוש רב-לשונית, התאמה אישית עמוקה ותהליך שמרגיש כמו קונסיירז׳ דיגיטלי.',
      reasons: [
        'יצירת מסלולים שמתחשבת באזור, בזמן, ברמת הקושי, בנקודת היציאה ובתחומי העניין שלך.',
        'תכנון מודע לנגישות עם תמיכה בעגלות, כיסאות גלגלים ומוגבלות בניידות.',
        'שמירה ב-Supabase כך שכל טיול משויך למשתמש ונשמר בין מכשירים.',
      ],
      benefitsTitle: 'בנוי כדי להפוך סקרנות לפעולה',
      benefitsBody: 'המוצר מקצר את הדרך מהשראה להחלטה: פחות טאבים פתוחים, יותר בהירות, פחות חיכוך, ותחושת ביטחון גבוהה יותר לפני שיוצאים לדרך.',
      benefits: [
        {
          title: 'תהליך הגדרה חכם ולא מעייף',
          body: 'המערכת שואלת רק את השאלות שבאמת משפרות את המסלול, בלי להכביד על המשתמש.',
        },
        {
          title: 'טיולים שאפשר להמשיך ללטש',
          body: 'אפשר לערוך כותרת, סיכום, תגיות, הערות, רשימת ציוד והעדפות בלי לאבד את מבנה המסלול שנוצר.',
        },
        {
          title: 'תוצר שעוזר להחליט באמת',
          body: 'קישורי מפות, הערות פרקטיות, תזמון מומלץ ומידע למי הטיול מתאים הופכים את הפלט לשימושי באמת.',
        },
      ],
      socialProofTitle: 'עמדת מוצר שהמשתמש מבין מיד',
      socialProofBody: 'TiyulMate מרגישה כמו הדרך הפרימיום והחכמה לתכנן טיול בישראל כשלא רוצים לשוטט בין עשרות עמודים ולנחש מה נכון.',
      testimonials: [
        {
          quote: 'השתמשנו בזה כדי להפוך “אולי גליל בסופ״ש” לטיול משפחתי מסודר עם עצירות, זמנים ומסלול שכולם יכלו ליהנות ממנו.',
          name: 'מאיה',
          role: 'מתכננת טיולים משפחתיים',
        },
        {
          quote: 'ההתייחסות לנגישות עושה את כל ההבדל. סוף סוף מרגישים שהמוצר חושב על ניידות ולא רק על תמונות יפות.',
          name: 'סאמר',
          role: 'משתמש בתכנון נגיש',
        },
        {
          quote: 'דף השיתוף הציבורי חסך לי אינסוף הודעות וצילומי מסך. שלחתי קישור אחד והכול היה ברור.',
          name: 'נועה',
          role: 'מארגנת טיולי סופ״ש',
        },
      ],
      readyMadeEyebrow: 'מתחילים מדוגמה חזקה',
      readyMadeTitle: 'השתמש בדוגמאות מוכנות כדי להגיע מהר לטיול שמתאים לך',
      readyMadeBody: 'צפה בדוגמאות משכנעות יותר, הבן מה ה-AI יודע לבנות, והפוך כל דוגמה לבסיס לטיול משלך.',
      readyMadePreview: 'תצוגת דוגמה',
      readyMadeUseBase: 'השתמש בזה כבסיס',
      readyMadeGenerateSimilar: 'צור משהו דומה',
      finalTitle: 'צור חשבון והפוך כל רעיון למסלול טיול פרימיום',
      finalBody: 'הצטרף פעם אחת, שמור כל טיול, ערוך כל פרט, וצור מסלולים בעברית, אנגלית או ערבית בכל רגע שתרצה.',
      finalPrimaryCta: 'להתחיל לתכנן',
      finalSecondaryCta: 'לראות את גלריית הדוגמאות',
    },
    share: {
      title: 'שיתוף הטיול',
      body: 'צור קישור ציבורי כדי שכל מי שמקבל אותו יוכל לצפות בגרסה העדכנית של המסלול.',
      linkLabel: 'קישור שיתוף ציבורי',
      copy: 'העתקה',
      copied: 'הועתק',
      preview: 'תצוגה מקדימה',
      generate: 'יצירת קישור שיתוף',
      generating: 'יוצר...',
      instructionsTitle: 'איך השיתוף עובד',
      instructions: [
        'נוצר טוקן ציבורי יחיד עבור הטיול.',
        'אפשר לשלוח את הקישור לחברים, משפחה או שותפים לתכנון.',
        'כל מי שמחזיק בקישור יכול לצפות בדף הציבורי גם בלי להתחבר.',
      ],
      loading: 'טוען...',
      back: 'חזרה',
      notFound: 'הטיול לא נמצא',
      loadError: 'טעינת הגדרות השיתוף נכשלה',
      shareError: 'יצירת קישור השיתוף נכשלה',
    },
    publicShare: {
      sharedTrip: 'טיול משותף',
      backHome: 'חזרה לדף הבית',
      ctaBody: 'רוצה גם מתכנן טיולים חכם משלך?',
      ctaLink: 'יצירת חשבון',
      notFound: 'הטיול לא נמצא',
      loadError: 'טעינת הטיול נכשלה',
    },
  },
  ar: {
    auth: {
      loginTitle: 'مرحباً بعودتك',
      loginBody: 'سجّل الدخول لتواصل تخطيط رحلات ذكية داخل إسرائيل، وتعود إلى رحلاتك المحفوظة من أي جهاز، وتكمل من حيث توقفت.',
      signUpTitle: 'أنشئ حساب TiyulMate',
      signUpBody: 'احفظ رحلاتك، وأنشئ خططاً بلغتك، وعدّل كل تفصيل، وشارك نتائج AI المصقولة من حساب واحد.',
      signUpSuccessTitle: 'تحقق من بريدك الإلكتروني',
      signUpSuccessBody: 'أرسلنا رابط تأكيد إلى بريدك الإلكتروني. بعد التأكيد يمكنك تسجيل الدخول ومتابعة التخطيط.',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      repeatPassword: 'أعد كتابة كلمة المرور',
      login: 'تسجيل الدخول',
      loginLoading: 'جارٍ تسجيل الدخول...',
      signUp: 'إنشاء حساب',
      signUpLoading: 'جارٍ إنشاء الحساب...',
      noAccount: 'ليس لديك حساب؟',
      haveAccount: 'لديك حساب بالفعل؟',
      confirmEmail: 'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.',
      passwordsMismatch: 'كلمتا المرور غير متطابقتين',
      sampleNotice: 'سيكون نموذج الرحلة الذي اخترته جاهزاً لك فور تسجيل الدخول.',
    },
    landing: {
      heroEyebrow: 'منصة AI مميزة لتخطيط الرحلات في إسرائيل',
      heroTitle: 'خطط رحلة في إسرائيل تشعر وكأن خبيراً محلياً صممها وذكاءً اصطناعياً خصصها لك.',
      heroBody: 'يحوّل TiyulMate المنطقة والمدة والوتيرة وإمكانية الوصول ونقطة البداية والاهتمامات إلى خطة رحلة مصقولة مع اقتراحات توقف، وملاحظات عملية، وروابط خرائط، وصفحة رحلة قابلة للمشاركة.',
      heroPrimaryCta: 'إنشاء حساب',
      heroSecondaryCta: 'استكشاف الرحلات النموذجية',
      heroTrust: 'مناسب لرحلات العائلات، والمسارات الميسّرة، وعطلات رومانسية، وخطط مناسبة للكلاب، والرحلات السريعة داخل إسرائيل.',
      heroMetrics: [
        { value: '3 لغات', label: 'العربية، العبرية، الإنجليزية' },
        { value: 'AI-first', label: 'توليد رحلة مخصص' },
        { value: 'حساب واحد', label: 'رحلات متزامنة عبر الأجهزة' },
      ],
      previewEyebrow: 'هكذا تبدو التجربة',
      previewTitle: 'من فكرة أولية إلى ملف رحلة جاهز خلال دقائق',
      previewBody: 'بدلاً من البدء من صفحة فارغة، يجيب المستخدم عن عدة أسئلة ذكية ويحصل فوراً على ملف رحلة غني يتضمن الإيقاع المقترح، وأبرز النقاط، واعتبارات الوصول، وقائمة “ماذا أحضر”.',
      previewBullets: [
        'إعداد موجه مع تفضيلات شخصية ودعم لخيارات الوصول',
        'صفحات رحلات جميلة مع إمكانية تعديل الملخص والوسوم والملاحظات والقائمة',
        'روابط مشاركة عامة مع صفحة رحلة نظيفة يمكن فتحها بدون تسجيل دخول',
      ],
      previewBadges: ['إعداد موجّه بالذكاء الاصطناعي', 'روابط مشاركة', 'تخطيط ميسّر', 'أساس لخرائط Google'],
      whyTitle: 'لماذا يختار المسافرون TiyulMate',
      whyBody: 'معظم أدوات التخطيط تعطي اقتراحات عامة. TiyulMate تركز على رحلات حقيقية داخل إسرائيل، مع تجربة متعددة اللغات، وتخصيص عميق، وتدفق منتج يشعر وكأنه مساعد سفر رقمي.',
      reasons: [
        'إنشاء رحلات يراعي المنطقة والوقت والصعوبة ونقطة الانطلاق والاهتمامات الحقيقية.',
        'تخطيط واعٍ لإمكانية الوصول مع دعم للعربات والكراسي المتحركة ومحدودي الحركة.',
        'حفظ في Supabase بحيث ترتبط كل رحلة بالمستخدم وتبقى متاحة عبر الأجهزة.',
      ],
      benefitsTitle: 'مصمم لتحويل الفضول إلى قرار',
      benefitsBody: 'المنتج يقصّر الطريق من الإلهام إلى الخطة: نوافذ أقل، وضوح أكبر، احتكاك أقل، وثقة أعلى قبل الانطلاق.',
      benefits: [
        {
          title: 'إعداد ذكي بدون إرهاق',
          body: 'يسأل النظام فقط عن الأسئلة التي تحسن فعلاً جودة الخطة، من دون إثقال المستخدم.',
        },
        {
          title: 'رحلات يمكن الاستمرار في صقلها',
          body: 'يمكن تعديل العنوان والملخص والوسوم والملاحظات وقائمة التجهيزات والتفضيلات من دون خسارة بنية الخطة.',
        },
        {
          title: 'نتيجة تساعدك على اتخاذ قرار فعلي',
          body: 'روابط الخرائط والملاحظات العملية والتوقيت المقترح ولمن تصلح الرحلة تجعل الناتج عملياً لا عاماً.',
        },
      ],
      socialProofTitle: 'تموضع منتج يفهمه المستخدم فوراً',
      socialProofBody: 'TiyulMate تشعر كأنها الطريقة المميزة والذكية لتخطيط رحلة في إسرائيل عندما لا تريد الضياع بين عشرات الصفحات.',
      testimonials: [
        {
          quote: 'حوّل لنا فكرة “ربما الجليل هذا الأسبوع” إلى رحلة عائلية واضحة مع توقفات وتوقيت ومسار يناسب الجميع.',
          name: 'مايا',
          role: 'منظمة رحلات عائلية',
        },
        {
          quote: 'زاوية الوصول مهمة جداً. أخيراً أشعر أن المنتج يفكر في الحركة وليس فقط في الأماكن الجميلة.',
          name: 'سامر',
          role: 'مستخدم يبحث عن رحلات ميسّرة',
        },
        {
          quote: 'صفحة المشاركة العامة وفرت عليّ رسائل كثيرة. أرسلت رابطاً واحداً وكان كل شيء واضحاً.',
          name: 'نوعا',
          role: 'منظمة رحلات نهاية الأسبوع',
        },
      ],
      readyMadeEyebrow: 'ابدأ من مثال قوي',
      readyMadeTitle: 'استخدم رحلات نموذجية جاهزة للوصول بسرعة إلى رحلة تناسبك',
      readyMadeBody: 'شاهد أمثلة أكثر إقناعاً، وافهم ما يستطيع الذكاء الاصطناعي إنتاجه، وحوّل أي مثال إلى أساس لرحلتك.',
      readyMadePreview: 'معاينة المثال',
      readyMadeUseBase: 'استخدم هذا كأساس',
      readyMadeGenerateSimilar: 'أنشئ شيئاً مشابهاً',
      finalTitle: 'أنشئ حساباً وحوّل أي فكرة إلى خطة رحلة مميزة',
      finalBody: 'انضم مرة واحدة، واحفظ كل رحلة، وعدّل كل تفصيل، وأنشئ رحلات بالعربية أو العبرية أو الإنجليزية متى شئت.',
      finalPrimaryCta: 'ابدأ التخطيط',
      finalSecondaryCta: 'شاهد معرض الأمثلة',
    },
    share: {
      title: 'مشاركة الرحلة',
      body: 'أنشئ رابطاً عاماً حتى يتمكن أي شخص يملك الرابط من مشاهدة أحدث نسخة من الخطة.',
      linkLabel: 'رابط مشاركة عام',
      copy: 'نسخ',
      copied: 'تم النسخ',
      preview: 'معاينة الرابط',
      generate: 'إنشاء رابط مشاركة',
      generating: 'جارٍ الإنشاء...',
      instructionsTitle: 'كيف تعمل المشاركة',
      instructions: [
        'يتم إنشاء رمز مشاركة عام واحد لهذه الرحلة.',
        'يمكنك إرسال الرابط للأصدقاء أو العائلة أو المشاركين في التخطيط.',
        'أي شخص يملك الرابط يمكنه فتح الصفحة العامة من دون تسجيل دخول.',
      ],
      loading: 'جارٍ التحميل...',
      back: 'عودة',
      notFound: 'الرحلة غير موجودة',
      loadError: 'فشل تحميل إعدادات المشاركة',
      shareError: 'فشل إنشاء رابط المشاركة',
    },
    publicShare: {
      sharedTrip: 'رحلة مشتركة',
      backHome: 'العودة إلى الصفحة الرئيسية',
      ctaBody: 'هل تريد أيضاً مخطط رحلات ذكياً خاصاً بك؟',
      ctaLink: 'أنشئ حساباً',
      notFound: 'الرحلة غير موجودة',
      loadError: 'فشل تحميل الرحلة',
    },
  },
}
