"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Truck,
  Save,
  CheckCircle2,
  DollarSign,
  Users,
  Plus,
  X,
  History,
  Key,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Catalog Manager" | "Sales & Support Staff";
  status: "Active" | "Invited";
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  time: string;
}

const INITIAL_MEMBERS: TeamMember[] = [
  { id: "m-1", name: "Samiul Admin", email: "owner@ecommercehub.com", role: "Super Admin", status: "Active" },
  { id: "m-2", name: "Rakib Hassan", email: "catalog@ecommercehub.com", role: "Catalog Manager", status: "Active" },
  { id: "m-3", name: "Tanjim Ahmed", email: "sales@ecommercehub.com", role: "Sales & Support Staff", status: "Active" },
];

const INITIAL_LOGS: AuditLog[] = [
  { id: "l-1", user: "Samiul Admin", action: "Updated RMB exchange rate to 17.20 ৳", time: "Today, 11:45 AM" },
  { id: "l-2", user: "Rakib Hassan", action: "Created product: Wireless ANC Headphones (NX-ANC01)", time: "Today, 10:15 AM" },
  { id: "l-3", user: "Tanjim Ahmed", action: "Marked 4 follow-up tasks as completed", time: "Yesterday, 5:30 PM" },
  { id: "l-4", user: "Samiul Admin", action: "Exported customer directory (VIP segment CSV)", time: "Yesterday, 2:10 PM" },
];

export default function TeamSettingsPage() {
  const { user, role } = useAuth();
  const [saved, setSaved] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [logs] = useState<AuditLog[]>(INITIAL_LOGS);

  // Delivery Charges
  const [insideDhaka, setInsideDhaka] = useState(70);
  const [outsideDhaka, setOutsideDhaka] = useState(130);

  // China Sourcing
  const [rmbRate, setRmbRate] = useState(17.2);

  // Add Member Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"Super Admin" | "Catalog Manager" | "Sales & Support Staff">(
    "Sales & Support Staff"
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: "Invited",
    };

    setMembers([...members, newMember]);
    setNewName("");
    setNewEmail("");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-16 font-sans text-zinc-900">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Team &amp; Settings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Manage staff role-based access control (RBAC), store delivery fees, and China RMB exchange rates (SRS Section 3).
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Staff Roles (RBAC) */}
      <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-950 tracking-tight flex items-center gap-2">
            <Users className="w-4 h-4 text-zinc-600" />
            <span>Team Members &amp; Role-Based Permissions (RBAC)</span>
          </h2>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 hover:bg-zinc-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Invite Member</span>
          </button>
        </div>

        <div className="divide-y divide-zinc-100 text-xs">
          {members.map((m) => (
            <div key={m.id} className="py-3.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-zinc-900 block">{m.name}</span>
                <span className="text-zinc-500">{m.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-[11px] ${
                    m.role === "Super Admin"
                      ? "bg-black text-white"
                      : m.role === "Catalog Manager"
                      ? "bg-zinc-100 text-zinc-800"
                      : "bg-blue-50 text-blue-800"
                  }`}
                >
                  {m.role}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery & Currency Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-zinc-950 tracking-tight flex items-center gap-2">
            <Truck className="w-4 h-4 text-zinc-600" />
            <span>Nationwide Delivery Charges (COD)</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-600 mb-1">Inside Dhaka (৳)</label>
              <input
                type="number"
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(Number(e.target.value))}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-zinc-600 mb-1">Outside Dhaka (৳)</label>
              <input
                type="number"
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(Number(e.target.value))}
                className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-zinc-950 tracking-tight flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-zinc-600" />
            <span>China 1688 / RMB Currency Exchange</span>
          </h3>
          <p className="text-[11px] text-zinc-400">
            Used to calculate import cost-of-goods and profit margins in real-time.
          </p>
          <div className="text-xs">
            <label className="block text-zinc-600 mb-1">1 RMB to BDT Exchange Rate (৳)</label>
            <input
              type="number"
              step="0.1"
              value={rmbRate}
              onChange={(e) => setRmbRate(Number(e.target.value))}
              className="w-full h-9 px-3 border border-zinc-200 rounded-lg font-mono focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Activity & Audit Logs (SRS Section 3) */}
      <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-zinc-950 tracking-tight flex items-center gap-2">
          <History className="w-4 h-4 text-zinc-600" />
          <span>Staff Activity &amp; Audit Logs</span>
        </h3>
        <div className="divide-y divide-zinc-100 text-xs">
          {logs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-zinc-900">{log.user}: </span>
                <span className="text-zinc-600">{log.action}</span>
              </div>
              <span className="font-mono text-zinc-400 text-[11px]">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* INVITE MEMBER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-bold text-base text-zinc-950">Invite Staff Member</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farhan Chowdhury"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full h-9 px-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="farhan@ecommercehub.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full h-9 px-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-medium mb-1">Role Permission</label>
                <select
                  value={newRole}
                  onChange={(e) =>
                    setNewRole(
                      e.target.value as "Super Admin" | "Catalog Manager" | "Sales & Support Staff"
                    )
                  }
                  className="w-full h-9 px-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
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
                  className="px-4 py-2 border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 cursor-pointer font-semibold"
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
