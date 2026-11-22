"use client";

import React, { useState } from "react";
import { CheckCircle2, Bell, ShieldCheck } from "lucide-react";

export default function CommunicationPreferencesPage() {
  const [optInMarketing, setOptInMarketing] = useState(true);
  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
          Communication preferences
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Choose which updates you want and how we contact you.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Marketing preferences updated successfully!</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-neutral-950">You’re in control.</h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Order and delivery updates are always sent when needed to fulfil your purchase.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Main Opt-In Toggle */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={optInMarketing}
                onChange={(e) => setOptInMarketing(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-neutral-900 rounded cursor-pointer"
              />
              <div>
                <span className="font-bold text-neutral-950 text-xs sm:text-sm block">
                  Send me offers, new arrivals and back-in-stock updates
                </span>
                <span className="text-[11px] text-neutral-500 mt-0.5 block">
                  You can withdraw marketing consent at any time. We strictly limit messages to 1–2 per month.
                </span>
              </div>
            </label>
          </div>

          {/* Preferred Channels */}
          {optInMarketing && (
            <div className="space-y-4 pt-2">
              <span className="font-bold text-neutral-950 text-xs block">
                Preferred marketing channels
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex items-center gap-2.5 p-3.5 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-neutral-900 block">WhatsApp</span>
                    <span className="text-[10px] text-neutral-400 block font-mono">01712 345678</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={email}
                    onChange={(e) => setEmail(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-neutral-900 block">Email</span>
                    <span className="text-[10px] text-neutral-400 block truncate">ayesha.rahman@email.com</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={sms}
                    onChange={(e) => setSms(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-neutral-900 block">SMS</span>
                    <span className="text-[10px] text-neutral-400 block">Standard carrier</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#111111] hover:bg-neutral-800 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer shadow-2xs"
            >
              Save preferences
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span>Privacy matters. Only customers who explicitly opt in receive promotional campaigns.</span>
        </div>
      </div>
    </div>
  );
}
