'use client';

import { useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Eye,
} from 'lucide-react';

type OrderStatus = 'Confirmed' | 'Pending' | 'Shipped';

interface OrderItem {
  id: string;
  customer: string;
  itemsCount: number;
  total: string;
  status: OrderStatus;
}

const DATE_RANGES = ['Last 30 days', 'Last 7 days', 'Last 90 days', 'This year'];

const KPI_STATS = [
  {
    id: 'revenue',
    label: 'Total revenue',
    value: '৳284,650',
    subtext: '18.4% vs last month',
    hasArrow: true,
  },
  {
    id: 'orders',
    label: 'Orders',
    value: '148',
    subtext: '12.1% vs last month',
    hasArrow: true,
  },
  {
    id: 'customers',
    label: 'Customers',
    value: '1,284',
    subtext: '8.2% vs last month',
    hasArrow: true,
  },
  {
    id: 'follow-ups',
    label: 'Follow-ups due',
    value: '12',
    subtext: '3 need your attention',
    hasArrow: false,
  },
];

const CHART_DATA = [
  { date: '01 Oct', revenue: 11, orders: 5 },
  { date: '', revenue: 21, orders: 9 },
  { date: '05 Oct', revenue: 14, orders: 7 },
  { date: '', revenue: 48, orders: 18 },
  { date: '10 Oct', revenue: 39, orders: 15 },
  { date: '', revenue: 58, orders: 22 },
  { date: '15 Oct', revenue: 43, orders: 17 },
  { date: '', revenue: 70, orders: 28 },
  { date: '20 Oct', revenue: 60, orders: 24 },
  { date: '', revenue: 81, orders: 32 },
  { date: '25 Oct', revenue: 74, orders: 29 },
  { date: '', revenue: 88, orders: 35 },
  { date: '', revenue: 79, orders: 31 },
  { date: '', revenue: 94, orders: 39 },
];

const ATTENTION_ITEMS = [
  { id: '1', label: '8 products running low', href: '#low-stock' },
  { id: '2', label: '5 orders to confirm', href: '#pending-orders' },
  { id: '3', label: '3 overdue follow-ups', href: '#follow-ups' },
  { id: '4', label: '2 shipments arriving soon', href: '#shipments' },
];

const RECENT_ORDERS: OrderItem[] = [
  {
    id: '#NX-10482',
    customer: 'Ayesha Rahman',
    itemsCount: 2,
    total: '৳4,660',
    status: 'Confirmed',
  },
  {
    id: '#NX-10481',
    customer: 'Rafiqul Islam',
    itemsCount: 1,
    total: '৳2,270',
    status: 'Pending',
  },
  {
    id: '#NX-10480',
    customer: 'Nusrat Jahan',
    itemsCount: 3,
    total: '৳6,440',
    status: 'Shipped',
  },
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  Confirmed: 'bg-neutral-100 text-neutral-900 font-semibold',
  Pending: 'bg-[#F6E9D2] text-[#B87D1E] font-medium',
  Shipped: 'bg-neutral-100 text-neutral-900 font-semibold',
};

export default function BusinessOverviewPage() {
  // Header Date Filter State
  const [selectedRange, setSelectedRange] = useState(DATE_RANGES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Chart Metric State
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'orders'>('revenue');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [1, 2, 3, '...', 25] as const;

  // Chart Calculation
  const width = 640;
  const height = 185;
  const maxVal = activeMetric === 'revenue' ? 100 : 45;

  const polylinePoints = CHART_DATA.map((point, index) => {
    const val = activeMetric === 'revenue' ? point.revenue : point.orders;
    const x = (index / (CHART_DATA.length - 1)) * width;
    const y = height - (val / maxVal) * height;
    return `${x},${y}`;
  }).join(' ');

  const yLabels =
    activeMetric === 'revenue'
      ? ['90k', '60k', '30k', '0']
      : ['40', '25', '10', '0'];
  const xLabels = ['01 Oct', '05 Oct', '10 Oct', '15 Oct', '20 Oct', '25 Oct'];

  return (
    <main className="min-h-screen px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full space-y-5">
        {/* 1. HEADER SECTION */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
              Business overview
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Your store at a glance. Make every day a little smarter.
            </p>
          </div>

          <div className="relative self-start">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-2.5 rounded-md bg-neutral-100 px-4 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
            >
              <span>{selectedRange}</span>
              <ArrowDown className="h-3.5 w-3.5 text-neutral-700" strokeWidth={2} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-20 mt-1.5 w-40 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {DATE_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      setSelectedRange(range);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                      selectedRange === range
                        ? 'font-semibold text-neutral-950'
                        : 'text-neutral-600'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* 2. KPI CARDS GRID */}
        <section
          aria-label="Key Performance Indicators"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {KPI_STATS.map((stat) => (
            <div
              key={stat.id}
              className="rounded-lg border border-neutral-200/90 bg-white px-5 py-5 transition-colors hover:border-neutral-300"
            >
              <p className="text-xs font-normal text-neutral-500">{stat.label}</p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 sm:text-[26px]">
                {stat.value}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-neutral-700">
                {stat.hasArrow && (
                  <ArrowUp className="h-3 w-3 text-neutral-800" strokeWidth={2.2} />
                )}
                <span>{stat.subtext}</span>
              </div>
            </div>
          ))}
        </section>

        {/* 3. MIDDLE ASYMMETRIC SPLIT (CHART + NEEDS ATTENTION) */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Revenue Overview Chart Card */}
          <div className="flex flex-col justify-between rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Revenue overview
              </h2>

              <div className="flex items-center gap-5 text-xs font-medium text-neutral-900">
                <button
                  type="button"
                  onClick={() => setActiveMetric('revenue')}
                  className="inline-flex items-center gap-2 focus:outline-none"
                >
                  <span>Revenue</span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      activeMetric === 'revenue'
                        ? 'bg-neutral-950'
                        : 'border border-neutral-800 bg-transparent'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMetric('orders')}
                  className="inline-flex items-center gap-2 focus:outline-none"
                >
                  <span>Orders</span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      activeMetric === 'orders'
                        ? 'bg-neutral-950'
                        : 'border border-neutral-800 bg-transparent'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-stretch gap-3">
              {/* Y-Axis */}
              <div className="flex flex-col justify-between pb-1 pt-2 text-[11px] text-neutral-400">
                {yLabels.map((label) => (
                  <span key={label} className="leading-none">
                    {label}
                  </span>
                ))}
              </div>

              {/* Chart Plot & X-Axis */}
              <div className="flex-1 overflow-hidden">
                <div className="relative h-44 w-full border border-neutral-200/80 sm:h-48">
                  <div className="absolute inset-x-0 top-[10%] border-t border-neutral-100" />
                  <div className="absolute inset-x-0 top-[38%] border-t border-neutral-100" />
                  <div className="absolute inset-x-0 top-[66%] border-t border-neutral-100" />
                  <div className="absolute inset-x-0 bottom-[6%] border-t border-neutral-100" />

                  <svg
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="none"
                    className="relative z-10 h-full w-full overflow-visible"
                  >
                    <polyline
                      fill="none"
                      stroke="#111111"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      points={polylinePoints}
                    />
                  </svg>
                </div>

                {/* X-Axis */}
                <div className="mt-3 grid grid-cols-6 gap-1 pr-12 text-[11px] text-neutral-500 sm:pr-28">
                  {xLabels.map((date) => (
                    <span key={date} className="truncate">
                      {date}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Needs Attention Card */}
          <div className="flex flex-col rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6 lg:col-span-4">
            <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
              Needs attention
            </h2>

            <ul className="mt-5 flex flex-1 flex-col justify-between gap-4">
              {ATTENTION_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="group flex items-center justify-between py-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600"
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      className="h-4 w-4 text-neutral-800 transition-transform duration-150 group-hover:translate-x-1"
                      strokeWidth={1.8}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. RECENT ORDERS TABLE & PAGINATION */}
        <section
          aria-label="Recent Orders"
          className="rounded-lg border border-neutral-200/90 bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200/80 text-xs font-normal text-neutral-500">
                  <th className="py-4 pl-6 pr-4 font-normal">Order</th>
                  <th className="px-4 py-4 font-normal">Customer</th>
                  <th className="px-4 py-4 font-normal">Items</th>
                  <th className="px-4 py-4 font-normal">Total</th>
                  <th className="px-4 py-4 font-normal">Status</th>
                  <th className="py-4 pl-4 pr-6 text-left font-normal">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200/80 text-xs sm:text-[13px]">
                {RECENT_ORDERS.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-neutral-50/70"
                  >
                    <td className="whitespace-nowrap py-4 pl-6 pr-4 font-bold text-neutral-950">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-neutral-600">
                      {order.customer}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-neutral-600">
                      {order.itemsCount}{' '}
                      {order.itemsCount === 1 ? 'item' : 'items'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-neutral-700">
                      {order.total}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`inline-block min-w-[104px] rounded px-3 py-1.5 text-left text-xs ${
                          STATUS_STYLES[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-6">
                      <button
                        type="button"
                        aria-label={`View details for ${order.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                      >
                        <Eye className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer & Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200/80 px-6 py-4 text-xs sm:flex-row">
            <p className="text-neutral-500">
              Showing {RECENT_ORDERS.length} of 148 orders
            </p>

            <nav aria-label="Pagination" className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
                disabled={currentPage === 1}
                className="p-1 text-neutral-700 transition-colors hover:text-neutral-950 disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
              </button>

              <div className="flex items-center gap-2.5">
                {pages.map((page, idx) =>
                  page === '...' ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-0.5 text-neutral-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`px-1 transition-colors ${
                        currentPage === page
                          ? 'font-bold text-neutral-950'
                          : 'font-normal text-neutral-600 hover:text-neutral-950'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(25, p + 1))}
                aria-label="Next page"
                disabled={currentPage === 25}
                className="p-1 text-neutral-700 transition-colors hover:text-neutral-950 disabled:opacity-40"
              >
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
}