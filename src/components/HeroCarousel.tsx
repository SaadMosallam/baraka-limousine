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

const AUTOPLAY_MS = 30000;
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
                            {/* IMAGE DEFINES HEIGHT */}
                            <div className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden bg-black">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    priority={index === 0}
                                    sizes="100vw"
                                    className="object-cover"
                                />

                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/35" />

                                {/* CENTERED CONTENT (THE FIX) */}
                                <div className="absolute inset-0 flex items-center">
                                    <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
                                        <div
                                            className={`max-w-xl text-white ${locale === "ar"
                                                    ? "text-center md:text-right md:ms-auto"
                                                    : "text-center md:text-left md:me-auto"
                                                }`}
                                        >
                                            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                                                {slide.title}
                                            </h1>

                                            <p className="mt-3 text-sm md:text-base text-white/90">
                                                {slide.description}
                                            </p>

                                            <div
                                                className={`mt-5 flex flex-wrap gap-3 justify-center md:justify-start ${locale === "ar" ? "md:flex-row-reverse" : ""
                                                    }`}
                                            >
                                                <a
                                                    href={`https://wa.me/${siteInfo.whatsapp}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                                                >
                                                    <WhatsappLogo size={16} weight="duotone" />
                                                    {whatsappLabel}
                                                </a>

                                                <a
                                                    href={`tel:${siteInfo.phone}`}
                                                    className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
                                                >
                                                    <PhoneCall size={16} weight="duotone" />
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

                {/* Arrows (desktop only) */}
                <CarouselPrevious className="left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 text-zinc-900 hover:bg-white md:flex" />
                <CarouselNext className="right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 text-zinc-900 hover:bg-white md:flex" />

                {/* Progress + dots */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                        {slides.map((_, i) => (
                            <div
                                key={i}
                                className="h-1 w-8 rounded-full bg-white/30 overflow-hidden"
                            >
                                {i === selectedIndex && (
                                    <div
                                        className="h-full bg-white transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    isInteractingRef.current = true;
                                    api?.scrollTo(i);
                                }}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2 w-2 rounded-full ${i === selectedIndex ? "bg-white" : "bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </Carousel>
        </section>
    );
}
