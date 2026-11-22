"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Share2,
  ExternalLink,
  ShieldCheck,
  Video,
  Layers,
  Tag,
  DollarSign,
  Package,
  Calendar,
} from "lucide-react";

interface ViewProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ViewProductPage({ params }: ViewProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // Mock product data for inspection
  const product = {
    id: productId,
    name: "Wireless ANC Active Noise Cancelling Headphones",
    slug: "wireless-anc-headphones",
    sku: "NX-ANC01",
    category: "Electronics → Audio",
    tags: ["New arrival", "Trending", "China Direct"],
    regularPrice: 4200,
    offerPrice: 3490,
    costPrice: 2150,
    stock: 38,
    status: "Active",
    estimatedArrival: "In Stock (Dhaka Hub)",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    wholesaleTier: { minQty: 5, price: 2950 },
    description:
      "Rich sound, without the distractions. Active noise cancellation with up to 35dB depth, 40-hour battery playback, fast USB Type-C charging, and a lightweight foldable design sourced directly from verified Shenzhen factories.",
    highlights: [
      "Hybrid Active Noise Cancelling (ANC)",
      "40-Hour ultra-long playback with 500mAh battery",
      "Soft protein memory foam earcups",
      "Foldable compact travel design",
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&q=80",
    ],
    variants: [
      { id: "v-1", name: "Sage Green", sku: "NX-ANC01-SG", price: 3490, stock: 18 },
      { id: "v-2", name: "Graphite Black", sku: "NX-ANC01-GR", price: 3490, stock: 12 },
      { id: "v-3", name: "Cream White", sku: "NX-ANC01-CR", price: 3490, stock: 8 },
    ],
    specs: [
      { key: "Bluetooth Version", value: "v5.3 + EDR" },
      { key: "Noise Reduction Depth", value: "Up to -35 dB" },
      { key: "Battery Capacity", value: "500 mAh" },
      { key: "Charging Interface", value: "USB Type-C (5V/1A)" },
      { key: "Driver Unit", value: "40mm Dynamic Neodymium" },
      { key: "Origin / Sourcing", value: "Shenzhen, China (Guaranteed A-Grade)" },
    ],
    socialPosts: [
      { platform: "Facebook Page", status: "Published", time: "Today, 10:30 AM" },
      { platform: "Instagram Business", status: "Published", time: "Today, 10:30 AM" },
      { platform: "TikTok", status: "Queued", time: "Scheduled for Tomorrow" },
    ],
  };

  const marginAmount = product.offerPrice - product.costPrice;
  const marginPercentage = ((marginAmount / product.offerPrice) * 100).toFixed(1);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16 font-sans text-zinc-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div className="space-y-1">
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
              {product.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {product.status}
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-mono">
            SKU: {product.sku} · Category: {product.category}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/products/edit-product/${product.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Product</span>
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Media, Specs, Variants */}
        <div className="lg:col-span-8 space-y-6">
          {/* Media Gallery */}
          <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-zinc-950">Product Gallery &amp; Media</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden border border-zinc-200 aspect-square bg-zinc-100"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Video Demo Badge */}
            {product.videoUrl && (
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-700">
                  <Video className="w-4 h-4 text-zinc-600" />
                  <span className="font-medium">Product Demo Video Linked</span>
                </div>
                <a
                  href={product.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-black font-semibold hover:underline"
                >
                  <span>Watch Video</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Description & Bullet Highlights */}
          <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-zinc-950">Description &amp; Highlights</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">{product.description}</p>

            <div className="pt-3 border-t border-zinc-100">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Key Bullet Points
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-700 list-disc pl-5">
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dynamic Specifications Table (SRS Section 2.1 JSONB) */}
          <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-zinc-950">
              Dynamic Specifications (JSONB)
            </h2>
            <div className="divide-y divide-zinc-100 text-xs">
              {product.specs.map((s, i) => (
                <div key={i} className="py-2.5 flex justify-between items-center">
                  <span className="font-semibold text-zinc-700">{s.key}</span>
                  <span className="text-zinc-900 font-mono">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Variants Table (SRS Section 2.1) */}
          <div className="bg-white rounded-xl border border-zinc-200/90 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-zinc-100">
              <h2 className="text-base font-bold text-zinc-950">SKU Variants &amp; Inventory</h2>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium bg-zinc-50/50">
                  <th className="py-3 px-6 font-normal">Variant / Colour</th>
                  <th className="py-3 px-6 font-normal">SKU Code</th>
                  <th className="py-3 px-6 font-normal">Retail Price</th>
                  <th className="py-3 px-6 font-normal text-right">Available Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {product.variants.map((v) => (
                  <tr key={v.id} className="hover:bg-zinc-50/60">
                    <td className="py-3.5 px-6 text-zinc-900 font-semibold">{v.name}</td>
                    <td className="py-3.5 px-6 font-mono text-zinc-600">{v.sku}</td>
                    <td className="py-3.5 px-6 font-mono text-zinc-900">৳{v.price.toLocaleString()}</td>
                    <td className="py-3.5 px-6 font-mono text-right text-zinc-900 font-bold">
                      {v.stock} units
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols): Pricing & Financials, Pre-Order, Social */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pricing & China Import Margin */}
          <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-zinc-950 tracking-tight flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-zinc-600" />
              <span>Pricing &amp; China Import Margins</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Regular Price:</span>
                <span className="line-through">৳{product.regularPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-900 font-bold text-sm">
                <span>Offer Price:</span>
                <span>৳{product.offerPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-500 pt-2 border-t border-zinc-100">
                <span>Internal Sourcing Cost:</span>
                <span className="font-mono text-zinc-700">৳{product.costPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex justify-between items-center text-xs">
              <div>
                <span className="text-emerald-800 font-medium block">Gross Profit:</span>
                <span className="text-emerald-950 font-bold text-sm font-mono">
                  +৳{marginAmount.toLocaleString()} / unit
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-200 text-emerald-900 font-mono font-bold text-xs">
                {marginPercentage}% Margin
              </span>
            </div>

            {/* Wholesale Tier */}
            {product.wholesaleTier && (
              <div className="pt-3 border-t border-zinc-100 text-xs space-y-1">
                <span className="text-zinc-500 font-semibold block">Wholesale / Bulk Slab:</span>
                <p className="text-zinc-800">
                  Buy <strong>{product.wholesaleTier.minQty}+ units</strong> at <strong>৳{product.wholesaleTier.price.toLocaleString()}</strong> each
                </p>
              </div>
            )}
          </div>

          {/* Inventory & Pre-Order Status */}
          <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold text-zinc-950 tracking-tight flex items-center gap-2">
              <Package className="w-4 h-4 text-zinc-600" />
              <span>Inventory &amp; Transit Status</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Total Available Stock:</span>
                <span className="font-bold text-zinc-950">{product.stock} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Transit / Pre-order:</span>
                <span className="font-mono text-emerald-700 font-semibold">{product.estimatedArrival}</span>
              </div>
            </div>
          </div>

          {/* Social Publishing Summary */}
          <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold text-zinc-950 tracking-tight flex items-center gap-2">
              <Share2 className="w-4 h-4 text-zinc-600" />
              <span>Single-Point Social Publishing</span>
            </h2>

            <div className="divide-y divide-zinc-100 text-xs">
              {product.socialPosts.map((sp, i) => (
                <div key={i} className="py-2.5 flex justify-between items-center">
                  <span className="font-medium text-zinc-800">{sp.platform}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      sp.status === "Published" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {sp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
