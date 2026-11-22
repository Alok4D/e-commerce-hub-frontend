"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, ChevronDown } from "lucide-react";

export default function BusinessOverviewPage() {
  const [selectedRange, setSelectedRange] = useState("Last 30 days");
  const [activeMetric, setActiveMetric] = useState<"REVENUE" | "ORDERS">("REVENUE");

  const recentOrders = [
    {
      id: "NX-10482",
      customer: "Ayesha Rahman",
      items: "2 items",
      total: "৳4,660",
      status: "Confirmed",
      statusStyle: "bg-zinc-100 text-zinc-800",
    },
    {
      id: "NX-10481",
      customer: "Rafiqul Islam",
      items: "1 item",
      total: "৳2,270",
      status: "Pending",
      statusStyle: "bg-amber-50 text-amber-800 border border-amber-200/50",
    },
    {
      id: "NX-10480",
      customer: "Nusrat Jahan",
      items: "3 items",
      total: "৳6,440",
      status: "Shipped",
      statusStyle: "bg-zinc-100 text-zinc-800",
    },
  ];

  const attentionItems = [
    { label: "8 products running low", href: "/dashboard/products" },
    { label: "5 orders to confirm", href: "/dashboard/orders" },
    { label: "3 overdue follow-ups", href: "/dashboard/follow-ups" },
    { label: "2 shipments arriving soon", href: "/dashboard/products" },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 font-sans text-zinc-900">
      {/* 1. Header with Title & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Business overview
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Your store at a glance. Make every day a little smarter.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-100/80 hover:bg-zinc-200/80 text-zinc-800 text-xs font-semibold rounded-lg transition-colors border border-zinc-200/60"
          >
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs">
          <p className="text-xs font-medium text-zinc-500">Total revenue</p>
          <div className="text-2xl sm:text-[32px] font-bold tracking-tight text-zinc-950 my-2">
            ৳284,650
          </div>
          <p className="text-xs text-zinc-600 font-medium flex items-center gap-1">
            <span>↑ 18.4% vs last month</span>
          </p>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs">
          <p className="text-xs font-medium text-zinc-500">Orders</p>
          <div className="text-2xl sm:text-[32px] font-bold tracking-tight text-zinc-950 my-2">
            148
          </div>
          <p className="text-xs text-zinc-600 font-medium flex items-center gap-1">
            <span>↑ 12.1% vs last month</span>
          </p>
        </div>

        {/* Customers */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs">
          <p className="text-xs font-medium text-zinc-500">Customers</p>
          <div className="text-2xl sm:text-[32px] font-bold tracking-tight text-zinc-950 my-2">
            1,284
          </div>
          <p className="text-xs text-zinc-600 font-medium flex items-center gap-1">
            <span>↑ 8.2% vs last month</span>
          </p>
        </div>

        {/* Follow-ups due */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs">
          <p className="text-xs font-medium text-zinc-500">Follow-ups due</p>
          <div className="text-2xl sm:text-[32px] font-bold tracking-tight text-zinc-950 my-2">
            12
          </div>
          <p className="text-xs text-zinc-600 font-medium">
            3 need your attention
          </p>
        </div>
      </div>

      {/* 3. Middle Section: Revenue Overview Chart & Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Revenue Overview Chart Card (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">
              Revenue overview
            </h2>

            {/* Legend Toggles */}
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-600">
              <button
                onClick={() => setActiveMetric("REVENUE")}
                className="flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" />
                <span>Revenue</span>
              </button>
              <button
                onClick={() => setActiveMetric("ORDERS")}
                className="flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-full border border-zinc-400 inline-block" />
                <span>Orders</span>
              </button>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full h-64 sm:h-72 relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 650 220"
              preserveAspectRatio="none"
            >
              {/* Horizontal Grid lines */}
              <line x1="40" y1="20" x2="650" y2="20" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="40" y1="80" x2="650" y2="80" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="40" y1="140" x2="650" y2="140" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="40" y1="200" x2="650" y2="200" stroke="#f0f0f0" strokeWidth="1" />

              {/* Y Axis text */}
              <text x="10" y="25" fill="#9ca3af" fontSize="11" fontFamily="sans-serif">90k</text>
              <text x="10" y="85" fill="#9ca3af" fontSize="11" fontFamily="sans-serif">60k</text>
              <text x="10" y="145" fill="#9ca3af" fontSize="11" fontFamily="sans-serif">30k</text>
              <text x="20" y="205" fill="#9ca3af" fontSize="11" fontFamily="sans-serif">0</text>

              {/* Chart Line */}
              <path
                d="M 50 190 L 100 175 L 140 188 L 190 145 L 240 162 L 290 135 L 340 110 L 390 130 L 440 115 L 490 95 L 540 85 L 590 100 L 640 75"
                fill="none"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* X Axis dates */}
            <div className="flex justify-between pl-10 pr-2 pt-3 text-[11px] text-zinc-400 font-medium">
              <span>01 Oct</span>
              <span>05 Oct</span>
              <span>10 Oct</span>
              <span>15 Oct</span>
              <span>20 Oct</span>
              <span>25 Oct</span>
            </div>
          </div>
        </div>

        {/* Needs Attention Card (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs flex flex-col">
          <h2 className="text-base font-bold text-zinc-950 tracking-tight mb-5">
            Needs attention
          </h2>

          <div className="flex-1 flex flex-col justify-around space-y-3">
            {attentionItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group flex items-center justify-between p-3.5 rounded-lg border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition-all"
              >
                <span className="text-xs sm:text-[13px] font-medium text-zinc-800 group-hover:text-black">
                  {item.label}
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Recent Orders Table */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium">
                <th className="py-3.5 px-6 font-normal">Order</th>
                <th className="py-3.5 px-6 font-normal">Customer</th>
                <th className="py-3.5 px-6 font-normal">Items</th>
                <th className="py-3.5 px-6 font-normal">Total</th>
                <th className="py-3.5 px-6 font-normal">Status</th>
                <th className="py-3.5 px-6 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="py-4 px-6 text-zinc-900 font-semibold font-mono">
                    #{ord.id}
                  </td>
                  <td className="py-4 px-6 text-zinc-800">
                    {ord.customer}
                  </td>
                  <td className="py-4 px-6 text-zinc-500">
                    {ord.items}
                  </td>
                  <td className="py-4 px-6 text-zinc-900 font-semibold font-mono">
                    {ord.total}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${ord.statusStyle}`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/dashboard/orders`}
                      className="inline-flex p-1.5 text-zinc-400 hover:text-black rounded transition-colors"
                      title="View Order"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
