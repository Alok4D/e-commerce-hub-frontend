import React from "react";
import { ShieldCheck, FileCheck2, HeadphonesIcon } from "lucide-react";

const VALUE_PILLARS = [
  {
    num: "01",
    title: "Carefully sourced",
    description: "Useful finds from trusted supply partners.",
    icon: ShieldCheck,
  },
  {
    num: "02",
    title: "Real product details",
    description: "Clear specifications. No guesswork.",
    icon: FileCheck2,
  },
  {
    num: "03",
    title: "Here after checkout",
    description: "Questions, returns or help? Just reach out.",
    icon: HeadphonesIcon,
  },
];

export function ValueProps() {
  return (
    <section className="w-full py-16 sm:py-20 bg-white border-t border-neutral-200/80 font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            The Nexora Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 mt-1">
            Built for everyday confidence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {VALUE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="p-6 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-50 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-neutral-400">
                    {pillar.num}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-base text-neutral-950">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
