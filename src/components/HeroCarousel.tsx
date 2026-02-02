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

                                    <div className="mx-auto w-full max-w-6xl">
                                        <div
                                            className={`min-w-0 max-w-xl text-white break-words ${locale === "ar"
                                                ? "text-center md:text-right md:ml-auto"
                                                : "text-center md:text-left md:mr-auto"
                                                }`}
                                        >
                                            <h1 className="text-xl font-bold leading-tight sm:text-2xl md:text-4xl break-words">
                                                {slide.title}
                                            </h1>

                                            <p className="mt-3 text-xs text-white/90 sm:text-sm md:text-base break-words">
                                                {slide.description}
                                            </p>

                                            <div
                                                className={`mt-5 flex flex-wrap justify-center gap-2 md:gap-3 ${locale === "ar"
                                                    ? "md:justify-end md:flex-row-reverse"
                                                    : "md:justify-start"
                                                    }`}
                                            >
                                                <a
                                                    href={`https://wa.me/${siteInfo.whatsappE164}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 md:px-5 md:text-sm"
                                                >
                                                    <WhatsappLogo size={14} weight="duotone" />
                                                    {whatsappLabel}
                                                </a>

                                                <a
                                                    href={`tel:${siteInfo.phoneE164}`}
                                                    className="inline-flex items-center gap-2 rounded-full border border-white/60 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 md:px-5 md:text-sm"
                                                >
                                                    <PhoneCall size={14} weight="duotone" />
                                                    {callLabel}
                                                </a>
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
