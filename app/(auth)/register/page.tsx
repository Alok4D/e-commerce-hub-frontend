"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Side: Create Account Form */}
      <div className="lg:col-span-5 flex items-center justify-center px-6 sm:px-12 py-12 bg-white">
        <div className="w-full max-w-[360px]">
          {/* Heading & Subtitle */}
          <div className="mb-7">
            <h1 className="text-[26px] font-extrabold tracking-tight text-gray-900 uppercase">
              CREATE ACCOUNT
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">
              How do i get access order,wishlist and recommendation ?
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-[13px] font-semibold text-gray-800 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                className="w-full h-11 px-4 rounded-full border border-gray-200 text-sm text-gray-800 outline-none transition-colors focus:border-[#1289A7]"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-semibold text-gray-800 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full h-11 px-4 rounded-full border border-gray-200 text-sm text-gray-800 outline-none transition-colors focus:border-[#1289A7]"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-semibold text-gray-800 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full h-11 pl-4 pr-11 rounded-full border border-gray-200 text-sm text-gray-800 outline-none transition-colors focus:border-[#1289A7]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 space-y-3">
              <button
                type="submit"
                className="w-full h-11 rounded-full bg-[#1289A7] hover:bg-[#0f748e] text-white text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>SignUp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/"
                className="w-full h-11 rounded-full border border-[#1289A7]/70 hover:bg-[#1289A7]/5 text-[#1289A7] text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-xs text-gray-600 mt-5">
            Already have an Account?{" "}
            <Link
              href="/login"
              className="text-[#1289A7] underline underline-offset-2 font-medium hover:text-[#0f748e]"
            >
              Sign In
            </Link>
          </p>

          {/* Or Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="w-28 border-t border-gray-200" />
            <span className="px-3 text-xs text-gray-400">Or</span>
            <div className="w-28 border-t border-gray-200" />
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full h-11 rounded-full bg-[#F8F9FA] hover:bg-gray-100 text-gray-600 text-xs font-medium flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              {/* Google Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
                />
              </svg>
              <span>Sign up</span>
            </button>

            <button
              type="button"
              className="w-full h-11 rounded-full bg-[#F8F9FA] hover:bg-gray-100 text-gray-600 text-xs font-medium flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              {/* Facebook Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
              </svg>
              <span>Sign up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Full Cover Image (Replace src with your own image path) */}
      <div className="hidden lg:block lg:col-span-7 relative min-h-screen w-full overflow-hidden">
        <Image
           src="https://themes.pixelstrap.com/oslo/assets/images/inner-page/banner.jpg"
          alt="Shopping banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}