'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';

type DirectorySegmentTab =
  | 'All customers'
  | 'VIP customers'
  | 'Inactive > 60 days'
  | 'Needs follow-up';

type CustomerSegment =
  | 'VIP'
  | 'Gadget buyer'
  | 'Repeat buyer'
  | 'New customer'
  | 'Home buyer'
  | 'Inactive';

type MarketingStatus = 'Opted in' | 'Opted out';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  ltv: number;
  segment: CustomerSegment;
  marketing: MarketingStatus;
  needsFollowUp?: boolean;
}

const SEGMENT_TABS: { label: DirectorySegmentTab; count: string }[] = [
  { label: 'All customers', count: '1,284' },
  { label: 'VIP customers', count: '86' },
  { label: 'Inactive > 60 days', count: '214' },
  { label: 'Needs follow-up', count: '32' },
];

const TAG_FILTERS = [
  'All tags',
  'VIP',
  'Gadget buyer',
  'Repeat buyer',
  'New customer',
  'Home buyer',
  'Inactive',
];

const OPT_IN_FILTERS: ('Opt-in status' | MarketingStatus)[] = [
  'Opt-in status',
  'Opted in',
  'Opted out',
];

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'c-1',
    name: 'Ayesha Rahman',
    email: 'ayesha.rahman@email.com',
    phone: '01712 345678',
    ordersCount: 8,
    ltv: 24680,
    segment: 'VIP',
    marketing: 'Opted in',
    needsFollowUp: false,
  },
  {
    id: 'c-2',
    name: 'Rafiqul Islam',
    email: 'rafiqul.islam@email.com',
    phone: '01823 456789',
    ordersCount: 3,
    ltv: 8540,
    segment: 'Gadget buyer',
    marketing: 'Opted in',
    needsFollowUp: true,
  },
  {
    id: 'c-3',
    name: 'Nusrat Jahan',
    email: 'nusrat.jahan@email.com',
    phone: '01934 567890',
    ordersCount: 6,
    ltv: 18420,
    segment: 'Repeat buyer',
    marketing: 'Opted out',
    needsFollowUp: false,
  },
  {
    id: 'c-4',
    name: 'Tanvir Ahmed',
    email: 'tanvir.ahmed@email.com',
    phone: '01645 678901',
    ordersCount: 1,
    ltv: 3570,
    segment: 'New customer',
    marketing: 'Opted in',
    needsFollowUp: true,
  },
  {
    id: 'c-5',
    name: 'Farhana Akter',
    email: 'farhana.akter@email.com',
    phone: '01756 789012',
    ordersCount: 4,
    ltv: 9760,
    segment: 'Home buyer',
    marketing: 'Opted in',
    needsFollowUp: false,
  },
  {
    id: 'c-6',
    name: 'Shamim Hossain',
    email: 'shamim.hossain@email.com',
    phone: '01867 890123',
    ordersCount: 2,
    ltv: 6890,
    segment: 'Inactive',
    marketing: 'Opted out',
    needsFollowUp: true,
  },
];

function formatBDT(amount: number) {
  return `৳${amount.toLocaleString('en-US')}`;
}

export default function CustomerDirectoryPage() {
  const [customers, setCustomers] =
    useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [activeTab, setActiveTab] =
    useState<DirectorySegmentTab>('All customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All tags');
  const [selectedOptIn, setSelectedOptIn] = useState<
    'Opt-in status' | MarketingStatus
  >('Opt-in status');

  const [openDropdown, setOpenDropdown] = useState<'tags' | 'optin' | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [1, 2, 3, '...', 25] as const;

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        customer.name.toLowerCase().includes(q) ||
        customer.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, '')) ||
        customer.phone.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q);

      const matchesTab =
        activeTab === 'All customers' ||
        (activeTab === 'VIP customers' && customer.segment === 'VIP') ||
        (activeTab === 'Inactive > 60 days' &&
          customer.segment === 'Inactive') ||
        (activeTab === 'Needs follow-up' && Boolean(customer.needsFollowUp));

      const matchesTag =
        selectedTag === 'All tags' || customer.segment === selectedTag;

      const matchesOptIn =
        selectedOptIn === 'Opt-in status' ||
        customer.marketing === selectedOptIn;

      return matchesSearch && matchesTab && matchesTag && matchesOptIn;
    });
  }, [customers, searchQuery, activeTab, selectedTag, selectedOptIn]);

  const handleDeleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const handleExportCSV = () => {
    const headers = [
      'Customer',
      'Email',
      'Phone',
      'Orders',
      'LTV',
      'Segment',
      'Marketing',
    ];
    const rows = filteredCustomers.map((c) => [
      `"${c.name}"`,
      c.email,
      `"${c.phone}"`,
      c.ordersCount,
      c.ltv,
      `"${c.segment}"`,
      `"${c.marketing}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customer-directory.csv';
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
              Customer directory
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              One customer view. More meaningful connections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-100/95 px-5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
            >
              Export CSV
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-md bg-[#111111] px-5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
            >
              + Add customer
            </button>
          </div>
        </header>

        {/* 2. SEGMENT FILTER TABS (4-BLOCK ROW) */}
        <section
          aria-label="Customer segments"
          className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SEGMENT_TABS.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`flex h-12 items-center gap-2 rounded-md px-4 text-left text-xs transition-colors ${
                  isActive
                    ? 'bg-[#111111] font-semibold text-white'
                    : 'bg-neutral-100/85 font-semibold text-neutral-900 hover:bg-neutral-200/70'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={
                    isActive ? 'font-semibold text-white' : 'text-neutral-900'
                  }
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </section>

        {/* 3. SEARCH & FILTER TOOLBAR */}
        <section
          aria-label="Search and filter customers"
          className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* Search Input */}
          <div className="sm:col-span-2 lg:col-span-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, phone or email..."
              className="h-11 w-full rounded-md bg-neutral-100/85 px-4 text-xs font-medium text-neutral-900 placeholder:text-neutral-600 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>

          {/* Tags Dropdown */}
          <div className="relative lg:col-span-2">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'tags' ? null : 'tags'))
              }
              className="flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/85 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/70"
            >
              <span className="truncate">
                {selectedTag === 'All tags' ? 'Tags' : selectedTag}
              </span>
              <ArrowDown
                className="h-3.5 w-3.5 shrink-0 text-neutral-700"
                strokeWidth={2}
              />
            </button>

            {openDropdown === 'tags' && (
              <div className="absolute left-0 z-20 mt-1.5 w-44 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {TAG_FILTERS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(tag);
                      setOpenDropdown(null);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                      selectedTag === tag
                        ? 'font-semibold text-neutral-950'
                        : 'text-neutral-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Opt-in Status Dropdown */}
          <div className="relative lg:col-span-2">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'optin' ? null : 'optin'))
              }
              className="flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/85 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/70"
            >
              <span className="truncate">{selectedOptIn}</span>
              <ArrowDown
                className="h-3.5 w-3.5 shrink-0 text-neutral-700"
                strokeWidth={2}
              />
            </button>

            {openDropdown === 'optin' && (
              <div className="absolute left-0 z-20 mt-1.5 w-44 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {OPT_IN_FILTERS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setSelectedOptIn(status);
                      setOpenDropdown(null);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                      selectedOptIn === status
                        ? 'font-semibold text-neutral-950'
                        : 'text-neutral-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. CUSTOMER TABLE & PAGINATION */}
        <section
          aria-label="Customer list"
          className="rounded-lg border border-neutral-200/90 bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200/80 text-xs font-normal text-neutral-500">
                  <th className="py-4 pl-6 pr-4 font-normal">Customer</th>
                  <th className="px-4 py-4 font-normal">Phone</th>
                  <th className="px-4 py-4 font-normal">Orders / LTV</th>
                  <th className="px-4 py-4 font-normal">Segment</th>
                  <th className="px-4 py-4 font-normal">Marketing</th>
                  <th className="py-4 pl-4 pr-6 font-normal">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200/80 text-xs sm:text-[13px]">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="transition-colors hover:bg-neutral-50/70"
                    >
                      <td className="whitespace-nowrap py-4 pl-6 pr-4 font-bold text-neutral-950">
                        {customer.name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-500">
                        {customer.phone}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-500">
                        <span>{customer.ordersCount}</span>
                        <span className="mx-1.5 text-neutral-400">/</span>
                        <span>{formatBDT(customer.ltv)}</span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span className="inline-block min-w-[104px] rounded bg-neutral-100/90 px-3 py-1.5 text-left text-xs font-semibold text-neutral-900">
                          {customer.segment}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {customer.marketing === 'Opted in' ? (
                          <span className="inline-block min-w-[104px] rounded bg-neutral-100/90 px-3 py-1.5 text-left text-xs font-semibold text-neutral-900">
                            Opted in
                          </span>
                        ) : (
                          <span className="inline-block px-1 py-1.5 text-xs font-normal text-neutral-400">
                            Opted out
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap py-4 pl-4 pr-6">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/customers/${customer.id}`}
                            aria-label={`View ${customer.name}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </Link>

                          <button
                            type="button"
                            aria-label={`Edit ${customer.name}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                          >
                            <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteCustomer(customer.id)}
                            aria-label={`Delete ${customer.name}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
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
                      No customers match your current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer & Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200/80 px-6 py-4 text-xs sm:flex-row">
            <p className="text-neutral-500">
              Showing {filteredCustomers.length} of 1,284 customers
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