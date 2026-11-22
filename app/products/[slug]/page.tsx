"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Plus,
  Minus,
  Check,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { AnnouncementBar } from "../../(landing)/_components/AnnouncementBar";
import { StoreHeader } from "../../(landing)/_components/StoreHeader";
import { CategoryNav } from "../../(landing)/_components/CategoryNav";
import { StoreFooter } from "../../(landing)/_components/StoreFooter";
import { CartDrawer } from "../../(landing)/_components/CartDrawer";
import { useCart } from "@/lib/cart-context";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const IMAGES = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&auto=format&fit=crop&q=80",
];

const VARIANTS = [
  { id: "v-1", name: "Sage green", bg: "bg-emerald-800" },
  { id: "v-2", name: "Graphite", bg: "bg-zinc-800" },
  { id: "v-3", name: "Cream", bg: "bg-amber-100" },
];

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolved = use(params);
  const { addToCart, openCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews">("details");
  const [isAdded, setIsAdded] = useState(false);

  const product = MOCK_PRODUCTS[0];

  const handleAddToCart = () => {
    addToCart(
      product,
      {
        id: selectedVariant.id,
        sku: `NX-ANC01-${selectedVariant.name.slice(0, 2).toUpperCase()}`,
        title: selectedVariant.name,
        price: 3490,
        stock: 38,
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-neutral-900">
      <AnnouncementBar />
      <StoreHeader />
      <CategoryNav />

      {/* Breadcrumbs matching Figma */}
      <div className="border-b border-neutral-100 bg-[#FBFBFC] py-3.5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-xs text-neutral-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-black">Electronics</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-black">Audio</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-950 font-semibold">Wireless ANC Headphones</span>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl bg-neutral-100 overflow-hidden border border-neutral-200">
              <Image
                src={IMAGES[selectedImg]}
                alt="Product"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-3">
              {IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImg(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                    selectedImg === i ? "border-black ring-2 ring-black" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Purchase Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                NEXORA AUDIO / NX-ANC01
              </span>
              <p className="text-sm font-semibold text-neutral-600 italic">
                “Your world. A little quieter.”
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                Wireless ANC Headphones
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-1 text-xs text-neutral-600">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-neutral-950">4.8</span>
                <span className="text-neutral-400">· 124 verified reviews</span>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-black text-neutral-950">
                  ৳3,490
                </span>
                <span className="font-mono text-sm text-neutral-400 line-through">৳4,200</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Save 17%
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>In stock · 38 available in Dhaka central hub</span>
              </div>
            </div>

            {/* Color Variant Selector */}
            <div className="space-y-2.5 text-xs">
              <span className="font-bold text-neutral-950">
                Colour: <span className="font-normal text-neutral-600">{selectedVariant.name}</span>
              </span>
              <div className="flex items-center gap-3">
                {VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3.5 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      selectedVariant.id === v.id
                        ? "border-black bg-black text-white shadow-xs"
                        : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${v.bg}`} />
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Value Highlights */}
            <div className="space-y-2 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Active noise cancellation up to -35dB</span>
              </p>
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Up to 40 hours continuous listening on single charge</span>
              </p>
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lightweight, foldable design with protein foam earcups</span>
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center border border-neutral-200 rounded-lg h-12 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-mono font-bold text-sm text-neutral-950 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 h-12 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-[#111111] hover:bg-neutral-800 text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <span>Add to cart</span>
                    <span>→</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="w-12 h-12 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges matching Figma */}
            <div className="p-4 rounded-xl bg-[#FBFBFC] border border-neutral-200 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>Delivery in 2–4 days across Bangladesh · COD available</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>7-day easy returns if damaged or defective</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>6-month service warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section: Product Details / Specifications / Reviews */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <div className="flex items-center gap-8 border-b border-neutral-200 pb-4 text-xs sm:text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "details"
                  ? "border-black text-black"
                  : "border-transparent text-neutral-500 hover:text-black"
              }`}
            >
              Product details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "specs"
                  ? "border-black text-black"
                  : "border-transparent text-neutral-500 hover:text-black"
              }`}
            >
              Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "reviews"
                  ? "border-black text-black"
                  : "border-transparent text-neutral-500 hover:text-black"
              }`}
            >
              Reviews (124)
            </button>
          </div>

          <div className="py-8 text-xs sm:text-sm text-neutral-700 max-w-2xl leading-relaxed">
            {activeTab === "details" && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-neutral-950">
                  A better soundtrack to your everyday.
                </h3>
                <p>
                  From your morning commute to focused work sessions, enjoy balanced sound and
                  comfortable listening with intuitive controls. Features hybrid dual-mic active
                  noise cancellation, 40mm dynamic acoustic drivers, and high-clarity microphones for
                  phone calls.
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-neutral-100">
                    <tr className="bg-neutral-50/50">
                      <td className="p-3 font-semibold text-neutral-900 w-1/3">Battery Life</td>
                      <td className="p-3 text-neutral-600">Up to 40 hours (ANC on: 32 hrs)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-neutral-900">Charging Port</td>
                      <td className="p-3 text-neutral-600">USB Type-C (Fast charge supported)</td>
                    </tr>
                    <tr className="bg-neutral-50/50">
                      <td className="p-3 font-semibold text-neutral-900">Bluetooth Version</td>
                      <td className="p-3 text-neutral-600">Bluetooth 5.3 + 3.5mm AUX Cable</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-neutral-900">Origin</td>
                      <td className="p-3 text-neutral-600">Direct Shenzhen Factory Import</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-bold text-neutral-950 text-xs">“Amazing sound quality for the price!”</p>
                  <p className="text-neutral-600 text-[11px] mt-1">
                    The noise cancelling works surprisingly well in Dhanmondi traffic. Battery lasts almost a whole week without charging.
                  </p>
                  <span className="text-[10px] text-neutral-400 mt-2 block">Tanvir H. · Verified Buyer</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
