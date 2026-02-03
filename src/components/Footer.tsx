import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Article,
  Car,
  ChatCircle,
  Clock,
  Info,
  MapPin,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteInfo } from "@/data/siteInfo";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";

export async function Footer(props: { locale: string }) {
  const { locale } = props;
  const t = await getTranslations({ locale });
  const localePath = (path: string) =>
    `/${props.locale}${path === "/" ? "" : path}`;

  return (
    <footer className="border-t border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
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
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("siteName")}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("siteTagline")}</p>
        </div>
        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{t("footerContactTitle")}</p>
          <p className="flex items-center gap-2">
            <Clock size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{t("contactHours")}</span>
          </p>
          <a
            className="flex items-center gap-2 text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
            href={`https://wa.me/${siteInfo.whatsappE164}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappLogo size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {siteInfo.phoneDisplay}
          </a>
          <a className="flex items-center gap-2 text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400" href={`tel:${siteInfo.phoneE164}`}>
            <PhoneCall size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {siteInfo.phoneDisplay}
          </a>
          <a
            className="flex items-center gap-2 text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
            href={`https://wa.me/${siteInfo.whatsappE1642}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappLogo size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {siteInfo.phoneDisplay2}
          </a>
          <a className="flex items-center gap-2 text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400" href={`tel:${siteInfo.phoneE1642}`}>
            <PhoneCall size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {siteInfo.phoneDisplay2}
          </a>
          <div>
            <a
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
              href={siteInfo.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookLogo size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              {t("ctaFacebook")}
            </a>
          </div>
        </div>
        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{t("footerQuickLinks")}</p>
          <Link className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-emerald-400" href={localePath("/services")}>
            <Car size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {t("navServices")}
          </Link>
          <Link className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-emerald-400" href={localePath("/locations")}>
            <MapPin size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {t("navLocations")}
          </Link>
          <Link className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-emerald-400" href={localePath("/blog")}>
            <Article size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {t("navBlog")}
          </Link>
          <Link className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-emerald-400" href={localePath("/about")}>
            <Info size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {t("navAbout")}
          </Link>
          <Link className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-emerald-400" href={localePath("/contact")}>
            <ChatCircle size={18} weight="duotone" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            {t("navContact")}
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {t("footerRights")}
      </div>
    </footer>
  );
}
