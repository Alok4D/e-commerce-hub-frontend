"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Eye,
  Trash2,
  Download,
  Plus,
  X,
  CheckCircle2,
  ChevronDown,
  Phone,
  Mail,
  UserCheck,
  Tag,
} from "lucide-react";

type DirectorySegmentTab =
  | "All customers"
  | "VIP customers"
  | "Inactive > 60 days"
  | "Needs follow-up";

type CustomerSegment =
  | "VIP"
  | "Gadget buyer"
  | "Repeat buyer"
  | "New customer"
  | "Home buyer"
  | "Inactive";

type MarketingStatus = "Opted in" | "Opted out";

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  ltv: number;
  segment: CustomerSegment;
  marketing: MarketingStatus;
  needsFollowUp?: boolean;
}

const SEGMENT_TABS: { label: DirectorySegmentTab; count: string }[] = [
  { label: "All customers", count: "1,284" },
  { label: "VIP customers", count: "86" },
  { label: "Inactive > 60 days", count: "214" },
  { label: "Needs follow-up", count: "32" },
];

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: "c-1",
    name: "Ayesha Rahman",
    email: "ayesha.rahman@email.com",
    phone: "01712 345678",
    ordersCount: 8,
    ltv: 24680,
    segment: "VIP",
    marketing: "Opted in",
    needsFollowUp: false,
  },
  {
    id: "c-2",
    name: "Rafiqul Islam",
    email: "rafiqul.islam@email.com",
    phone: "01823 456789",
    ordersCount: 3,
    ltv: 8540,
    segment: "Gadget buyer",
    marketing: "Opted in",
    needsFollowUp: true,
  },
  {
    id: "c-3",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@email.com",
    phone: "01934 567890",
    ordersCount: 6,
    ltv: 18420,
    segment: "Repeat buyer",
    marketing: "Opted out",
    needsFollowUp: false,
  },
  {
    id: "c-4",
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@email.com",
    phone: "01645 678901",
    ordersCount: 1,
    ltv: 3570,
    segment: "New customer",
    marketing: "Opted in",
    needsFollowUp: true,
  },
  {
    id: "c-5",
    name: "Farhana Akter",
    email: "farhana.akter@email.com",
    phone: "01756 789012",
    ordersCount: 4,
    ltv: 9760,
    segment: "Home buyer",
    marketing: "Opted in",
    needsFollowUp: false,
  },
  {
    id: "c-6",
    name: "Shamim Hossain",
    email: "shamim.hossain@email.com",
    phone: "01867 890123",
    ordersCount: 2,
    ltv: 6890,
    segment: "Inactive",
    marketing: "Opted out",
    needsFollowUp: true,
  },
  {
    id: "c-7",
    name: "Mehedi Hasan",
    email: "mehedi.h@email.com",
    phone: "01711 223344",
    ordersCount: 9,
    ltv: 31200,
    segment: "VIP",
    marketing: "Opted in",
    needsFollowUp: false,
  },
  {
    id: "c-8",
    name: "Sadia Afrin",
    email: "sadia.a@email.com",
    phone: "01844 556677",
    ordersCount: 5,
    ltv: 14350,
    segment: "Gadget buyer",
    marketing: "Opted in",
    needsFollowUp: true,
  },
  {
    id: "c-9",
    name: "Kazi Tariqul",
    email: "tariqul.k@email.com",
    phone: "01988 990011",
    ordersCount: 7,
    ltv: 21800,
    segment: "VIP",
    marketing: "Opted in",
    needsFollowUp: false,
  },
  {
    id: "c-10",
    name: "Zubaida Khanom",
    email: "zubaida.k@email.com",
    phone: "01622 334455",
    ordersCount: 2,
    ltv: 5400,
    segment: "Inactive",
    marketing: "Opted out",
    needsFollowUp: true,
  },
];

const SEGMENT_BADGES: Record<CustomerSegment, string> = {
  VIP: "bg-amber-50 text-amber-800 border border-amber-200",
  "Gadget buyer": "bg-blue-50 text-blue-800 border border-blue-200",
  "Repeat buyer": "bg-emerald-50 text-emerald-800 border border-emerald-200",
  "New customer": "bg-cyan-50 text-cyan-800 border border-cyan-200",
  "Home buyer": "bg-purple-50 text-purple-800 border border-purple-200",
  Inactive: "bg-zinc-100 text-zinc-600 border border-zinc-200",
};

export default function CustomerDirectoryPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [activeTab, setActiveTab] = useState<DirectorySegmentTab>("All customers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All tags");
  const [selectedOptIn, setSelectedOptIn] = useState<"All statuses" | MarketingStatus>("All statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        customer.name.toLowerCase().includes(q) ||
        customer.phone.replace(/\s+/g, "").includes(q.replace(/\s+/g, "")) ||
        customer.email.toLowerCase().includes(q);

      const matchesTab =
        activeTab === "All customers" ||
        (activeTab === "VIP customers" && customer.segment === "VIP") ||
        (activeTab === "Inactive > 60 days" && customer.segment === "Inactive") ||
        (activeTab === "Needs follow-up" && Boolean(customer.needsFollowUp));

      const matchesTag = selectedTag === "All tags" || customer.segment === selectedTag;

      const matchesOptIn =
        selectedOptIn === "All statuses" || customer.marketing === selectedOptIn;

      return matchesSearch && matchesTab && matchesTag && matchesOptIn;
    });
  }, [customers, searchQuery, activeTab, selectedTag, selectedOptIn]);

  const handleExportCSV = () => {
    const headers = ["Customer ID", "Name", "Email", "Phone", "Orders Count", "LTV (BDT)", "Segment", "Marketing Opt-in"];
    const rows = filteredCustomers.map((c) => [
      c.id,
      `"${c.name}"`,
      c.email,
      `"${c.phone}"`,
      c.ordersCount,
      c.ltv,
      `"${c.segment}"`,
      `"${c.marketing}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `customers-${activeTab.toLowerCase().replace(/\s+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Customer directory exported successfully!");
  };

  const handleDelete = (id: string, name: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    showToast(`Customer "${name}" removed.`);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16 font-sans text-zinc-900">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Customer Directory
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Centralized customer data, RFM segmentation, and lifetime value tracking (SRS Section 4).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {toastMessage && (
            <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-zinc-200 hover:bg-zinc-50 rounded-lg text-xs font-semibold text-zinc-700 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Sleek Segment Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {SEGMENT_TABS.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-xs font-semibold"
                  : "bg-white border border-zinc-200/90 text-zinc-600 hover:text-black hover:bg-zinc-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  isActive ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-zinc-200/90 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone number, or email..."
            className="w-full h-10 pl-10 pr-4 text-xs bg-zinc-50/70 border border-zinc-200 rounded-lg focus:bg-white focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all placeholder:text-zinc-400"
          />
        </div>

        {/* Tag Filter Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <div className="relative w-full sm:w-44">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full h-10 px-3 pr-8 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 appearance-none focus:outline-none focus:border-black cursor-pointer font-medium"
            >
              <option value="All tags">All Tags / Segments</option>
              <option value="VIP">VIP</option>
              <option value="Gadget buyer">Gadget buyer</option>
              <option value="Repeat buyer">Repeat buyer</option>
              <option value="New customer">New customer</option>
              <option value="Home buyer">Home buyer</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Opt-in Status Dropdown */}
          <div className="relative w-full sm:w-40">
            <select
              value={selectedOptIn}
              onChange={(e) => setSelectedOptIn(e.target.value as "All statuses" | MarketingStatus)}
              className="w-full h-10 px-3 pr-8 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 appearance-none focus:outline-none focus:border-black cursor-pointer font-medium"
            >
              <option value="All statuses">All Opt-ins</option>
              <option value="Opted in">Opted in</option>
              <option value="Opted out">Opted out</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. Customer Table Card */}
      <div className="bg-white rounded-xl border border-zinc-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium bg-zinc-50/50">
                <th className="py-3.5 px-6 font-normal">Customer</th>
                <th className="py-3.5 px-6 font-normal">Phone &amp; WhatsApp</th>
                <th className="py-3.5 px-6 font-normal">Orders &amp; Lifetime Value (LTV)</th>
                <th className="py-3.5 px-6 font-normal">Segment</th>
                <th className="py-3.5 px-6 font-normal">Marketing Opt-in</th>
                <th className="py-3.5 px-6 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-zinc-50/60 transition-colors">
                    {/* Customer Name & Email */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {customer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/customers/${customer.id}`}
                            className="font-bold text-zinc-950 hover:underline block"
                          >
                            {customer.name}
                          </Link>
                          <span className="text-[11px] text-zinc-400 font-mono block">
                            {customer.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-4 px-6 text-zinc-700 font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{customer.phone}</span>
                      </div>
                    </td>

                    {/* Orders / LTV */}
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <span className="font-bold text-zinc-950 font-mono">
                          ৳{customer.ltv.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-zinc-400 block font-normal">
                          {customer.ordersCount} {customer.ordersCount === 1 ? "order" : "orders"}
                        </span>
                      </div>
                    </td>

                    {/* Segment Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                          SEGMENT_BADGES[customer.segment] || "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {customer.segment}
                      </span>
                    </td>

                    {/* Marketing Status */}
                    <td className="py-4 px-6">
                      {customer.marketing === "Opted in" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Opted in
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                          Opted out
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 text-zinc-500">
                        <Link
                          href={`/dashboard/customers/${customer.id}`}
                          className="p-1.5 border border-zinc-200 rounded-md hover:bg-zinc-100 hover:text-black transition-colors"
                          title="View CRM profile & timeline"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(customer.id, customer.name)}
                          className="p-1.5 border border-zinc-200 rounded-md hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                          title="Delete customer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400 text-xs">
                    No customers found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100 px-6 py-4 text-xs text-zinc-500">
          <p>
            Showing <strong className="text-zinc-900">{filteredCustomers.length}</strong> of{" "}
            <strong>1,284</strong> customers
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 border border-zinc-200 rounded-md hover:bg-zinc-50 disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-semibold text-zinc-900 px-2">Page {currentPage} of 25</span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(25, p + 1))}
              className="p-1.5 border border-zinc-200 rounded-md hover:bg-zinc-50 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
