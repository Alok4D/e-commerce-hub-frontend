"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Ayesha Rahman");
  const [phone, setPhone] = useState("01712345678");
  const [email, setEmail] = useState("ayesha.rahman@email.com");
  const [password, setPassword] = useState("Nexora@2025");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate BD 11-digit mobile
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      setError("Please enter a valid 11-digit Bangladesh mobile number (e.g. 01712345678).");
      return;
    }

    // Save phone and route to verify phone OTP
    if (typeof window !== "undefined") {
      sessionStorage.setItem("verify_phone", cleanPhone);
    }
    router.push("/verify-phone");
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white font-sans text-neutral-900">
      {/* Left Dark Column matching Figma */}
      <div className="lg:col-span-5 bg-[#111111] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to shop</span>
          </Link>

          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-2">
              02 / YOUR NEXORA ACCOUNT
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
              Good finds. <br />
              Your own <br />
              corner.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Create an account for easier checkout and a better view of every order.
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
              Create your account
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              One account for every everyday upgrade.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1.5">Full name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ayesha Rahman"
                className="w-full h-11 px-3.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1.5">
                Phone number (Bangladesh) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError(null);
                }}
                placeholder="01XXXXXXXXX"
                className="w-full h-11 px-3.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 font-mono text-neutral-900"
              />
              <span className="text-[11px] text-neutral-400 mt-1 block">
                We’ll send a 6-digit SMS verification code to this number.
              </span>
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1.5">
                Email address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full h-11 px-3.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1.5">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-neutral-900 font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 bg-[#111111] hover:bg-neutral-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Create account &amp; verify phone</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="pt-2 text-center text-xs text-neutral-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-neutral-950 underline">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
