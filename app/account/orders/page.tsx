import React from "react";
import Link from "next/link";
import { ArrowRight, Package, Truck, CheckCircle2 } from "lucide-react";

const ORDERS = [
  {
    id: "NX-10482",
    date: "22 Oct 2025",
    itemsCount: 2,
    status: "Confirmed",
    amount: 4660,
    summary: "Wireless ANC Headphones, 24-in-1 Precision Tool Kit",
    payment: "Cash on delivery",
  },
  {
    id: "NX-09831",
    date: "01 Oct 2025",
    itemsCount: 1,
    status: "Delivered",
    amount: 1930,
    summary: "Rechargeable Desk Lamp",
    payment: "bKash · Paid",
  },
  {
    id: "NX-08720",
    date: "18 Sep 2025",
    itemsCount: 3,
    status: "Delivered",
    amount: 6440,
    summary: "Portable Juice Blender, Cordless Screwdriver, Smart Ambient Light",
    payment: "Cash on delivery",
  },
];

export default function MyOrdersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">My orders</h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Your purchases, delivery updates and order details.
        </p>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
        {ORDERS.map((order) => (
          <div key={order.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-neutral-950">#{order.id}</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    order.status === "Delivered"
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-blue-50 text-blue-800"
                  }`}
                >
                  {order.status === "Delivered" ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse mr-1.5" />
                  )}
                  <span>{order.status}</span>
                </span>
              </div>

              <p className="text-xs text-neutral-600">{order.summary}</p>

              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <span>{order.date}</span>
                <span>·</span>
                <span>{order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}</span>
                <span>·</span>
                <span>{order.payment}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 sm:self-center">
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-neutral-400 block">Total</span>
                <span className="font-mono font-bold text-base text-neutral-950">
                  ৳{order.amount.toLocaleString()}
                </span>
              </div>

              <Link
                href="/account/track"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-neutral-200 hover:bg-neutral-100/80 rounded-lg text-xs font-semibold text-neutral-900 transition-colors cursor-pointer"
              >
                <span>View order</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
