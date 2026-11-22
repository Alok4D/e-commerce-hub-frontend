"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function VerifyPhonePage() {
  const router = useRouter();
  const { loginAs } = useAuth();
  const [digits, setDigits] = useState(["3", "8", "4", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(45);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    // Auto focus next input
    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs("CUSTOMER");
    router.push("/account");
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white font-sans text-neutral-900">
      {/* Left Dark Column matching Figma Frame 03 */}
      <div className="lg:col-span-5 bg-[#111111] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>

          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-2">
              03 / YOUR NEXORA ACCOUNT
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
              A small step. <br />
              A safer <br />
              account.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Verify your phone so your orders and account stay securely connected to you.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span>USEFUL FINDS. LESS FRICTION.</span>
          <span>© 2025 Nexora</span>
        </div>
      </div>

      {/* Right OTP Form Column matching Figma */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-7">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
              Verify your phone
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Enter the 6-digit code sent to <span className="font-semibold text-neutral-900">+880 1712 345678</span>.
            </p>
            <Link href="/register" className="text-[11px] font-bold text-neutral-900 underline mt-1 block">
              Change phone number
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                Verification code
              </label>
              <div className="flex items-center gap-2.5 sm:gap-3">
                {digits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-14 sm:w-14 sm:h-14 text-center font-mono text-xl font-bold bg-[#FBFBFC] border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Didn’t receive the code?</span>
              {resendTimer > 0 ? (
                <span className="font-mono text-neutral-400 text-[11px]">Resend in {resendTimer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setResendTimer(45)}
                  className="font-bold text-neutral-900 underline cursor-pointer"
                >
                  Resend SMS code
                </button>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 bg-[#111111] hover:bg-neutral-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Verify &amp; continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
