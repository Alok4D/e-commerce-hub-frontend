"use client";

import React, { useState } from "react";
import {
  Users,
  Truck,
  DollarSign,
  History,
  Plus,
  X,
  CheckCircle2,
  Trash2,
  Edit2,
  Shield,
  ArrowRight,
  TrendingUp,
  Search,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type SettingsTab = "team" | "delivery" | "currency" | "audit";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Catalog Manager" | "Sales & Support Staff";
  roleDescription: string;
  status: "Active" | "Invited";
  lastActive: string;
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  category: "SETTINGS" | "CATALOG" | "CRM" | "EXPORT";
  time: string;
}

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: "m-1",
    name: "Samiul Admin",
    email: "owner@ecommercehub.com",
    role: "Super Admin",
    roleDescription: "Full access to revenue, RMB exchange, staff roles & store settings",
    status: "Active",
    lastActive: "Active now",
  },
  {
    id: "m-2",
    name: "Rakib Hassan",
    email: "catalog@ecommercehub.com",
    role: "Catalog Manager",
    roleDescription: "Manage products, bulk China specs, inventory & media assets",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "m-3",
    name: "Tanjim Ahmed",
    email: "sales@ecommercehub.com",
    role: "Sales & Support Staff",
    roleDescription: "Fulfill orders, courier tracking, customer timeline & follow-up calls",
    status: "Active",
    lastActive: "Today, 11:30 AM",
  },
];

const INITIAL_LOGS: AuditLog[] = [
  {
    id: "l-1",
    user: "Samiul Admin",
    action: "Updated China 1688 RMB exchange rate to 17.20 ৳",
    category: "SETTINGS",
    time: "Today, 11:45 AM",
  },
  {
    id: "l-2",
    user: "Rakib Hassan",
    action: "Created new product: Wireless ANC Headphones (NX-ANC01)",
    category: "CATALOG",
    time: "Today, 10:15 AM",
  },
  {
    id: "l-3",
    user: "Tanjim Ahmed",
    action: "Marked 4 customer follow-up calls as completed",
    category: "CRM",
    time: "Yesterday, 5:30 PM",
  },
  {
    id: "l-4",
    user: "Samiul Admin",
    action: "Exported customer directory (VIP segment CSV)",
    category: "EXPORT",
    time: "Yesterday, 2:10 PM",
  },
];

export default function TeamSettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("team");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  // Team State
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [memberSearch, setMemberSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<TeamMember["role"]>("Sales & Support Staff");

  // Delivery Charges State
  const [insideDhaka, setInsideDhaka] = useState(70);
  const [outsideDhaka, setOutsideDhaka] = useState(130);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(2500);
  const [codEnabled, setCodEnabled] = useState(true);

  // China Sourcing & Currency State
  const [rmbRate, setRmbRate] = useState(17.2);
  const [shippingBufferRmb, setShippingBufferRmb] = useState(3.5);
  const [sampleRmbCost, setSampleRmbCost] = useState(45);

  // Audit Logs State
  const [logs] = useState<AuditLog[]>(INITIAL_LOGS);

  const showNotification = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    let roleDescription = "Fulfill orders, courier tracking & customer care";
    if (newRole === "Super Admin") {
      roleDescription = "Full access to revenue, RMB exchange, staff roles & store settings";
    } else if (newRole === "Catalog Manager") {
      roleDescription = "Manage products, bulk China specs, inventory & media assets";
    }

    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      roleDescription,
      status: "Invited",
      lastActive: "Invitation pending",
    };

    setMembers([newMember, ...members]);
    setNewName("");
    setNewEmail("");
    setIsModalOpen(false);
    showNotification("Staff member invited successfully!");
  };

  const handleRemoveMember = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from team access?`)) {
      setMembers(members.filter((m) => m.id !== id));
      showNotification(`${name} has been removed.`);
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.role.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1240px] mx-auto space-y-6 pb-16 font-sans text-neutral-900">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-neutral-950">
            Settings &amp; Team Roles
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Role-based staff permissions, nationwide COD shipping charges, China RMB currency &amp; system audit logs.
          </p>
        </div>

        {savedMessage && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs font-medium animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{savedMessage}</span>
          </div>
        )}
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3 overflow-x-auto text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("team")}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "team"
              ? "bg-[#111111] text-white font-semibold shadow-xs"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-950"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Team &amp; Permissions (RBAC)</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === "team" ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"}`}>
            {members.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("delivery")}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "delivery"
              ? "bg-[#111111] text-white font-semibold shadow-xs"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-950"
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Delivery &amp; COD Fees</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("currency")}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "currency"
              ? "bg-[#111111] text-white font-semibold shadow-xs"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-950"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>China Sourcing (RMB Exchange)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "audit"
              ? "bg-[#111111] text-white font-semibold shadow-xs"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-950"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Staff Audit Trail</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: TEAM & RBAC PERMISSIONS */}
      {activeTab === "team" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-neutral-50/70 p-4 rounded-xl border border-neutral-200">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search staff by name, email or role..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Staff Member</span>
            </button>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/50 text-neutral-500 font-semibold">
                    <th className="py-3 px-4">Staff Member</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Permission Scope</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                            {member.name.slice(0, 2)}
                          </div>
                          <div>
                            <span className="font-semibold text-neutral-950 block">{member.name}</span>
                            <span className="text-neutral-500 text-[11px]">{member.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            member.role === "Super Admin"
                              ? "bg-neutral-900 text-white"
                              : member.role === "Catalog Manager"
                              ? "bg-amber-100 text-amber-900"
                              : "bg-blue-100 text-blue-900"
                          }`}
                        >
                          <Shield className="w-3 h-3" />
                          <span>{member.role}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs text-neutral-600 text-[11px] leading-relaxed">
                        {member.roleDescription}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                            member.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              member.status === "Active" ? "bg-emerald-500" : "bg-neutral-400"
                            }`}
                          />
                          <span>{member.status}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {member.role !== "Super Admin" ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(member.id, member.name)}
                            title="Remove staff access"
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-[11px] text-neutral-400 italic">Owner</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DELIVERY & COD CHARGES */}
      {activeTab === "delivery" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-700" />
                <span>Nationwide Delivery Charges</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Standard delivery fee added to checkout orders handled via Pathao or Steadfast courier.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1.5">
                  Inside Dhaka Delivery (৳)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">৳</span>
                  <input
                    type="number"
                    value={insideDhaka}
                    onChange={(e) => setInsideDhaka(Number(e.target.value))}
                    className="w-full h-9 pl-8 pr-3 border border-neutral-200 rounded-lg font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">Estimated delivery: 24-48 hours</p>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1.5">
                  Outside Dhaka Delivery (৳)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">৳</span>
                  <input
                    type="number"
                    value={outsideDhaka}
                    onChange={(e) => setOutsideDhaka(Number(e.target.value))}
                    className="w-full h-9 pl-8 pr-3 border border-neutral-200 rounded-lg font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">Estimated delivery: 2-4 business days</p>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1.5">
                  Free Shipping Minimum Cart Value (৳)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">৳</span>
                  <input
                    type="number"
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                    className="w-full h-9 pl-8 pr-3 border border-neutral-200 rounded-lg font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">Orders above this amount qualify for zero delivery fee</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => showNotification("Delivery charge rates saved successfully!")}
                className="w-full h-9 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Save Delivery Settings
              </button>
            </div>
          </div>

          {/* COD Rules card */}
          <div className="bg-neutral-50/70 p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-950">Cash on Delivery (COD) Rules</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              In Bangladesh e-commerce retail, Cash on Delivery is the primary payment preference for customers. The checkout flow automatically enables COD without requiring credit cards.
            </p>

            <div className="p-4 bg-white rounded-lg border border-neutral-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Enable Cash on Delivery</span>
                <input
                  type="checkbox"
                  checked={codEnabled}
                  onChange={(e) => setCodEnabled(e.target.checked)}
                  className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                />
              </div>
              <p className="text-neutral-500 text-[11px]">
                Allows customers to place orders and pay delivery drivers directly upon parcel receipt.
              </p>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-lg border border-amber-200/80 text-amber-900 text-xs">
              <span className="font-bold block mb-1">Return &amp; Courier Policy Note</span>
              <span>
                Returned or rejected parcels will deduct the standard return courier charge (৳60-70) from merchant balance.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHINA SOURCING & RMB EXCHANGE */}
      {activeTab === "currency" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-neutral-700" />
                <span>China 1688 / RMB Currency Exchange</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Used across the Product Catalog to calculate landed import cost and gross profit margin in BDT.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1.5">
                  1 RMB (¥) to BDT (৳) Exchange Rate
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">¥1 = ৳</span>
                  <input
                    type="number"
                    step="0.05"
                    value={rmbRate}
                    onChange={(e) => setRmbRate(Number(e.target.value))}
                    className="w-full h-9 pl-14 pr-3 border border-neutral-200 rounded-lg font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">Official bank &amp; agent purchasing rate</p>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1.5">
                  Freight &amp; Customs Buffer per RMB (¥)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">+¥</span>
                  <input
                    type="number"
                    step="0.1"
                    value={shippingBufferRmb}
                    onChange={(e) => setShippingBufferRmb(Number(e.target.value))}
                    className="w-full h-9 pl-10 pr-3 border border-neutral-200 rounded-lg font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Air/Sea shipping per KG amortized per item
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => showNotification("China RMB currency configuration updated!")}
                className="w-full h-9 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Update RMB Rate
              </button>
            </div>
          </div>

          {/* Real-time Landed Cost Preview Card */}
          <div className="bg-neutral-50/70 p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-950 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-neutral-700" />
              <span>Live Landed Cost Calculator</span>
            </h3>
            <p className="text-xs text-neutral-600">
              Test how a product sourced from 1688 or Taobao converts to BDT cost:
            </p>

            <div className="p-4 bg-white rounded-lg border border-neutral-200 text-xs space-y-3">
              <div>
                <label className="block text-neutral-500 text-[11px] mb-1">Source Price on 1688 (RMB)</label>
                <input
                  type="number"
                  value={sampleRmbCost}
                  onChange={(e) => setSampleRmbCost(Number(e.target.value))}
                  className="w-full h-8 px-3 border border-neutral-200 rounded font-mono text-neutral-900 focus:outline-none"
                />
              </div>

              <div className="border-t border-neutral-100 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Product RMB Price:</span>
                  <span className="font-mono text-neutral-900">¥{sampleRmbCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Effective Landed Cost in BDT:</span>
                  <span className="font-mono font-bold text-neutral-950">
                    ৳{((sampleRmbCost + shippingBufferRmb) * rmbRate).toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Suggested Retail (2.4x Markup):</span>
                  <span className="font-mono font-bold text-emerald-700">
                    ৳{(((sampleRmbCost + shippingBufferRmb) * rmbRate) * 2.4).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400">
              This exchange rate automatically feeds into the Add Product &amp; Edit Product gross margin calculator.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT TRAIL */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-neutral-950">Staff Activity &amp; Audit Logs</h2>
                <p className="text-xs text-neutral-500">
                  Immutable record of staff actions, rate modifications and sensitive catalog updates.
                </p>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">{logs.length} logged events</span>
            </div>

            <div className="divide-y divide-neutral-100 text-xs">
              {logs.map((log) => (
                <div key={log.id} className="p-4 flex items-center justify-between hover:bg-neutral-50/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-950">{log.user}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          log.category === "SETTINGS"
                            ? "bg-purple-100 text-purple-900"
                            : log.category === "CATALOG"
                            ? "bg-amber-100 text-amber-900"
                            : log.category === "CRM"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-neutral-100 text-neutral-800"
                        }`}
                      >
                        {log.category}
                      </span>
                    </div>
                    <p className="text-neutral-600">{log.action}</p>
                  </div>

                  <span className="font-mono text-neutral-400 text-[11px] shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INVITE MEMBER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-bold text-base text-neutral-950">Invite Staff Member</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farhan Chowdhury"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full h-9 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="farhan@ecommercehub.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full h-9 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Role Permission (RBAC)</label>
                <select
                  value={newRole}
                  onChange={(e) =>
                    setNewRole(
                      e.target.value as "Super Admin" | "Catalog Manager" | "Sales & Support Staff"
                    )
                  }
                  className="w-full h-9 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                >
                  <option value="Sales & Support Staff">Sales &amp; Support Staff (CRM, Orders, Follow-ups)</option>
                  <option value="Catalog Manager">Catalog Manager (Products, Categories, Media)</option>
                  <option value="Super Admin">Super Admin (Full Access &amp; Settings)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-neutral-800 cursor-pointer font-semibold shadow-xs"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
