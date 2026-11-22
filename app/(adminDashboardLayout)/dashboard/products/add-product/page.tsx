'use client';

import { useState, useRef } from 'react';
import {
  ArrowDown,
  Check,
  Eye,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';

interface ProductVariant {
  id: string;
  colour: string;
  sku: string;
  price: number;
  stock: number;
}

interface CustomAttribute {
  id: string;
  label: string;
  value: string;
}

const INITIAL_MEDIA = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&q=80',
];

const INITIAL_VARIANTS: ProductVariant[] = [
  {
    id: 'v-1',
    colour: 'Sage green',
    sku: 'NX-ANC01-SG',
    price: 3490,
    stock: 18,
  },
  {
    id: 'v-2',
    colour: 'Graphite',
    sku: 'NX-ANC01-GR',
    price: 3490,
    stock: 12,
  },
  {
    id: 'v-3',
    colour: 'Cream',
    sku: 'NX-ANC01-CR',
    price: 3490,
    stock: 8,
  },
];

const CATEGORIES = [
  'Electronics → Audio',
  'Electronics → Video',
  'Electronics → Accessories',
  'Home → Lighting',
  'Kitchen → Appliances',
  'Tools → Precision',
];

const TEMPLATES = ['Audio', 'Electronics', 'Home & Living', 'General'];

const PUBLISH_TIMES = [
  'Immediately after publishing',
  'Schedule for later',
  'Save to queue',
];

function formatBDT(amount: number) {
  return `৳${Number(amount || 0).toLocaleString('en-US')}`;
}

export default function AddNewProductPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Header & Save state
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Basic Information
  const [title, setTitle] = useState('Wireless ANC Headphones');
  const [description, setDescription] = useState(
    'Rich sound, without the distractions. Active noise cancellation,\n40-hour playback and a lightweight, foldable design.'
  );

  // Media
  const [mediaList, setMediaList] = useState<string[]>(INITIAL_MEDIA);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  // Pricing & Inventory
  const [regularPrice, setRegularPrice] = useState('4,200');
  const [offerPrice, setOfferPrice] = useState('3,490');
  const [costPrice, setCostPrice] = useState('2,150');
  const [sku, setSku] = useState('NX-ANC01');
  const [stockQuantity, setStockQuantity] = useState('38');

  // Pre-Order & Wholesale (SRS Section 2.2)
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [estimatedArrival, setEstimatedArrival] = useState('15 Dec 2025');
  const [enableWholesale, setEnableWholesale] = useState(false);
  const [wholesaleMinQty, setWholesaleMinQty] = useState('5');
  const [wholesalePrice, setWholesalePrice] = useState('2,950');

  // Variants
  const [variants, setVariants] = useState<ProductVariant[]>(INITIAL_VARIANTS);
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);

  // Organization
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(['New arrival', 'Trending']);
  const [newTagInput, setNewTagInput] = useState('');
  const [statusText] = useState('Status: Active · Available online');

  // Specifications
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  const [connectivity, setConnectivity] = useState('Bluetooth 5.3');
  const [batteryCapacity, setBatteryCapacity] = useState('500 mAh');
  const [customAttributes, setCustomAttributes] = useState<CustomAttribute[]>([]);

  // Share to Social Media
  const [shareFacebook, setShareFacebook] = useState(true);
  const [shareInstagram, setShareInstagram] = useState(true);
  const [shareTiktok, setShareTiktok] = useState(false);
  const [publishingTime, setPublishingTime] = useState(PUBLISH_TIMES[0]);
  const [publishDropdownOpen, setPublishDropdownOpen] = useState(false);

  const triggerNotice = (msg: string) => {
    setSaveNotice(msg);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setMediaList((prev) => [...prev, ...urls]);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleAddTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(newTagInput.trim())) {
        setTags((prev) => [...prev, newTagInput.trim()]);
      }
      setNewTagInput('');
    }
  };

  const handleAddVariant = () => {
    const nextIndex = variants.length + 1;
    const numericPrice = Number(offerPrice.replace(/,/g, '')) || 3490;
    const newVar: ProductVariant = {
      id: `v-${Date.now()}`,
      colour: `Option ${nextIndex}`,
      sku: `${sku || 'NX-PRD'}-V${nextIndex}`,
      price: numericPrice,
      stock: 10,
    };
    setVariants((prev) => [...prev, newVar]);
    setEditingVariantId(newVar.id);
  };

  const handleVariantChange = (
    id: string,
    field: keyof ProductVariant,
    value: string | number
  ) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleDeleteVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const handleAddCustomAttribute = () => {
    setCustomAttributes((prev) => [
      ...prev,
      {
        id: `attr-${Date.now()}`,
        label: `Attribute ${prev.length + 1}`,
        value: '',
      },
    ]);
  };

  const handleCustomAttributeChange = (
    id: string,
    field: 'label' | 'value',
    val: string
  ) => {
    setCustomAttributes((prev) =>
      prev.map((attr) => (attr.id === id ? { ...attr, [field]: val } : attr))
    );
  };

  return (
    <main className="min-h-screen  px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full space-y-5">
        {/* 1. TOP HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
              Add new product
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Create once. Keep every detail in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {saveNotice && (
              <span className="rounded-md bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-800">
                {saveNotice}
              </span>
            )}
            <button
              type="button"
              onClick={() => triggerNotice('Draft saved locally.')}
              className="inline-flex items-center justify-center rounded-md bg-neutral-100/95 px-4 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={() => triggerNotice('Product published!')}
              className="inline-flex items-center justify-center rounded-md bg-[#111111] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Publish product
            </button>
          </div>
        </header>

        {/* 2. MAIN TWO-COLUMN FORM LAYOUT */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* LEFT COLUMN (~66% / 8 cols) */}
          <div className="space-y-5 lg:col-span-8">
            {/* Basic Information Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Basic information
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="product-title"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    Product title
                  </label>
                  <input
                    id="product-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-700 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-description"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="product-description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 w-full resize-none rounded-md bg-neutral-100/80 p-4 text-xs leading-relaxed text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  />
                </div>
              </div>
            </section>

            {/* Images & Product Video Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Images &amp; product video
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                {mediaList.map((src, idx) => (
                  <div
                    key={`${src}-${idx}`}
                    className="group relative h-28 w-28 overflow-hidden rounded-md border border-neutral-200/80 bg-neutral-100 sm:h-32 sm:w-32"
                  >
                    <img
                      src={src}
                      alt={`${title} preview ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setMediaList((prev) => prev.filter((_, i) => i !== idx))
                      }
                      aria-label={`Remove image ${idx + 1}`}
                      className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-neutral-700 opacity-0 shadow-sm transition-opacity hover:text-neutral-950 group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
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
                  className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-100/95 px-6 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80 cursor-pointer"
                >
                  + Upload Images
                </button>
              </div>

              {/* Demo Video Link (SRS Section 2.2) */}
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <label htmlFor="video-url" className="block text-xs font-semibold text-neutral-900">
                  Product Demo Video Link (YouTube, Vimeo, or TikTok Shorts)
                </label>
                <input
                  id="video-url"
                  type="url"
                  placeholder="e.g. https://youtube.com/shorts/... or https://tiktok.com/@..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="mt-2 h-10 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-700 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
                <p className="mt-1 text-[11px] text-neutral-400">
                  Embedded directly on the customer product detail page and shared to social media channels.
                </p>
              </div>
            </section>

            {/* Pricing & Inventory Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Pricing &amp; inventory
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="regular-price"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    Regular price (৳)
                  </label>
                  <input
                    id="regular-price"
                    type="text"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="offer-price"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    Offer price (৳)
                  </label>
                  <input
                    id="offer-price"
                    type="text"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cost-price"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    Cost price · internal (৳)
                  </label>
                  <input
                    id="cost-price"
                    type="text"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="product-sku"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    SKU
                  </label>
                  <input
                    id="product-sku"
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="stock-qty"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    Stock quantity
                  </label>
                  <input
                    id="stock-qty"
                    type="text"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  />
                </div>
              </div>

              {/* Profit Margin Indicator */}
              <div className="mt-4 p-3 bg-zinc-50 rounded-lg border border-zinc-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-500 font-medium">Internal Gross Margin: </span>
                  <span className="font-bold text-zinc-900">
                    ৳{((Number(offerPrice.replace(/,/g, '')) || 0) - (Number(costPrice.replace(/,/g, '')) || 0)).toLocaleString()} per unit
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px]">
                  {offerPrice && costPrice ? `${(((Number(offerPrice.replace(/,/g, '')) - Number(costPrice.replace(/,/g, ''))) / Number(offerPrice.replace(/,/g, ''))) * 100).toFixed(1)}% Margin` : '0%'}
                </span>
              </div>

              {/* Pre-Order / Incoming Shipment Box (SRS Section 2.2) */}
              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPreOrder}
                    onChange={(e) => setIsPreOrder(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <span className="text-xs font-semibold text-neutral-900">
                    Enable Incoming Shipment / Pre-Order (goods in transit from China)
                  </span>
                </label>

                {isPreOrder && (
                  <div className="pl-6 pt-1">
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Estimated Delivery / Arrival Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 15 Dec 2025"
                      value={estimatedArrival}
                      onChange={(e) => setEstimatedArrival(e.target.value)}
                      className="h-9 w-full max-w-xs rounded-md bg-neutral-100/80 px-3 text-xs text-neutral-800 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Wholesale / Bulk Pricing Tier (SRS Section 2.2) */}
              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableWholesale}
                    onChange={(e) => setEnableWholesale(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <span className="text-xs font-semibold text-neutral-900">
                    Enable Wholesale / Bulk Pricing Tier
                  </span>
                </label>

                {enableWholesale && (
                  <div className="pl-6 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                        Minimum Quantity (units)
                      </label>
                      <input
                        type="number"
                        value={wholesaleMinQty}
                        onChange={(e) => setWholesaleMinQty(e.target.value)}
                        className="h-9 w-full rounded-md bg-neutral-100/80 px-3 text-xs text-neutral-800 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                        Wholesale Unit Price (৳)
                      </label>
                      <input
                        type="text"
                        value={wholesalePrice}
                        onChange={(e) => setWholesalePrice(e.target.value)}
                        className="h-9 w-full rounded-md bg-neutral-100/80 px-3 text-xs text-neutral-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Variants Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Variants
              </h2>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-neutral-200/80 text-xs font-normal text-neutral-500">
                      <th className="py-3 pr-3 font-normal">Colour</th>
                      <th className="px-3 py-3 font-normal">SKU</th>
                      <th className="px-3 py-3 font-normal">Price</th>
                      <th className="px-3 py-3 font-normal">Stock</th>
                      <th className="py-3 pl-3 font-normal">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-200/70 text-xs">
                    {variants.map((variant) => {
                      const isEditing = editingVariantId === variant.id;
                      return (
                        <tr key={variant.id} className="bg-neutral-50/40">
                          <td className="whitespace-nowrap py-3.5 pr-3 font-medium text-neutral-800">
                            {isEditing ? (
                              <input
                                type="text"
                                value={variant.colour}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variant.id,
                                    'colour',
                                    e.target.value
                                  )
                                }
                                className="h-8 w-28 rounded border border-neutral-300 bg-white px-2 text-xs"
                              />
                            ) : (
                              variant.colour
                            )}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3.5 text-neutral-600">
                            {isEditing ? (
                              <input
                                type="text"
                                value={variant.sku}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variant.id,
                                    'sku',
                                    e.target.value
                                  )
                                }
                                className="h-8 w-32 rounded border border-neutral-300 bg-white px-2 text-xs"
                              />
                            ) : (
                              variant.sku
                            )}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3.5 text-neutral-700">
                            {isEditing ? (
                              <input
                                type="number"
                                value={variant.price}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variant.id,
                                    'price',
                                    Number(e.target.value)
                                  )
                                }
                                className="h-8 w-24 rounded border border-neutral-300 bg-white px-2 text-xs"
                              />
                            ) : (
                              formatBDT(variant.price)
                            )}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3.5 text-neutral-700">
                            {isEditing ? (
                              <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variant.id,
                                    'stock',
                                    Number(e.target.value)
                                  )
                                }
                                className="h-8 w-20 rounded border border-neutral-300 bg-white px-2 text-xs"
                              />
                            ) : (
                              variant.stock
                            )}
                          </td>

                          <td className="whitespace-nowrap py-3.5 pl-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                aria-label={`Preview ${variant.colour}`}
                                className="inline-flex h-7 w-7 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                              >
                                <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setEditingVariantId(
                                    isEditing ? null : variant.id
                                  )
                                }
                                aria-label={`Edit ${variant.colour}`}
                                className="inline-flex h-7 w-7 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                              >
                                <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteVariant(variant.id)}
                                aria-label={`Delete ${variant.colour}`}
                                className="inline-flex h-7 w-7 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                              >
                                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={handleAddVariant}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-neutral-100/95 px-5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
              >
                + Add option / variant
              </button>
            </section>
          </div>

          {/* RIGHT COLUMN (~34% / 4 cols) */}
          <div className="space-y-5 lg:col-span-4">
            {/* Organization Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Organization
              </h2>

              <div className="mt-5 space-y-4">
                {/* Category */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-neutral-900">
                    Category
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setCategoryDropdownOpen((prev) => !prev)
                    }
                    className="mt-2 flex h-11 w-full items-center justify-between rounded-md bg-neutral-100/80 px-4 text-left text-xs text-neutral-600 transition-colors hover:bg-neutral-100"
                  >
                    <span>{category}</span>
                  </button>

                  {categoryDropdownOpen && (
                    <div className="absolute left-0 z-20 mt-1.5 w-full rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setCategory(cat);
                            setCategoryDropdownOpen(false);
                          }}
                          className="block w-full px-3.5 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-50"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label
                    htmlFor="product-tags"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    Tags
                  </label>
                  <div className="mt-2 flex min-h-11 flex-wrap items-center gap-2 rounded-md bg-neutral-100/80 px-3.5 py-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-600"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          aria-label={`Remove ${tag} tag`}
                          className="text-neutral-500 hover:text-neutral-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      id="product-tags"
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={handleAddTagKeyDown}
                      placeholder={tags.length === 0 ? 'Add tag...' : ''}
                      className="min-w-[60px] flex-1 bg-transparent text-xs text-neutral-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Status Line */}
                <p className="pt-1 text-xs font-medium text-neutral-900">
                  {statusText}
                </p>
              </div>
            </section>

            {/* Specifications Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Specifications
              </h2>

              <div className="mt-4">
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={() =>
                      setTemplateDropdownOpen((prev) => !prev)
                    }
                    className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900"
                  >
                    <span>Template: {template}</span>
                    <ArrowDown className="h-3.5 w-3.5 text-neutral-700" strokeWidth={2} />
                  </button>

                  {templateDropdownOpen && (
                    <div className="absolute left-0 z-20 mt-1.5 w-40 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                      {TEMPLATES.map((tpl) => (
                        <button
                          key={tpl}
                          type="button"
                          onClick={() => {
                            setTemplate(tpl);
                            setTemplateDropdownOpen(false);
                          }}
                          className="block w-full px-3.5 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-50"
                        >
                          {tpl}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="spec-connectivity"
                      className="block text-xs font-semibold text-neutral-900"
                    >
                      Connectivity
                    </label>
                    <input
                      id="spec-connectivity"
                      type="text"
                      value={connectivity}
                      onChange={(e) => setConnectivity(e.target.value)}
                      className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="spec-battery"
                      className="block text-xs font-semibold text-neutral-900"
                    >
                      Battery capacity
                    </label>
                    <input
                      id="spec-battery"
                      type="text"
                      value={batteryCapacity}
                      onChange={(e) => setBatteryCapacity(e.target.value)}
                      className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                    />
                  </div>

                  {customAttributes.map((attr) => (
                    <div
                      key={attr.id}
                      className="grid grid-cols-2 gap-2 rounded-md border border-neutral-200/80 p-2.5"
                    >
                      <input
                        type="text"
                        value={attr.label}
                        onChange={(e) =>
                          handleCustomAttributeChange(
                            attr.id,
                            'label',
                            e.target.value
                          )
                        }
                        placeholder="Attribute"
                        className="h-9 rounded bg-neutral-100/80 px-2.5 text-xs text-neutral-800 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) =>
                          handleCustomAttributeChange(
                            attr.id,
                            'value',
                            e.target.value
                          )
                        }
                        placeholder="Value"
                        className="h-9 rounded bg-neutral-100/80 px-2.5 text-xs text-neutral-800 focus:outline-none"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddCustomAttribute}
                    className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-neutral-100/95 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Custom attribute</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Share to Social Media Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <span className="inline-block rounded bg-neutral-100/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-neutral-700">
                PHASE 2
              </span>

              <h2 className="mt-3 text-base font-bold text-neutral-950 sm:text-[17px]">
                Share to social media
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                Save the product independently. Social posts run in the background queue.
              </p>

              <div className="mt-5 space-y-3.5">
                {[
                  {
                    id: 'fb',
                    label: 'Facebook Page',
                    checked: shareFacebook,
                    toggle: () => setShareFacebook((p) => !p),
                  },
                  {
                    id: 'ig',
                    label: 'Instagram Business',
                    checked: shareInstagram,
                    toggle: () => setShareInstagram((p) => !p),
                  },
                  {
                    id: 'tt',
                    label: 'TikTok',
                    checked: shareTiktok,
                    toggle: () => setShareTiktok((p) => !p),
                  },
                ].map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={channel.toggle}
                    className="flex w-full items-center gap-3 text-left text-xs font-medium text-neutral-900"
                  >
                    <span
                      className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] transition-colors ${
                        channel.checked
                          ? 'bg-[#595959] text-white'
                          : 'border border-neutral-300 bg-white'
                      }`}
                    >
                      {channel.checked && <Check className="h-3 w-3" strokeWidth={2.5} />}
                    </span>
                    <span>{channel.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative mt-5">
                <label className="block text-xs font-semibold text-neutral-900">
                  Publishing time
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setPublishDropdownOpen((prev) => !prev)
                  }
                  className="mt-2 flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-600 transition-colors hover:bg-neutral-100"
                >
                  <span className="truncate">{publishingTime}</span>
                  <ArrowDown className="h-3.5 w-3.5 shrink-0 text-neutral-700" strokeWidth={2} />
                </button>

                {publishDropdownOpen && (
                  <div className="absolute bottom-full left-0 z-20 mb-1.5 w-full rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                    {PUBLISH_TIMES.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setPublishingTime(time);
                          setPublishDropdownOpen(false);
                        }}
                        className="block w-full px-3.5 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-50"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}