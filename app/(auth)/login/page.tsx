"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { loginAs } = useAuth();
  const [identifier, setIdentifier] = useState("ayesha.rahman@email.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please enter your email or phone number and password.");
      return;
    }
    // Log in as Customer and redirect to /account
    loginAs("CUSTOMER");
    router.push("/account");
  };

  const handleStaffQuickLogin = () => {
    loginAs("SUPER_ADMIN");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white font-sans text-neutral-900">
      {/* Left Dark Hero Column matching Figma Section 11 */}
      <div className="lg:col-span-5 bg-[#111111] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle background glow */}
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
              01 / YOUR NEXORA ACCOUNT
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
              Welcome back <br />
              to everyday <br />
              possibilities.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Your saved details, favourite finds and order updates. All in one place.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span>USEFUL FINDS. LESS FRICTION.</span>
          <span>© 2025 Nexora</span>
        </div>
      </div>

      {/* Right White Form Column matching Figma */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-7">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
              Sign in to Nexora
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Your orders, addresses and everyday favourites await.
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
              <label className="block text-neutral-700 font-semibold mb-1.5">
                Email or phone number
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 01712 345678 or email"
                className="w-full h-11 px-3.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-neutral-900"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-neutral-700 font-semibold">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-neutral-500 hover:text-black transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-3.5 pr-12 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-neutral-900 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-medium cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 bg-[#111111] hover:bg-neutral-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Sign in</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="pt-2 text-center text-xs text-neutral-500 space-y-4">
            <p>
              Don’t have an account?{" "}
              <Link href="/register" className="font-bold text-neutral-950 underline">
                Create your account
              </Link>
            </p>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">Team or Catalog Staff?</span>
              <button
                type="button"
                onClick={handleStaffQuickLogin}
                className="text-[11px] font-bold text-neutral-800 hover:text-black underline cursor-pointer"
              >
                Sign in to Merchant Hub →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
