import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="w-full bg-[#F5F6F8] border-b border-neutral-200/80 font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-neutral-800 bg-white/80 px-3 py-1 rounded-full border border-neutral-200">
                Curated Finds. Everyday Possibilities.
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-black tracking-tight text-neutral-950 leading-[1.12]">
              Small upgrades. <br />
              A better everyday.
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed">
              Discover clever gadgets, helpful tools and home essentials. Thoughtfully sourced.
              Ready for your everyday.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="#new-arrivals"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>Shop new arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 text-xs sm:text-sm font-semibold rounded-lg border border-neutral-200 transition-colors cursor-pointer"
              >
                Browse categories
              </Link>
            </div>
          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-neutral-200 shadow-md border border-neutral-300/60">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80"
                alt="Everyday essentials"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full text-[11px] font-bold text-neutral-800 border border-neutral-200 shadow-2xs">
                NEW SEASON / 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
