import type { Locale } from "@/i18n/config";
import {
  SEO_PATH_AIRPORT_CAIRO_AR,
  SEO_PATH_AIRPORT_TRANSFER_EN,
  SEO_PATH_LIMOUSINE_CAIRO_AR,
  SEO_PATH_LIMOUSINE_CAIRO_EN,
} from "@/lib/seo-landing";

export type SeoLandingPageContent = {
  locale: Locale;
  segment: string;
  canonicalPath: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  schema: {
    serviceName: string;
    serviceType: string[];
  };
  intro: { paragraphs: string[] };
  services: { title: string; items: { title: string; text: string }[] };
  why: { title: string; paragraphs: string[] };
  coverage: { title: string; intro: string; bullets: string[] };
  cta: { title: string; body: string };
  faqs: { question: string; answer: string }[];
};

export const limousineCairoEn: SeoLandingPageContent = {
  locale: "en",
  segment: "limousine-cairo",
  canonicalPath: SEO_PATH_LIMOUSINE_CAIRO_EN,
  metaTitle: "Cairo Limousine Service | Baraka Limousine Premium Rides",
  metaDescription:
    "Book a trusted Cairo limousine service for business, events, and city travel. Professional chauffeurs, modern fleet, and clear pricing across Greater Cairo.",
  h1: "Cairo limousine service for corporate rides and private travel",
  schema: {
    serviceName: "Cairo limousine service",
    serviceType: ["Limousine service", "Chauffeur service"],
  },
  intro: {
    paragraphs: [
      "When you need dependable transportation in Egypt’s capital, a professional Cairo limousine service keeps schedules tight, arrivals calm, and every kilometer comfortable. Baraka Limousine focuses on punctual pickups, courteous chauffeurs, and vehicles that match the tone of your trip—whether you are closing a deal in New Cairo, visiting a clinic in Maadi, or moving between hotels in central Cairo.",
      "Searching for limousine Cairo options often surfaces noisy marketplaces with unclear prices. We simplify booking with transparent routes, size-appropriate vehicles, and direct communication so you always know who is meeting you, where to stand, and what to expect at the curb. Our team understands peak-hour traffic patterns, event detours, and how to make tight turnarounds work without rushing passengers.",
      "The Greater Cairo region blends historic districts with fast-growing business hubs. That mix rewards drivers who plan ahead: alternate corridors during rush hour, safe drop patterns near landmarks, and luggage-friendly vehicles for longer stays. We plan routes with your itinerary in mind—not generic shortcuts—so your limousine cairo experience feels intentional rather than improvised.",
      "From single-day chauffeur coverage to multi-stop city runs, we scale the vehicle to the task. Sedans suit focused solo travel, SUVs handle families and extra luggage, vans coordinate small teams, and larger coaches support delegations. Whatever you choose, the goal is the same: a polished ride that respects your time and privacy across Cairo.",
    ],
  },
  services: {
    title: "Limousine services we provide in Cairo",
    items: [
      {
        title: "Executive and business travel",
        text: "Day hires and point-to-point rides for meetings, site visits, and executive protection-friendly driving styles. Your Cairo limousine service can include waiting time between appointments and coordinated handoffs at offices or co-working hubs.",
      },
      {
        title: "Hotel and event transfers",
        text: "Timed pickups for conferences, weddings, and private gatherings with mapped approaches to venues where access can be tight. We align with security or venue staff when needed so guests step out smoothly.",
      },
      {
        title: "Custom city tours and multi-stop days",
        text: "Plan a curated day across museums, Nile-side districts, or shopping destinations without juggling multiple apps. One dispatcher thread keeps timing realistic as Cairo traffic shifts through the afternoon.",
      },
      {
        title: "Family-friendly rides with luggage",
        text: "Spacious SUVs and vans keep child seats, strollers, and suitcases manageable. If you are connecting later for a cairo airport transfer on another day, we note luggage volumes up front so the vehicle match is correct from the first kilometer.",
      },
      {
        title: "Intercity connections starting in Cairo",
        text: "Many travelers begin in Cairo before heading to Alexandria, the Red Sea, or the new capital. Starting with a trusted limousine in Cairo sets the tone: clean cabin, prepared driver, and a plan for fuel stops or breaks on longer legs.",
      },
    ],
  },
  why: {
    title: "Why travelers choose Baraka Limousine in Cairo",
    paragraphs: [
      "Consistency sets a premium Cairo limousine apart: the same attention to detail for early-morning pickups and late-night departures. Our operations team monitors flights when airport legs are involved, confirms addresses in Arabic and English, and keeps WhatsApp threads uncluttered so instructions stay easy to follow on mobile.",
      "Safety and maintenance matter on crowded arterials and ring-road segments. Vehicles are vetted for comfort features you notice on longer rides—climate control, charging, and cabin space—while chauffeurs prioritize smooth defensive driving rather than abrupt shortcuts. You should arrive ready for your meeting, not fatigued from the journey.",
      "Transparent route-based pricing reduces surprises. When you share zones, times, and passenger count, we recommend an efficient vehicle class and spell out what is included. That clarity is especially valuable for international guests unfamiliar with local norms or for teams coordinating multiple cairo airport transfer segments during the same week.",
      "Finally, we respect privacy. Corporate clients routinely discuss sensitive topics en route; families appreciate discrete service; and celebratory travelers want a relaxed tone without unnecessary chatter. The driver adapts to the cabin mood while still offering helpful context about arrival points or venue access.",
    ],
  },
  coverage: {
    title: "Coverage across Greater Cairo",
    intro:
      "Our Cairo coverage spans major business corridors, diplomatic districts, and residential compounds frequently requested by visitors.",
    bullets: [
      "Downtown Cairo, Garden City, and Zamalek hotel zones",
      "New Cairo, Heliopolis, Nasr City, and the Fifth Settlement",
      "Maadi, Korba, and airport-adjacent approaches for same-day connections",
      "6th of October, Sheikh Zayed, and expanding western communities",
      "Giza pyramid plateau approaches and west-bank hotels (timing-dependent)",
    ],
  },
  cta: {
    title: "Book your Cairo limousine with Baraka",
    body: "Share your pickup zone, timing, passenger count, and any cairo airport transfer plans you already have—we will recommend the right vehicle and confirm quickly.",
  },
  faqs: [
    {
      question: "How do I book a limousine in Cairo with Baraka?",
      answer:
        "Send your route, date, time, and passenger count via WhatsApp or phone. We confirm the vehicle class, price basis, and meeting instructions before you travel.",
    },
    {
      question: "Do you offer hourly limousine hire in Cairo?",
      answer:
        "Yes. Day hires are popular for multi-stop business schedules. Share your itinerary so we can advise realistic timing for Cairo traffic and waiting periods.",
    },
    {
      question: "Can Baraka handle larger groups in Cairo?",
      answer:
        "We provide vans and coaches for teams and events. Tell us your luggage totals and any accessibility needs so we can size the vehicle correctly.",
    },
    {
      question: "Is a Cairo limousine suitable if I also need airport transfers?",
      answer:
        "Absolutely. Many clients pair city limousine coverage with a dedicated cairo airport transfer. Coordinating both with one operator keeps pickup rules and contacts consistent.",
    },
  ],
};

export const cairoAirportTransferEn: SeoLandingPageContent = {
  locale: "en",
  segment: "cairo-airport-transfer",
  canonicalPath: SEO_PATH_AIRPORT_TRANSFER_EN,
  metaTitle: "Cairo Airport Transfer | Baraka Limousine Meet & Greet",
  metaDescription:
    "Reliable Cairo airport transfer service from CAI and SPX with flight-aware pickups, luggage help, and a modern fleet. Book private airport rides with Baraka Limousine.",
  h1: "Cairo airport transfer service with flight-aware pickups",
  schema: {
    serviceName: "Cairo airport transfer",
    serviceType: ["Airport shuttle", "Limousine service"],
  },
  intro: {
    paragraphs: [
      "A cairo airport transfer should feel straightforward after your flight: a confirmed meeting point, a driver who tracks delays, and a vehicle that fits passengers and bags without squeezing. Cairo International Airport (CAI) and Sphinx International Airport (SPX) each have their own circulation patterns, security steps, and peak congestion windows—experience matters when timing curbside greetings.",
      "Baraka Limousine specializes in private airport rides across Egypt, and our Cairo airport transfer workflows emphasize proactive messaging. We confirm terminals when airlines publish them, share Arabic and English landmarks for rendezvous points, and adjust if you clear immigration faster or slower than expected. The objective is to collapse travel anxiety into a single calm walk to your car.",
      "Luggage reality varies: long-haul travelers often have two large suitcases per person, while regional hops may only need a sedan. During booking we ask honest counts so your cairo airport transfer uses an SUV or van before you discover a sedan trunk is not enough. Oversizing slightly beats scrambling at the curb.",
      "Beyond simple hotel drops, many arrivals chain into business meetings, family homes, or connections toward the Red Sea. We design the first leg—whether to New Cairo, Zamalek, or Sheikh Zayed—with the next leg in mind, advising realistic drive times and suggesting departure buffers for return pickup days.",
    ],
  },
  services: {
    title: "Airport transfer options in Cairo",
    items: [
      {
        title: "Meet-and-greet arrivals",
        text: "Named signage options and coordinated waiting policies after you emerge. Drivers watch flight status where helpful and reposition if ground delays shift your exit window.",
      },
      {
        title: "Departure pickups city-to-terminal",
        text: "Timed pulls accounting for Cairo traffic, airline check-in cutoffs, and terminal access rules. We recommend conservative buffers during Thursday peaks and holiday surges.",
      },
      {
        title: "CAI and SPX coverage",
        text: "Routing differs between airports; we plan approach roads, terminal familiarity, and rebooking flexibility if airlines move operations. Tell us your ticket airport code early.",
      },
      {
        title: "Group and family airport shuttles",
        text: "Vans and small buses with luggage bays for sports teams, wedding parties, and incentive travelers. A cairo airport transfer for groups includes load planning so boarding is quick.",
      },
      {
        title: "Executive sedan airport line",
        text: "Low-profile sedans for professionals who need quiet cabin space to answer calls before the hotel. Pair with later limousine cairo city hours if your program requires both.",
      },
    ],
  },
  why: {
    title: "Why book airport transfers with Baraka",
    paragraphs: [
      "Flight changes happen. We monitor schedules when you authorize it and keep WhatsApp threads concise so updates do not get lost. Drivers know how to re-enter airport roads legally after loops caused by security or construction reroutes.",
      "Vehicle hygiene and comfort matter after long flights. Climate control, bottled water on request, and smooth driving choices help you reset before walking into meetings or family greetings. Chauffeurs balance hospitality with discretion—helpful, not invasive.",
      "Pricing transparency avoids disputes at baggage claim. We explain meet-and-greet inclusions, waiting-time policies, and night differential if applicable. If your cairo airport transfer extends to multiple stops, we quote the full pattern rather than stacking surprise add-ons mid-trip.",
      "Safety extends to how bags are handled and how doors are managed in busy terminal shoulders. Families with children get patience at stroller folds; older travelers get steady pacing without rushing curbside steps.",
    ],
  },
  coverage: {
    title: "Popular Cairo airport transfer routes",
    intro:
      "These corridors are commonly requested; timing varies by hour, weather, and local events.",
    bullets: [
      "Cairo International Airport (CAI) to downtown and Zamalek hotels",
      "CAI to New Cairo, Heliopolis, and Fifth Settlement compounds",
      "CAI to Maadi, Korba, and eastern residential districts",
      "SPX arrivals to western Cairo and 6th of October corridors when schedules align",
      "Airport-to-Giza hotel approaches with realistic buffer for peak traffic",
    ],
  },
  cta: {
    title: "Reserve your Cairo airport pickup",
    body: "Send flight numbers, arrival airport, passenger and luggage counts, and your drop address. We reply with concrete meet instructions and a cairo airport transfer confirmation you can share with family or assistants.",
  },
  faqs: [
    {
      question: "How far in advance should I book a Cairo airport transfer?",
      answer:
        "For peak travel days, book as early as possible. For typical weekdays, same-week booking usually works, subject to fleet availability.",
    },
    {
      question: "What if my flight is delayed?",
      answer:
        "We adjust pickup timing when we can track your flight. Communicate changes when possible so we can redeploy waiting time fairly for drivers.",
    },
    {
      question: "Do you provide child seats for airport pickups?",
      answer:
        "Request child seats during booking. We coordinate sizes and counts so the correct vehicle and equipment meet you at the terminal.",
    },
    {
      question: "Can I combine an airport transfer with a limousine in Cairo later?",
      answer:
        "Yes. Many itineraries start with a cairo airport transfer and continue with city limousine hours—share your full program so dispatch assigns consistent crews when feasible.",
    },
  ],
};

export const limousineCairoAr: SeoLandingPageContent = {
  locale: "ar",
  segment: "ليموزين-القاهرة",
  canonicalPath: SEO_PATH_LIMOUSINE_CAIRO_AR,
  metaTitle: "ليموزين القاهرة بخدمة احترافية | بركة ليموزين للتنقل الراقي",
  metaDescription:
    "احجز ليموزين في القاهرة لرحلات الأعمال والفعاليات والتنقل اليومي مع سائقين محترفين وأسعار واضحة. تواصل مع بركة ليموزين للحجز السريع.",
  h1: "ليموزين القاهرة للأعمال والتنقل الخاص براحة وأمان",
  schema: {
    serviceName: "ليموزين القاهرة",
    serviceType: ["خدمة ليموزين", "خدمة سائق خاص"],
  },
  intro: {
    paragraphs: [
      "العاصمة تحتاج سيارات تتعامل مع الزحام بطريقة ذكية، وتفي بمواعيد العمل، وتحافظ على راحة الراكب من أول لحظة. عندما تبحث عن ليموزين القاهرة، فإن العناصر التي تميز التجربة عادةً ليست الزينة فقط، بل الالتزام بالوقت، ووضوح التسعير، وخبرة السائق في الشوارع الرئيسة والطرق البديلة عند الضيق المروري.",
      "بركة ليموزين تعمل على تبسيط التنسيق عبر قنوات تواصل مباشرة بالعربية والإنجليزية، مع توصية منطقية لفئة السيارة حسب عدد الركاب والحقائب وطبيعة اليوم. سواء كنت تتحرك بين التجمع الخامس والقاهرة الجديدة أو تزور مقرًا في وسط البلد أو تحتاج جدولة متعددة المحطات، نساعدك على اختيار ليموزين يناسب المهمة بدل أن تخمّن.",
      "القاهرة الكبرى تضم أعمالًا دبلوماسية وفنادق عتيقة وأحياء سكنية حديثة، وهذا التنوع يعني أن «أفضل مسار» يتغير مع الساعة واليوم. نخطط معك للالتفافات المرورية ولنقاط النزول الآمنة قرب المداخل الضيقة، ونحافظ على انطباع مهني طوال الرحلة.",
      "نوفر خطًا متكاملًا من السيارات الخاصة حتى الحافلات المتوسطة للوفود، مع تركيز دائم على نظافة المقصورة وهدوء القيادة. وإذا كانت خطتك تشمل لاحقًا ليموزين مطار القاهرة، يمكن تنسيق اليوميات بحيث تبقى بيانات التواصل ورقم الحجز واحدًا يقلل الارتباك.",
    ],
  },
  services: {
    title: "خدمات ليموزين القاهرة لدينا",
    items: [
      {
        title: "تنقلات الأعمال والإدارات التنفيذية",
        text: "تأجير بالساعة أو باليوم لزيارات متعددة مع وقت انتظار منظم بين المواعيد. يمكن دمج الاستقبال من مقر الشركة ثم التوجه لفندق أو قاعة مؤتمرات بسلاسة.",
      },
      {
        title: "فعاليات وأفراح وضيافة ضيوف",
        text: "تنسيق مواعيد الوصول لقاعات الفعاليات مع مراعاة دخول الأمن أو الملاحة داخل المجمعات السكنية المغلقة عند الحاجة.",
      },
      {
        title: "جولات يومية بعدة محطات",
        text: "برنامج سياحي أو شخصي يمر على أكثر من موقع دون إرهاق في تطبيقات متعددة. نضبط أوقاتًا واقعية مع الزحام المتوقع.",
      },
      {
        title: "عائلات وأمتعة كثيرة",
        text: "مركبات دفع رباعي وفان لمساحة إضافية للمقاعد والحقائب، مفيدة للمجموعات التي تنوي لاحقًا السفر عبر مطار القاهرة الدولي أو Sphinx.",
      },
      {
        title: "ربط رحلات بين المدن انطلاقًا من القاهرة",
        text: "بداية برحلة ليموزين من القاهرة باتجاه الإسكندرية أو الساحل أو وجهات أخرى مع توقفات وقود وراحة مخططة عند الحاجة.",
      },
    ],
  },
  why: {
    title: "لماذا يختار العملاء بركة ليموزين في القاهرة",
    paragraphs: [
      "نؤمن بأن الثقة تُبنى عبر تفاصيل صغيرة: تأكيد العنوان، صياغة رسائل واتساب واضحة، وتوصيف نقطة اللقاء عندما يكون المكان مزدحمًا. فريق التشغيل يسهّل على الزائر الجديد فهم التعليمات حتى لو كانت أول زيارة لمصر.",
      "السلامة والصيانة أولوية على الطرق السريعة وحلقات المرور. نفضّل أسلوب قيادة هادئًا يقلل الإجهاد بدل المناورات المفاجئة، مع مراعاة حرارة الجو وبطاريات الأجهزة داخل المقصورة عند رحلات أطول.",
      "الشفافية في التسعير تمنع مفاجآت مزعجة. عند مشاركة المناطق والتوقيت وعدد الركاب، نوضح أساس السعر والانتظارات المتفق عليها—وهذا مهم جدًا للشركات التي تدير ميزانية تنقلات شهرية أو ليموزين مطار القاهرة ضمن برنامج واحد.",
      "الخصوصية محترمة: محادثات العمل تبقى ضمن احترام المهنية، والعائلات تحصل على هدوء مناسب، والمناسبات الخاصة تحظى بأسلوب لبق دون مبالغة.",
    ],
  },
  coverage: {
    title: "مناطق تغطية ليموزين القاهرة",
    intro:
      "نخدم مسارات شائعة عبر العاصمة والقاهرة الكبرى مع تخطيط مرن حسب حركة اليوم.",
    bullets: [
      "وسط البلد والزمالك وجاردن سيتي والفنادق الحكومية القريبة",
      "التجمع الخامس والقاهرة الجديدة ومدينة نصر ومصر الجديدة",
      "المعادي ومناطق شرق القاهرة السكنية والتجارية",
      "6 أكتوبر والشيخ زايد والتوسعات الغربية",
      "مناقشة الرحلات نحو أهرامات الجيزة وفق التوقيت والأحوال المرورية",
    ],
  },
  cta: {
    title: "احجز ليموزين القاهرة الآن",
    body: "أرسل العنوان، الوقت، عدد الركاب، ونوع الحقائب. نؤكد لك فئة السيارة ونقطة اللقاء بسرعة عبر واتساب أو اتصال مباشر.",
  },
  faqs: [
    {
      question: "كيف أحجز ليموزين في القاهرة؟",
      answer:
        "راسلنا عبر واتساب أو الهاتف مع المسار والتاريخ والوقت. نؤكد نوع السيارة والسعر ونرسل تعليمات اللقاء قبل الرحلة.",
    },
    {
      question: "هل يتوفر تأجير ليموزين بالساعة؟",
      answer:
        "نعم، وهو مناسب للبرامج متعددة المحطات. شاركنا جدولك حتى نضبط أوقاتًا واقعية مع الزحام.",
    },
    {
      question: "هل تغطون المجموعات الكبيرة؟",
      answer:
        "نوفر فان وحافلات صغيرة ومتوسطة. أخبر الأوزان التقريبية للأمتعة لاختيار المركبة المناسبة من البداية.",
    },
    {
      question: "هل يمكن دمج ليموزين القاهرة مع ليموزين مطار القاهرة؟",
      answer:
        "بالتأكيد. تنسيق الجهة نفسها للبرنامجين يبقي أرقام التواصل والتعليمات متسقة ويقلل الأخطاء يوم السفر.",
    },
  ],
};

export const cairoAirportAr: SeoLandingPageContent = {
  locale: "ar",
  segment: "ليموزين-مطار-القاهرة",
  canonicalPath: SEO_PATH_AIRPORT_CAIRO_AR,
  metaTitle: "ليموزين مطار القاهرة | بركة ليموزين استقبال وتوديع",
  metaDescription:
    "خدمة ليموزين مطار القاهرة وSphinx: استقبال وتوديع، متابعة رحلات عند الطلب، ومركبات مناسبة للحقائب. احجز نقل مطار خاص مع بركة ليموزين.",
  h1: "ليموزين مطار القاهرة باستقبال منظم ومركبات واسعة",
  schema: {
    serviceName: "ليموزين مطار القاهرة",
    serviceType: ["نقل مطار", "خدمة ليموزين"],
  },
  intro: {
    paragraphs: [
      "بعد ساعات الطيران، المطلوب بسيط: نقطة لقاء واضحة، سائق يتابع التأخير إن أمكن، وسيارة تستوعب الركاب والحقائب دون إزعاج. ليموزين مطار القاهرة يجب أن يراعي اختلاف مطار القاهرة الدولي عن مطار سفنكس من حيث المداخل والازدحام وأنماط التشغيل اليومية.",
      "بركة ليموزين تعتمد على رسائل قصيرة ومفيدة عبر واتساب: التيرمنال، معالم للانتظار، وتعديلات عندما تتغير البوابات أو يتأخر الخروج من الجوازات. الهدف أن يصل المسافر إلى السيارة بخطوات هادئة بلا تخمين في الممرات.",
      "حساب الأمتعة الصادق يمنع مفاجآت عند الصندوق. إذا كنت قادمًا برحلة طويلة أو مع عائلة، قد ننصح بمركبة أوسع من السيدان حتى تبقى رحلة ليموزين مطار القاهرة مريحة من أول كيلومتر.",
      "كثير من البرامج لا تتوقف عند الفندق: اجتماع فوري في التجمع أو زيارة عائلية في حي آخر. نخطط لأول مدى مع مراعاة الأمد الثاني، وننبهك إلى أوقات الذروة حتى لا تتعارض مواعيدك مع واقع الشوارع.",
    ],
  },
  services: {
    title: "خيارات ليموزين مطار القاهرة",
    items: [
      {
        title: "استقبال الوصول مع تنسيق اللقاء",
        text: "لوح باسم عند الحاجة وسياسات انتظار مرنة بعد الخروج من الحقائب. نعيد جدولة التواجد عند التأخير الجوي الكبير قدر الإمكان.",
      },
      {
        title: "توديع من الفندق إلى المطار",
        text: "حساب زمن الذروة ومواعيد تسجيل الوصول للخطوط المختلفة مع توصيات buffer في أيام العطل والخميسات المزدحمة.",
      },
      {
        title: "تغطية CAI وSPX",
        text: "نناقش كود المطار مبكرًا لاختيار مسار الاقتراب الأنسب وتقليل الالتباس بين المطارين.",
      },
      {
        title: "مجموعات وعائلات",
        text: "فان وحافلات صغيرة لرحلات ليموزين مطار القاهرة الجماعية مع تخطيط تحميل الحقائب بسرعة.",
      },
      {
        title: "تنقلات للشركات بعد الوصول",
        text: "ربط مباشر بمواعيد العمل في القاهرة الجديدة أو وسط البلد مع سيارة مهيأة لهدوء العمل الهاتفي أثناء المشوار.",
      },
    ],
  },
  why: {
    title: "لماذا يثق المسافرون ببركة في المطار",
    paragraphs: [
      "نراقب الرحلات عندما تمنحنا التفاصيل، ونختصر التحديثات في رسائل واضحة بلا فوضى. السائقون يعيدون الدخول لمسار المطار وفق الأنظمة عند الحاجة لتفادي مخالفات أو ازدحام امتثالي.",
      "النظافة والتهوية والبرودة تؤثر على تجربة أول ساعة بعد الطائرة. نحافظ على مقصورة منظمة ونمشي بسلاسة عند المناعرض لتقليل الإرهاق.",
      "تسعير معلن للاستقبال والتوديع يقلل الجدل عند اللقاء. إذا انضمت محطات إضافية، نجمعها في عرض واحد بدل إضافات مفاجئة أثناء الرحلة.",
      "نراعي كبار السن والأطفال عند الرصيف: تهدئة الخطوات، مساعدة مع العربات، ووقت كافٍ لترتيب المقاعد.",
    ],
  },
  coverage: {
    title: "مسارات شائعة ليموزين مطار القاهرة",
    intro:
      "الأزمنة تقريبية وتتغير حسب الساعة والطقس والفعاليات المحلية.",
    bullets: [
      "من مطار القاهرة إلى فنادق وسط البلد والزمالك",
      "من CAI إلى التجمع والقاهرة الجديدة ومدينة نصر",
      "من CAI إلى المعادي والمناطق الشرقية السكنية",
      "من Sphinx إلى غرب القاهرة عندما يناسب جدول الرحلة",
      "من المطار إلى فنادق الجيزة مع هامش زمني واقعي",
    ],
  },
  cta: {
    title: "احجز ليموزين مطار القاهرة",
    body: "أرسل رقم الرحلة والمطار وعدد الركاب والحقائب والوجهة النهائية. نعيد لك تعليمات لقاء جاهزة للمشاركة مع العائلة أو المكتب.",
  },
  faqs: [
    {
      question: "متى يفضل حجز ليموزين المطار؟",
      answer:
        "احجز مبكرًا في الموسم والعطل. في الأيام العادية غالبًا يكفي حجز خلال نفس الأسبوع مع تأكيد التوفر.",
    },
    {
      question: "ماذا يحدث عند تأخير الرحلة؟",
      answer:
        "نعدّل الموعد عند توفر تتبع للرحلة أو عند إبلاغنا برسالة. التواصل المبكر يساعدنا على إدارة وقت الانتظار بعدل.",
    },
    {
      question: "هل توفّرون مقاعد أطفال؟",
      answer:
        "اطلب ذلك عند الحجز مع تحديد العمر والعدد لنجهز المقاس المناسب والسيارة الكافية.",
    },
    {
      question: "هل يمكن الجمع بين المطار وليموزين القاهرة لاحقًا؟",
      answer:
        "نعم، كثير من العملاء يبدأون بليموزين مطار القاهرة ثم يحجزون ساعات مدينة لاحقًا. شاركنا البرنامج كاملاً لنسهّل التنسيق.",
    },
  ],
};
