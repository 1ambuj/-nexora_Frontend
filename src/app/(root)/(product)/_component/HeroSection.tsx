"use client";

import { Button } from "@/components/ui/button";
import { heroSlides } from "./home-data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.title}
              className="min-w-0 shrink-0 grow-0 basis-full"
            >
              <div className="relative min-h-[80vh] md:min-h-[92vh] w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  style={{ objectPosition: slide.objectPosition }}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/25 to-neutral-950/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/20" />

                <div className="absolute inset-0 flex items-end">
                  <div className="home-container w-full pb-14 md:pb-20 pt-24">
                    <div className="max-w-2xl">
                      <span className="home-display inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/8 backdrop-blur-md px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/90 mb-5">
                        <span className="h-1 w-4 bg-gradient-to-r from-amber-200 to-amber-400 rounded-full" />
                        {slide.tag}
                      </span>
                      <h1 className="home-display text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.02] tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="mt-4 text-sm md:text-base text-white/70 max-w-md leading-relaxed font-light">
                        {slide.subtitle}
                      </p>
                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Button
                          asChild
                          className="rounded-full bg-white text-neutral-950 hover:bg-neutral-100 px-7 h-11 text-sm font-semibold"
                        >
                          <Link href={slide.redirect}>
                            {slide.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 px-7 h-11 text-sm backdrop-blur-sm"
                        >
                          <Link href="/search">Browse all</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-10">
        <div className="home-container flex items-center justify-between">
          <p className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-white/40">
            Scroll to explore
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[11px] tabular-nums text-white/50 tracking-widest">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(heroSlides.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    selectedIndex === i
                      ? "w-7 bg-white"
                      : "w-1.5 bg-white/35 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
