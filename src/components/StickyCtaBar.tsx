"use client";

import { useTranslations } from "next-intl";
import { PhoneCall, WhatsappLogo } from "@phosphor-icons/react";
import { siteInfo } from "@/data/siteInfo";

type StickyCtaBarProps = {
  locale: string;
};

export function StickyCtaBar({ locale }: StickyCtaBarProps) {
  const t = useTranslations();

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      role="group"
      aria-label="Contact actions"
    >
      <a
        href={`https://wa.me/${siteInfo.whatsappE164}`}
        className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-[#25D366] bg-[#25D366] text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 active:scale-95"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("ctaWhatsapp")}
      >
        <WhatsappLogo size={26} weight="fill" />
      </a>
      <a
        href={`tel:${siteInfo.phoneE164}`}
        className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-zinc-200 bg-white text-zinc-700 shadow-lg shadow-black/15 transition-transform hover:scale-105 hover:bg-zinc-50 active:scale-95 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        aria-label={t("ctaCallNow")}
      >
        <PhoneCall size={26} weight="duotone" />
      </a>
    </div>
  );
}
