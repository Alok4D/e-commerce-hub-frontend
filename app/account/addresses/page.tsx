"use client";

import React, { useState } from "react";
import { MapPin, Plus, Check, Edit2, Trash2 } from "lucide-react";

interface SavedAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    name: "Ayesha Rahman",
    phone: "01712 345678",
    address: "House 24, Road 8, Dhanmondi, Dhaka 1209",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    name: "Ayesha Rahman",
    phone: "01712 345678",
    address: "Level 5, Plot 12, Road 11, Banani C/A, Dhaka 1213",
    isDefault: false,
  },
];

export default function SavedAddressesPage() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState("Home");
  const [addressText, setAddressText] = useState("");

  const setDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressText.trim()) return;
    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      label,
      name: "Ayesha Rahman",
      phone: "01712 345678",
      address: addressText.trim(),
      isDefault: false,
    };
    setAddresses([...addresses, newAddr]);
    setAddressText("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Saved addresses</h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Choose where your next good find should arrive.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add new address</span>
        </button>
      </div>

      {/* Add Address Card */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-4 text-xs animate-in fade-in duration-200">
          <h3 className="font-bold text-neutral-950 text-sm">Add New Delivery Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">Address Label</label>
              <select
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full h-9 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Family / Friend">Family / Friend</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">Full Street Address</label>
              <input
                type="text"
                placeholder="House, Road, Area, Dhaka"
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
                required
                className="w-full h-9 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-neutral-800 font-semibold shadow-2xs"
            >
              Save Address
            </button>
          </div>
        </form>
      )}

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white rounded-xl border p-5 shadow-2xs flex flex-col justify-between transition-colors ${
              addr.isDefault ? "border-neutral-900 ring-1 ring-neutral-900" : "border-neutral-200/90"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-neutral-950 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-neutral-700" />
                  <span>{addr.label}</span>
                </span>
                {addr.isDefault && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#111111] text-white">
                    Default
                  </span>
                )}
              </div>

              <div className="text-xs text-neutral-600 space-y-0.5 pt-1">
                <p className="font-semibold text-neutral-900">{addr.name}</p>
                <p className="font-mono text-neutral-500">{addr.phone}</p>
                <p className="leading-relaxed text-neutral-600 pt-1">{addr.address}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
              {!addr.isDefault ? (
                <button
                  type="button"
                  onClick={() => setDefault(addr.id)}
                  className="font-semibold text-neutral-900 hover:underline cursor-pointer"
                >
                  Set as default
                </button>
              ) : (
                <span className="text-neutral-400 text-[11px]">Primary delivery address</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
