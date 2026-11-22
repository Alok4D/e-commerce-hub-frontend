import React from "react";
import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";

export function StoreFooter() {
  return (
    <footer className="w-full bg-[#111111] text-white font-sans border-t border-neutral-800">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                nexora
              </span>
            </Link>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Thoughtful finds for a better everyday. Curated direct imports across gadgets, tools,
              and appliances for modern living in Bangladesh.
            </p>
          </div>

          {/* Column 1: SHOP */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-neutral-300 uppercase tracking-wider block">Shop</span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="#new-arrivals" className="hover:text-white transition-colors">
                  New arrivals
                </Link>
              </li>
              <li>
                <Link href="#categories" className="hover:text-white transition-colors">
                  All products
                </Link>
              </li>
              <li>
                <Link href="#pre-orders" className="hover:text-white transition-colors">
                  Pre-orders
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-neutral-500 hover:text-white transition-colors">
                  Merchant Login ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: WE’RE HERE TO HELP */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-neutral-300 uppercase tracking-wider block">
              We’re here to help
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Delivery &amp; returns
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Contact &amp; support
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy policy
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: LET’S TALK */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-neutral-300 uppercase tracking-wider block">
              Let’s talk
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>support@nexora.shop</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Sat–Thu · 9am–8pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment line */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© 2025 Nexora. All rights reserved.</p>
          <p className="font-medium">Cash on delivery • bKash • Cards</p>
        </div>
      </div>
    </footer>
  );
}
