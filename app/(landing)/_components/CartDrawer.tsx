"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalCount } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h2 className="font-bold text-base text-neutral-950">Your Cart</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
              {totalCount} {totalCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-neutral-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <ShoppingBag className="w-12 h-12 text-neutral-300 stroke-1 mb-3" />
              <p className="font-semibold text-neutral-900 text-sm">Your cart is empty</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Explore our curated everyday finds and add gadgets or home essentials to your cart.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-5 px-5 py-2.5 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.variant?.id || "default"}`} className="py-4 flex gap-3">
                <div className="w-18 h-18 rounded-lg bg-neutral-100 overflow-hidden shrink-0 relative border border-neutral-200">
                  <Image
                    src={item.product.images[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-xs text-neutral-950 line-clamp-1">
                      {item.product.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.variant && (
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Variant: {item.variant.title}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-neutral-200 rounded-md">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)
                        }
                        className="p-1 hover:bg-neutral-100 transition-colors text-neutral-600 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-neutral-900 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)
                        }
                        className="p-1 hover:bg-neutral-100 transition-colors text-neutral-600 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-bold text-xs text-neutral-950">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50/70 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-mono font-bold text-sm text-neutral-950">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <span>Delivery Fee</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="pt-2 space-y-2">
              <Link
                href="/account/orders"
                onClick={closeCart}
                className="w-full h-11 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
