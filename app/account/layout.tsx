import React from "react";
import { AnnouncementBar } from "../(landing)/_components/AnnouncementBar";
import { StoreHeader } from "../(landing)/_components/StoreHeader";
import { CategoryNav } from "../(landing)/_components/CategoryNav";
import { StoreFooter } from "../(landing)/_components/StoreFooter";
import { CartDrawer } from "../(landing)/_components/CartDrawer";
import { CustomerAccountNav } from "./_components/CustomerAccountNav";

export default function CustomerAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FBFBFC] flex flex-col font-sans text-neutral-900">
      <AnnouncementBar />
      <StoreHeader />
      <CategoryNav />

      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <CustomerAccountNav />
          <div className="flex-1 w-full min-w-0">{children}</div>
        </div>
      </main>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
}
