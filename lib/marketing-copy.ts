import { type Locale } from '@/lib/i18n'

type Metric = {
  value: string
  label: string
}

type Step = {
  title: string
  body: string
}

type Benefit = {
  title: string
  body: string
}

type Testimonial = {
  quote: string
  name: string
  role: string
}

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
  loginError: string
  signUpError: string
  sampleNotice: string
  sampleCardEyebrow: string
  sampleCardHint: string
  previewSample: string
  loginPoints: string[]
  signUpPoints: string[]
}

type LandingCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  heroPrimaryCta: string
  heroSecondaryCta: string
  heroTrust: string
  heroMetrics: Metric[]
  trustBar: string[]
  previewEyebrow: string
  previewTitle: string
  previewBody: string
  previewBullets: string[]
  previewBadges: string[]
  stepsTitle: string
  stepsBody: string
  steps: Step[]
  whyTitle: string
  whyBody: string
  reasons: string[]
  benefitsTitle: string
  benefitsBody: string
  benefits: Benefit[]
  socialProofTitle: string
  socialProofBody: string
  testimonials: Testimonial[]
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

type SamplePreviewCopy = {
  eyebrow: string
  backToGallery: string
  bestFor: string
  vibe: string
  pace: string
  region: string
  duration: string
  difficulty: string
  startArea: string
  highlights: string
  routePreview: string
  practicalNotes: string
  bring: string
  whyThisWorks: string
  accountPrompt: string
  createAccount: string
  useAsBase: string
  generateSimilar: string
  moreSamples: string
}

export const marketingCopy: Record<
  Locale,
  {
    auth: AuthCopy
    landing: LandingCopy
    samplePreview: SamplePreviewCopy
  }
> = {
  en: {
    auth: {
      loginTitle: 'Welcome back',
      loginBody: 'Open your saved trips, continue from a sample, and keep every route synced across devices.',
      signUpTitle: 'Create your TiyulMate account',
      signUpBody: 'Save trips, personalize routes around real needs, and keep polished plans ready on any device.',
      signUpSuccessTitle: 'Check your inbox',
      signUpSuccessBody: 'We sent a confirmation link to your email. Once you confirm, you can sign in and keep planning.',
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
      loginError: 'Your login details are incorrect or your email has not been confirmed yet.',
      signUpError: 'We could not create your account right now. Check your email address and try again.',
      sampleNotice: 'Your selected sample will stay ready for you after sign in.',
      sampleCardEyebrow: 'Selected sample',
      sampleCardHint: 'Preview it now, then create an account when you are ready to save and personalize it.',
      previewSample: 'Preview sample',
      loginPoints: [
        'Open saved itineraries from any device',
        'Continue from a sample trip without starting over',
        'Keep one polished link ready for sharing',
      ],
      signUpPoints: [
        'Save every trip to your own account',
        'Personalize routes by pace, family needs, and accessibility',
        'Share polished plans with a clean public link',
      ],
    },
    landing: {
      heroEyebrow: 'Trip planning for Israel',
      heroTitle: 'Plan a day in Israel that actually fits your pace, people, and time.',
      heroBody:
        'TiyulMate turns your region, timing, starting point, mobility needs, and interests into one clear itinerary with route logic, practical notes, and a polished page you can revisit or share.',
      heroPrimaryCta: 'Browse sample trips',
      heroSecondaryCta: 'Create account',
      heroTrust:
        'Built for family days out, accessible routes, couple weekends, dog-friendly escapes, photography mornings, and spontaneous one-day plans.',
      heroMetrics: [
        { value: '3 languages', label: 'English, Hebrew, and Arabic' },
        { value: 'Saved', label: 'Trips stay tied to your account' },
        { value: 'Practical', label: 'Routes, notes, and sharing in one place' },
      ],
      trustBar: [
        'Less tab-hopping',
        'Accessibility-aware planning',
        'Saved across devices',
        'Public share pages',
      ],
      previewEyebrow: 'What you get',
      previewTitle: 'A guided trip brief instead of another vague list of places',
      previewBody:
        'Answer a few focused questions and get a plan that already thinks about pacing, route flow, practical notes, and what makes the day work for the people joining you.',
      previewBullets: [
        'Built around real trip constraints like timing, mobility, kids, and starting area',
        'Editable trip pages with notes, tags, checklists, and day flow',
        'Clean public sharing when you want one link instead of screenshots and pins',
      ],
      previewBadges: ['Family-ready', 'Accessible options', 'Route-aware', 'Easy to share'],
      stepsTitle: 'How it works',
      stepsBody: 'The planner stays focused on the details that actually change the day.',
      steps: [
        {
          title: 'Shape the day',
          body: 'Choose the region, timing, difficulty, starting point, and who the trip needs to work for.',
        },
        {
          title: 'Get a useful plan',
          body: 'Receive a route with pacing, highlights, practical notes, and ideas tailored to that setup.',
        },
        {
          title: 'Refine and share',
          body: 'Edit the plan, save it to your account, and send one polished link when it is ready.',
        },
      ],
      whyTitle: 'Why it feels better than generic planners',
      whyBody:
        'Generic travel tools usually stop at destination ideas. TiyulMate is built for the actual planning work: tradeoffs, accessibility, timing, and the shape of a real day in Israel.',
      reasons: [
        'It uses region, duration, difficulty, starting point, and preferences together instead of treating them as separate filters.',
        'It can plan around accessibility, stroller use, low-mobility needs, family pacing, or a dog-friendly route.',
        'Trips are saved to your account so you can keep editing, duplicating, and sharing without losing context.',
      ],
      benefitsTitle: 'Made to reduce planning friction',
      benefitsBody:
        'The experience is designed to replace scattered browser tabs with one place to think, compare, save, and decide.',
      benefits: [
        {
          title: 'Clear starting point',
          body: 'You do not begin from a blank page. The planner guides you toward a realistic first version quickly.',
        },
        {
          title: 'Useful trip pages',
          body: 'Each trip can hold summary, tags, route hints, checklist items, and practical notes that stay editable.',
        },
        {
          title: 'Built for real decisions',
          body: 'Who the trip is for, what to bring, and how the day should flow are treated as product features, not afterthoughts.',
        },
      ],
      socialProofTitle: 'The kind of confidence people want before they leave home',
      socialProofBody:
        'Users come to TiyulMate when they want a trip to feel thought through before the first kilometer.',
      testimonials: [
        {
          quote: 'It took our messy “maybe Galilee this Saturday” idea and turned it into a day that actually worked for kids, grandparents, and timing.',
          name: 'Maya',
          role: 'Family planner',
        },
        {
          quote: 'The accessibility details made the plan feel genuinely useful, not just beautiful.',
          name: 'Samer',
          role: 'Accessible travel user',
        },
        {
          quote: 'The share page replaced a whole chat thread of screenshots, notes, and map pins.',
          name: 'Noa',
          role: 'Weekend organizer',
        },
      ],
      readyMadeEyebrow: 'Start from a real example',
      readyMadeTitle: 'Preview sample trips before you decide to sign up',
      readyMadeBody:
        'See the quality of the planning first, then create an account when you want to save, personalize, or generate your own version.',
      readyMadePreview: 'Preview sample',
      readyMadeUseBase: 'Use this as a base',
      readyMadeGenerateSimilar: 'Generate something similar',
      finalTitle: 'Create an account when you are ready to save, personalize, and share',
      finalBody:
        'Use TiyulMate to keep every trip in one place, refine the details over time, and reopen the same plan from any device.',
      finalPrimaryCta: 'Create account',
      finalSecondaryCta: 'See sample trips',
    },
    samplePreview: {
      eyebrow: 'Public sample trip',
      backToGallery: 'Back to sample trips',
      bestFor: 'Best for',
      vibe: 'Vibe',
      pace: 'Pace',
      region: 'Region',
      duration: 'Duration',
      difficulty: 'Difficulty',
      startArea: 'Starting area',
      highlights: 'Highlights',
      routePreview: 'Route preview',
      practicalNotes: 'Practical notes',
      bring: 'What to bring',
      whyThisWorks: 'Why this sample works',
      accountPrompt:
        'Create an account to save this sample, personalize the route, and generate your own version without starting from scratch.',
      createAccount: 'Create account',
      useAsBase: 'Use this as a base',
      generateSimilar: 'Generate a similar trip',
      moreSamples: 'See more samples',
    },
  },
  he: {
    auth: {
      loginTitle: 'ברוכים השבים',
      loginBody: 'פתחו את הטיולים ששמרתם, המשיכו מדוגמה שבחרתם, ושמרו כל מסלול מסונכרן בין מכשירים.',
      signUpTitle: 'יוצרים חשבון ב-TiyulMate',
      signUpBody: 'שומרים טיולים, מתאימים מסלולים לצרכים אמיתיים, וממשיכים מכל מכשיר בלי לאבד הקשר.',
      signUpSuccessTitle: 'בדקו את תיבת המייל',
      signUpSuccessBody: 'שלחנו אליכם קישור אימות. אחרי האישור תוכלו להתחבר ולהמשיך לתכנן.',
      email: 'אימייל',
      password: 'סיסמה',
      repeatPassword: 'הקלידו שוב סיסמה',
      login: 'התחברות',
      loginLoading: 'מתחברים...',
      signUp: 'יצירת חשבון',
      signUpLoading: 'יוצרים חשבון...',
      noAccount: 'אין לכם חשבון?',
      haveAccount: 'כבר יש לכם חשבון?',
      confirmEmail: 'יש לאשר את כתובת האימייל לפני ההתחברות.',
      passwordsMismatch: 'הסיסמאות אינן תואמות',
      loginError: 'פרטי ההתחברות שגויים או שכתובת האימייל עדיין לא אומתה.',
      signUpError: 'לא הצלחנו ליצור חשבון כרגע. בדקו שהאימייל תקין ונסו שוב.',
      sampleNotice: 'הדוגמה שבחרתם תחכה לכם מיד אחרי ההתחברות.',
      sampleCardEyebrow: 'הדוגמה שבחרתם',
      sampleCardHint: 'אפשר לצפות בה עכשיו, ואז לפתוח חשבון כשתרצו לשמור ולהתאים אותה אישית.',
      previewSample: 'לצפייה בדוגמה',
      loginPoints: [
        'פותחים מסלולים שמורים מכל מכשיר',
        'ממשיכים מדוגמת טיול בלי להתחיל מחדש',
        'שומרים קישור שיתוף אחד, מסודר וברור',
      ],
      signUpPoints: [
        'שומרים כל טיול בחשבון האישי שלכם',
        'מתאימים את המסלול לקצב, לנגישות ולמי שמצטרף',
        'משתפים תוכנית מסודרת עם קישור ציבורי אחד',
      ],
    },
    landing: {
      heroEyebrow: 'תכנון טיולים בישראל',
      heroTitle: 'תכננו יום טיול בישראל שבאמת מתאים לקצב, לאנשים ולזמן שלכם.',
      heroBody:
        'TiyulMate הופכת אזור, זמן, נקודת יציאה, נגישות ותחומי עניין למסלול ברור אחד עם היגיון דרך, הערות פרקטיות ועמוד טיול שאפשר לחזור אליו או לשתף.',
      heroPrimaryCta: 'לצפות בדוגמאות',
      heroSecondaryCta: 'יצירת חשבון',
      heroTrust:
        'מתאים לימי משפחה, מסלולים נגישים, סופי שבוע זוגיים, יציאות עם כלבים, בוקר לצילום, וגם לטיולי יום ספונטניים.',
      heroMetrics: [
        { value: '3 שפות', label: 'עברית, אנגלית וערבית' },
        { value: 'נשמר', label: 'כל טיול נשמר בחשבון שלכם' },
        { value: 'פרקטי', label: 'מסלול, הערות ושיתוף במקום אחד' },
      ],
      trustBar: ['פחות טאבים', 'תכנון מודע לנגישות', 'שמירה בין מכשירים', 'עמודי שיתוף ציבוריים'],
      previewEyebrow: 'מה מקבלים',
      previewTitle: 'בריף טיול ברור במקום עוד רשימת מקומות כללית',
      previewBody:
        'עונים על כמה שאלות ממוקדות ומקבלים מסלול שכבר חושב על קצב, זרימת יום, נקודות עצירה והערות פרקטיות לפי מי שמצטרף אליכם.',
      previewBullets: [
        'מבוסס על אילוצי אמת כמו זמן, ניידות, ילדים ואזור יציאה',
        'עמודי טיול עריכים עם תקציר, תגיות, ציוד והערות',
        'שיתוף ציבורי נקי כשצריך קישור אחד במקום צילומי מסך וסיכות מפה',
      ],
      previewBadges: ['ידידותי למשפחות', 'אפשרויות נגישות', 'חשיבה על מסלול', 'קל לשיתוף'],
      stepsTitle: 'איך זה עובד',
      stepsBody: 'המערכת שואלת רק על מה שבאמת משנה את יום הטיול.',
      steps: [
        {
          title: 'מגדירים את היום',
          body: 'בוחרים אזור, זמן, קושי, נקודת יציאה ומי הטיול צריך להתאים לו.',
        },
        {
          title: 'מקבלים תוכנית שימושית',
          body: 'נוצר מסלול עם קצב, נקודות עיקריות, הערות פרקטיות ורעיונות שמתאימים להגדרה הזאת.',
        },
        {
          title: 'מלטשים ומשתפים',
          body: 'עורכים את התוכנית, שומרים לחשבון, ושולחים קישור אחד כשהטיול מוכן.',
        },
      ],
      whyTitle: 'למה זה מרגיש טוב יותר ממתכננים גנריים',
      whyBody:
        'רוב הכלים מסתפקים ברעיונות ליעדים. TiyulMate נבנתה בשביל העבודה האמיתית של התכנון: פשרות, נגישות, תזמון והמבנה של יום אמיתי בישראל.',
      reasons: [
        'היא משלבת אזור, זמן, קושי, נקודת יציאה והעדפות יחד במקום להתייחס לכל דבר כפילטר נפרד.',
        'היא יודעת לתכנן סביב נגישות, עגלות, ניידות נמוכה, קצב משפחתי או מסלול ידידותי לכלבים.',
        'כל טיול נשמר בחשבון כדי שתוכלו לערוך, לשכפל ולשתף בלי לאבד הקשר.',
      ],
      benefitsTitle: 'בנוי כדי להפחית חיכוך בתכנון',
      benefitsBody:
        'המוצר מחליף גלישה מפוזרת בין טאבים במקום אחד שמאפשר לחשוב, להשוות, לשמור ולהחליט.',
      benefits: [
        {
          title: 'נקודת פתיחה ברורה',
          body: 'לא מתחילים מדף ריק. המערכת מובילה אתכם מהר לגרסה ראשונה שאפשר באמת לעבוד איתה.',
        },
        {
          title: 'עמודי טיול שימושיים',
          body: 'כל טיול יכול להכיל תקציר, תגיות, ציוד, רמזי מסלול והערות פרקטיות שנשארות עריכות.',
        },
        {
          title: 'מיועד להחלטות אמיתיות',
          body: 'למי הטיול מתאים, מה להביא ואיך היום צריך להרגיש מקבלים מקום מרכזי ולא הערת שוליים.',
        },
      ],
      socialProofTitle: 'הביטחון שאנשים מחפשים עוד לפני שיוצאים מהבית',
      socialProofBody: 'משתמשים מגיעים ל-TiyulMate כשהם רוצים להרגיש שהיום באמת סגור לפני הקילומטר הראשון.',
      testimonials: [
        {
          quote: 'זה לקח את ה“אולי גליל בשבת” המבולגן שלנו והפך אותו ליום שבאמת עבד לילדים, לסבים וללוח הזמנים.',
          name: 'מאיה',
          role: 'מתכננת משפחתית',
        },
        {
          quote: 'פרטי הנגישות גרמו למסלול להרגיש באמת שימושי, לא רק יפה.',
          name: 'סאמר',
          role: 'משתמש תכנון נגיש',
        },
        {
          quote: 'עמוד השיתוף החליף שרשור שלם של צילומי מסך, הערות וסיכות מפה.',
          name: 'נועה',
          role: 'מארגנת סופי שבוע',
        },
      ],
      readyMadeEyebrow: 'מתחילים מדוגמה אמיתית',
      readyMadeTitle: 'צפו בדוגמאות לפני שאתם מחליטים לפתוח חשבון',
      readyMadeBody:
        'רואים קודם את איכות התכנון, ואז פותחים חשבון רק כשצריך לשמור, להתאים אישית או לייצר גרסה משלכם.',
      readyMadePreview: 'לצפייה בדוגמה',
      readyMadeUseBase: 'להשתמש בזה כבסיס',
      readyMadeGenerateSimilar: 'ליצור משהו דומה',
      finalTitle: 'פותחים חשבון כשמוכנים לשמור, להתאים ולשתף',
      finalBody:
        'TiyulMate שומרת את כל הטיולים במקום אחד, מאפשרת ללטש כל פרט עם הזמן, ולפתוח את אותו המסלול מכל מכשיר.',
      finalPrimaryCta: 'יצירת חשבון',
      finalSecondaryCta: 'לצפייה בדוגמאות',
    },
    samplePreview: {
      eyebrow: 'דוגמת טיול ציבורית',
      backToGallery: 'חזרה לדוגמאות',
      bestFor: 'מתאים ל',
      vibe: 'אווירה',
      pace: 'קצב',
      region: 'אזור',
      duration: 'משך',
      difficulty: 'קושי',
      startArea: 'אזור יציאה',
      highlights: 'מה בולט במסלול',
      routePreview: 'תצוגת מסלול',
      practicalNotes: 'הערות פרקטיות',
      bring: 'מה להביא',
      whyThisWorks: 'למה הדוגמה הזאת עובדת',
      accountPrompt:
        'אפשר לפתוח חשבון כדי לשמור את הדוגמה, להתאים את המסלול אישית ולייצר גרסה משלכם בלי להתחיל מאפס.',
      createAccount: 'יצירת חשבון',
      useAsBase: 'להשתמש בזה כבסיס',
      generateSimilar: 'ליצור משהו דומה',
      moreSamples: 'לצפות בעוד דוגמאות',
    },
  },
  ar: {
    auth: {
      loginTitle: 'مرحبًا بعودتكم',
      loginBody: 'افتحوا الرحلات المحفوظة، واصلوا من نموذج اخترتموه، واحفظوا كل خطة متزامنة بين الأجهزة.',
      signUpTitle: 'أنشئوا حساب TiyulMate',
      signUpBody: 'احفظوا الرحلات، خصصوا المسارات لاحتياجات حقيقية، وواصلوا التخطيط من أي جهاز.',
      signUpSuccessTitle: 'تحققوا من بريدكم الإلكتروني',
      signUpSuccessBody: 'أرسلنا رابط تأكيد إلى بريدكم الإلكتروني. بعد التأكيد يمكنكم تسجيل الدخول ومتابعة التخطيط.',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      repeatPassword: 'أعيدوا كتابة كلمة المرور',
      login: 'تسجيل الدخول',
      loginLoading: 'جارٍ تسجيل الدخول...',
      signUp: 'إنشاء حساب',
      signUpLoading: 'جارٍ إنشاء الحساب...',
      noAccount: 'ليس لديكم حساب؟',
      haveAccount: 'لديكم حساب بالفعل؟',
      confirmEmail: 'يرجى تأكيد البريد الإلكتروني قبل تسجيل الدخول.',
      passwordsMismatch: 'كلمتا المرور غير متطابقتين',
      loginError: 'بيانات تسجيل الدخول غير صحيحة أو أن البريد الإلكتروني لم يتم تأكيده بعد.',
      signUpError: 'تعذر إنشاء الحساب الآن. تأكدوا من صحة البريد الإلكتروني وحاولوا مرة أخرى.',
      sampleNotice: 'النموذج الذي اخترتموه سيبقى جاهزًا لكم بعد تسجيل الدخول.',
      sampleCardEyebrow: 'النموذج الذي اخترتموه',
      sampleCardHint: 'يمكنكم معاينته الآن، ثم إنشاء حساب عندما تريدون حفظه وتخصيصه.',
      previewSample: 'معاينة النموذج',
      loginPoints: [
        'افتحوا الرحلات المحفوظة من أي جهاز',
        'واصلوا من رحلة نموذجية بدون البدء من الصفر',
        'احتفظوا برابط واحد أنيق للمشاركة',
      ],
      signUpPoints: [
        'احفظوا كل رحلة في حسابكم الشخصي',
        'خصصوا المسار وفق الوتيرة واحتياجات العائلة وإمكانية الوصول',
        'شاركوا خطة مرتبة عبر رابط عام واحد',
      ],
    },
    landing: {
      heroEyebrow: 'تخطيط رحلات داخل إسرائيل',
      heroTitle: 'خططوا ليوم في إسرائيل يناسب فعلًا وتيرتكم، والناس الذين معكم، والوقت المتاح لكم.',
      heroBody:
        'يحّول TiyulMate المنطقة، والوقت، ونقطة الانطلاق، واحتياجات الحركة، والاهتمامات إلى خطة واحدة واضحة مع منطق للمسار، وملاحظات عملية، وصفحة رحلة يمكن الرجوع إليها أو مشاركتها.',
      heroPrimaryCta: 'تصفحوا النماذج',
      heroSecondaryCta: 'إنشاء حساب',
      heroTrust:
        'مناسب لأيام العائلة، والمسارات الميسرة، وعطلات الأزواج، والخروج مع الكلاب، وصباحات التصوير، والرحلات اليومية السريعة.',
      heroMetrics: [
        { value: '3 لغات', label: 'العربية، العبرية، والإنجليزية' },
        { value: 'محفوظ', label: 'كل رحلة تبقى في حسابكم' },
        { value: 'عملي', label: 'المسار والملاحظات والمشاركة في مكان واحد' },
      ],
      trustBar: ['تصفح أقل', 'تخطيط واعٍ لإمكانية الوصول', 'محفوظ عبر الأجهزة', 'صفحات مشاركة عامة'],
      previewEyebrow: 'ماذا تحصلون',
      previewTitle: 'ملف رحلة واضح بدل قائمة أماكن عامة أخرى',
      previewBody:
        'تجيبون عن أسئلة مركزة وتحصلون على خطة تفكر مسبقًا في الوتيرة، وتسلسل اليوم، ونقاط التوقف، والملاحظات العملية بحسب من ينضم إليكم.',
      previewBullets: [
        'مبني حول قيود حقيقية مثل الوقت، والحركة، والأطفال، ومنطقة الانطلاق',
        'صفحات رحلات قابلة للتعديل مع ملخص ووسوم وتجهيزات وملاحظات',
        'مشاركة عامة نظيفة عندما تحتاجون إلى رابط واحد بدل لقطات الشاشة والخرائط',
      ],
      previewBadges: ['مناسب للعائلة', 'خيارات ميسرة', 'يفكر في المسار', 'سهل للمشاركة'],
      stepsTitle: 'كيف يعمل',
      stepsBody: 'المنتج يسأل فقط عن التفاصيل التي تغيّر شكل اليوم فعلًا.',
      steps: [
        {
          title: 'شكّلوا اليوم',
          body: 'اختاروا المنطقة، والوقت، والصعوبة، ونقطة الانطلاق، ومن يجب أن تناسبه الرحلة.',
        },
        {
          title: 'احصلوا على خطة مفيدة',
          body: 'تحصلون على مسار مع وتيرة ونقاط رئيسية وملاحظات عملية واقتراحات تناسب هذا الإعداد.',
        },
        {
          title: 'عدّلوا وشاركوا',
          body: 'حرروا الخطة، احفظوها في الحساب، وأرسلوا رابطًا واحدًا عندما تصبح جاهزة.',
        },
      ],
      whyTitle: 'لماذا تبدو أفضل من المخططات العامة',
      whyBody:
        'معظم الأدوات تتوقف عند اقتراح أماكن. TiyulMate مخصصة للعمل الحقيقي في التخطيط: المفاضلات، وإمكانية الوصول، والتوقيت، وشكل يوم فعلي داخل إسرائيل.',
      reasons: [
        'تجمع بين المنطقة، والمدة، والصعوبة، ونقطة الانطلاق، والتفضيلات بدل التعامل معها كفلاتر منفصلة.',
        'يمكنها التخطيط حول إمكانية الوصول، أو عربات الأطفال، أو محدودية الحركة، أو وتيرة عائلية، أو مسار مناسب للكلاب.',
        'تُحفظ الرحلات داخل حسابكم لتتمكنوا من التعديل، والتكرار، والمشاركة بدون فقدان السياق.',
      ],
      benefitsTitle: 'مبنية لتقليل الاحتكاك في التخطيط',
      benefitsBody:
        'المنتج يستبدل التصفح المبعثر بين التبويبات بمكان واحد للتفكير والمقارنة والحفظ واتخاذ القرار.',
      benefits: [
        {
          title: 'نقطة بداية واضحة',
          body: 'لن تبدأوا من صفحة فارغة. النظام يقودكم بسرعة إلى نسخة أولى يمكن العمل عليها.',
        },
        {
          title: 'صفحات رحلة مفيدة',
          body: 'كل رحلة يمكن أن تشمل ملخصًا ووسومًا وتجهيزات ولمحات عن المسار وملاحظات عملية تبقى قابلة للتعديل.',
        },
        {
          title: 'مصمم لقرارات حقيقية',
          body: 'لمن تناسب الرحلة، وما الذي يجب إحضاره، وكيف يجب أن يسير اليوم هي عناصر أساسية وليست تفاصيل جانبية.',
        },
      ],
      socialProofTitle: 'الثقة التي يبحث عنها الناس قبل مغادرة البيت',
      socialProofBody: 'يصل المستخدمون إلى TiyulMate عندما يريدون أن يشعروا أن اليوم مرتب فعلًا قبل أول كيلومتر.',
      testimonials: [
        {
          quote: 'حوّل فكرة “ربما الجليل هذا السبت” المبعثرة إلى يوم يناسب الأطفال، والأجداد، والوقت المتاح.',
          name: 'مايا',
          role: 'منظمة رحلات عائلية',
        },
        {
          quote: 'تفاصيل إمكانية الوصول جعلت الخطة مفيدة فعلًا، لا مجرد شيء جميل.',
          name: 'سامر',
          role: 'مستخدم رحلات ميسرة',
        },
        {
          quote: 'صفحة المشاركة استبدلت سلسلة طويلة من لقطات الشاشة والملاحظات ودبابيس الخرائط.',
          name: 'نوعا',
          role: 'منظمة عطلات نهاية الأسبوع',
        },
      ],
      readyMadeEyebrow: 'ابدؤوا من مثال حقيقي',
      readyMadeTitle: 'عاينوا رحلات نموذجية قبل أن تقرروا إنشاء حساب',
      readyMadeBody:
        'شاهدوا جودة التخطيط أولًا، ثم أنشئوا حسابًا فقط عندما تريدون الحفظ أو التخصيص أو توليد نسختكم الخاصة.',
      readyMadePreview: 'معاينة النموذج',
      readyMadeUseBase: 'استخدموا هذا كأساس',
      readyMadeGenerateSimilar: 'أنشئوا شيئًا مشابهًا',
      finalTitle: 'أنشئوا حسابًا عندما تصبحون مستعدين للحفظ والتخصيص والمشاركة',
      finalBody:
        'يحفظ TiyulMate كل الرحلات في مكان واحد، ويسمح بتحسين كل تفصيل مع الوقت، ويفتح نفس الخطة من أي جهاز.',
      finalPrimaryCta: 'إنشاء حساب',
      finalSecondaryCta: 'تصفحوا النماذج',
    },
    samplePreview: {
      eyebrow: 'رحلة نموذجية عامة',
      backToGallery: 'العودة إلى النماذج',
      bestFor: 'مناسبة لـ',
      vibe: 'الأجواء',
      pace: 'الوتيرة',
      region: 'المنطقة',
      duration: 'المدة',
      difficulty: 'الصعوبة',
      startArea: 'منطقة الانطلاق',
      highlights: 'أبرز ما فيها',
      routePreview: 'معاينة المسار',
      practicalNotes: 'ملاحظات عملية',
      bring: 'ماذا تحضرون',
      whyThisWorks: 'لماذا تنجح هذه العينة',
      accountPrompt:
        'يمكنكم إنشاء حساب لحفظ هذا النموذج، وتخصيص المسار، وإنشاء نسختكم الخاصة بدون البدء من الصفر.',
      createAccount: 'إنشاء حساب',
      useAsBase: 'استخدموا هذا كأساس',
      generateSimilar: 'أنشئوا رحلة مشابهة',
      moreSamples: 'شاهدوا نماذج أخرى',
    },
  },
}
