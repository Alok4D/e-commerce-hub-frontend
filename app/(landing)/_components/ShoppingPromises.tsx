import React from "react";
import { Check } from "lucide-react";

const PROMISES = [
  "Quality-checked imports",
  "Cash on delivery",
  "Nationwide delivery",
  "Friendly human support",
];

export function ShoppingPromises() {
  return (
    <section className="w-full bg-white border-b border-neutral-200/80 py-6 font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {PROMISES.map((promise) => (
            <div key={promise} className="flex items-center gap-2.5 justify-center sm:justify-start">
              <div className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-950 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-neutral-900">{promise}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
