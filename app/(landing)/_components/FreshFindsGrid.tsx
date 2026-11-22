"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

interface LandingProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  regularPrice: number;
  rating: number;
  reviewsCount: number;
  tag: string;
  image: string;
}

const PRODUCTS: LandingProduct[] = [
  {
    id: "prod-1",
    name: "Wireless ANC Headphones",
    category: "Electronics",
    price: 3490,
    regularPrice: 4200,
    rating: 4.8,
    reviewsCount: 124,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-2",
    name: "Rechargeable Desk Lamp",
    category: "Home & living",
    price: 1850,
    regularPrice: 2200,
    rating: 4.8,
    reviewsCount: 124,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-3",
    name: "24-in-1 Precision Tool Kit",
    category: "Tools & DIY",
    price: 1290,
    regularPrice: 1650,
    rating: 4.8,
    reviewsCount: 124,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-4",
    name: "Portable Juice Blender",
    category: "Kitchen",
    price: 2190,
    regularPrice: 2690,
    rating: 4.8,
    reviewsCount: 124,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80",
  },
];

export function FreshFindsGrid() {
  const { addToCart, openCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (p: LandingProduct) => {
    // Map to mock product format
    const mockMatch = MOCK_PRODUCTS.find((mp) => mp.id === p.id) || {
      id: p.id,
      slug: p.name.toLowerCase().replace(/\s+/g, "-"),
      title: p.name,
      category: p.category,
      subCategory: p.category,
      tags: [p.tag],
      price: p.price,
      regularPrice: p.regularPrice,
      costOfGoods: p.price * 0.6,
      stock: 35,
      status: "IN_STOCK" as const,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
      images: [p.image],
      description: "Direct import high-quality product.",
      highlights: ["Quality checked", "Ready stock"],
      specs: [],
      variants: [],
    };

    addToCart(mockMatch);
    setAddedId(p.id);
    setTimeout(() => {
      setAddedId(null);
      openCart();
    }, 600);
  };

  return (
    <section id="new-arrivals" className="w-full py-14 sm:py-16 bg-[#FBFBFC] border-y border-neutral-200/70 font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              New season imports
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 mt-1">
              Fresh finds, just landed
            </h2>
          </div>

          <Link
            href="#categories"
            className="text-xs sm:text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            View all 48 new arrivals →
          </Link>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded">
                    {product.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-neutral-500">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-sm text-neutral-950 mt-1 line-clamp-1 group-hover:text-neutral-700 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-neutral-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-neutral-900">{product.rating}</span>
                      <span className="text-neutral-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Price & Quick Add Button */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono font-bold text-base text-neutral-950">
                          ৳{product.price.toLocaleString()}
                        </span>
                        <span className="font-mono text-xs text-neutral-400 line-through">
                          ৳{product.regularPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[#111111] hover:bg-neutral-800 text-white shadow-2xs"
                      }`}
                      title="Add to cart"
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
