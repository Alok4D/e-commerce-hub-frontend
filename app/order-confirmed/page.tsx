import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Truck, Package, Clock, MapPin } from "lucide-react";
import { AnnouncementBar } from "../(landing)/_components/AnnouncementBar";
import { StoreHeader } from "../(landing)/_components/StoreHeader";
import { CategoryNav } from "../(landing)/_components/CategoryNav";
import { StoreFooter } from "../(landing)/_components/StoreFooter";

export default function OrderConfirmationPage() {
  const steps = [
    { label: "Confirmed", active: true },
    { label: "Packed", active: false },
    { label: "Shipped", active: false },
    { label: "Delivered", active: false },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-neutral-900">
      <AnnouncementBar />
      <StoreHeader />
      <CategoryNav />

      <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full space-y-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto shadow-md">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        {/* Header matching Figma */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-950">
            Good finds are on their way.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Thank you, Ayesha! Your order <span className="font-mono font-bold text-neutral-950">#NX-10482</span> is confirmed. We’ll send SMS and WhatsApp delivery updates to <span className="font-mono font-bold text-neutral-950">01712 345678</span>.
          </p>
        </div>

        {/* Stepper Card matching Figma */}
        <div className="bg-[#FBFBFC] rounded-2xl border border-neutral-200/90 p-6 sm:p-8 text-left space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200/80">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Order Tracking
              </span>
              <span className="font-mono font-bold text-lg text-neutral-950">#NX-10482</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Confirmed via Express COD</span>
            </span>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-4 gap-2">
            {steps.map((st, i) => (
              <div key={st.label} className="space-y-2">
                <div className={`h-1.5 rounded-full ${st.active ? "bg-neutral-950" : "bg-neutral-200"}`} />
                <span className={`text-xs block ${st.active ? "font-bold text-neutral-950" : "text-neutral-400 font-medium"}`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>

          {/* Details 3-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-neutral-200/80 text-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Estimated Delivery
              </span>
              <p className="font-bold text-neutral-950 text-sm">24–26 October 2025</p>
              <p className="text-neutral-500">Pathao Courier Service</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Deliver To
              </span>
              <p className="font-bold text-neutral-950">Ayesha Rahman</p>
              <p className="text-neutral-600">House 24, Road 8, Dhanmondi, Dhaka</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Payment on Delivery
              </span>
              <p className="font-mono font-bold text-neutral-950 text-base">৳4,660</p>
              <p className="text-emerald-700 font-semibold">Cash on delivery</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/account/track"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs"
          >
            <Truck className="w-4 h-4" />
            <span>Track my order</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Continue shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
