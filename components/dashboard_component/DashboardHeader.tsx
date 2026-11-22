"use client";

import Link from "next/link";
import { ExternalLink, Bell, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="h-16 w-full bg-white border-b border-zinc-200 px-6 sm:px-8 z-30 font-sans flex items-center shrink-0">
      <div className="w-full flex justify-between items-center gap-4">
        {/* Left: Search Box matching the screenshot */}
        <div className="flex-1 max-w-sm hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder=""
              className="w-full h-10 pl-10 pr-4 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Mobile Brand Title */}
        <div className="sm:hidden flex-1 pl-12">
          <span className="text-base font-bold text-black tracking-tight">
            nexora
          </span>
        </div>

        {/* Right side: Live Store link, Bell Notification, and Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Live Store link */}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-black transition-colors"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          {/* Notifications Bell */}
          <button
            type="button"
            className="relative p-1.5 text-zinc-600 hover:text-black transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-black ring-2 ring-white" />
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-zinc-200">
            <div className="w-9 h-9 rounded-full bg-black text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              SA
            </div>
            <div className="hidden md:block text-left leading-tight">
              <span className="block text-xs font-semibold text-zinc-900">
                Super Admin
              </span>
              <span className="block text-[11px] text-zinc-400">
                admin@nexora.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
