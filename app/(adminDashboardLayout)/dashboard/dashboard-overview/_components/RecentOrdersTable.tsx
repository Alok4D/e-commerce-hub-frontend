'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import {
  RECENT_ORDERS,
  STATUS_STYLES,
  type OrderItem,
} from './overview-data';

interface RecentOrdersTableProps {
  orders?: OrderItem[];
  totalOrdersCount?: number;
  onViewOrder?: (orderId: string) => void;
}

export function RecentOrdersTable({
  orders = RECENT_ORDERS,
  totalOrdersCount = 148,
  onViewOrder,
}: RecentOrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [1, 2, 3, '...', 25] as const;

  return (
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
            {orders.map((order) => (
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
                    onClick={() => onViewOrder?.(order.id)}
                    aria-label={`View details for ${order.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"
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
          Showing {orders.length} of {totalOrdersCount} orders
        </p>

        <nav aria-label="Pagination" className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
            disabled={currentPage === 1}
            className="p-1 text-neutral-700 transition-colors hover:text-neutral-950 disabled:opacity-40 cursor-pointer"
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
                  className={`px-1 transition-colors cursor-pointer ${
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
            className="p-1 text-neutral-700 transition-colors hover:text-neutral-950 disabled:opacity-40 cursor-pointer"
          >
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </nav>
      </div>
    </section>
  );
}
