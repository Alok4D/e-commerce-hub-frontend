import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Clock, Truck, MapPin, Package } from "lucide-react";

export default function OrderTrackingPage() {
  const steps = [
    { title: "Confirmed", time: "22 Oct, 10:45 AM", completed: true, current: false },
    { title: "Packed", time: "22 Oct, 03:15 PM", completed: true, current: true },
    { title: "Shipped", time: "Pending handover", completed: false, current: false },
    { title: "Delivered", time: "Expected 24–26 Oct", completed: false, current: false },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all orders</span>
          </Link>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Track your order</h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Follow order #NX-10482 from confirmation to your doorstep.
        </p>
      </div>

      {/* Stepper Card */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
          <div>
            <span className="font-mono font-bold text-lg text-neutral-950">#NX-10482</span>
            <p className="text-xs text-neutral-500 mt-0.5">
              Courier: <span className="font-semibold text-neutral-800">Pathao Courier</span> · Consignment ID: <span className="font-mono text-neutral-700">PTH-8492041</span>
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-lg text-xs font-semibold text-neutral-800">
            <Clock className="w-3.5 h-3.5 text-neutral-600" />
            <span>Estimated delivery: 24–26 October 2025</span>
          </div>
        </div>

        {/* 4 Steps Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {steps.map((s, idx) => (
            <div key={s.title} className="space-y-2">
              <div className="flex items-center gap-2">
                {s.completed ? (
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200">
                    <Circle className="w-3 h-3" />
                  </div>
                )}
                <div className={`h-0.5 flex-1 ${s.completed ? "bg-neutral-900" : "bg-neutral-200"}`} />
              </div>

              <div>
                <span className={`text-xs font-bold block ${s.completed ? "text-neutral-950" : "text-neutral-400"}`}>
                  {s.title}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Items & Delivery Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-neutral-950 uppercase tracking-wider flex items-center gap-2">
            <Package className="w-4 h-4 text-neutral-700" />
            <span>Items in this parcel</span>
          </h2>
          <div className="divide-y divide-neutral-100 text-xs">
            <div className="py-2.5 flex justify-between">
              <div>
                <p className="font-semibold text-neutral-900">Wireless ANC Headphones</p>
                <p className="text-[11px] text-neutral-400">Sage Green · Qty: 1</p>
              </div>
              <span className="font-mono font-bold text-neutral-950">৳3,490</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <div>
                <p className="font-semibold text-neutral-900">24-in-1 Precision Tool Kit</p>
                <p className="text-[11px] text-neutral-400">Standard · Qty: 1</p>
              </div>
              <span className="font-mono font-bold text-neutral-950">৳1,290</span>
            </div>
            <div className="pt-3 flex justify-between font-bold text-neutral-950">
              <span>Total Payable (COD)</span>
              <span className="font-mono">৳4,660</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-neutral-950 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-700" />
            <span>Delivery Destination</span>
          </h2>
          <div className="text-xs space-y-1.5 text-neutral-600">
            <p className="font-semibold text-neutral-900">Ayesha Rahman</p>
            <p className="font-mono">01712 345678</p>
            <p className="leading-relaxed">House 24, Road 8, Dhanmondi, Dhaka 1209</p>
          </div>
          <div className="pt-2">
            <p className="text-[11px] text-neutral-400 italic">
              Delivery driver will contact your phone prior to arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
