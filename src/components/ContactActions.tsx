import { getTranslations } from "next-intl/server";
import { siteInfo } from "@/data/siteInfo";
import { PhoneCall, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

type ContactActionsProps = {
  className?: string;
  variant?: "primary" | "secondary";
  contrast?: "default" | "onDark";
  size?: "sm" | "md";
  /** On small screens, stack and span full width; from sm up, inline. */
  fullWidthOnMobile?: boolean;
  locale: string;
};

export async function ContactActions(props: ContactActionsProps) {
  const {
    className,
    variant = "primary",
    contrast = "default",
    size = "md",
    fullWidthOnMobile = false,
    locale,
  } = props;
  const t = await getTranslations({ locale });
  const base =
    size === "sm"
      ? "inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-colors"
      : "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors";
  const layout = locale === "ar" ? "flex-row-reverse gap-2" : "gap-2";
  const whatsappPrimaryDefault =
    "border border-[#25D366] bg-[#25D366]/10 text-[#1f8f4a] hover:bg-[#25D366]/20";
  const whatsappSecondaryDefault =
    "border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10";
  const phoneSecondaryDefault =
    "border border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-500 dark:text-zinc-200 dark:hover:bg-zinc-800";

  const whatsappPrimaryOnDark =
    "border border-white bg-white text-emerald-700 hover:bg-emerald-50";
  const whatsappSecondaryOnDark =
    "border border-white/60 text-white hover:bg-white/10";
  const phoneSecondaryOnDark =
    "border border-white/60 text-white hover:bg-white/10";

  const whatsappPrimary =
    contrast === "onDark" ? whatsappPrimaryOnDark : whatsappPrimaryDefault;
  const whatsappSecondary =
    contrast === "onDark" ? whatsappSecondaryOnDark : whatsappSecondaryDefault;
  const phoneSecondary =
    contrast === "onDark" ? phoneSecondaryOnDark : phoneSecondaryDefault;

  const wrapperLayout = fullWidthOnMobile
    ? "w-full flex flex-col gap-3 sm:flex-row sm:flex-wrap"
    : "flex flex-wrap gap-3";
  const linkFullWidth = fullWidthOnMobile ? "w-full sm:w-auto justify-center" : "";

  const whatsappClass = `${base} ${variant === "secondary" ? whatsappSecondary : whatsappPrimary
    } ${layout} ${linkFullWidth}`;
  const phoneClass = `${base} ${phoneSecondary} ${layout} ${linkFullWidth}`;

  return (
    <div className={`${wrapperLayout} ${className ?? ""}`}>
      <a
        href={`https://wa.me/${siteInfo.whatsappE164}`}
        className={whatsappClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsappLogo
          size={size === "sm" ? 14 : 16}
          weight="duotone"
          className={contrast === "onDark" ? "text-emerald-700" : "text-[#25D366]"}
        />
        {t("ctaWhatsapp")}
      </a>
      <a href={`tel:${siteInfo.phoneE164}`} className={phoneClass}>
        <PhoneCall
          size={size === "sm" ? 14 : 16}
          weight="duotone"
          className={contrast === "onDark" ? "text-white" : "text-zinc-700 dark:text-zinc-200"}
        />
        {t("ctaCallNow")}
      </a>
    </div>
  );
}
