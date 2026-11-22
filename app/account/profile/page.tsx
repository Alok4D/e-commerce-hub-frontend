"use client";

import React, { useState } from "react";
import { CheckCircle2, Shield, Lock, Save } from "lucide-react";

export default function ProfileSecurityPage() {
  const [name, setName] = useState("Ayesha Rahman");
  const [phone, setPhone] = useState("01712 345678");
  const [email, setEmail] = useState("ayesha.rahman@email.com");
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Profile &amp; security</h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Keep your personal details and account secure.
        </p>
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Personal Info Form */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
        <h2 className="text-sm font-bold text-neutral-950 flex items-center gap-2">
          <Shield className="w-4 h-4 text-neutral-700" />
          <span>Personal information</span>
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs max-w-lg">
          <div>
            <label className="block text-neutral-700 font-semibold mb-1.5">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 font-medium"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-neutral-700 font-semibold">Phone number</label>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-semibold mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#111111] hover:bg-neutral-800 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer shadow-2xs"
            >
              Save profile changes
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-neutral-950 flex items-center gap-2">
          <Lock className="w-4 h-4 text-neutral-700" />
          <span>Security &amp; Password</span>
        </h2>
        <p className="text-xs text-neutral-500 max-w-md">
          Orders can be placed with instant OTP verification via your phone number without requiring
          a complex password.
        </p>
      </div>
    </div>
  );
}
