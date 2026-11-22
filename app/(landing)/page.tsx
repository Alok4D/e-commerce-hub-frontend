"use client";

import React from "react";
import { AnnouncementBar } from "./_components/AnnouncementBar";
import { StoreHeader } from "./_components/StoreHeader";
import { CategoryNav } from "./_components/CategoryNav";
import { HeroBanner } from "./_components/HeroBanner";
import { ShoppingPromises } from "./_components/ShoppingPromises";
import { ShopByCategory } from "./_components/ShopByCategory";
import { FreshFindsGrid } from "./_components/FreshFindsGrid";
import { IncomingShipmentsBanner } from "./_components/IncomingShipmentsBanner";
import { ValueProps } from "./_components/ValueProps";
import { StoreFooter } from "./_components/StoreFooter";
import { CartDrawer } from "./_components/CartDrawer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Store Navigation */}
      <StoreHeader />

      {/* 3. Category Horizontal Bar */}
      <CategoryNav />

      {/* 4. Hero Section */}
      <HeroBanner />

      {/* 5. 4 Shopping Promises (Trust Strip) */}
      <ShoppingPromises />

      {/* 6. Shop by Category (5 Numbered Cards) */}
      <ShopByCategory />

      {/* 7. Fresh Finds, Just Landed (Product Grid) */}
      <FreshFindsGrid />

      {/* 8. Incoming Shipments / Pre-Orders */}
      <IncomingShipmentsBanner />

      {/* 9. Value Pillars (Why Nexora) */}
      <ValueProps />

      {/* 10. Store Footer */}
      <StoreFooter />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer />
    </div>
  );
}
