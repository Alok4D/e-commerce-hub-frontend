'use client';

import { useState, useMemo } from 'react';
import { Check } from 'lucide-react';

type TimelineCategory = 'orders' | 'notes' | 'campaigns';
type TimelineTab = 'All activity' | 'Orders' | 'Notes' | 'Campaigns';

interface TimelineEntry {
  id: string;
  timestamp: string;
  title: string;
  subtitle: string;
  category: TimelineCategory;
}

const TIMELINE_TABS: TimelineTab[] = [
  'All activity',
  'Orders',
  'Notes',
  'Campaigns',
];

const INITIAL_TIMELINE: TimelineEntry[] = [
  {
    id: 't-1',
    timestamp: 'Today, 10:58 AM',
    title: 'Order #NX-10482 confirmed',
    subtitle: '2 items · ৳4,660 · Cash on delivery',
    category: 'orders',
  },
  {
    id: 't-2',
    timestamp: 'Today, 10:42 AM',
    title: 'Order placed via guest checkout',
    subtitle: 'Matched to existing profile by phone number.',
    category: 'orders',
  },
  {
    id: 't-3',
    timestamp: '18 Oct, 2:30 PM',
    title: 'Follow-up call · Rafi Hassan',
    subtitle: 'Happy with the desk lamp. Asked about headphones.',
    category: 'notes',
  },
  {
    id: 't-4',
    timestamp: '15 Oct, 9:00 AM',
    title: 'New arrivals campaign · Delivered',
    subtitle: 'WhatsApp · Audio collection · Marketing opted in',
    category: 'campaigns',
  },
  {
    id: 't-5',
    timestamp: '04 Oct, 11:20 AM',
    title: 'Post-delivery check-in completed',
    subtitle: 'Customer confirmed safe delivery.',
    category: 'notes',
  },
  {
    id: 't-6',
    timestamp: '01 Oct, 4:12 PM',
    title: 'Order #NX-09831 delivered',
    subtitle: 'Rechargeable Desk Lamp · ৳1,930',
    category: 'orders',
  },
];

export default function CustomerProfilePage() {
    
  const [activeTab, setActiveTab] = useState<TimelineTab>('All activity');
  const [timelineItems, setTimelineItems] =
    useState<TimelineEntry[]>(INITIAL_TIMELINE);

  // Profile editable fields
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [phone, setPhone] = useState('01712 345678');
  const [email, setEmail] = useState('ayesha.rahman@email.com');
  const [preferredChannel, setPreferredChannel] = useState('WhatsApp');
  const [addressLine1, setAddressLine1] = useState('House 24, Road 8');
  const [addressLine2, setAddressLine2] = useState('Dhanmondi, Dhaka 1209');
  const [internalNotes, setInternalNotes] = useState(
    'Prefers a call before delivery.\nInterested in new audio products.'
  );

  // Quick modal / inline action state
  const [actionMode, setActionMode] = useState<'interaction' | 'followup' | null>(
    null
  );
  const [actionText, setActionText] = useState('');

  const filteredTimeline = useMemo(() => {
    if (activeTab === 'All activity') return timelineItems;
    if (activeTab === 'Orders') {
      return timelineItems.filter((item) => item.category === 'orders');
    }
    if (activeTab === 'Notes') {
      return timelineItems.filter((item) => item.category === 'notes');
    }
    return timelineItems.filter((item) => item.category === 'campaigns');
  }, [timelineItems, activeTab]);

  const handleSaveAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionText.trim()) return;

    const newEntry: TimelineEntry = {
      id: `t-${Date.now()}`,
      timestamp: 'Just now',
      title:
        actionMode === 'followup'
          ? `Follow-up scheduled · ${actionText.trim()}`
          : `Interaction logged · ${actionText.trim()}`,
      subtitle: 'Added from customer profile',
      category: 'notes',
    };

    setTimelineItems((prev) => [newEntry, ...prev]);
    setActionText('');
    setActionMode(null);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-5">
        {/* 1. TOP HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
              Ayesha Rahman
            </h1>
            <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
              Customer since 18 September 2025 · Customer #CUS-0284
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActionMode('interaction');
                setActionText('');
              }}
              className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-100/95 px-5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
            >
              + Log interaction
            </button>

            <button
              type="button"
              onClick={() => {
                setActionMode('followup');
                setActionText('');
              }}
              className="inline-flex h-11 items-center justify-center rounded-md bg-[#111111] px-5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Schedule follow-up
            </button>
          </div>
        </header>

        {/* Optional Quick Action Composer */}
        {actionMode && (
          <form
            onSubmit={handleSaveAction}
            className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50/70 p-4 sm:flex-row sm:items-center"
          >
            <span className="text-xs font-semibold text-neutral-900">
              {actionMode === 'followup'
                ? 'Schedule follow-up:'
                : 'Log interaction:'}
            </span>
            <input
              type="text"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              placeholder={
                actionMode === 'followup'
                  ? 'e.g., Call tomorrow at 4 PM regarding headphones'
                  : 'e.g., Replied on WhatsApp about stock'
              }
              className="h-10 flex-1 rounded-md border border-neutral-200 bg-white px-3.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#111111] px-4 text-xs font-medium text-white hover:bg-neutral-800"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setActionMode(null)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-200/80 px-4 text-xs font-medium text-neutral-800 hover:bg-neutral-300/80"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* 2. MAIN TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* LEFT COLUMN (~34% / 4 cols): CUSTOMER SIDEBAR CARD */}
          <aside className="lg:col-span-4">
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              {/* Name & Segment Pills */}
              <h2 className="text-lg font-bold tracking-tight text-neutral-950">
                Ayesha Rahman
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded bg-neutral-100/90 px-3 py-1 text-xs font-semibold text-neutral-900">
                  VIP
                </span>
                <span className="rounded bg-neutral-100/90 px-3.5 py-1 text-xs font-semibold text-neutral-900">
                  Gadget buyer
                </span>
              </div>

              {/* Contact Details */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-neutral-950">
                  Contact details
                </h3>

                {isEditingProfile ? (
                  <div className="mt-2.5 space-y-2 text-xs">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-9 w-full rounded bg-neutral-100 px-3 text-neutral-800 focus:outline-none"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-9 w-full rounded bg-neutral-100 px-3 text-neutral-800 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={preferredChannel}
                      onChange={(e) => setPreferredChannel(e.target.value)}
                      className="h-9 w-full rounded bg-neutral-100 px-3 text-neutral-800 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="mt-2.5 space-y-0.5 text-xs text-neutral-400">
                    <p>{phone}</p>
                    <p>{email}</p>
                    <p>Preferred: {preferredChannel}</p>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
                  <Check className="h-3.5 w-3.5 text-neutral-900" strokeWidth={2.4} />
                  <span>Marketing opted in</span>
                </div>
              </div>

              {/* Customer Value */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-neutral-950">
                  Customer value
                </h3>
                <div className="mt-2.5 space-y-0.5 text-xs text-neutral-400">
                  <p>8 total orders</p>
                  <p>৳24,680 lifetime spend</p>
                  <p>Last order: 22 October 2025</p>
                </div>
              </div>

              {/* Default Address */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-neutral-950">
                  Default address
                </h3>
                {isEditingProfile ? (
                  <div className="mt-2.5 space-y-2 text-xs">
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="h-9 w-full rounded bg-neutral-100 px-3 text-neutral-800 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="h-9 w-full rounded bg-neutral-100 px-3 text-neutral-800 focus:outline-none"
                    />
                  </div>
                ) : (
                  <address className="mt-2.5 not-italic leading-relaxed text-xs text-neutral-400">
                    <p>{addressLine1}</p>
                    <p>{addressLine2}</p>
                  </address>
                )}
              </div>

              {/* Internal Notes */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-neutral-950">
                  Internal notes
                </h3>
                {isEditingProfile ? (
                  <textarea
                    rows={3}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    className="mt-2.5 w-full resize-none rounded bg-neutral-100 p-3 text-xs text-neutral-800 focus:outline-none"
                  />
                ) : (
                  <p className="mt-2.5 whitespace-pre-line leading-relaxed text-xs text-neutral-400">
                    {internalNotes}
                  </p>
                )}
              </div>

              {/* Edit Profile Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile((prev) => !prev)}
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-neutral-100/95 px-4 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
                >
                  {isEditingProfile ? 'Save profile' : 'Edit profile'}
                </button>
              </div>
            </section>
          </aside>

          {/* RIGHT COLUMN (~66% / 8 cols): CUSTOMER TIMELINE */}
          <section className="lg:col-span-8">
            <div className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Customer timeline
              </h2>

              {/* Filter Tabs */}
              <div className="mt-3 flex flex-wrap items-center gap-5 text-xs">
                {TIMELINE_TABS.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`transition-colors ${
                        isActive
                          ? 'font-bold text-neutral-950'
                          : 'font-normal text-neutral-600 hover:text-neutral-950'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Timeline Feed */}
              <div className="mt-7 space-y-6">
                {filteredTimeline.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#111111]"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-normal text-neutral-400">
                        {entry.timestamp}
                      </p>
                      <h3 className="mt-1 text-xs font-bold text-neutral-950 sm:text-[13px]">
                        {entry.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-400">
                        {entry.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}