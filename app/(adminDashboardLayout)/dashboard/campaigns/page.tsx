"use client";

import React from "react";
import { Megaphone, Plus, MessageSquare, Send } from "lucide-react";

export default function CampaignsPage() {
  const campaigns = [
    {
      id: "cmp-1",
      title: "New China Sea Container Arrival - Winter Gadgets",
      channel: "WhatsApp & SMS",
      audience: "All Active Buyers (1,284)",
      status: "COMPLETED",
      sentDate: "20 Nov 2026",
    },
    {
      id: "cmp-2",
      title: "Wholesale Inquiry Follow-Up - 21V Cordless Drills",
      channel: "WhatsApp Direct",
      audience: "Wholesale Segment (42)",
      status: "SCHEDULED",
      sentDate: "25 Nov 2026",
    },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 font-sans text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Campaigns &amp; Outbound Broadcasts
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Send WhatsApp and SMS promotional broadcasts to segmented customer lists.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Broadcast</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium">
              <th className="py-3.5 px-6 font-normal">Campaign Title</th>
              <th className="py-3.5 px-6 font-normal">Channel</th>
              <th className="py-3.5 px-6 font-normal">Target Segment</th>
              <th className="py-3.5 px-6 font-normal">Status</th>
              <th className="py-3.5 px-6 font-normal text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 font-medium">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-4 px-6 font-semibold text-zinc-900">
                  {c.title}
                </td>
                <td className="py-4 px-6 text-zinc-700">
                  {c.channel}
                </td>
                <td className="py-4 px-6 text-zinc-600">
                  {c.audience}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      c.status === "COMPLETED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-mono text-zinc-500 text-[11px]">
                  {c.sentDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
