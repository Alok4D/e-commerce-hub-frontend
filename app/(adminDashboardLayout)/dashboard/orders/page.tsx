"use client";

import React, { useState } from "react";
import { Search, Eye, Filter, Download } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const filteredOrders =
    selectedStatus === "ALL"
      ? orders
      : orders.filter((o) => o.orderStatus === selectedStatus);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 font-sans text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Orders &amp; Fulfillment
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Track daily customer shipments, Cash on Delivery status, and courier tracking.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-zinc-200 pb-2 text-xs font-medium text-zinc-500 overflow-x-auto">
        {["ALL", "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              selectedStatus === st
                ? "bg-black text-white font-semibold"
                : "hover:text-black hover:bg-zinc-100"
            }`}
          >
            {st === "ALL" ? "All Orders" : st}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium">
              <th className="py-3.5 px-6 font-normal">Order</th>
              <th className="py-3.5 px-6 font-normal">Customer</th>
              <th className="py-3.5 px-6 font-normal">Items</th>
              <th className="py-3.5 px-6 font-normal">Total</th>
              <th className="py-3.5 px-6 font-normal">Payment</th>
              <th className="py-3.5 px-6 font-normal">Courier &amp; Status</th>
              <th className="py-3.5 px-6 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 font-medium">
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-4 px-6 font-mono font-semibold text-zinc-900">
                  {ord.orderNumber}
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold text-zinc-800">{ord.customerName}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">{ord.phone}</div>
                </td>
                <td className="py-4 px-6 text-zinc-600">
                  {ord.items.length} item(s)
                </td>
                <td className="py-4 px-6 font-mono font-semibold text-zinc-900">
                  ৳{ord.total.toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <span className="px-2 py-0.5 rounded bg-zinc-100 text-[11px] text-zinc-700">
                    {ord.paymentMethod.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                      ord.orderStatus === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800"
                        : ord.orderStatus === "SHIPPED"
                        ? "bg-blue-100 text-blue-800"
                        : ord.orderStatus === "CONFIRMED"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {ord.orderStatus}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="p-1 text-zinc-400 hover:text-black transition-colors" title="View details">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
