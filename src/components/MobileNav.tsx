"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
 import { PhoneCall, WhatsappLogo } from "@phosphor-icons/react";

type MobileNavLink = {
  href: string;
  label: string;
};

type ServiceItem = {
  id: string;
  title: string;
};

type MobileNavProps = {
  locale: string;
  nextLocale: string;
  languageLabel: string;
  menuLabel: string;
  closeLabel: string;
  servicesLabel: string;
  serviceItems: ServiceItem[];
  links: MobileNavLink[];
  callLabel: string;
  whatsappLabel: string;
  phone: string;
  whatsapp: string;
};

export function MobileNav({
  locale,
  nextLocale,
  languageLabel,
  menuLabel,
  closeLabel,
  servicesLabel,
  serviceItems,
  links,
  callLabel,
  whatsappLabel,
  phone,
  whatsapp,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);
  const localePath = (path: string) =>
    `/${locale}${path === "/" ? "" : path}`;

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggle}
        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 hover:border-emerald-600 hover:text-emerald-700"
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {open ? closeLabel : menuLabel}
      </button>
      {mounted &&
        createPortal(
          <div
            id="mobile-nav"
            className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"
              }`}
            aria-hidden={!open}
          >
            <button
              type="button"
              className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"
                }`}
              onClick={close}
              aria-label={closeLabel}
            />
            <div
              className={`absolute top-0 ${locale === "ar" ? "left-0" : "right-0"} h-full w-80 max-w-[85%] bg-white/90 backdrop-blur-lg p-6 shadow-xl transition-transform ${open
                  ? "translate-x-0"
                  : locale === "ar"
                    ? "-translate-x-full"
                    : "translate-x-full"
                }`}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-700">
                  {menuLabel}
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="text-xs font-semibold text-zinc-500 hover:text-emerald-700"
                >
                  {closeLabel}
                </button>
              </div>
              <nav className="flex flex-col gap-3 text-sm font-semibold text-zinc-700">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={localePath(link.href)}
                    className="hover:text-emerald-600"
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                ))}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="services" className="border-b-0">
                    <AccordionTrigger className="py-2 text-sm font-semibold text-zinc-700 hover:text-emerald-600">
                      {servicesLabel}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2 pb-2 text-sm text-zinc-600">
                      <Link
                        href={localePath("/services")}
                        className="hover:text-emerald-600"
                        onClick={close}
                      >
                        {servicesLabel}
                      </Link>
                       {serviceItems.map((service) => (
                         <Link
                           key={service.id}
                           href={localePath(`/services/${service.id}`)}
                           className="hover:text-emerald-600"
                           onClick={close}
                         >
                           {service.title}
                         </Link>
                       ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Link
                  href={`/${nextLocale}`}
                  className="text-xs font-semibold text-zinc-500 hover:text-emerald-700"
                  onClick={close}
                >
                  {languageLabel}
                </Link>
              </nav>
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={`tel:${phone}`}
                  className={`inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 ${
                    locale === "ar" ? "flex-row-reverse gap-2" : "gap-2"
                  }`}
                >
                  <PhoneCall size={16} weight="duotone" className="text-white" />
                  {callLabel}
                </a>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  className={`inline-flex items-center justify-center rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 ${
                    locale === "ar" ? "flex-row-reverse gap-2" : "gap-2"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogo size={16} weight="duotone" className="text-emerald-600" />
                  {whatsappLabel}
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
