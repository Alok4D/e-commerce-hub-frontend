"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function StoreHeader() {
  const { openCart, totalCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="w-full bg-white border-b border-neutral-200 sticky top-0 z-40 font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex flex-col group">
            <span className="text-2xl sm:text-[26px] font-black tracking-tight text-neutral-950 uppercase leading-none font-sans">
              nexora
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase mt-1">
              Everyday, Upgraded
            </span>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-lg hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gadgets, tools, home essentials…"
              className="w-full h-11 pl-10 pr-4 text-xs bg-[#F6F7F9] border border-transparent rounded-lg focus:outline-none focus:border-neutral-300 focus:bg-white text-neutral-900 placeholder:text-neutral-500 transition-all"
            />
          </div>
        </div>

        {/* Right Actions: Account, Wishlist, Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Account */}
          <Link
            href="/account"
            className="flex items-center gap-2 text-xs font-medium text-neutral-800 hover:text-black transition-colors"
          >
            <User className="w-4 h-4 text-neutral-700" />
            <span className="hidden sm:inline">Account</span>
          </Link>

          {/* Wishlist */}
          <button
            type="button"
            className="p-1 text-neutral-700 hover:text-black transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={openCart}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg text-xs font-semibold text-neutral-900 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-800" />
            <span>Cart ({totalCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
