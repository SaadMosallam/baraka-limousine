import Link from "next/link";
import { getTranslations } from "next-intl/server";
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
          <h3 className="text-lg font-semibold text-zinc-900">{t("siteName")}</h3>
          <p className="text-sm text-zinc-600">{t("siteTagline")}</p>
        </div>
        <div className="space-y-2 text-sm text-zinc-600">
          <p className="font-semibold text-zinc-900">{t("footerContactTitle")}</p>
          <p>{t("contactAddress")}</p>
          <p>{t("contactHours")}</p>
          <a className="block text-emerald-700" href={`tel:${siteInfo.phone}`}>
            {siteInfo.phone}
          </a>
          <a
            className="block text-emerald-700"
            href={`https://wa.me/${siteInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("ctaWhatsapp")}
          </a>
          <a className="block text-emerald-700" href={`mailto:${siteInfo.email}`}>
            {siteInfo.email}
          </a>
        </div>
        <div className="space-y-2 text-sm text-zinc-600">
          <p className="font-semibold text-zinc-900">{t("footerQuickLinks")}</p>
          <Link className="block hover:text-emerald-700" href={localePath("/services")}>
            {t("navServices")}
          </Link>
          <Link className="block hover:text-emerald-700" href={localePath("/blog")}>
            {t("navBlog")}
          </Link>
          <Link className="block hover:text-emerald-700" href={localePath("/about")}>
            {t("navAbout")}
          </Link>
          <Link className="block hover:text-emerald-700" href={localePath("/contact")}>
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
