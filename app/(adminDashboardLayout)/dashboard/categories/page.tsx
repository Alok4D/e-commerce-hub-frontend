"use client";

import React, { useState } from "react";
import { Plus, Search, Layers, Edit2, Trash2 } from "lucide-react";
import { MOCK_CATEGORIES } from "@/lib/mock-data";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 font-sans text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Categories
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Manage product departments, nested subcategories, and specification templates.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid / Table */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium">
              <th className="py-3.5 px-6 font-normal">Department</th>
              <th className="py-3.5 px-6 font-normal">Subcategories</th>
              <th className="py-3.5 px-6 font-normal">Products Count</th>
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
                      className="w-10 h-10 object-cover rounded-lg bg-zinc-100"
                    />
                    <span className="font-semibold text-zinc-900">{cat.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-zinc-600">
                  <div className="flex flex-wrap gap-1">
                    {cat.subCategories.map((sub) => (
                      <span
                        key={sub.id}
                        className="px-2 py-0.5 rounded bg-zinc-100 text-[11px] text-zinc-700"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6 font-mono text-zinc-700">
                  {cat.itemCount} Items
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 text-zinc-400">
                    <button className="p-1 hover:text-black transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-rose-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
