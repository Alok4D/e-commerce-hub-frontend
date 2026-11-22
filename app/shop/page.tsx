"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Check, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { AnnouncementBar } from "../(landing)/_components/AnnouncementBar";
import { StoreHeader } from "../(landing)/_components/StoreHeader";
import { CategoryNav } from "../(landing)/_components/CategoryNav";
import { StoreFooter } from "../(landing)/_components/StoreFooter";
import { CartDrawer } from "../(landing)/_components/CartDrawer";
import { useCart } from "@/lib/cart-context";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  category: "Electronics & gadgets" | "Home & living" | "Tools & DIY" | "Kitchen appliances";
  price: number;
  regularPrice: number;
  rating: number;
  reviewsCount: number;
  tag?: string;
  inStock: boolean;
  image: string;
}

const ALL_PRODUCTS: ShopProduct[] = [
  {
    id: "prod-1",
    slug: "wireless-anc-headphones",
    name: "Wireless ANC Headphones",
    category: "Electronics & gadgets",
    price: 3490,
    regularPrice: 4200,
    rating: 4.8,
    reviewsCount: 124,
    tag: "New arrival",
    inStock: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-2",
    slug: "rechargeable-desk-lamp",
    name: "Rechargeable Desk Lamp",
    category: "Home & living",
    price: 1850,
    regularPrice: 2200,
    rating: 4.8,
    reviewsCount: 124,
    tag: "New arrival",
    inStock: true,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-3",
    slug: "24-in-1-precision-tool-kit",
    name: "24-in-1 Precision Tool Kit",
    category: "Tools & DIY",
    price: 1290,
    regularPrice: 1650,
    rating: 4.8,
    reviewsCount: 124,
    tag: "Trending",
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-4",
    slug: "portable-juice-blender",
    name: "Portable Juice Blender",
    category: "Kitchen appliances",
    price: 2190,
    regularPrice: 2690,
    rating: 4.8,
    reviewsCount: 124,
    tag: "New arrival",
    inStock: true,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-5",
    slug: "smart-aroma-diffuser",
    name: "Smart Ultrasonic Aroma Diffuser",
    category: "Home & living",
    price: 1950,
    regularPrice: 2400,
    rating: 4.7,
    reviewsCount: 88,
    tag: "Gift idea",
    inStock: true,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-6",
    slug: "brushless-impact-drill",
    name: "Pro-Grade 21V Cordless Impact Drill",
    category: "Tools & DIY",
    price: 4850,
    regularPrice: 5600,
    rating: 4.9,
    reviewsCount: 62,
    tag: "Trending",
    inStock: true,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
  },
];

export default function ShopPage() {
  const { addToCart, openCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"recommended" | "price-low" | "price-high">("recommended");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedTag !== "All" && p.tag !== selectedTag) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, selectedTag, inStockOnly, sortBy]);

  const handleAdd = (p: ShopProduct) => {
    const mock = MOCK_PRODUCTS.find((m) => m.id === p.id) || {
      id: p.id,
      slug: p.slug,
      title: p.name,
      category: p.category,
      subCategory: p.category,
      tags: p.tag ? [p.tag] : [],
      price: p.price,
      regularPrice: p.regularPrice,
      costOfGoods: p.price * 0.6,
      stock: 25,
      status: "IN_STOCK" as const,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
      images: [p.image],
      description: "Carefully sourced everyday upgrade.",
      highlights: [],
      specs: [],
      variants: [],
    };
    addToCart(mock);
    setAddedId(p.id);
    setTimeout(() => {
      setAddedId(null);
      openCart();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-neutral-900">
      <AnnouncementBar />
      <StoreHeader />
      <CategoryNav />

      {/* Breadcrumb & Header matching Figma */}
      <div className="bg-[#FBFBFC] border-b border-neutral-200/80 py-8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="text-xs text-neutral-500">
            <Link href="/" className="hover:text-black">Home</Link> / <span>Shop all</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Good finds, all in one place.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
            Explore useful things for every corner of your day.
          </p>
        </div>
      </div>

      {/* Main Shop Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filters Sidebar matching Figma */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-neutral-200/90 p-5 space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="font-bold text-sm text-neutral-950 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedTag("All");
                    setInStockOnly(false);
                  }}
                  className="text-xs font-semibold text-neutral-500 hover:text-black cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-2.5 text-xs">
                <span className="font-bold text-neutral-950 block">Category</span>
                {[
                  "All",
                  "Electronics & gadgets",
                  "Home & living",
                  "Tools & DIY",
                  "Kitchen appliances",
                ].map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 text-neutral-700 cursor-pointer hover:text-black">
                    <input
                      type="radio"
                      name="cat"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-neutral-900 cursor-pointer"
                    />
                    <span>{cat === "All" ? "All products" : cat}</span>
                  </label>
                ))}
              </div>

              {/* Availability Filter */}
              <div className="space-y-2.5 text-xs pt-4 border-t border-neutral-100">
                <span className="font-bold text-neutral-950 block">Availability</span>
                <label className="flex items-center gap-2.5 text-neutral-700 cursor-pointer hover:text-black">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-neutral-900 rounded cursor-pointer"
                  />
                  <span>In stock only</span>
                </label>
              </div>

              {/* Tags Filter */}
              <div className="space-y-2.5 text-xs pt-4 border-t border-neutral-100">
                <span className="font-bold text-neutral-950 block">Special tags</span>
                {["All", "New arrival", "Trending", "Gift idea"].map((tg) => (
                  <label key={tg} className="flex items-center gap-2.5 text-neutral-700 cursor-pointer hover:text-black">
                    <input
                      type="radio"
                      name="tag"
                      checked={selectedTag === tg}
                      onChange={() => setSelectedTag(tg)}
                      className="accent-neutral-900 cursor-pointer"
                    />
                    <span>{tg}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Bar: Count & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-neutral-200">
              <span className="text-xs font-semibold text-neutral-600">
                Showing {filteredProducts.length} products
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-8 px-2.5 bg-neutral-100 border-none rounded-md font-semibold text-neutral-900 focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => {
                const isAdded = addedId === p.id;
                return (
                  <div
                    key={p.id}
                    className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <Link href={`/products/${p.slug}`} className="block relative aspect-square w-full bg-neutral-100 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {p.tag && (
                        <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded">
                          {p.tag}
                        </div>
                      )}
                    </Link>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-medium text-neutral-500">{p.category}</span>
                        <Link href={`/products/${p.slug}`} className="block">
                          <h3 className="font-bold text-sm text-neutral-950 mt-1 line-clamp-1 group-hover:text-neutral-700 transition-colors">
                            {p.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-neutral-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-neutral-900">{p.rating}</span>
                          <span className="text-neutral-400">({p.reviewsCount})</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono font-bold text-base text-neutral-950">
                            ৳{p.price.toLocaleString()}
                          </span>
                          <span className="font-mono text-xs text-neutral-400 line-through">
                            ৳{p.regularPrice.toLocaleString()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAdd(p)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-[#111111] hover:bg-neutral-800 text-white shadow-2xs"
                          }`}
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
