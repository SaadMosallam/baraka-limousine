import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Article,
  Car,
  ChatCircle,
  Clock,
  Envelope,
  Info,
  MapPin,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteInfo } from "@/data/siteInfo";

export async function Footer(props: { locale: string }) {
  const { locale } = props;
  const t = await getTranslations({ locale });
  const localePath = (path: string) =>
    `/${props.locale}${path === "/" ? "" : path}`;

  return (
    <footer className="border-t border-zinc-100 bg-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Link href={localePath("/")} className="inline-block">
            <Image
              src="/logo.svg"
              alt={t("siteName")}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          <h3 className="text-lg font-semibold text-zinc-900">{t("siteName")}</h3>
          <p className="text-sm text-zinc-600">{t("siteTagline")}</p>
        </div>
        <div className="space-y-2 text-sm text-zinc-600">
          <p className="font-semibold text-zinc-900">{t("footerContactTitle")}</p>
          <p className="flex items-start gap-2">
            <MapPin size={18} weight="duotone" className="mt-0.5 shrink-0 text-emerald-600" />
            <span>{t("contactAddress")}</span>
          </p>
          <p className="flex items-center gap-2">
            <Clock size={18} weight="duotone" className="shrink-0 text-emerald-600" />
            <span>{t("contactHours")}</span>
          </p>
          <a className="flex items-center gap-2 text-emerald-700 hover:underline" href={`tel:${siteInfo.phoneE164}`}>
            <PhoneCall size={18} weight="duotone" className="shrink-0" />
            {siteInfo.phoneDisplay}
          </a>
          <a
            className="flex items-center gap-2 text-emerald-700 hover:underline"
            href={`https://wa.me/${siteInfo.whatsappE164}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappLogo size={18} weight="duotone" className="shrink-0" />
            {t("ctaWhatsapp")}
          </a>
          <a className="flex items-center gap-2 text-emerald-700 hover:underline" href={`mailto:${siteInfo.email}`}>
            <Envelope size={18} weight="duotone" className="shrink-0" />
            {siteInfo.email}
          </a>
        </div>
        <div className="space-y-2 text-sm text-zinc-600">
          <p className="font-semibold text-zinc-900">{t("footerQuickLinks")}</p>
          <Link className="flex items-center gap-2 hover:text-emerald-700" href={localePath("/services")}>
            <Car size={18} weight="duotone" className="shrink-0 text-emerald-600" />
            {t("navServices")}
          </Link>
          <Link className="flex items-center gap-2 hover:text-emerald-700" href={localePath("/blog")}>
            <Article size={18} weight="duotone" className="shrink-0 text-emerald-600" />
            {t("navBlog")}
          </Link>
          <Link className="flex items-center gap-2 hover:text-emerald-700" href={localePath("/about")}>
            <Info size={18} weight="duotone" className="shrink-0 text-emerald-600" />
            {t("navAbout")}
          </Link>
          <Link className="flex items-center gap-2 hover:text-emerald-700" href={localePath("/contact")}>
            <ChatCircle size={18} weight="duotone" className="shrink-0 text-emerald-600" />
            {t("navContact")}
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500">
        {t("footerRights")}
      </div>
    </footer>
  );
}
