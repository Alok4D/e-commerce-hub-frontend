import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

const NAV_ITEMS = [
  { label: "New arrivals", href: "#new-arrivals" },
  { label: "Electronics", href: "#categories" },
  { label: "Home & living", href: "#categories" },
  { label: "Tools & DIY", href: "#categories" },
  { label: "Kitchen", href: "#categories" },
  { label: "Pre-orders", href: "#pre-orders" },
  { label: "Offers", href: "#offers" },
];

export function CategoryNav() {
  return (
    <nav className="w-full bg-white border-b border-neutral-200 text-xs font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto py-2.5">
        <div className="flex items-center gap-6 sm:gap-8 whitespace-nowrap">
          {/* All Categories trigger */}
          <button
            type="button"
            className="flex items-center gap-1.5 font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <span>All categories</span>
            <Menu className="w-3.5 h-3.5" />
          </button>

          {/* Links */}
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors font-medium ${
                item.label === "Pre-orders"
                  ? "text-neutral-900 font-semibold"
                  : item.label === "Offers"
                  ? "text-amber-800 font-semibold"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Live Admin Dashboard Shortcut for Owner */}
        <div className="hidden lg:flex items-center pl-6 border-l border-neutral-200">
          <Link
            href="/dashboard"
            className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            Merchant Admin ↗
          </Link>
        </div>
      </div>
    </nav>
  );
}
