"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, X, ArrowRight, Tag, ShieldCheck, ShoppingBag } from "lucide-react";
import { AnnouncementBar } from "../(landing)/_components/AnnouncementBar";
import { StoreHeader } from "../(landing)/_components/StoreHeader";
import { CategoryNav } from "../(landing)/_components/CategoryNav";
import { StoreFooter } from "../(landing)/_components/StoreFooter";
import { CartDrawer } from "../(landing)/_components/CartDrawer";
import { useCart } from "@/lib/cart-context";

export default function ShoppingCartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalCount } = useCart();
  const [promoCode, setPromoCode] = useState("WELCOME200");
  const [appliedDiscount, setAppliedDiscount] = useState(200);
  const [promoMessage, setPromoMessage] = useState("৳200 discount applied via code WELCOME200");

  const deliveryFee = 80;
  const finalTotal = Math.max(0, subtotal + deliveryFee - appliedDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "WELCOME200") {
      setAppliedDiscount(200);
      setPromoMessage("৳200 discount applied via code WELCOME200");
    } else {
      setAppliedDiscount(0);
      setPromoMessage("Invalid promo code");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-neutral-900">
      <AnnouncementBar />
      <StoreHeader />
      <CategoryNav />

      {/* Breadcrumb matching Figma */}
      <div className="border-b border-neutral-100 bg-[#FBFBFC] py-3.5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-xs text-neutral-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-950 font-semibold">Your cart</span>
        </div>
      </div>

      {/* Main Cart Content */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 w-full">
        <div className="space-y-2 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            A few good finds.
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Your cart ({totalCount} {totalCount === 1 ? "item" : "items"})
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-neutral-200 rounded-2xl space-y-4">
            <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto" />
            <p className="text-neutral-600 font-medium">Your shopping bag is empty.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Explore products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Items List */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-neutral-200/90 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant?.id || "default"}`}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-neutral-100 overflow-hidden relative shrink-0 border border-neutral-200">
                      <Image
                        src={item.product.images[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-neutral-950">{item.product.title}</h3>
                      <p className="text-xs text-neutral-500">
                        {item.variant ? item.variant.title : "Standard"} ·{" "}
                        <span className="text-emerald-700 font-semibold">In stock</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                        className="text-[11px] text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-200 rounded-lg h-9 bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)
                        }
                        className="px-2.5 hover:bg-neutral-100 transition-colors text-neutral-600 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono font-bold text-xs text-neutral-950 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)
                        }
                        className="px-2.5 hover:bg-neutral-100 transition-colors text-neutral-600 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-mono font-bold text-sm sm:text-base text-neutral-950">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Promo Code Form */}
              <div className="bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-neutral-950 block">Have a promo code?</span>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 h-9 px-3 border border-neutral-200 rounded-lg text-xs font-mono uppercase focus:outline-none focus:border-neutral-400"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p className="text-[11px] text-emerald-700 font-semibold">{promoMessage}</p>
                )}
              </div>

              {/* Totals Card */}
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-4">
                <h2 className="text-sm font-bold text-neutral-950">Order summary</h2>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono text-neutral-950">৳{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery (Standard nationwide)</span>
                    <span className="font-mono text-neutral-950">৳{deliveryFee}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo code discount</span>
                      <span className="font-mono">-৳{appliedDiscount}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-neutral-100 flex justify-between font-bold text-base text-neutral-950">
                    <span>Total</span>
                    <span className="font-mono">৳{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full h-11 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Proceed to checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cash on Delivery available on checkout</span>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
