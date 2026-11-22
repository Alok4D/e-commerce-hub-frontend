"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  LogOut,
  Shield,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/mock-data";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "order" | "stock" | "crm";
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "New Order #NX-10482 received",
    description: "Ayesha Rahman placed COD order for ৳4,660",
    time: "10 mins ago",
    type: "order",
    read: false,
  },
  {
    id: "n-2",
    title: "Low stock alert: Wireless ANC Headphones",
    description: "Only 4 units remaining in Dhaka Central Hub",
    time: "45 mins ago",
    type: "stock",
    read: false,
  },
  {
    id: "n-3",
    title: "Customer follow-up due",
    description: "Call Rafi Hassan regarding precision tool replacement",
    time: "2 hours ago",
    type: "crm",
    read: true,
  },
];

export function DashboardHeader() {
  const { user, role, loginAs, logout } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getRoleDisplayName = (r: UserRole) => {
    switch (r) {
      case "SUPER_ADMIN":
        return "Super Admin";
      case "CATALOG_MANAGER":
        return "Catalog Manager";
      case "SALES_STAFF":
        return "Sales & Support Staff";
      case "CUSTOMER":
        return "Storefront Customer";
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "SA";
    const parts = name.split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="h-16 w-full bg-white border-b border-zinc-200 px-6 sm:px-8 z-30 font-sans flex items-center shrink-0">
      <div className="w-full flex justify-between items-center gap-4">
        {/* Left: Global Search Box */}
        <div className="flex-1 max-w-sm hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="w-full h-10 pl-10 pr-4 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Mobile Brand Title */}
        <div className="sm:hidden flex-1 pl-12">
          <span className="text-base font-bold text-black tracking-tight">
            nexora
          </span>
        </div>

        {/* Right side: Live Store link, Bell Notification, and Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Live Store link */}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-black transition-colors px-2 py-1 rounded-md hover:bg-zinc-100"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          {/* Notifications Bell & Popover */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Menu */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl border border-zinc-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-zinc-950">Activity Alerts</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-[11px] text-zinc-500 hover:text-black cursor-pointer font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-zinc-100 max-h-80 overflow-y-auto text-xs">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 flex items-start gap-3 transition-colors ${
                        item.read ? "bg-white hover:bg-zinc-50" : "bg-neutral-50/60 hover:bg-neutral-100/60"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.type === "order" && (
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {item.type === "stock" && (
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {item.type === "crm" && (
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-semibold text-zinc-950 truncate">{item.title}</span>
                          <span className="text-[10px] text-zinc-400 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-zinc-600 mt-0.5 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 border-t border-zinc-100 text-center bg-zinc-50/50">
                  <Link
                    href="/dashboard/orders"
                    onClick={() => setIsNotifOpen(false)}
                    className="text-[11px] font-semibold text-zinc-800 hover:text-black"
                  >
                    View All Orders &amp; Tasks →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile & Role Switcher Popover */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2.5 pl-2 border-l border-zinc-200 hover:opacity-90 transition-opacity cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-full bg-black text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {getInitials(user?.name)}
              </div>
              <div className="hidden md:block leading-tight">
                <span className="block text-xs font-semibold text-zinc-900">
                  {user?.name || "Nexora Admin"}
                </span>
                <span className="block text-[11px] text-zinc-400">
                  {getRoleDisplayName(role)}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden md:block" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-zinc-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-4 border-b border-zinc-100 bg-zinc-50/60">
                  <span className="font-bold text-xs text-zinc-950 block">{user?.name}</span>
                  <span className="text-[11px] text-zinc-500 block truncate">{user?.email}</span>
                  <span className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-900 text-white">
                    <Shield className="w-3 h-3" />
                    <span>{getRoleDisplayName(role)}</span>
                  </span>
                </div>

                {/* Role Switcher for Interactive Testing */}
                <div className="p-3 border-b border-zinc-100 text-xs">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 px-1">
                    Preview as Role (RBAC)
                  </span>
                  <div className="space-y-1">
                    {(["SUPER_ADMIN", "CATALOG_MANAGER", "SALES_STAFF"] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          loginAs(r);
                          setIsProfileOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] flex items-center justify-between cursor-pointer transition-colors ${
                          role === r
                            ? "bg-neutral-100 font-bold text-neutral-950"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                        }`}
                      >
                        <span>{getRoleDisplayName(r)}</span>
                        {role === r && <UserCheck className="w-3.5 h-3.5 text-black" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
