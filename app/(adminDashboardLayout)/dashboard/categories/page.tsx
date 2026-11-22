"use client";

import React, { useState } from "react";
import {
  Plus,
  Layers,
  Edit2,
  Trash2,
  Tag,
  Sliders,
  CheckCircle2,
  X,
  FileCode,
} from "lucide-react";
import { MOCK_CATEGORIES } from "@/lib/mock-data";

interface AttributeTemplate {
  id: string;
  name: string;
  department: string;
  fields: { key: string; type: string; example: string }[];
}

interface CrossCuttingTag {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  color: string;
}

const INITIAL_TEMPLATES: AttributeTemplate[] = [
  {
    id: "tpl-1",
    name: "Home & Kitchen Appliances",
    department: "Kitchen / Appliances",
    fields: [
      { key: "Rated Voltage", type: "Text", example: "220V - 50Hz" },
      { key: "Power Consumption", type: "Number", example: "1200W" },
      { key: "Capacity / Volume", type: "Text", example: "5.5 Liters" },
      { key: "Warranty Duration", type: "Text", example: "1 Year Official Warranty" },
    ],
  },
  {
    id: "tpl-2",
    name: "Precision Hardware & Tools",
    department: "Tools / Hardware",
    fields: [
      { key: "Material Composition", type: "Text", example: "S2 Alloy Steel / Aluminum" },
      { key: "Kit Pieces Count", type: "Number", example: "24-in-1" },
      { key: "Dimensions (L x W x H)", type: "Text", example: "168 x 67 x 17 mm" },
      { key: "Magnetic Bits", type: "Boolean", example: "Yes" },
    ],
  },
  {
    id: "tpl-3",
    name: "Smart Audio & Gadgets",
    department: "Electronics / Audio",
    fields: [
      { key: "Bluetooth Version", type: "Text", example: "v5.3" },
      { key: "Battery Capacity", type: "Number", example: "400 mAh" },
      { key: "Active Noise Cancellation", type: "Boolean", example: "Yes (up to 35dB)" },
      { key: "Charging Port", type: "Text", example: "USB Type-C Fast Charge" },
    ],
  },
];

const INITIAL_TAGS: CrossCuttingTag[] = [
  { id: "tag-1", name: "New Arrival", slug: "new-arrival", productCount: 18, color: "bg-emerald-100 text-emerald-800" },
  { id: "tag-2", name: "Trending Now", slug: "trending", productCount: 24, color: "bg-purple-100 text-purple-800" },
  { id: "tag-3", name: "China Direct Import", slug: "china-direct", productCount: 42, color: "bg-rose-100 text-rose-800" },
  { id: "tag-4", name: "Flash Deal / Hot", slug: "flash-deal", productCount: 12, color: "bg-amber-100 text-amber-800" },
  { id: "tag-5", name: "Wholesale Favorite", slug: "wholesale", productCount: 15, color: "bg-blue-100 text-blue-800" },
];

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<"departments" | "templates" | "tags">("departments");
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [templates, setTemplates] = useState<AttributeTemplate[]>(INITIAL_TEMPLATES);
  const [tags, setTags] = useState<CrossCuttingTag[]>(INITIAL_TAGS);

  // Modal State for Add Category
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newSubcats, setNewSubcats] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const subList = newSubcats
      .split(",")
      .map((s, idx) => ({
        id: `sub-${Date.now()}-${idx}`,
        name: s.trim(),
        slug: s.trim().toLowerCase().replace(/\s+/g, "-"),
      }))
      .filter((s) => s.name);

    const newCategory = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/\s+/g, "-"),
      icon: "Layers",
      image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80",
      itemCount: 0,
      subCategories: subList.length > 0 ? subList : [{ id: "sub-1", name: "General", slug: "general" }],
    };

    setCategories([newCategory, ...categories]);
    setNewCatName("");
    setNewSubcats("");
    setIsAddCatModalOpen(false);
    showToast(`Category "${newCategory.name}" created successfully!`);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(`Category "${name}" removed.`);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16 font-sans text-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Catalog &amp; Dynamic Attributes
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Unlimited nested categories, custom attribute specification templates (JSONB), and marketing tags (SRS Section 2.1).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {toastMessage && (
            <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsAddCatModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4 border-b border-zinc-200 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("departments")}
          className={`pb-3 font-semibold transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "departments"
              ? "border-black text-black"
              : "border-transparent text-zinc-500 hover:text-black"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categories &amp; Subcategories ({categories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("templates")}
          className={`pb-3 font-semibold transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "templates"
              ? "border-black text-black"
              : "border-transparent text-zinc-500 hover:text-black"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Attribute Specification Templates ({templates.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tags")}
          className={`pb-3 font-semibold transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "tags"
              ? "border-black text-black"
              : "border-transparent text-zinc-500 hover:text-black"
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Cross-Cutting Tags ({tags.length})</span>
        </button>
      </div>

      {/* TAB 1: CATEGORIES & SUBCATEGORIES */}
      {activeTab === "departments" && (
        <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium bg-zinc-50/50">
                <th className="py-3.5 px-6 font-normal">Department &amp; Thumbnail</th>
                <th className="py-3.5 px-6 font-normal">Nested Subcategories</th>
                <th className="py-3.5 px-6 font-normal">Active Products</th>
                <th className="py-3.5 px-6 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-10 h-10 object-cover rounded-lg bg-zinc-100 border border-zinc-200"
                      />
                      <div>
                        <span className="font-semibold text-zinc-900 block">{cat.name}</span>
                        <span className="text-[11px] text-zinc-400 font-mono">/{cat.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-zinc-600">
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subCategories.map((sub) => (
                        <span
                          key={sub.id}
                          className="px-2.5 py-0.5 rounded-md bg-zinc-100 text-[11px] text-zinc-700 font-medium"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-zinc-700">
                    {cat.itemCount} items
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-zinc-400">
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="p-1 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: SPECIFICATION TEMPLATES (SRS 2.1 EAV/JSONB specs) */}
      {activeTab === "templates" && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-600">
            <strong>Custom Attribute Templates:</strong> Define reusable key-value schemas for diverse product types. When adding an appliance, tool, or audio product, the system automatically loads these required spec fields.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-xl border border-zinc-200/90 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-zinc-950">{tpl.name}</h3>
                      <span className="text-[11px] text-zinc-400 font-medium block mt-0.5">
                        Applies to: {tpl.department}
                      </span>
                    </div>
                    <FileCode className="w-4 h-4 text-zinc-400" />
                  </div>

                  <div className="mt-4 space-y-2 border-t border-zinc-100 pt-3">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Specification Fields
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {tpl.fields.map((f, i) => (
                        <li key={i} className="flex justify-between items-center py-1 border-b border-zinc-50">
                          <span className="font-medium text-zinc-800">{f.key}</span>
                          <span className="font-mono text-[10px] bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">
                            {f.type}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 text-right">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    JSONB ready
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CROSS-CUTTING TAGS */}
      {activeTab === "tags" && (
        <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs p-6 space-y-4">
          <h2 className="text-sm font-bold text-zinc-950">Active Marketing &amp; Discovery Tags</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tags.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-lg border border-zinc-100 bg-zinc-50/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold ${t.color}`}>
                    #{t.name}
                  </span>
                </div>
                <span className="text-xs text-zinc-500 font-mono">
                  {t.productCount} products
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD CATEGORY MODAL */}
      {isAddCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-bold text-base text-zinc-950">Add New Department Category</h3>
              <button
                type="button"
                onClick={() => setIsAddCatModalOpen(false)}
                className="text-zinc-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-700 font-medium mb-1">
                  Department Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Home &amp; Security"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full h-9 px-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-medium mb-1">
                  Subcategories (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CCTV Cameras, Door Sensors, Smart Bells"
                  value={newSubcats}
                  onChange={(e) => setNewSubcats(e.target.value)}
                  className="w-full h-9 px-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCatModalOpen(false)}
                  className="px-4 py-2 border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 cursor-pointer font-semibold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
