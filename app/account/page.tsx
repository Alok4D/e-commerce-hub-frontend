import React from "react";
import Link from "next/link";
import { Package, Truck, ArrowRight, MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function AccountOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
          Welcome back, Ayesha.
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Everything you need for your next everyday upgrade.
        </p>
      </div>

      {/* 3 Metric Cards matching Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium block">Total orders</span>
          <span className="font-mono text-2xl font-black text-neutral-950 mt-1 block">8</span>
          <span className="text-[11px] text-neutral-400 mt-0.5 block">Delivered across Dhaka</span>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium block">Lifetime purchases</span>
          <span className="font-mono text-2xl font-black text-neutral-950 mt-1 block">৳24,680</span>
          <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">VIP customer tier</span>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium block">Active orders</span>
          <span className="font-mono text-2xl font-black text-neutral-950 mt-1 block">1</span>
          <span className="text-[11px] text-blue-600 font-medium mt-0.5 block">In fulfillment</span>
        </div>
      </div>

      {/* Active Order Highlight Card */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-neutral-900" />
            <h2 className="text-sm font-bold text-neutral-950">Active Shipment In Progress</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Confirmed</span>
          </span>
        </div>

        <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-neutral-950">#NX-10482</span>
              <span className="text-xs text-neutral-400">· 2 items · Cash on delivery</span>
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Wireless ANC Headphones (Sage Green) + 24-in-1 Precision Tool Kit
            </p>
            <p className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Estimated delivery: 24–26 October 2025</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono font-bold text-base text-neutral-950">৳4,660</span>
            <Link
              href="/account/track"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
            >
              <span>Track shipment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default Delivery Address */}
        <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-950 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>Default Delivery Address</span>
            </h3>
            <Link
              href="/account/addresses"
              className="text-xs font-semibold text-neutral-900 hover:underline"
            >
              Manage →
            </Link>
          </div>
          <p className="text-xs font-semibold text-neutral-900">Home · Default</p>
          <address className="not-italic text-xs text-neutral-500 leading-relaxed">
            Ayesha Rahman · 01712 345678 <br />
            House 24, Road 8, Dhanmondi, Dhaka 1209
          </address>
        </div>

        {/* Support & Warranty */}
        <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-neutral-950 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>Nexora Assurance</span>
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            All items are inspected prior to courier dispatch. If you have questions about an order
            or need help with a replacement, our team is directly reachable.
          </p>
          <p className="text-xs font-medium text-neutral-900">
            Helpline: <span className="font-mono text-neutral-700">+880 1700-000000</span>
          </p>
        </div>
      </div>
    </div>
  );
}
