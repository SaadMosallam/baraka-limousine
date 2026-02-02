export type SupportedLocale = "ar" | "en";

type LocalizedText = {
  ar: string;
  en: string;
};

type LocationService = {
  title: LocalizedText;
  description: LocalizedText;
};

type LocationFaq = {
  q: LocalizedText;
  a: LocalizedText;
};

export type LocationPage = {
  slug: string;
  name: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  heroTitle: LocalizedText;
  heroSubtitle: LocalizedText;
  intro: LocalizedText[];
  services: LocationService[];
  highlights: LocalizedText[];
  faqs: LocationFaq[];
};

export const locations: LocationPage[] = [
  {
    slug: "cairo",
    name: { ar: "القاهرة", en: "Cairo" },
    metaTitle: {
      ar: "توصيل مطار القاهرة وخدمة سائق خاص | بركة ليموزين",
      en: "Cairo Airport Transfers & Chauffeur Service | Baraka Limousine",
    },
    metaDescription: {
      ar: "خدمة توصيل مطار القاهرة، سيارات بسائق للرحلات، ليموزين زفاف، سيارات كبيرة للعائلات، وحجز أتوبيس رحلات. تغطية كاملة للقاهرة وضواحيها.",
      en: "Cairo airport transfers, private car with driver, wedding limousine, large vehicles for families and luggage, and bus trips up to 50 passengers.",
    },
    heroTitle: {
      ar: "توصيل مطار القاهرة وسيارة بسائق على أعلى مستوى",
      en: "Cairo Airport Transfers & Private Chauffeur",
    },
    heroSubtitle: {
      ar: "خدمة احترافية في القاهرة تشمل الاستقبال من المطار، الرحلات الخاصة، الزفاف، والسيارات الكبيرة للعائلات.",
      en: "Professional service in Cairo for airport pickup, private trips, weddings, and large vehicles for families.",
    },
    intro: [
      {
        ar: "نوفر خدمة توصيل المطار في القاهرة مع استقبال في المطار ومتابعة مواعيد الرحلات.",
        en: "We provide Cairo airport transfers with flight tracking and meet-and-greet service.",
      },
      {
        ar: "احجز سيارة بسائق للرحلات الخاصة داخل القاهرة وخارجها مع مرونة كاملة في الوقت والمسار.",
        en: "Book a private car with driver for trips in and out of Cairo with flexible scheduling.",
      },
    ],
    services: [
      {
        title: { ar: "توصيل مطار القاهرة", en: "Cairo Airport Transfers" },
        description: {
          ar: "استقبال وتوصيل من وإلى المطار بسيارات حديثة وسائقين محترفين.",
          en: "Pickup and drop-off to Cairo Airport with modern vehicles and professional drivers.",
        },
      },
      {
        title: { ar: "سيارة بسائق للرحلات", en: "Private Car with Driver" },
        description: {
          ar: "رحلات خاصة داخل القاهرة أو لمدن أخرى بسيارة مريحة وسائق خاص.",
          en: "Private trips around Cairo or to other cities with a dedicated driver.",
        },
      },
      {
        title: { ar: "سيارة زفاف", en: "Wedding Car Service" },
        description: {
          ar: "ليموزين زفاف أنيق مع سائق لليوم الكبير.",
          en: "Elegant wedding limousine with a driver for your special day.",
        },
      },
      {
        title: { ar: "سيارات كبيرة للعائلات", en: "Large Vehicles for Families" },
        description: {
          ar: "فانات وسيارات واسعة للأمتعة وعدد أكبر من الركاب.",
          en: "Spacious vans for luggage and more passengers.",
        },
      },
      {
        title: { ar: "أتوبيس رحلات", en: "Bus Trips (Up to 50)" },
        description: {
          ar: "حجز أتوبيس للرحلات الجماعية داخل القاهرة وخارجها.",
          en: "Bus rental for group trips in and out of Cairo.",
        },
      },
    ],
    highlights: [
      {
        ar: "تغطية شاملة للقاهرة والجيزة والمدن الجديدة.",
        en: "Full coverage across Cairo, Giza, and new communities.",
      },
      {
        ar: "حجز سريع وأسعار واضحة وخدمة عملاء على مدار اليوم.",
        en: "Fast booking, clear pricing, and responsive support.",
      },
      {
        ar: "خيارات متعددة من السيارات حسب عدد الركاب والأمتعة.",
        en: "Multiple vehicle options based on passengers and luggage.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل تقدمون استقبال داخل المطار؟", en: "Do you provide airport meet-and-greet?" },
        a: {
          ar: "نعم، يمكننا استقبالكم داخل المطار ومتابعة الرحلة لتقليل وقت الانتظار.",
          en: "Yes, we can meet you inside the airport and track your flight to reduce waiting time.",
        },
      },
      {
        q: { ar: "هل يمكن الحجز لرحلة يوم كامل؟", en: "Can I book a full-day trip?" },
        a: {
          ar: "نعم، نوفر حجز يوم كامل مع سائق خاص داخل القاهرة أو لمدن أخرى.",
          en: "Yes, we offer full-day bookings with a private driver in Cairo or other cities.",
        },
      },
    ],
  },
  {
    slug: "alexandria",
    name: { ar: "الإسكندرية", en: "Alexandria" },
    metaTitle: {
      ar: "خدمة ليموزين الإسكندرية وتوصيل المطار | بركة ليموزين",
      en: "Alexandria Airport Transfers & Chauffeur Service | Baraka Limousine",
    },
    metaDescription: {
      ar: "توصيل مطار برج العرب، سيارات بسائق للرحلات، زفاف، وفانات كبيرة للعائلات في الإسكندرية.",
      en: "Borg El Arab airport transfers, private car with driver, wedding limousine, and family vans in Alexandria.",
    },
    heroTitle: {
      ar: "ليموزين الإسكندرية وتوصيل مطار برج العرب",
      en: "Alexandria Transfers & Private Chauffeur",
    },
    heroSubtitle: {
      ar: "خدمة احترافية للرحلات الخاصة والعائلية داخل الإسكندرية وخارجها.",
      en: "Professional service for private and family trips in and out of Alexandria.",
    },
    intro: [
      {
        ar: "نوفر خدمة توصيل مطار برج العرب والإسكندرية بسيارات مريحة وسائقين محترفين.",
        en: "We offer Borg El Arab airport transfers and Alexandria pickups with comfortable vehicles.",
      },
      {
        ar: "خدمة سيارة بسائق للرحلات الساحلية أو للانتقال بين الإسكندرية والقاهرة.",
        en: "Private car with driver for coastal trips or Alexandria–Cairo transfers.",
      },
    ],
    services: [
      {
        title: { ar: "توصيل مطار برج العرب", en: "Borg El Arab Airport Transfers" },
        description: {
          ar: "استقبال وتوصيل من المطار مع متابعة مواعيد الرحلات.",
          en: "Airport pickup and drop-off with flight tracking.",
        },
      },
      {
        title: { ar: "سيارة بسائق للرحلات", en: "Private Car with Driver" },
        description: {
          ar: "رحلات داخل الإسكندرية أو إلى الساحل الشمالي بسيارة مريحة.",
          en: "Trips within Alexandria or to the North Coast with a private driver.",
        },
      },
      {
        title: { ar: "سيارة زفاف", en: "Wedding Car Service" },
        description: {
          ar: "سيارة زفاف أنيقة مع سائق محترف.",
          en: "Elegant wedding car with a professional driver.",
        },
      },
      {
        title: { ar: "فان للعائلات", en: "Family Vans" },
        description: {
          ar: "سيارات كبيرة للأمتعة وعدد أكبر من الركاب.",
          en: "Large vehicles for luggage and larger groups.",
        },
      },
      {
        title: { ar: "أتوبيس رحلات", en: "Bus Trips (Up to 50)" },
        description: {
          ar: "حجز أتوبيس لرحلات الشركات أو العائلات.",
          en: "Bus rental for corporate or family trips.",
        },
      },
    ],
    highlights: [
      {
        ar: "تغطية أحياء الإسكندرية بالكامل.",
        en: "Full coverage across Alexandria districts.",
      },
      {
        ar: "جاهزية للانتقال بين الإسكندرية والقاهرة.",
        en: "Ready for Alexandria–Cairo transfers.",
      },
      {
        ar: "خيارات متعددة حسب عدد الركاب والأمتعة.",
        en: "Multiple options for passenger and luggage needs.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل تغطون مطار برج العرب؟", en: "Do you serve Borg El Arab Airport?" },
        a: {
          ar: "نعم، نوفر توصيل واستقبال من مطار برج العرب على مدار اليوم.",
          en: "Yes, we provide airport transfers to and from Borg El Arab.",
        },
      },
      {
        q: { ar: "هل يمكن الحجز لرحلة إلى الساحل؟", en: "Can I book a trip to the North Coast?" },
        a: {
          ar: "بالطبع، يمكن الحجز لرحلات الساحل الشمالي أو مطروح بسيارة أو فان.",
          en: "Absolutely, you can book North Coast or Matrouh trips with car or van.",
        },
      },
    ],
  },
  {
    slug: "hurghada",
    name: { ar: "الغردقة", en: "Hurghada" },
    metaTitle: {
      ar: "توصيل مطار الغردقة وخدمات ليموزين | بركة ليموزين",
      en: "Hurghada Airport Transfers & Chauffeur Service | Baraka Limousine",
    },
    metaDescription: {
      ar: "توصيل مطار الغردقة، سيارات بسائق للرحلات، سيارات كبيرة للعائلات، وحجز أتوبيس للرحلات السياحية.",
      en: "Hurghada airport transfers, private car with driver, family vans, and bus trips for tourists and groups.",
    },
    heroTitle: {
      ar: "توصيل مطار الغردقة ورحلات خاصة على البحر الأحمر",
      en: "Hurghada Airport Transfers & Red Sea Trips",
    },
    heroSubtitle: {
      ar: "خدمة استقبال المطار ورحلات خاصة داخل الغردقة أو للمدن السياحية.",
      en: "Airport pickup and private trips within Hurghada or to nearby destinations.",
    },
    intro: [
      {
        ar: "نوفر توصيل مطار الغردقة مع سائق محترف وسيارات مريحة.",
        en: "We provide Hurghada airport transfers with professional drivers and comfortable vehicles.",
      },
      {
        ar: "رحلات خاصة إلى سهل حشيش، الجونة، أو سفاجا.",
        en: "Private trips to Sahl Hasheesh, El Gouna, or Safaga.",
      },
    ],
    services: [
      {
        title: { ar: "توصيل مطار الغردقة", en: "Hurghada Airport Transfers" },
        description: {
          ar: "استقبال وتوصيل من وإلى مطار الغردقة.",
          en: "Pickup and drop-off to and from Hurghada Airport.",
        },
      },
      {
        title: { ar: "سيارة بسائق للرحلات", en: "Private Car with Driver" },
        description: {
          ar: "رحلات سياحية خاصة داخل الغردقة وخارجها.",
          en: "Private sightseeing trips in and around Hurghada.",
        },
      },
      {
        title: { ar: "سيارات كبيرة للعائلات", en: "Family Vans" },
        description: {
          ar: "فانات واسعة للأمتعة والحقائب.",
          en: "Spacious vans for luggage and family groups.",
        },
      },
      {
        title: { ar: "أتوبيس رحلات", en: "Bus Trips (Up to 50)" },
        description: {
          ar: "حجز أتوبيس للرحلات السياحية والشركات.",
          en: "Bus rental for tourism and corporate trips.",
        },
      },
    ],
    highlights: [
      {
        ar: "خدمة مناسبة للسياح والعائلات.",
        en: "Ideal for tourists and families.",
      },
      {
        ar: "سائقون بخبرة في طرق البحر الأحمر.",
        en: "Drivers experienced in Red Sea routes.",
      },
      {
        ar: "سيارات مجهزة للرحلات الطويلة.",
        en: "Vehicles ready for longer journeys.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل تقدمون استقبال للمطار في الغردقة؟", en: "Do you offer airport pickup in Hurghada?" },
        a: {
          ar: "نعم، نوفر استقبال وتوصيل من مطار الغردقة على مدار اليوم.",
          en: "Yes, we offer airport pickup and drop-off in Hurghada.",
        },
      },
      {
        q: { ar: "هل يمكن الحجز لرحلات سياحية؟", en: "Can I book sightseeing trips?" },
        a: {
          ar: "بالطبع، نوفر سيارات بسائق لرحلات سياحية خاصة.",
          en: "Absolutely, we offer private driver services for sightseeing trips.",
        },
      },
    ],
  },
  {
    slug: "matrouh",
    name: { ar: "مطروح", en: "Matrouh" },
    metaTitle: {
      ar: "خدمة ليموزين مطروح وسيارات بسائق | بركة ليموزين",
      en: "Matrouh Chauffeur Service & Transfers | Baraka Limousine",
    },
    metaDescription: {
      ar: "سيارة بسائق لمطروح، سيارات كبيرة للعائلات، وحجز أتوبيس للرحلات والساحل الشمالي.",
      en: "Private car with driver to Matrouh, family vans, and bus trips for the North Coast.",
    },
    heroTitle: {
      ar: "سيارة بسائق ورحلات خاصة إلى مطروح",
      en: "Private Car with Driver to Matrouh",
    },
    heroSubtitle: {
      ar: "خدمة مريحة للرحلات العائلية والساحل الشمالي مع خيارات متعددة للسيارات.",
      en: "Comfortable service for family trips and the North Coast with multiple vehicle options.",
    },
    intro: [
      {
        ar: "نوفر سيارات بسائق للرحلات إلى مطروح والساحل الشمالي.",
        en: "We provide private driver services for Matrouh and the North Coast.",
      },
      {
        ar: "فانات كبيرة للأمتعة والعائلات وحجز أتوبيس للجموع.",
        en: "Large vans for luggage and families, plus buses for groups.",
      },
    ],
    services: [
      {
        title: { ar: "سيارة بسائق لمطروح", en: "Private Driver to Matrouh" },
        description: {
          ar: "رحلات طويلة مريحة بسيارات حديثة.",
          en: "Comfortable long-distance trips with modern vehicles.",
        },
      },
      {
        title: { ar: "سيارات كبيرة للعائلات", en: "Family Vans" },
        description: {
          ar: "سيارات واسعة للأمتعة وعدد أكبر من الركاب.",
          en: "Spacious vehicles for luggage and larger groups.",
        },
      },
      {
        title: { ar: "أتوبيس رحلات", en: "Bus Trips (Up to 50)" },
        description: {
          ar: "حجز أتوبيس للرحلات الصيفية والرحلات الجماعية.",
          en: "Bus rental for summer and group trips.",
        },
      },
    ],
    highlights: [
      {
        ar: "خيارات متعددة للرحلات الطويلة.",
        en: "Multiple options for long-distance trips.",
      },
      {
        ar: "سائقون بخبرة في طرق الساحل.",
        en: "Drivers experienced in coastal routes.",
      },
      {
        ar: "راحة وأمان للعائلات والمجموعات.",
        en: "Comfort and safety for families and groups.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل يوجد حجز لرحلات الصيف؟", en: "Do you offer summer trip bookings?" },
        a: {
          ar: "نعم، نوفر سيارات وفانات وأتوبيسات للرحلات الصيفية إلى مطروح.",
          en: "Yes, we provide cars, vans, and buses for summer trips to Matrouh.",
        },
      },
      {
        q: { ar: "هل تتوفر سيارات كبيرة للأمتعة؟", en: "Do you have large vehicles for luggage?" },
        a: {
          ar: "نعم، لدينا فانات وسيارات كبيرة تناسب العائلات والأمتعة.",
          en: "Yes, we have vans and large vehicles suitable for families and luggage.",
        },
      },
    ],
  },
  {
    slug: "suez",
    name: { ar: "السويس", en: "Suez" },
    metaTitle: {
      ar: "خدمة ليموزين السويس وسيارة بسائق | بركة ليموزين",
      en: "Suez Chauffeur Service & Transfers | Baraka Limousine",
    },
    metaDescription: {
      ar: "سيارة بسائق في السويس، رحلات خاصة، سيارات كبيرة للعائلات، وحجز أتوبيس للرحلات.",
      en: "Private car with driver in Suez, special trips, family vans, and bus rentals.",
    },
    heroTitle: {
      ar: "سيارة بسائق في السويس وخدمة رحلات خاصة",
      en: "Private Driver Service in Suez",
    },
    heroSubtitle: {
      ar: "تنقل مريح وآمن داخل السويس أو للمدن المجاورة.",
      en: "Comfortable and safe transportation in Suez and nearby cities.",
    },
    intro: [
      {
        ar: "نوفر خدمة سيارة بسائق في السويس للرحلات الخاصة والتنقل اليومي.",
        en: "We offer private driver services in Suez for daily transport and special trips.",
      },
      {
        ar: "خيارات متعددة من السيارات والفانات والأتوبيسات.",
        en: "Multiple options including cars, vans, and buses.",
      },
    ],
    services: [
      {
        title: { ar: "سيارة بسائق", en: "Private Car with Driver" },
        description: {
          ar: "تنقل داخل السويس أو إلى القاهرة والإسماعيلية.",
          en: "Transport within Suez or to Cairo and Ismailia.",
        },
      },
      {
        title: { ar: "سيارات كبيرة للعائلات", en: "Family Vans" },
        description: {
          ar: "فانات واسعة للأمتعة والعائلات.",
          en: "Spacious vans for families and luggage.",
        },
      },
      {
        title: { ar: "أتوبيس رحلات", en: "Bus Trips (Up to 50)" },
        description: {
          ar: "أتوبيس للرحلات الجماعية والشركات.",
          en: "Bus rentals for group and corporate trips.",
        },
      },
    ],
    highlights: [
      {
        ar: "خدمة مناسبة للأفراد والشركات.",
        en: "Suitable for individuals and businesses.",
      },
      {
        ar: "تنسيق سريع للحجوزات والرحلات.",
        en: "Fast booking and trip coordination.",
      },
      {
        ar: "سائقون محترفون وخبرة في الطرق.",
        en: "Professional drivers with route expertise.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل يمكن الحجز لرحلة إلى القاهرة؟", en: "Can I book a trip to Cairo?" },
        a: {
          ar: "نعم، نوفر سيارات بسائق للانتقال بين السويس والقاهرة.",
          en: "Yes, we offer private driver trips between Suez and Cairo.",
        },
      },
      {
        q: { ar: "هل تتوفر أتوبيسات للشركات؟", en: "Do you provide buses for companies?" },
        a: {
          ar: "نعم، نوفر أتوبيسات للرحلات الجماعية والشركات.",
          en: "Yes, we provide buses for corporate and group trips.",
        },
      },
    ],
  },
  {
    slug: "sharm",
    name: { ar: "شرم الشيخ", en: "Sharm El Sheikh" },
    metaTitle: {
      ar: "توصيل مطار شرم الشيخ وخدمة ليموزين | بركة ليموزين",
      en: "Sharm El Sheikh Airport Transfers & Chauffeur Service | Baraka Limousine",
    },
    metaDescription: {
      ar: "توصيل مطار شرم الشيخ، سيارات بسائق للرحلات، سيارات كبيرة للعائلات، وحجز أتوبيس للرحلات.",
      en: "Sharm El Sheikh airport transfers, private car with driver, family vans, and bus trips.",
    },
    heroTitle: {
      ar: "توصيل مطار شرم الشيخ ورحلات خاصة للمنتجعات",
      en: "Sharm El Sheikh Airport Transfers & Resort Trips",
    },
    heroSubtitle: {
      ar: "استقبال المطار والتنقل بين المنتجعات بسيارات حديثة وسائقين محترفين.",
      en: "Airport pickup and resort transfers with modern vehicles and professional drivers.",
    },
    intro: [
      {
        ar: "نوفر توصيل مطار شرم الشيخ مع متابعة مواعيد الرحلات.",
        en: "We provide Sharm El Sheikh airport transfers with flight tracking.",
      },
      {
        ar: "رحلات خاصة بين المنتجعات أو إلى دهب ونويبع.",
        en: "Private trips between resorts or to Dahab and Nuweiba.",
      },
    ],
    services: [
      {
        title: { ar: "توصيل مطار شرم الشيخ", en: "Sharm El Sheikh Airport Transfers" },
        description: {
          ar: "استقبال وتوصيل من وإلى المطار بسيارات مريحة.",
          en: "Airport pickup and drop-off with comfortable vehicles.",
        },
      },
      {
        title: { ar: "سيارة بسائق للرحلات", en: "Private Car with Driver" },
        description: {
          ar: "رحلات خاصة للمنتجعات أو لمدن البحر الأحمر.",
          en: "Private trips to resorts or Red Sea destinations.",
        },
      },
      {
        title: { ar: "سيارات كبيرة للعائلات", en: "Family Vans" },
        description: {
          ar: "فانات للأمتعة وعدد أكبر من الركاب.",
          en: "Vans for luggage and larger groups.",
        },
      },
      {
        title: { ar: "أتوبيس رحلات", en: "Bus Trips (Up to 50)" },
        description: {
          ar: "حجز أتوبيس للرحلات السياحية والشركات.",
          en: "Bus rental for tourism and corporate trips.",
        },
      },
    ],
    highlights: [
      {
        ar: "خدمة مناسبة للسياحة والرحلات العائلية.",
        en: "Ideal for tourism and family trips.",
      },
      {
        ar: "تنسيق سريع للحجوزات من المطار إلى المنتجعات.",
        en: "Fast coordination from airport to resorts.",
      },
      {
        ar: "سيارات مجهزة للطرق الطويلة.",
        en: "Vehicles ready for longer routes.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل تقدمون استقبال من المطار؟", en: "Do you offer airport pickup?" },
        a: {
          ar: "نعم، نوفر استقبال وتوصيل من مطار شرم الشيخ.",
          en: "Yes, we provide airport pickup in Sharm El Sheikh.",
        },
      },
      {
        q: { ar: "هل تتوفر رحلات إلى دهب؟", en: "Do you offer trips to Dahab?" },
        a: {
          ar: "نعم، يمكن حجز سيارة بسائق لرحلات دهب ونويبع.",
          en: "Yes, private driver trips to Dahab and Nuweiba are available.",
        },
      },
    ],
  },
];

export const getLocationBySlug = (slug: string) =>
  locations.find((location) => location.slug === slug);
