"use client";

import React, { useState } from "react";
import { Search, User, Phone, Mail, MapPin } from "lucide-react";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";

export default function CustomersPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 font-sans text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Customers &amp; CRM Directory
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Unified customer profiles created automatically from registrations, inquiries, and orders.
          </p>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium">
              <th className="py-3.5 px-6 font-normal">Customer</th>
              <th className="py-3.5 px-6 font-normal">Phone &amp; WhatsApp</th>
              <th className="py-3.5 px-6 font-normal">City &amp; Address</th>
              <th className="py-3.5 px-6 font-normal">Total Orders</th>
              <th className="py-3.5 px-6 font-normal">Lifetime Spend</th>
              <th className="py-3.5 px-6 font-normal">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 font-medium">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-800 font-bold flex items-center justify-center font-mono">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-zinc-900 block">{c.name}</span>
                      <span className="text-[11px] text-zinc-500">{c.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-mono text-zinc-700">
                  {c.phone}
                </td>
                <td className="py-4 px-6 text-zinc-600">
                  {c.deliveryAddress}, {c.city}
                </td>
                <td className="py-4 px-6 font-mono text-zinc-800 font-bold">
                  {c.totalOrders}
                </td>
                <td className="py-4 px-6 font-mono text-zinc-950 font-bold">
                  ৳{c.lifetimeSpend.toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full bg-zinc-100 text-[10px] font-semibold text-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
