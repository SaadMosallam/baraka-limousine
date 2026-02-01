import { getTranslations } from "next-intl/server";
import { siteInfo } from "@/data/siteInfo";

type ContactActionsProps = {
  className?: string;
  variant?: "primary" | "secondary";
  locale: string;
};

export async function ContactActions(props: ContactActionsProps) {
  const { className, variant = "primary", locale } = props;
  const t = await getTranslations({ locale });
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors";
  const primary =
    "bg-emerald-600 text-white hover:bg-emerald-700";
  const secondary =
    "border border-zinc-200 text-zinc-900 hover:bg-zinc-50";

  const buttonClass = `${base} ${variant === "primary" ? primary : secondary}`;

  return (
    <div className={`flex flex-wrap gap-3 ${className ?? ""}`}>
      <a href={`tel:${siteInfo.phone}`} className={buttonClass}>
        {t("ctaCallNow")}
      </a>
      <a
        href={`https://wa.me/${siteInfo.whatsapp}`}
        className={buttonClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("ctaWhatsapp")}
      </a>
    </div>
  );
}
