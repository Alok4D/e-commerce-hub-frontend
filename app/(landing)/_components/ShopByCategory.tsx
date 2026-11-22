import React from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Home, Wrench, Utensils, Sparkles } from "lucide-react";

const CATEGORIES = [
  {
    num: "01",
    name: "Electronics & gadgets",
    count: "48 products",
    icon: Smartphone,
    featured: true,
  },
  {
    num: "02",
    name: "Home & living",
    count: "32 products",
    icon: Home,
    featured: false,
  },
  {
    num: "03",
    name: "Tools & DIY",
    count: "24 products",
    icon: Wrench,
    featured: false,
  },
  {
    num: "04",
    name: "Kitchen & appliances",
    count: "19 products",
    icon: Utensils,
    featured: false,
  },
  {
    num: "05",
    name: "Lifestyle & more",
    count: "15 products",
    icon: Sparkles,
    featured: false,
  },
];

export function ShopByCategory() {
  return (
    <section id="categories" className="w-full py-14 sm:py-16 bg-white font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Shop by category
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 mt-1">
              Find your next everyday essential
            </h2>
          </div>

          <Link
            href="#categories"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            <span>Explore all categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.num}
                className={`group p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[160px] ${
                  cat.featured
                    ? "bg-[#111111] border-neutral-900 text-white shadow-sm"
                    : "bg-white border-neutral-200 hover:border-neutral-400 text-neutral-950"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold ${
                      cat.featured ? "text-neutral-400" : "text-neutral-400"
                    }`}
                  >
                    {cat.num}
                  </span>
                  <Icon
                    className={`w-5 h-5 ${
                      cat.featured ? "text-neutral-300" : "text-neutral-700"
                    } group-hover:scale-110 transition-transform`}
                  />
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-sm tracking-tight leading-snug">{cat.name}</h3>
                  <p
                    className={`text-[11px] mt-1 ${
                      cat.featured ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {cat.count}
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
