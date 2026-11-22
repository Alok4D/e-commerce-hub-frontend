"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("ayesha.rahman@email.com");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white font-sans text-neutral-900">
      {/* Left Dark Column matching Figma Frame 04 */}
      <div className="lg:col-span-5 bg-[#111111] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to sign in</span>
          </Link>

          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-2">
              04 / YOUR NEXORA ACCOUNT
            </span>
            <span className="text-2xl font-black uppercase tracking-tight text-white block">
              nexora
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase mt-0.5 block">
              Customer Access
            </span>
          </div>

          <div className="pt-6 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Let’s get <br />
              you back <br />
              in.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Forgotten passwords happen. Recover your account in a few simple steps.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span>USEFUL FINDS. LESS FRICTION.</span>
          <span>© 2025 Nexora</span>
        </div>
      </div>

      {/* Right Form Column matching Figma */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-7">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
              Forgot your password?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Enter your account email or verified phone number.
            </p>
          </div>

          {submitted ? (
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Request received</span>
              </div>
              <p className="leading-relaxed">
                If an account matches <span className="font-semibold text-emerald-950">{identifier}</span>,
                we’ll send secure recovery instructions. Check your inbox or SMS messages.
              </p>
              <div className="pt-3">
                <Link
                  href="/login"
                  className="font-bold text-neutral-950 underline hover:text-black"
                >
                  Return to sign in →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1.5">
                  Email or phone number
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 01712 345678 or name@email.com"
                  className="w-full h-11 px-3.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-neutral-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-11 bg-[#111111] hover:bg-neutral-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Send recovery instructions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-neutral-500">
            Remembered your password?{" "}
            <Link href="/login" className="font-bold text-neutral-950 underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
