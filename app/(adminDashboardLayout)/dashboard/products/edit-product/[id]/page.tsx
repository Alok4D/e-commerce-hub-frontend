"use client";

import React, { use, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  X,
  Share2,
  Sliders,
  DollarSign,
  Package,
} from "lucide-react";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State
  const [title, setTitle] = useState("Wireless ANC Active Noise Cancelling Headphones");
  const [description, setDescription] = useState(
    "Rich sound, without the distractions. Active noise cancellation with up to 35dB depth, 40-hour playback, and lightweight foldable design."
  );
  const [mediaList, setMediaList] = useState<string[]>([
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
  ]);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

  // Pricing & Margins
  const [regularPrice, setRegularPrice] = useState("4,200");
  const [offerPrice, setOfferPrice] = useState("3,490");
  const [costPrice, setCostPrice] = useState("2,150");
  const [sku, setSku] = useState("NX-ANC01");
  const [stockQuantity, setStockQuantity] = useState("38");

  // Pre-Order & Wholesale
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [estimatedArrival, setEstimatedArrival] = useState("15 Dec 2025");
  const [enableWholesale, setEnableWholesale] = useState(true);
  const [wholesaleMinQty, setWholesaleMinQty] = useState("5");
  const [wholesalePrice, setWholesalePrice] = useState("2,950");

  // Variants
  const [variants, setVariants] = useState([
    { id: "v-1", colour: "Sage Green", sku: "NX-ANC01-SG", price: 3490, stock: 18 },
    { id: "v-2", colour: "Graphite Black", sku: "NX-ANC01-GR", price: 3490, stock: 12 },
    { id: "v-3", colour: "Cream White", sku: "NX-ANC01-CR", price: 3490, stock: 8 },
  ]);

  // Dynamic Specs
  const [specs, setSpecs] = useState([
    { key: "Bluetooth Version", value: "v5.3 + EDR" },
    { key: "Noise Reduction", value: "Up to -35 dB" },
    { key: "Battery Capacity", value: "500 mAh" },
    { key: "Charging Port", value: "USB Type-C" },
  ]);
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecVal, setNewSpecVal] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setMediaList((prev) => [...prev, ...urls]);
  };

  const handleAddSpec = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setSpecs([...specs, { key: newSpecKey.trim(), value: newSpecVal.trim() }]);
    setNewSpecKey("");
    setNewSpecVal("");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Product changes saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16 font-sans text-zinc-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950 mt-1">
            Edit Product · {sku}
          </h1>
          <p className="text-xs text-zinc-500">
            Update pricing, specifications, variants, and stock for ID #{productId}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {toastMessage && (
            <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-zinc-950">Basic Information</h2>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Product Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 px-3.5 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-zinc-700 font-medium mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Media & Video */}
        <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-zinc-950">Media &amp; Demo Video</h2>
          <div className="flex flex-wrap gap-4 items-center">
            {mediaList.map((src, idx) => (
              <div
                key={idx}
                className="group relative h-28 w-28 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100"
              >
                <img src={src} alt="Preview" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setMediaList(mediaList.filter((_, i) => i !== idx))}
                  className="absolute right-1.5 top-1.5 bg-white/90 p-1 rounded-full text-zinc-700 hover:text-rose-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleUploadFiles}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-28 w-28 border-2 border-dashed border-zinc-200 rounded-lg flex flex-col items-center justify-center text-zinc-500 hover:border-black hover:text-black transition-colors cursor-pointer text-xs"
            >
              <Plus className="w-5 h-5 mb-1" />
              <span>Add Media</span>
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-100 text-xs">
            <label className="block text-zinc-700 font-medium mb-1">
              Embedded Demo Video Link (YouTube or TikTok Shorts)
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full h-9 px-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black font-mono"
            />
          </div>
        </div>

        {/* Pricing, Margins, Pre-Order & Wholesale */}
        <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-zinc-950">Pricing &amp; Inventory</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Regular Price (৳)</label>
              <input
                type="text"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Offer Price (৳)</label>
              <input
                type="text"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Internal Cost Price (৳)</label>
              <input
                type="text"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Base SKU</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Total Stock Count</label>
              <input
                type="text"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono"
              />
            </div>
          </div>

          {/* Pre-Order & Wholesale options */}
          <div className="pt-4 border-t border-zinc-100 space-y-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPreOrder}
                onChange={(e) => setIsPreOrder(e.target.checked)}
                className="w-4 h-4 rounded text-black"
              />
              <span className="font-semibold text-zinc-800">
                Mark as Pre-Order / Incoming Shipment (Transit from China)
              </span>
            </label>

            {isPreOrder && (
              <div className="pl-6">
                <label className="block text-zinc-600 mb-1">Estimated Arrival Date</label>
                <input
                  type="text"
                  value={estimatedArrival}
                  onChange={(e) => setEstimatedArrival(e.target.value)}
                  className="h-9 w-full max-w-xs px-3 border border-zinc-200 rounded-lg font-mono"
                />
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enableWholesale}
                onChange={(e) => setEnableWholesale(e.target.checked)}
                className="w-4 h-4 rounded text-black"
              />
              <span className="font-semibold text-zinc-800">Enable Wholesale / Bulk Pricing Slab</span>
            </label>

            {enableWholesale && (
              <div className="pl-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                <div>
                  <label className="block text-zinc-600 mb-1">Min Bulk Units</label>
                  <input
                    type="number"
                    value={wholesaleMinQty}
                    onChange={(e) => setWholesaleMinQty(e.target.value)}
                    className="h-9 w-full px-3 border border-zinc-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 mb-1">Wholesale Unit Price (৳)</label>
                  <input
                    type="text"
                    value={wholesalePrice}
                    onChange={(e) => setWholesalePrice(e.target.value)}
                    className="h-9 w-full px-3 border border-zinc-200 rounded-lg font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Specifications */}
        <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-zinc-950">Dynamic Specifications (JSONB)</h2>
          <div className="divide-y divide-zinc-100 text-xs">
            {specs.map((s, i) => (
              <div key={i} className="py-2.5 flex justify-between items-center">
                <span className="font-semibold text-zinc-700">{s.key}</span>
                <span className="font-mono text-zinc-900">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex gap-3 text-xs">
            <input
              type="text"
              placeholder="Key (e.g. Battery)"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              className="h-9 flex-1 px-3 border border-zinc-200 rounded-lg"
            />
            <input
              type="text"
              placeholder="Value (e.g. 500 mAh)"
              value={newSpecVal}
              onChange={(e) => setNewSpecVal(e.target.value)}
              className="h-9 flex-1 px-3 border border-zinc-200 rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddSpec}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold rounded-lg"
            >
              Add Spec
            </button>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/dashboard/products"
            className="px-5 py-2.5 border border-zinc-200 text-zinc-700 text-xs font-semibold rounded-lg hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
