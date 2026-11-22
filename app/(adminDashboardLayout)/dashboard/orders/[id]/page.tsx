'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

type OrderStep = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';

interface OrderLineItem {
  id: string;
  title: string;
  variantSku: string;
  quantity: number;
  price: number;
  image: string;
}

const ORDER_STEPS: OrderStep[] = [
  'Pending',
  'Confirmed',
  'Packed',
  'Shipped',
  'Delivered',
];

const COURIERS = [
  'Pathao Courier',
  'Steadfast Courier',
  'RedX',
  'eCourier',
  'Sundarban Courier',
];

const ORDER_ITEMS: OrderLineItem[] = [
  {
    id: 'item-1',
    title: 'Wireless ANC Headphones',
    variantSku: 'Sage green · NX-ANC01-SG',
    quantity: 1,
    price: 3490,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'item-2',
    title: '24-in-1 Precision Tool Kit',
    variantSku: '24-in-1 · NX-TLK03',
    quantity: 1,
    price: 1290,
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=200&q=80',
  },
];

function formatBDT(amount: number) {
  return `৳${amount.toLocaleString('en-US')}`;
}

export default function OrderDetailsPage() {
  const [currentStep, setCurrentStep] = useState<OrderStep>('Confirmed');
  const [courier, setCourier] = useState('Pathao Courier');
  const [isCourierOpen, setIsCourierOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [packageNote, setPackageNote] = useState(
    'Please call the customer before delivery. Handle with care.'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentStepIndex = ORDER_STEPS.indexOf(currentStep);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMarkAsPacked = () => {
    setCurrentStep('Packed');
    showToast('Order #NX-10482 marked as Packed.');
  };

  const handleSaveShipment = () => {
    showToast(
      `Shipment saved (${courier}${
        trackingNumber ? ` · ${trackingNumber}` : ''
      }).`
    );
  };

  const subtotal = 4780;
  const delivery = 80;
  const discount = 200;
  const total = subtotal + delivery - discount;

  return (
    <main className="min-h-screen px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full space-y-5">
        {/* 1. TOP HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
              Order #NX-10482
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Placed 22 October 2025, 10:42 AM · Guest checkout
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {toastMessage && (
              <span className="rounded-md bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-800">
                {toastMessage}
              </span>
            )}

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center rounded-md bg-neutral-100/95 px-4 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
            >
              Print invoice
            </button>

            <button
              type="button"
              onClick={handleMarkAsPacked}
              className="inline-flex items-center justify-center rounded-md bg-[#111111] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Mark as packed
            </button>
          </div>
        </header>

        {/* 2. ORDER STATUS STEPPER BAR */}
        <section
          aria-label="Order progress"
          className="rounded-lg border border-neutral-200/90 bg-white px-5 py-5 sm:px-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 sm:justify-start sm:gap-x-16 lg:gap-x-28">
            {ORDER_STEPS.map((step, index) => {
              const isCompletedOrCurrent = index <= currentStepIndex;
              const isCurrent = step === currentStep;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(step)}
                  className="inline-flex items-center gap-2 text-xs focus:outline-none"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      isCompletedOrCurrent
                        ? 'bg-[#111111]'
                        : 'border border-neutral-400 bg-white'
                    }`}
                  />
                  <span
                    className={
                      isCurrent
                        ? 'font-bold text-neutral-950'
                        : isCompletedOrCurrent
                        ? 'font-medium text-neutral-700'
                        : 'font-normal text-neutral-500'
                    }
                  >
                    {step}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-3.5 text-xs text-neutral-400">
            Confirmed by Rafi Hassan · Today, 10:58 AM
          </p>
        </section>

        {/* 3. MAIN TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* LEFT COLUMN (~66% / 8 cols) */}
          <div className="space-y-5 lg:col-span-8">
            {/* Items Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Items ({ORDER_ITEMS.length})
              </h2>

              <div className="mt-5 divide-y divide-neutral-100">
                {ORDER_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-neutral-950 sm:text-[13px]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-neutral-400">
                          {item.variantSku}
                        </p>
                      </div>
                    </div>

                    <div className="self-end text-xs font-medium text-neutral-800 sm:self-center sm:text-[13px]">
                      {item.quantity} × {formatBDT(item.price)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fulfillment Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Fulfillment
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Courier Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-neutral-900">
                    Courier
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCourierOpen((prev) => !prev)}
                    className="mt-2 flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-500 transition-colors hover:bg-neutral-100"
                  >
                    <span>
                      {courier} <span className="ml-0.5 text-neutral-600">↓</span>
                    </span>
                  </button>

                  {isCourierOpen && (
                    <div className="absolute left-0 z-20 mt-1.5 w-full rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                      {COURIERS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setCourier(c);
                            setIsCourierOpen(false);
                          }}
                          className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                            courier === c
                              ? 'font-semibold text-neutral-950'
                              : 'text-neutral-600'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tracking Number */}
                <div>
                  <label
                    htmlFor="tracking-number"
                    className="block text-xs font-semibold text-neutral-900"
                  >
                    Tracking number
                  </label>
                  <input
                    id="tracking-number"
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  />
                </div>
              </div>

              {/* Package Note */}
              <div className="mt-5">
                <label
                  htmlFor="package-note"
                  className="block text-xs font-semibold text-neutral-900"
                >
                  Package note
                </label>
                <input
                  id="package-note"
                  type="text"
                  value={packageNote}
                  onChange={(e) => setPackageNote(e.target.value)}
                  className="mt-2 w-full bg-transparent text-xs text-neutral-500 focus:text-neutral-800 focus:outline-none"
                />
              </div>

              {/* Save Shipment Button */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleSaveShipment}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#111111] px-5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Save shipment
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (~34% / 4 cols) */}
          <div className="space-y-5 lg:col-span-4">
            {/* Customer Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Customer
              </h2>

              <div className="mt-4">
                <a
                  href="#customer-profile"
                  className="inline-flex items-center gap-1 text-xs font-bold text-neutral-950 hover:underline sm:text-[13px]"
                >
                  <span>Ayesha Rahman</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-800" />
                </a>

                <div className="mt-2 space-y-0.5 text-xs text-neutral-400">
                  <p>01712 345678</p>
                  <p>ayesha.rahman@email.com</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold text-neutral-900">
                  Delivery address
                </h3>
                <address className="mt-2.5 not-italic leading-relaxed text-xs text-neutral-400">
                  <p>House 24, Road 8</p>
                  <p>Dhanmondi, Dhaka 1209</p>
                  <p>Bangladesh</p>
                </address>
              </div>
            </section>

            {/* Payment Summary Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Payment summary
              </h2>

              <div className="mt-5 max-w-[230px] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-neutral-400">{formatBDT(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Delivery</span>
                  <span className="text-neutral-400">{formatBDT(delivery)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">WELCOME200</span>
                  <span className="text-neutral-400">-{formatBDT(discount)}</span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-sm font-bold text-neutral-950">
                    Total
                  </span>
                  <span className="text-base font-bold text-neutral-950">
                    {formatBDT(total)}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <span className="inline-block rounded bg-neutral-100/90 px-3 py-1.5 text-[11px] font-semibold text-neutral-800">
                  COD · Unpaid
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}