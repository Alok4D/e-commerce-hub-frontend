'use client';

import { useState, useMemo } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Eye,
  MoreHorizontal,
  Pencil,
} from 'lucide-react';
import Link from 'next/link';
import {
  CancelOrderModal,
  CreateReturnModal,
} from '@/components/dashboard_component/TableActionModals';

type OrderStatusTab =
  | 'All orders'
  | 'Pending'
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Returns';

type RowStatus =
  | 'Confirmed'
  | 'Pending'
  | 'Shipped'
  | 'Packed'
  | 'Delivered'
  | 'Returned';

interface OrderRecord {
  id: string;
  dateLabel: string;
  customer: string;
  phone: string;
  payment: string;
  total: number;
  status: RowStatus;
}

const STATUS_TABS: { label: OrderStatusTab; count: number }[] = [
  { label: 'All orders', count: 148 },
  { label: 'Pending', count: 5 },
  { label: 'Confirmed', count: 18 },
  { label: 'Packed', count: 12 },
  { label: 'Shipped', count: 24 },
  { label: 'Delivered', count: 86 },
  { label: 'Returns', count: 3 },
];

const DATE_RANGES = ['Date range', 'Last 7 days', 'Last 30 days', 'This month'];

const PAYMENT_FILTERS = [
  'All payments',
  'Cash on delivery',
  'bKash · Paid',
  'Card · Paid',
  'bKash · Refunded',
];

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: '#NX-10482',
    dateLabel: '22 Oct',
    customer: 'Ayesha Rahman',
    phone: '01711000001',
    payment: 'Cash on delivery',
    total: 4660,
    status: 'Confirmed',
  },
  {
    id: '#NX-10481',
    dateLabel: '22 Oct',
    customer: 'Rafiqul Islam',
    phone: '01711000002',
    payment: 'bKash · Paid',
    total: 2270,
    status: 'Pending',
  },
  {
    id: '#NX-10480',
    dateLabel: '21 Oct',
    customer: 'Nusrat Jahan',
    phone: '01711000003',
    payment: 'Cash on delivery',
    total: 6440,
    status: 'Shipped',
  },
  {
    id: '#NX-10479',
    dateLabel: '21 Oct',
    customer: 'Tanvir Ahmed',
    phone: '01711000004',
    payment: 'Card · Paid',
    total: 3570,
    status: 'Packed',
  },
  {
    id: '#NX-10478',
    dateLabel: '21 Oct',
    customer: 'Farhana Akter',
    phone: '01711000005',
    payment: 'Cash on delivery',
    total: 1930,
    status: 'Delivered',
  },
  {
    id: '#NX-10477',
    dateLabel: '20 Oct',
    customer: 'Shamim Hossain',
    phone: '01711000006',
    payment: 'bKash · Refunded',
    total: 2530,
    status: 'Returned',
  },
];

const STATUS_BADGE_STYLES: Record<RowStatus, string> = {
  Confirmed: 'bg-neutral-100 text-neutral-900 font-semibold',
  Pending: 'bg-[#F6E9D2] text-[#B87D1E] font-medium',
  Shipped: 'bg-neutral-100 text-neutral-900 font-semibold',
  Packed: 'bg-neutral-100 text-neutral-900 font-semibold',
  Delivered: 'bg-neutral-100 text-neutral-900 font-semibold',
  Returned: 'bg-neutral-100 text-neutral-900 font-semibold',
};

function formatBDT(amount: number) {
  return `৳${amount.toLocaleString('en-US')}`;
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatusTab>('All orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState(DATE_RANGES[0]);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_FILTERS[0]);
  const [openDropdown, setOpenDropdown] = useState<'date' | 'filters' | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelTarget, setCancelTarget] = useState<OrderRecord | null>(null);
  const [returnTarget, setReturnTarget] = useState<OrderRecord | null>(null);
  const [actionMenuOrderId, setActionMenuOrderId] = useState<string | null>(null);

  const pages = [1, 2, 3, '...', 25] as const;

  const filteredOrders = useMemo(() => {
    return INITIAL_ORDERS.filter((order) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.phone.includes(q);

      const matchesTab =
        activeTab === 'All orders' ||
        (activeTab === 'Returns' && order.status === 'Returned') ||
        order.status === activeTab;

      const matchesPayment =
        selectedPayment === 'All payments' ||
        order.payment === selectedPayment;

      return matchesSearch && matchesTab && matchesPayment;
    });
  }, [searchQuery, activeTab, selectedPayment]);

  const handleExportOrders = () => {
    const headers = ['Order ID', 'Date', 'Customer', 'Payment', 'Total', 'Status'];
    const rows = filteredOrders.map((o) => [
      o.id,
      `"${o.dateLabel}"`,
      `"${o.customer}"`,
      `"${o.payment}"`,
      o.total,
      o.status,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orders-export.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full space-y-5">
        {/* 1. TOP HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
              Orders
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              From first confirmation to the doorstep.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportOrders}
            className="inline-flex items-center justify-center self-start rounded-md bg-neutral-100/95 px-4 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
          >
            Export orders
          </button>
        </header>

        {/* 2. STATUS SUMMARY TABS */}
        <nav
          aria-label="Order status filters"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-0.5 text-xs"
        >
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'font-bold text-neutral-950'
                    : 'font-normal text-neutral-600 hover:text-neutral-950'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={
                    isActive
                      ? 'font-bold text-neutral-950'
                      : 'font-normal text-neutral-500'
                  }
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* 3. SEARCH & FILTER TOOLBAR */}
        <section
          aria-label="Search and filter orders"
          className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* Search Input */}
          <div className="sm:col-span-2 lg:col-span-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order, name or phone..."
              className="h-11 w-full rounded-md bg-neutral-100/90 px-4 text-xs text-neutral-900 placeholder:text-neutral-500 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>

          {/* Date Range Dropdown */}
          <div className="relative lg:col-span-2">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'date' ? null : 'date'))
              }
              className="flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/90 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/70"
            >
              <span className="truncate">{selectedDateRange}</span>
              <ArrowDown
                className="h-3.5 w-3.5 shrink-0 text-neutral-700"
                strokeWidth={2}
              />
            </button>

            {openDropdown === 'date' && (
              <div className="absolute left-0 z-20 mt-1.5 w-44 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {DATE_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      setSelectedDateRange(range);
                      setOpenDropdown(null);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                      selectedDateRange === range
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

          {/* More Filters Dropdown */}
          <div className="relative lg:col-span-2">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) =>
                  prev === 'filters' ? null : 'filters'
                )
              }
              className="flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/90 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/70"
            >
              <span className="truncate">
                {selectedPayment === 'All payments'
                  ? 'More filters'
                  : selectedPayment}
              </span>
              <ArrowDown
                className="h-3.5 w-3.5 shrink-0 text-neutral-700"
                strokeWidth={2}
              />
            </button>

            {openDropdown === 'filters' && (
              <div className="absolute left-0 z-20 mt-1.5 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {PAYMENT_FILTERS.map((payment) => (
                  <button
                    key={payment}
                    type="button"
                    onClick={() => {
                      setSelectedPayment(payment);
                      setOpenDropdown(null);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                      selectedPayment === payment
                        ? 'font-semibold text-neutral-950'
                        : 'text-neutral-600'
                    }`}
                  >
                    {payment}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. ORDERS TABLE & PAGINATION */}
        <section
          aria-label="Orders list"
          className="rounded-lg border border-neutral-200/90 bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200/80 text-xs font-normal text-neutral-500">
                  <th className="py-4 pl-6 pr-4 font-normal">Order / Date</th>
                  <th className="px-4 py-4 font-normal">Customer</th>
                  <th className="px-4 py-4 font-normal">Payment</th>
                  <th className="px-4 py-4 font-normal">Total</th>
                  <th className="px-4 py-4 font-normal">Status</th>
                  <th className="py-4 pl-4 pr-6 font-normal">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200/80 text-xs sm:text-[13px]">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-neutral-50/70"
                    >
                      <td className="whitespace-nowrap py-4 pl-6 pr-4 text-neutral-950">
                        <span className="font-bold">{order.id}</span>
                        <span className="mx-1.5 font-normal text-neutral-800">
                          ·
                        </span>
                        <span className="font-semibold text-neutral-900">
                          {order.dateLabel}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-500">
                        {order.customer}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-600">
                        {order.payment}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-600">
                        {formatBDT(order.total)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-block min-w-[104px] rounded px-3 py-1.5 text-left text-xs ${
                            STATUS_BADGE_STYLES[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap py-4 pl-4 pr-6">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/orders/${order.id.replace('#', '')}`}
                            aria-label={`View order ${order.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </Link>

                          <button
                            type="button"
                            aria-label={`Edit order ${order.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                          >
                            <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActionMenuOrderId((prev) =>
                                  prev === order.id ? null : order.id
                                )
                              }
                              aria-label={`More actions for ${order.id}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"
                            >
                              <MoreHorizontal
                                className="h-3.5 w-3.5"
                                strokeWidth={1.75}
                              />
                            </button>

                            {actionMenuOrderId === order.id && (
                              <div className="absolute right-0 z-30 mt-1 w-48 rounded-lg border border-neutral-200 bg-white py-1.5 shadow-xl text-xs">
                                <Link
                                  href={`/dashboard/orders/${order.id.replace('#', '')}`}
                                  className="block px-3 py-1.5 text-neutral-800 hover:bg-neutral-50 font-medium"
                                  onClick={() => setActionMenuOrderId(null)}
                                >
                                  View order details
                                </Link>

                                {['Pending', 'Confirmed', 'Packed'].includes(order.status) && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCancelTarget(order);
                                      setActionMenuOrderId(null);
                                    }}
                                    className="w-full text-left px-3 py-1.5 text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                                  >
                                    Cancel order
                                  </button>
                                )}

                                {order.status === 'Delivered' && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setReturnTarget(order);
                                      setActionMenuOrderId(null);
                                    }}
                                    className="w-full text-left px-3 py-1.5 text-amber-700 hover:bg-amber-50 font-medium cursor-pointer"
                                  >
                                    Create return
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-xs text-neutral-500"
                    >
                      No orders match your current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer & Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200/80 px-6 py-4 text-xs sm:flex-row">
            <p className="text-neutral-500">
              Showing {filteredOrders.length} of 148 orders
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

        {/* SAFE ACTION CONFIRMATION MODALS (Figma Section 13) */}
        {cancelTarget && (
          <CancelOrderModal
            isOpen={Boolean(cancelTarget)}
            onClose={() => setCancelTarget(null)}
            orderId={cancelTarget.id}
            customerInfo={`${cancelTarget.customer} · ৳${cancelTarget.total.toLocaleString()} · ${cancelTarget.status} · ${cancelTarget.payment}`}
            onConfirm={() => {
              setCancelTarget(null);
            }}
          />
        )}

        {returnTarget && (
          <CreateReturnModal
            isOpen={Boolean(returnTarget)}
            onClose={() => setReturnTarget(null)}
            orderId={returnTarget.id}
            customerInfo={`${returnTarget.customer} · ৳${returnTarget.total.toLocaleString()} · Delivered`}
            onConfirm={() => {
              setReturnTarget(null);
            }}
          />
        )}
      </div>
    </main>
  );
}