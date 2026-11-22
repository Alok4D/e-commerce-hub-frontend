"use client";

import React, { useState } from "react";
import { ShieldCheck, Share2, Truck, Save, CheckCircle2, DollarSign, Users } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function TeamSettingsPage() {
  const { user, role } = useAuth();
  const [saved, setSaved] = useState(false);

  // Delivery Charges
  const [insideDhaka, setInsideDhaka] = useState(70);
  const [outsideDhaka, setOutsideDhaka] = useState(130);

  // China Sourcing
  const [rmbRate, setRmbRate] = useState(17.2);

  const teamMembers = [
    { name: "Samiul Admin", email: "owner@ecommercehub.com", role: "Super Admin" },
    { name: "Rakib Hassan", email: "catalog@ecommercehub.com", role: "Catalog Manager" },
    { name: "Tanjim Ahmed", email: "sales@ecommercehub.com", role: "Sales & Support Staff" },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-16 font-sans text-zinc-900">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Team &amp; Settings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Manage staff role-based permissions (RBAC), store settings, and China exchange rates.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Staff Roles (RBAC) */}
      <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-zinc-950 tracking-tight flex items-center gap-2">
          <Users className="w-4 h-4 text-zinc-600" />
          Team Members &amp; Roles
        </h2>

        <div className="divide-y divide-zinc-100 text-xs">
          {teamMembers.map((m, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-zinc-900 block">{m.name}</span>
                <span className="text-zinc-500">{m.email}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-zinc-100 font-semibold text-zinc-800 text-[11px]">
                {m.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery & Currency Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-zinc-950 tracking-tight flex items-center gap-2">
            <Truck className="w-4 h-4 text-zinc-600" />
            Nationwide Delivery Charges (COD)
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-600 mb-1">Inside Dhaka (৳)</label>
              <input
                type="number"
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(Number(e.target.value))}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-zinc-600 mb-1">Outside Dhaka (৳)</label>
              <input
                type="number"
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(Number(e.target.value))}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-zinc-950 tracking-tight flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-zinc-600" />
            China 1688 / RMB Currency Exchange
          </h3>
          <div className="text-xs">
            <label className="block text-zinc-600 mb-1">1 RMB to BDT Rate (৳)</label>
            <input
              type="number"
              step="0.1"
              value={rmbRate}
              onChange={(e) => setRmbRate(Number(e.target.value))}
              className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
