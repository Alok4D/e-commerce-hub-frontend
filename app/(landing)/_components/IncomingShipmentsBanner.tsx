import React from "react";
import Link from "next/link";
import { ArrowRight, Plane, Clock } from "lucide-react";

export function IncomingShipmentsBanner() {
  return (
    <section id="pre-orders" className="w-full py-12 sm:py-16 bg-white font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] rounded-2xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-lg">
          {/* Subtle background glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-[11px] font-semibold tracking-wider uppercase border border-white/10">
              <Plane className="w-3.5 h-3.5 text-neutral-400" />
              <span>Good things are on the way</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Be first to the next big find.
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              Explore incoming products and reserve your favourites before they land. Lock in early
              wholesale-rate pricing with zero upfront risk.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <span>Explore pre-orders</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2 text-neutral-400 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Next shipment arrival: 15 Dec 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
