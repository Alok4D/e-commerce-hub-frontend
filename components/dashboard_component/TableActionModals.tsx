"use client";

import React, { useState } from "react";
import { X, AlertTriangle, Archive, Trash2, RotateCcw, Ban } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// 1. Archive Product Modal
export function ArchiveProductModal({
  isOpen,
  onClose,
  onConfirm,
  productName = "Wireless ANC Headphones",
  productSku = "NX-ANC01 · Active · 38 available",
}: BaseModalProps & { productName?: string; productSku?: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4 text-neutral-800" />
            <h3 className="font-bold text-base text-neutral-950">Archive this product?</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-black cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          Remove this product from the storefront. Existing orders, stock and history stay intact.
          You can restore it later from your archived catalog.
        </p>

        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
          <p className="font-bold text-neutral-950">{productName}</p>
          <p className="text-[11px] font-mono text-neutral-500 mt-0.5">{productSku}</p>
        </div>

        <div className="pt-2 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
          >
            Keep product
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-neutral-800 text-xs font-semibold cursor-pointer shadow-xs"
          >
            Archive product
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Delete Draft Modal (Safety typing required)
export function DeleteDraftModal({
  isOpen,
  onClose,
  onConfirm,
  draftName = "USB-C Charging Hub",
  draftSku = "NX-HUB07 · Draft · No order history",
}: BaseModalProps & { draftName?: string; draftSku?: string }) {
  const [confirmText, setConfirmText] = useState("");
  if (!isOpen) return null;

  const isConfirmed = confirmText.trim().toUpperCase() === "DELETE";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-4 h-4" />
            <h3 className="font-bold text-base text-neutral-950">Delete this draft permanently?</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-black cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          Only unpublished drafts without order history can be permanently deleted. This action
          cannot be undone.
        </p>

        <div className="p-3 bg-red-50/50 rounded-lg border border-red-200/80 text-xs">
          <p className="font-bold text-neutral-950">{draftName}</p>
          <p className="text-[11px] font-mono text-neutral-500 mt-0.5">{draftSku}</p>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="block text-neutral-700 font-semibold">
            Type <span className="font-mono text-red-600 font-bold">DELETE</span> to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            className="w-full h-9 px-3 border border-neutral-200 rounded-lg font-mono text-xs focus:outline-none focus:border-red-500 uppercase"
          />
        </div>

        <div className="pt-2 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
          >
            Keep draft
          </button>
          <button
            type="button"
            disabled={!isConfirmed}
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              isConfirmed
                ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-xs"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            Delete draft
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Cancel Order Modal
export function CancelOrderModal({
  isOpen,
  onClose,
  onConfirm,
  orderId = "#NX-10482",
  customerInfo = "Ayesha Rahman · ৳4,660 · Confirmed · Cash on delivery",
}: BaseModalProps & { orderId?: string; customerInfo?: string }) {
  const [reason, setReason] = useState("Customer requested cancellation");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-red-600" />
            <h3 className="font-bold text-base text-neutral-950">Cancel order {orderId}?</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-black cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          The customer record and order history will be retained. Notify the customer after
          confirming cancellation.
        </p>

        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
          <p className="font-bold text-neutral-950">{orderId}</p>
          <p className="text-[11px] text-neutral-600 mt-0.5">{customerInfo}</p>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="block text-neutral-700 font-semibold">
            Cancellation reason · Required
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-9 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 font-medium"
          >
            <option value="Customer requested cancellation">Customer requested cancellation</option>
            <option value="Item temporarily out of stock">Item temporarily out of stock</option>
            <option value="Customer unreachable for confirmation">
              Customer unreachable for confirmation
            </option>
            <option value="Duplicate order placed">Duplicate order placed</option>
          </select>
        </div>

        <div className="pt-2 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
          >
            Keep order
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-semibold cursor-pointer shadow-xs"
          >
            Confirm cancellation
          </button>
        </div>
      </div>
    </div>
  );
}

// 4. Create Return Modal
export function CreateReturnModal({
  isOpen,
  onClose,
  onConfirm,
  orderId = "#NX-10478",
  customerInfo = "Farhana Akter · ৳1,930 · Delivered",
}: BaseModalProps & { orderId?: string; customerInfo?: string }) {
  const [reason, setReason] = useState("Product issue reported by customer");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-neutral-800" />
            <h3 className="font-bold text-base text-neutral-950">Create return for {orderId}?</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-black cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          Create a return record linked to the delivered order. Keep original courier dispatch
          details intact for parcel audit.
        </p>

        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
          <p className="font-bold text-neutral-950">{orderId}</p>
          <p className="text-[11px] text-neutral-600 mt-0.5">{customerInfo}</p>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="block text-neutral-700 font-semibold">
            Return reason · Required
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-9 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 font-medium"
          >
            <option value="Product issue reported by customer">Product issue reported by customer</option>
            <option value="Incorrect variant or item delivered">Incorrect variant or item delivered</option>
            <option value="Customer requested replacement">Customer requested replacement</option>
          </select>
        </div>

        <div className="pt-2 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-neutral-800 text-xs font-semibold cursor-pointer shadow-xs"
          >
            Create return request
          </button>
        </div>
      </div>
    </div>
  );
}
