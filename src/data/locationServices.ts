import type { SupportedLocale } from "@/data/locations";

export type ServiceSlug =
  | "airport-shuttle"
  | "private-driver"
  | "wedding-car"
  | "family-van"
  | "bus-trips";

type LocalizedText = {
  ar: string;
  en: string;
};

export type LocationServiceDefinition = {
  slug: ServiceSlug;
  title: LocalizedText;
  shortDescription: LocalizedText;
  seoDescription: LocalizedText;
  highlights: LocalizedText[];
  faqs: { q: LocalizedText; a: LocalizedText }[];
};

export const locationServices: LocationServiceDefinition[] = [
  {
    slug: "airport-shuttle",
    title: { ar: "توصيل المطار", en: "Airport Transfers" },
    shortDescription: {
      ar: "استقبال وتوصيل من وإلى المطار بسيارات حديثة وسائقين محترفين.",
      en: "Reliable airport pickup and drop-off with modern vehicles.",
    },
    seoDescription: {
      ar: "توصيل المطار بسيارات مريحة، متابعة مواعيد الرحلات، واستقبال احترافي.",
      en: "Airport transfer service with flight tracking and professional drivers.",
    },
    highlights: [
      {
        ar: "متابعة مواعيد الرحلات لتقليل وقت الانتظار.",
        en: "Flight tracking to reduce waiting time.",
      },
      {
        ar: "استقبال احترافي داخل المطار حسب الطلب.",
        en: "Optional meet-and-greet inside the airport.",
      },
      {
        ar: "سيارات مناسبة للأفراد والعائلات والأمتعة.",
        en: "Vehicles for solo travelers, families, and luggage.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل يتوفر استقبال داخل المطار؟", en: "Do you offer meet-and-greet?" },
        a: {
          ar: "نعم، يمكننا استقبالكم داخل المطار ومساعدتكم حتى السيارة.",
          en: "Yes, we can meet you inside the airport and guide you to the car.",
        },
      },
      {
        q: { ar: "هل تنتظرون في حال تأخر الرحلة؟", en: "Do you wait if the flight is delayed?" },
        a: {
          ar: "نعم، نتابع مواعيد الرحلات لضمان وصولكم دون توتر.",
          en: "Yes, we track flights and adjust for delays.",
        },
      },
    ],
  },
  {
    slug: "private-driver",
    title: { ar: "سيارة بسائق", en: "Private Car with Driver" },
    shortDescription: {
      ar: "سيارة بسائق للرحلات الخاصة داخل المدينة أو بين المدن.",
      en: "Private car with driver for city rides or intercity trips.",
    },
    seoDescription: {
      ar: "سائق خاص في مصر مع رحلات مرنة حسب الوقت والمسار.",
      en: "Chauffeur service with flexible scheduling and routes.",
    },
    highlights: [
      {
        ar: "مرونة كاملة في الوقت والمسار.",
        en: "Full flexibility in schedule and route.",
      },
      {
        ar: "خيارات متعددة حسب عدد الركاب.",
        en: "Multiple vehicle options for any group size.",
      },
      {
        ar: "سائقون بخبرة في طرق المدن والطرق السريعة.",
        en: "Drivers experienced in city routes and highways.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل يمكن الحجز ليوم كامل؟", en: "Can I book a full day?" },
        a: {
          ar: "نعم، يمكن الحجز ليوم كامل داخل المدينة أو لرحلات خارجها.",
          en: "Yes, you can book full-day trips in or out of the city.",
        },
      },
      {
        q: { ar: "هل الخدمة مناسبة للعائلات؟", en: "Is it suitable for families?" },
        a: {
          ar: "نعم، نوفر سيارات واسعة وفانات للعائلات والأمتعة.",
          en: "Yes, we offer spacious cars and vans for families and luggage.",
        },
      },
    ],
  },
  {
    slug: "wedding-car",
    title: { ar: "سيارة زفاف", en: "Wedding Car Service" },
    shortDescription: {
      ar: "سيارة زفاف أنيقة مع سائق ليوم مميز.",
      en: "Elegant wedding car with a professional driver.",
    },
    seoDescription: {
      ar: "ليموزين زفاف مع سائق محترف وتجهيز مناسب لليوم الكبير.",
      en: "Wedding limousine with professional driver and premium presentation.",
    },
    highlights: [
      {
        ar: "سيارات أنيقة وتجهيزات مناسبة للزفاف.",
        en: "Elegant vehicles prepared for weddings.",
      },
      {
        ar: "التزام بالمواعيد وتنظيم المشوار.",
        en: "On-time service and trip coordination.",
      },
      {
        ar: "خدمة مخصصة حسب جدول الفرح.",
        en: "Customized service based on your wedding schedule.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل يمكن الحجز بالساعة؟", en: "Can I book by the hour?" },
        a: {
          ar: "نعم، يمكن الحجز بالساعة أو لمدة أطول حسب احتياجكم.",
          en: "Yes, hourly or extended bookings are available.",
        },
      },
      {
        q: { ar: "هل تتوفر سيارات مختلفة للزفاف؟", en: "Do you offer different wedding cars?" },
        a: {
          ar: "نوفر خيارات متنوعة حسب الذوق والميزانية.",
          en: "We offer multiple options to match your style and budget.",
        },
      },
    ],
  },
  {
    slug: "family-van",
    title: { ar: "سيارات كبيرة للعائلات", en: "Family Vans & Large Vehicles" },
    shortDescription: {
      ar: "فانات وسيارات كبيرة للأمتعة وعدد أكبر من الركاب.",
      en: "Large vehicles for families, groups, and luggage.",
    },
    seoDescription: {
      ar: "فان عائلي مع سائق مناسب للمطار والرحلات العائلية.",
      en: "Family van with driver for airports and group trips.",
    },
    highlights: [
      {
        ar: "مساحة واسعة للأمتعة والحقائب.",
        en: "Plenty of luggage space.",
      },
      {
        ar: "مقاعد مريحة للرحلات الطويلة.",
        en: "Comfortable seating for long trips.",
      },
      {
        ar: "مثالية للعائلات والمجموعات.",
        en: "Ideal for families and groups.",
      },
    ],
    faqs: [
      {
        q: { ar: "كم عدد الركاب المناسب؟", en: "How many passengers can a van fit?" },
        a: {
          ar: "يتوفر أكثر من خيار حسب عدد الركاب والأمتعة.",
          en: "We have multiple options depending on passengers and luggage.",
        },
      },
      {
        q: { ar: "هل تناسب للمطار؟", en: "Is it suitable for airports?" },
        a: {
          ar: "نعم، مناسبة جداً للمطار بفضل مساحة الأمتعة.",
          en: "Yes, it’s ideal for airport trips due to luggage space.",
        },
      },
    ],
  },
  {
    slug: "bus-trips",
    title: { ar: "أتوبيس رحلات", en: "Bus Trips (Up to 50)" },
    shortDescription: {
      ar: "حجز أتوبيس للرحلات الجماعية حتى 50 راكب.",
      en: "Bus rental for group trips up to 50 passengers.",
    },
    seoDescription: {
      ar: "أتوبيس سياحي للرحلات العائلية والشركات والجامعات.",
      en: "Coach rental for family, corporate, and university trips.",
    },
    highlights: [
      {
        ar: "سعات متعددة حتى 50 راكب.",
        en: "Multiple capacities up to 50 passengers.",
      },
      {
        ar: "مثالي للرحلات الجماعية والشركات.",
        en: "Perfect for group and corporate trips.",
      },
      {
        ar: "تنسيق كامل للمشوار والوقت.",
        en: "Full trip coordination and scheduling.",
      },
    ],
    faqs: [
      {
        q: { ar: "هل يمكن الحجز لرحلات الشركات؟", en: "Do you offer corporate bus rentals?" },
        a: {
          ar: "نعم، نوفر أتوبيسات للشركات والمؤسسات.",
          en: "Yes, we provide buses for companies and organizations.",
        },
      },
      {
        q: { ar: "هل تشمل الرحلات مناطق بعيدة؟", en: "Can the trip be long-distance?" },
        a: {
          ar: "نعم، نوفر رحلات بين المدن حسب الطلب.",
          en: "Yes, intercity trips are available on request.",
        },
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  locationServices.find((service) => service.slug === slug);

export const getServiceTitle = (slug: string, locale: SupportedLocale) =>
  getServiceBySlug(slug)?.title[locale];
