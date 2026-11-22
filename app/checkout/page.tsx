"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { AnnouncementBar } from "../(landing)/_components/AnnouncementBar";
import { StoreHeader } from "../(landing)/_components/StoreHeader";
import { CategoryNav } from "../(landing)/_components/CategoryNav";
import { StoreFooter } from "../(landing)/_components/StoreFooter";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  // Form State matching Figma
  const [fullName, setFullName] = useState("Ayesha Rahman");
  const [phone, setPhone] = useState("01712 345678");
  const [email, setEmail] = useState("ayesha.rahman@email.com");
  const [streetAddress, setStreetAddress] = useState("House 24, Road 8, Dhanmondi");
  const [city, setCity] = useState("Dhaka");
  const [area, setArea] = useState("Dhanmondi");
  const [saveDetails, setSaveDetails] = useState(true);
  const [optInMarketing, setOptInMarketing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BKASH" | "CARD">("COD");

  const deliveryFee = 80;
  const discount = 200;
  const orderSubtotal = subtotal > 0 ? subtotal : 4780;
  const grandTotal = orderSubtotal + deliveryFee - discount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/order-confirmed");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-neutral-900">
      <AnnouncementBar />
      <StoreHeader />
      <CategoryNav />

      {/* Stepper Bar matching Figma */}
      <div className="border-b border-neutral-100 bg-[#FBFBFC] py-3.5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Link href="/cart" className="text-neutral-500 hover:text-black">Cart</Link>
            <span className="text-neutral-400">→</span>
            <span className="font-bold text-neutral-950">Delivery &amp; payment</span>
            <span className="text-neutral-400">→</span>
            <span className="text-neutral-400">Confirmation</span>
          </div>

          <div className="text-neutral-500 text-[11px] hidden sm:block">
            Checking out as a guest? <Link href="/login" className="font-semibold text-neutral-950 underline">Sign in instead</Link>
          </div>
        </div>
      </div>

      {/* Main Checkout Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 w-full">
        <div className="space-y-1 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Make it yours.
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Express Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: 2-step Checkout Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 01: Contact & Delivery */}
            <div className="bg-white rounded-xl border border-neutral-200/90 p-6 sm:p-7 shadow-2xs space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h2 className="font-bold text-base text-neutral-950">Contact &amp; delivery</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1.5">Full name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1.5">Phone number (For delivery driver) *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-semibold mb-1.5">Email address (Optional for invoice)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-semibold mb-1.5">Street address / Flat / Road *</label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1.5">City / district *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1.5">Area / Thana *</label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                  />
                </div>
              </div>

              {/* Checkboxes matching Figma */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
                  <input
                    type="checkbox"
                    checked={saveDetails}
                    onChange={(e) => setSaveDetails(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                  />
                  <span>Save my details for next time</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
                  <input
                    type="checkbox"
                    checked={optInMarketing}
                    onChange={(e) => setOptInMarketing(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                  />
                  <span>Send me offers, new arrivals and back-in-stock updates</span>
                </label>
              </div>
            </div>

            {/* Step 02: Payment Method */}
            <div className="bg-white rounded-xl border border-neutral-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="font-bold text-base text-neutral-950">Payment method</h2>
              </div>

              <div className="space-y-3 text-xs">
                {/* COD Option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                    paymentMethod === "COD"
                      ? "border-neutral-900 bg-neutral-50/80 ring-1 ring-neutral-900"
                      : "border-neutral-200 hover:bg-neutral-50/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mt-0.5 accent-neutral-900 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-neutral-950 block">Cash on delivery (COD)</span>
                    <span className="text-[11px] text-neutral-500 mt-0.5 block">
                      Pay cash to the delivery courier once your parcel is received safely in your hands.
                    </span>
                  </div>
                </label>

                {/* bKash Option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                    paymentMethod === "BKASH"
                      ? "border-neutral-900 bg-neutral-50/80 ring-1 ring-neutral-900"
                      : "border-neutral-200 hover:bg-neutral-50/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === "BKASH"}
                    onChange={() => setPaymentMethod("BKASH")}
                    className="mt-0.5 accent-neutral-900 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-neutral-950 block">bKash Online Payment</span>
                    <span className="text-[11px] text-neutral-500 mt-0.5 block">
                      Instant mobile wallet payment with automated PIN confirmation.
                    </span>
                  </div>
                </label>

                {/* Card Option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                    paymentMethod === "CARD"
                      ? "border-neutral-900 bg-neutral-50/80 ring-1 ring-neutral-900"
                      : "border-neutral-200 hover:bg-neutral-50/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === "CARD"}
                    onChange={() => setPaymentMethod("CARD")}
                    className="mt-0.5 accent-neutral-900 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-neutral-950 block">Debit / Credit Card</span>
                    <span className="text-[11px] text-neutral-500 mt-0.5 block">
                      Visa, MasterCard, Amex supported via SSLCommerz payment gateway.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-4">
              <h2 className="text-sm font-bold text-neutral-950">Order summary</h2>

              <div className="space-y-3 text-xs divide-y divide-neutral-100">
                <div className="flex items-center gap-3 pb-3">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden relative shrink-0 border border-neutral-200">
                    <Image
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"
                      alt="Wireless ANC Headphones"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-950 truncate">Wireless ANC Headphones</p>
                    <p className="text-[11px] text-neutral-400">Sage green · Qty: 1</p>
                  </div>
                  <span className="font-mono font-bold text-neutral-950">৳3,490</span>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden relative shrink-0 border border-neutral-200">
                    <Image
                      src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80"
                      alt="24-in-1 Precision Tool Kit"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-950 truncate">24-in-1 Precision Tool Kit</p>
                    <p className="text-[11px] text-neutral-400">Standard · Qty: 1</p>
                  </div>
                  <span className="font-mono font-bold text-neutral-950">৳1,290</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-950">৳{orderSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery (Pathao Courier)</span>
                  <span className="font-mono text-neutral-950">৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo discount</span>
                  <span className="font-mono">-৳{discount}</span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex justify-between font-bold text-base text-neutral-950">
                  <span>Total Payable</span>
                  <span className="font-mono">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Complete order (Cash on delivery)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero payment required now. Pay only upon delivery.</span>
              </p>
            </div>
          </aside>
        </form>
      </div>

      <StoreFooter />
    </div>
  );
}
