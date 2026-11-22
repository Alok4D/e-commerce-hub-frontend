"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  User,
  Clock,
  Share2,
  Megaphone,
  Settings,
  ChevronLeft,
  Menu,
  X,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allMenuItems = [
    {
      title: role === "SALES_STAFF" ? "My workday" : "Overview",
      icon: LayoutGrid,
      href: "/dashboard",
      roles: ["SUPER_ADMIN", "CATALOG_MANAGER", "SALES_STAFF"],
    },
    {
      title: "Products",
      icon: FileText,
      href: "/dashboard/products",
      roles: ["SUPER_ADMIN", "CATALOG_MANAGER"],
    },
    {
      title: "Categories",
      icon: FileText,
      href: "/dashboard/categories",
      roles: ["SUPER_ADMIN", "CATALOG_MANAGER"],
    },
    {
      title: "Orders",
      icon: FileText,
      href: "/dashboard/orders",
      roles: ["SUPER_ADMIN", "SALES_STAFF"],
    },
    {
      title: "Customers",
      icon: User,
      href: "/dashboard/customers",
      roles: ["SUPER_ADMIN", "SALES_STAFF"],
    },
    {
      title: "Follow-ups",
      icon: Clock,
      href: "/dashboard/follow-ups",
      roles: ["SUPER_ADMIN", "SALES_STAFF"],
    },
    {
      title: "Social publishing",
      icon: Share2,
      href: "/dashboard/social-publishing",
      roles: ["SUPER_ADMIN"],
    },
    {
      title: "Campaigns",
      icon: Megaphone,
      href: "/dashboard/campaigns",
      roles: ["SUPER_ADMIN"],
    },
    {
      title: "Team & settings",
      icon: Settings,
      href: "/dashboard/team-settings",
      roles: ["SUPER_ADMIN"],
    },
  ];

  // Dynamic RBAC Filter matching Figma Section 08 & 09
  const visibleMenuItems = allMenuItems.filter((item) =>
    item.roles.includes(role || "SUPER_ADMIN")
  );

  const roleSubtitle =
    role === "CATALOG_MANAGER"
      ? "CATALOG MANAGER"
      : role === "SALES_STAFF"
      ? "SALES & SUPPORT"
      : "SUPER ADMIN";

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-zinc-900 border-r border-zinc-200 overflow-hidden font-sans">
      {/* Brand Header */}
      <div
        className={cn(
          "px-7 pt-8 pb-7",
          collapsed && "px-3 pt-6 text-center"
        )}
      >
        <Link href="/dashboard" className="block group">
          {!collapsed ? (
            <div>
              <h1 className="text-[26px] font-bold tracking-tight text-black leading-none font-sans">
                nexora
              </h1>
              <p className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase mt-2">
                {roleSubtitle}
              </p>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-lg bg-black text-white font-bold flex items-center justify-center text-lg">
              n
            </div>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-2 overflow-y-auto space-y-1">
        <ul className="space-y-1">
          {visibleMenuItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard" || pathname === "/dashboard/dashboard-overview"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-[14px] transition-all font-medium",
                    isActive
                      ? "bg-[#EAECEF] text-zinc-950 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100",
                    collapsed && "justify-center px-2 py-3"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className={cn("w-[18px] h-[18px] shrink-0", isActive ? "text-zinc-900" : "text-zinc-500")} />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom collapse button matching screenshot */}
      <div className="p-4 border-t border-zinc-200 hidden lg:block">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center gap-2.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors w-full px-2 py-2 rounded-lg hover:bg-zinc-100 cursor-pointer",
            collapsed && "justify-center px-0"
          )}
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform shrink-0", collapsed && "rotate-180")} />
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white border border-zinc-200 shadow-sm text-zinc-700 hover:text-black"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block h-screen sticky top-0 transition-all duration-300 z-30 shrink-0",
          collapsed ? "w-20" : "w-[260px]"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 flex justify-end">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-zinc-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
      </aside>
    </>
  );
}
