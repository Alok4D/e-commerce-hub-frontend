'use client';

import {
  OverviewHeader,
  KpiStatsGrid,
  RevenueChartCard,
  NeedsAttentionCard,
  RecentOrdersTable,
} from './_components';

export default function BusinessOverviewPage() {
  return (
    <main className="min-h-screen px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full space-y-5">
        {/* 1. Header with Date Filter */}
        <OverviewHeader />

        {/* 2. Key Performance Indicators (KPI) Cards */}
        <KpiStatsGrid />

        {/* 3. Middle Grid: Revenue Overview Chart & Needs Attention */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <RevenueChartCard />
          <NeedsAttentionCard />
        </section>

        {/* 4. Recent Orders Table with Status & Pagination */}
        <RecentOrdersTable />
      </div>
    </main>
  );
}
