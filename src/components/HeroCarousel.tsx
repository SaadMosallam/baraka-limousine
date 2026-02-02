"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { PhoneCall, WhatsappLogo } from "@phosphor-icons/react";
import { siteInfo } from "@/data/siteInfo";

type HeroSlide = {
    id: string;
    title: string;
    description: string;
    image: string;
};

type HeroCarouselProps = {
    slides: HeroSlide[];
    locale: "ar" | "en";
    whatsappLabel: string;
    callLabel: string;
};

const AUTOPLAY_MS = 10_000;
const TICK_MS = 100;

export function HeroCarousel({
    slides,
    locale,
    whatsappLabel,
    callLabel,
}: HeroCarouselProps) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // refs must be stable at render time
    const lastChangeRef = useRef(0);
    const isInteractingRef = useRef(false);

    /* -----------------------------
     * Embla lifecycle
     * ---------------------------- */
    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            lastChangeRef.current = Date.now();
            setProgress(0);
            setSelectedIndex(api.selectedScrollSnap());
            isInteractingRef.current = false;
        };

        api.on("select", onSelect);
        api.on("reInit", onSelect);
        onSelect();

        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api]);

    /* -----------------------------
     * Autoplay
     * ---------------------------- */
    useEffect(() => {
        if (!api) return;

        const id = window.setInterval(() => {
            if (isInteractingRef.current) return;

            const elapsed = Date.now() - lastChangeRef.current;
            const nextProgress = Math.min(100, (elapsed / AUTOPLAY_MS) * 100);
            setProgress(nextProgress);

            if (elapsed >= AUTOPLAY_MS) {
                lastChangeRef.current = Date.now();
                setProgress(0);
                api.scrollNext();
            }
        }, TICK_MS);

        return () => window.clearInterval(id);
    }, [api]);

    /* -----------------------------
     * Render
     * ---------------------------- */
    return (
        <section className="w-full">
            <Carousel
                setApi={setApi}
                opts={{
                    loop: true,
                    direction: locale === "ar" ? "rtl" : "ltr",
                }}
                className="relative"
            >
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={slide.id} className="p-0">
                            {/* Image defines height */}
                            <div className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden bg-black">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    priority={index === 0}
                                    sizes="100vw"
                                    className="object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/35" />

                                {/* Content: bottom on mobile, centered on desktop */}
                                <div className="absolute inset-0 flex items-end pb-16 md:items-center md:pb-0">

                                    <div className="w-full max-w-6xl px-6 md:px-0 md:ps-20">
                                        <div
                                            key={`hero-card-${slide.id}-${selectedIndex}`}
                                            className={`mx-auto min-w-0 max-w-[18rem] rounded-2xl bg-white/30 px-4 py-3 shadow-lg backdrop-blur-sm dark:bg-black/30 dark:shadow-black/20 sm:max-w-sm sm:px-5 sm:py-4 md:max-w-xl md:rounded-3xl md:px-7 md:py-6 lg:max-w-2xl break-words animate-in fade-in slide-in-from-bottom-4 duration-[1500ms] ${locale === "ar"
                                                ? "text-center md:ml-auto md:mr-0 md:text-right"
                                                : "text-center md:mr-auto md:ml-0 md:text-left"
                                                }`}
                                        >
                                            <h1 className="text-lg font-bold leading-tight text-zinc-900 break-words dark:text-white sm:text-2xl md:text-4xl lg:text-5xl">
                                                {slide.title}
                                            </h1>

                                            <p className="mt-2 max-w-xl text-xs font-medium text-zinc-800 break-words dark:font-normal dark:text-zinc-300 sm:mt-3 sm:text-sm md:text-base md:text-lg">
                                                {slide.description}
                                            </p>

                                            <div
                                                className={`mt-3 flex flex-wrap justify-center gap-1.5 sm:mt-5 sm:gap-2 md:gap-3 ${locale === "ar"
                                                    ? "md:justify-end md:flex-row-reverse"
                                                    : "md:justify-start"
                                                    }`}
                                            >
                                                {/* DOM order for RTL: Call then WhatsApp so with flex-row-reverse WhatsApp appears first (left); for LTR WhatsApp first in DOM = first visually */}
                                                {locale === "ar" ? (
                                                    <>
                                                        <a
                                                            href={`tel:${siteInfo.phoneE164}`}
                                                            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-transparent px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-500 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:text-base"
                                                        >
                                                            <PhoneCall size={18} weight="duotone" className="shrink-0 sm:w-5 sm:h-5" />
                                                            {callLabel}
                                                        </a>
                                                        <a
                                                            href={`https://wa.me/${siteInfo.whatsappE164}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366] bg-[#25D366] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1f8f4a] hover:border-[#1f8f4a] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:text-base"
                                                        >
                                                            <WhatsappLogo size={18} weight="duotone" className="shrink-0 sm:w-5 sm:h-5" />
                                                            {whatsappLabel}
                                                        </a>
                                                    </>
                                                ) : (
                                                    <>
                                                        <a
                                                            href={`https://wa.me/${siteInfo.whatsappE164}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366] bg-[#25D366] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1f8f4a] hover:border-[#1f8f4a] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:text-base"
                                                        >
                                                            <WhatsappLogo size={18} weight="duotone" className="shrink-0 sm:w-5 sm:h-5" />
                                                            {whatsappLabel}
                                                        </a>
                                                        <a
                                                            href={`tel:${siteInfo.phoneE164}`}
                                                            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-transparent px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-500 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:text-base"
                                                        >
                                                            <PhoneCall size={18} weight="duotone" className="shrink-0 sm:w-5 sm:h-5" />
                                                            {callLabel}
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Arrows (desktop only, RTL-aware) */}
                {locale === "ar" ? (
                    <>
                        {/* RTL: LEFT = NEXT (arrow should point LEFT) */}
                        <CarouselNext className="left-4 right-auto top-1/2 hidden h-10 w-10 -translate-y-1/2 rotate-180 rounded-full border-white/30 bg-white/80 text-zinc-900 hover:bg-white md:flex" />
                        {/* RTL: RIGHT = PREV (arrow should point RIGHT) */}
                        <CarouselPrevious className="right-4 left-auto top-1/2 hidden h-10 w-10 -translate-y-1/2 rotate-180 rounded-full border-white/30 bg-white/80 text-zinc-900 hover:bg-white md:flex" />
                    </>
                ) : (
                    <>
                        {/* LTR: LEFT = PREV */}
                        <CarouselPrevious className="left-4 right-auto top-1/2 hidden h-10 w-10 -translate-y-1/2 rounded-full border-white/30 bg-white/80 text-zinc-900 hover:bg-white md:flex" />
                        {/* LTR: RIGHT = NEXT */}
                        <CarouselNext className="right-4 left-auto top-1/2 hidden h-10 w-10 -translate-y-1/2 rounded-full border-white/30 bg-white/80 text-zinc-900 hover:bg-white md:flex" />
                    </>
                )}

                {/* Progress bar (active) + dots (inactive) */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        {slides.map((_, i) =>
                            i === selectedIndex ? (
                                <div
                                    key={i}
                                    className="h-1 w-8 rounded-full bg-white/30 overflow-hidden"
                                >
                                    <div
                                        className="h-full bg-white transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            ) : (
                                <div
                                    key={i}
                                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/30"
                                    aria-hidden
                                />
                            )
                        )}
                    </div>
                </div>
            </Carousel>
        </section>
    );
}
