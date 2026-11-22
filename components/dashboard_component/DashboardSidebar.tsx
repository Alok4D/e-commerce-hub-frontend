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
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();

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

  const menuItems = [
    {
      title: "Overview",
      icon: LayoutGrid,
      href: "/dashboard",
    },
    {
      title: "Products",
      icon: FileText,
      href: "/dashboard/products",
    },
    {
      title: "Categories",
      icon: FileText,
      href: "/dashboard/categories",
    },
    {
      title: "Orders",
      icon: FileText,
      href: "/dashboard/orders",
    },
    {
      title: "Customers",
      icon: User,
      href: "/dashboard/customers",
    },
    {
      title: "Follow-ups",
      icon: Clock,
      href: "/dashboard/follow-ups",
    },
    {
      title: "Social publishing",
      icon: Share2,
      href: "/dashboard/social-publishing",
    },
    {
      title: "Campaigns",
      icon: Megaphone,
      href: "/dashboard/campaigns",
    },
    {
      title: "Team & settings",
      icon: Settings,
      href: "/dashboard/team-settings",
    },
  ];

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
                SUPER ADMIN
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
          {menuItems.map((item) => {
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
            "flex items-center gap-2.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors w-full px-2 py-2 rounded-lg hover:bg-zinc-100",
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
        className="lg:hidden fixed top-3.5 left-4 z-50 p-2 rounded-lg bg-black text-white shadow-md"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block h-screen transition-all duration-300 shrink-0",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10">
            {sidebarContent}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-3 text-zinc-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
