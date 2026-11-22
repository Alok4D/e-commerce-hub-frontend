'use client';

import { useState, useMemo } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

type ProductStatus = 'Active' | 'Low stock' | 'Pre-order' | 'Out of stock' | 'Draft';

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  availableText: string;
  status: ProductStatus;
  isDeleteRed?: boolean;
}

const CATEGORIES = [
  'All categories',
  'Electronics / Audio',
  'Home / Lighting',
  'Tools / Precision',
  'Kitchen / Appliances',
  'Electronics / Video',
  'Electronics / Accessories',
];

const STATUS_FILTERS: ('Stock status' | ProductStatus)[] = [
  'Stock status',
  'Active',
  'Low stock',
  'Pre-order',
  'Out of stock',
  'Draft',
];

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: 'Wireless ANC Headphones',
    sku: 'NX-ANC01',
    category: 'Electronics / Audio',
    price: 3490,
    availableText: '38 units',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Rechargeable Desk Lamp',
    sku: 'NX-LMP02',
    category: 'Home / Lighting',
    price: 1850,
    availableText: '8 units',
    status: 'Low stock',
  },
  {
    id: '3',
    name: '24-in-1 Precision Tool Kit',
    sku: 'NX-TLK03',
    category: 'Tools / Precision',
    price: 1290,
    availableText: '64 units',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Portable Juice Blender',
    sku: 'NX-BLD04',
    category: 'Kitchen / Appliances',
    price: 2190,
    availableText: '27 units',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Mini Smart Projector',
    sku: 'NX-PRJ05',
    category: 'Electronics / Video',
    price: 8490,
    availableText: '0 units',
    status: 'Pre-order',
  },
  {
    id: '6',
    name: 'Compact Electric Kettle',
    sku: 'NX-KTL06',
    category: 'Kitchen / Appliances',
    price: 2450,
    availableText: '0 units',
    status: 'Out of stock',
  },
  {
    id: '7',
    name: 'USB-C Charging Hub',
    sku: 'NX-HUB07',
    category: 'Electronics / Accessories',
    price: 1590,
    availableText: 'Draft',
    status: 'Draft',
    isDeleteRed: true,
  },
];

const STATUS_BADGE_STYLES: Record<ProductStatus, string> = {
  Active: 'bg-neutral-100 text-neutral-900 font-semibold',
  'Low stock': 'bg-[#F6E9D2] text-[#B87D1E] font-medium',
  'Pre-order': 'bg-neutral-100 text-neutral-900 font-semibold',
  'Out of stock': 'bg-neutral-100 text-neutral-900 font-semibold',
  Draft: 'bg-neutral-100 text-neutral-900 font-semibold',
};

function formatBDT(amount: number) {
  return `৳${amount.toLocaleString('en-US')}`;
}

export default function ProductInventoryPage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedStatus, setSelectedStatus] = useState<'Stock status' | ProductStatus>('Stock status');

  const [openDropdown, setOpenDropdown] = useState<'category' | 'status' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [1, 2, 3, '...', 25] as const;

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All categories' || item.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'Stock status' || item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ['Product', 'SKU', 'Category', 'Price', 'Available', 'Status'];
    const rows = filteredProducts.map((p) => [
      `"${p.name}"`,
      p.sku,
      `"${p.category}"`,
      p.price,
      `"${p.availableText}"`,
      p.status,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'product-inventory.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen  px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full space-y-5">
        {/* 1. HEADER SECTION */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
              Product inventory
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Manage your catalog, stock and incoming shipments.
            </p>
          </div>

         <Link href={"products/add-product"}>
          <button
            type="button"
            className="inline-flex items-center justify-center self-start rounded-md bg-[#111111] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
          >
            + Add product
          </button>
         </Link>
        </header>

        {/* 2. FILTER & ACTION TOOLBAR */}
        <section
          aria-label="Inventory filters"
          className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* Search Input */}
          <div className="sm:col-span-2 lg:col-span-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or SKU..."
              className="h-11 w-full rounded-md bg-neutral-100/90 px-4 text-xs text-neutral-900 placeholder:text-neutral-500 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>

          {/* All Categories Dropdown */}
          <div className="relative lg:col-span-2">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'category' ? null : 'category'))
              }
              className="flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/90 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/70"
            >
              <span className="truncate">{selectedCategory}</span>
              <ArrowDown className="h-3.5 w-3.5 shrink-0 text-neutral-700" strokeWidth={2} />
            </button>

            {openDropdown === 'category' && (
              <div className="absolute left-0 z-20 mt-1.5 w-56 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenDropdown(null);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                      selectedCategory === category
                        ? 'font-semibold text-neutral-950'
                        : 'text-neutral-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stock Status Dropdown */}
          <div className="relative lg:col-span-2">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'status' ? null : 'status'))
              }
              className="flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/90 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/70"
            >
              <span className="truncate">{selectedStatus}</span>
              <ArrowDown className="h-3.5 w-3.5 shrink-0 text-neutral-700" strokeWidth={2} />
            </button>

            {openDropdown === 'status' && (
              <div className="absolute left-0 z-20 mt-1.5 w-44 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {STATUS_FILTERS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(status);
                      setOpenDropdown(null);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                      selectedStatus === status
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

          {/* Export CSV Button */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex h-11 w-full items-center justify-center rounded-md bg-neutral-100/90 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/70 sm:w-auto lg:w-full"
            >
              Export CSV
            </button>
          </div>
        </section>

        {/* 3. INVENTORY TABLE & PAGINATION */}
        <section
          aria-label="Product inventory table"
          className="rounded-lg border border-neutral-200/90 bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200/80 text-xs font-normal text-neutral-500">
                  <th className="py-4 pl-6 pr-4 font-normal">Product / SKU</th>
                  <th className="px-4 py-4 font-normal">Category</th>
                  <th className="px-4 py-4 font-normal">Price</th>
                  <th className="px-4 py-4 font-normal">Available</th>
                  <th className="px-4 py-4 font-normal">Status</th>
                  <th className="py-4 pl-4 pr-6 font-normal">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200/80 text-xs sm:text-[13px]">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-neutral-50/70"
                    >
                      <td className="whitespace-nowrap py-4 pl-6 pr-4">
                        <div className="font-bold text-neutral-950">
                          {product.name}
                        </div>
                        <div className="mt-0.5 text-xs font-semibold text-neutral-900">
                          {product.sku}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-500">
                        {product.category}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-600">
                        {formatBDT(product.price)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-neutral-600">
                        {product.availableText}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-block min-w-[104px] rounded px-3 py-1.5 text-left text-xs ${
                            STATUS_BADGE_STYLES[product.status]
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap py-4 pl-4 pr-6">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/products/view/${product.id}`}
                            aria-label={`View ${product.name}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </Link>

                          <Link
                            href={`/dashboard/products/edit-product/${product.id}`}
                            aria-label={`Edit ${product.name}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"
                          >
                            <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            aria-label={`Delete ${product.name}`}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded border transition-colors cursor-pointer ${
                              product.isDeleteRed
                                ? 'border-red-300 bg-white text-red-500 hover:bg-red-50 hover:text-red-600'
                                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
                            }`}
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
                      No matching products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer & Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200/80 px-6 py-4 text-xs sm:flex-row">
            <p className="text-neutral-500">
              Showing {filteredProducts.length} of 248 products
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