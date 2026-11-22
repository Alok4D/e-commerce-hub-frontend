"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Truck,
  User,
  MapPin,
  Bell,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const NAV_ITEMS = [
  { label: "Overview", href: "/account", icon: LayoutDashboard },
  { label: "My orders", href: "/account/orders", icon: Package },
  { label: "Order tracking", href: "/account/track", icon: Truck },
  { label: "Profile & security", href: "/account/profile", icon: User },
  { label: "Saved addresses", href: "/account/addresses", icon: MapPin },
  { label: "Communication preferences", href: "/account/preferences", icon: Bell },
];

export function CustomerAccountNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-full lg:w-72 shrink-0 font-sans">
      <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Customer Account
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              <span>Private</span>
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Only your personal information and orders.
          </p>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/account"
                ? pathname === "/account"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[#111111] text-white shadow-2xs"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/70"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-red-600 hover:bg-red-50/60 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4 text-neutral-400 group-hover:text-red-500" />
              <span>Sign out</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
