'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

type ChannelType = 'WhatsApp' | 'SMS' | 'Email';

interface AudienceOption {
  id: string;
  label: string;
  eligibleCount: number;
  excludedCount: number;
}

interface MessageTemplateOption {
  id: string;
  label: string;
  body: string;
}

interface RecentCampaign {
  id: string;
  title: string;
  meta: string;
}

const AUDIENCE_SEGMENTS: AudienceOption[] = [
  {
    id: 'gadget',
    label: 'Gadget buyers · Opted in · 342 customers',
    eligibleCount: 342,
    excludedCount: 28,
  },
  {
    id: 'vip',
    label: 'VIP customers · Opted in · 86 customers',
    eligibleCount: 86,
    excludedCount: 4,
  },
  {
    id: 'all',
    label: 'All opted-in customers · 1,070 customers',
    eligibleCount: 1070,
    excludedCount: 214,
  },
];

const MESSAGE_TEMPLATES: MessageTemplateOption[] = [
  {
    id: 'new-arrival',
    label: 'New arrival announcement',
    body: `Hi {{customer_name}},
Your next everyday upgrade just arrived!
Discover our Wireless ANC Headphones at ৳3,490.
Use WELCOME200 for ৳200 off your next order.
Shop now: {{product_link}}

Reply STOP to opt out.`,
  },
  {
    id: 'weekend-offer',
    label: 'Weekend essentials offer',
    body: `Hi {{customer_name}},
Enjoy exclusive weekend savings across our Home & Living essentials.
Get 15% off orders over ৳2,500 with code WEEKEND15.
Browse now: {{product_link}}

Reply STOP to opt out.`,
  },
  {
    id: 'back-in-stock',
    label: 'Back in stock alert',
    body: `Hi {{customer_name}},
Good news — the item you had your eye on is back in stock in limited quantities!
Order yours today: {{product_link}}

Reply STOP to opt out.`,
  },
];

const INITIAL_RECENT_CAMPAIGNS: RecentCampaign[] = [
  {
    id: 'rc-1',
    title: 'New audio collection',
    meta: 'Delivered 318 / 342 · 93%',
  },
  {
    id: 'rc-2',
    title: 'Weekend essentials offer',
    meta: 'Delivered 486 / 500 · 97%',
  },
  {
    id: 'rc-3',
    title: 'Back in stock: tool kits',
    meta: 'Scheduled · Tomorrow, 9 AM',
  },
];

export default function CampaignStudioPage() {
  const [campaignName, setCampaignName] = useState(
    'Fresh finds for our gadget lovers'
  );
  const [selectedAudience, setSelectedAudience] = useState<AudienceOption>(
    AUDIENCE_SEGMENTS[0]
  );
  const [isAudienceOpen, setIsAudienceOpen] = useState(false);

  const [selectedChannel, setSelectedChannel] =
    useState<ChannelType>('WhatsApp');

  const [selectedTemplate, setSelectedTemplate] =
    useState<MessageTemplateOption>(MESSAGE_TEMPLATES[0]);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const [messageBody, setMessageBody] = useState(MESSAGE_TEMPLATES[0].body);
  const [recentCampaigns, setRecentCampaigns] = useState<RecentCampaign[]>(
    INITIAL_RECENT_CAMPAIGNS
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleScheduleCampaign = () => {
    if (!campaignName.trim()) return;
    setRecentCampaigns((prev) => [
      {
        id: `rc-${Date.now()}`,
        title: campaignName.trim(),
        meta: `Scheduled · ${selectedAudience.eligibleCount} recipients`,
      },
      ...prev,
    ]);
    showToast('Campaign scheduled!');
  };

  return (
    <main className="min-h-screen px-4 py-6 text-neutral-900 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full space-y-5">
        {/* 1. TOP HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
              Campaign studio
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Bring your customers back to something good.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            {toastMessage && (
              <span className="rounded-md bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-800">
                {toastMessage}
              </span>
            )}
            <span className="inline-flex h-8 min-w-[210px] items-center rounded bg-neutral-100/95 px-3.5 text-[11px] font-bold tracking-wider text-neutral-800">
              PHASE 2 · PREVIEW
            </span>
          </div>
        </header>

        {/* 2. MAIN TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* LEFT COLUMN (~65% / 8 cols): CREATE A CAMPAIGN */}
          <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6 lg:col-span-8">
            <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
              Create a campaign
            </h2>

            <div className="mt-5 space-y-5">
              {/* Campaign Name */}
              <div>
                <label
                  htmlFor="campaign-name"
                  className="block text-xs font-semibold text-neutral-900"
                >
                  Campaign name
                </label>
                <input
                  id="campaign-name"
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md bg-neutral-100/80 px-4 text-xs text-neutral-500 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>

              {/* Audience Segment Dropdown */}
              <div className="relative">
                <label className="block text-xs font-semibold text-neutral-900">
                  Audience segment
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsAudienceOpen((prev) => !prev);
                    setIsTemplateOpen(false);
                  }}
                  className="mt-2 flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/80 px-4 text-left text-xs text-neutral-500 transition-colors hover:bg-neutral-100"
                >
                  <span>
                    {selectedAudience.label}{' '}
                    <span className="ml-0.5 text-neutral-600">↓</span>
                  </span>
                </button>

                {isAudienceOpen && (
                  <div className="absolute left-0 z-20 mt-1.5 w-full rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                    {AUDIENCE_SEGMENTS.map((seg) => (
                      <button
                        key={seg.id}
                        type="button"
                        onClick={() => {
                          setSelectedAudience(seg);
                          setIsAudienceOpen(false);
                        }}
                        className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                          selectedAudience.id === seg.id
                            ? 'font-semibold text-neutral-950'
                            : 'text-neutral-600'
                        }`}
                      >
                        {seg.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Channel Radio Cards */}
              <div>
                <span className="block text-xs font-semibold text-neutral-900">
                  Channel
                </span>
                <div className="mt-2 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {(['WhatsApp', 'SMS', 'Email'] as ChannelType[]).map(
                    (channel) => {
                      const isSelected = selectedChannel === channel;
                      return (
                        <button
                          key={channel}
                          type="button"
                          onClick={() => setSelectedChannel(channel)}
                          className="flex h-11 items-center gap-2.5 rounded-md bg-neutral-100/85 px-4 text-left text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-200/70"
                        >
                          <span
                            className={`inline-flex h-2.5 w-2.5 items-center justify-center rounded-full border ${
                              isSelected
                                ? 'border-[#111111] bg-[#111111]'
                                : 'border-neutral-700 bg-transparent'
                            }`}
                          />
                          <span>{channel}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Message Template Dropdown */}
              <div className="relative">
                <label className="block text-xs font-semibold text-neutral-900">
                  Message template
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsTemplateOpen((prev) => !prev);
                    setIsAudienceOpen(false);
                  }}
                  className="mt-2 flex h-11 w-full items-center justify-between gap-2 rounded-md bg-neutral-100/80 px-4 text-left text-xs text-neutral-500 transition-colors hover:bg-neutral-100"
                >
                  <span>
                    {selectedTemplate.label}{' '}
                    <span className="ml-0.5 text-neutral-600">↓</span>
                  </span>
                </button>

                {isTemplateOpen && (
                  <div className="absolute left-0 z-20 mt-1.5 w-full rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                    {MESSAGE_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(tpl);
                          setMessageBody(tpl.body);
                          setIsTemplateOpen(false);
                        }}
                        className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                          selectedTemplate.id === tpl.id
                            ? 'font-semibold text-neutral-950'
                            : 'text-neutral-600'
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Your Message Textarea */}
              <div>
                <label
                  htmlFor="your-message"
                  className="block text-xs font-semibold text-neutral-900"
                >
                  Your message
                </label>
                <textarea
                  id="your-message"
                  rows={8}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="mt-2 w-full resize-none rounded-md bg-neutral-100/80 p-4 text-xs leading-relaxed text-neutral-500 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => showToast('Campaign draft saved.')}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-100/95 px-6 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-200/80 sm:min-w-[165px]"
                >
                  Save draft
                </button>

                <button
                  type="button"
                  onClick={handleScheduleCampaign}
                  className="inline-flex h-11 flex-1 items-center justify-start gap-2 rounded-md bg-[#111111] px-5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  <span>Schedule campaign</span>
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN (~35% / 4 cols) */}
          <div className="space-y-5 lg:col-span-4">
            {/* Ready to Reconnect Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Ready to reconnect
              </h2>

              <p className="mt-4 text-4xl font-bold tracking-tight text-neutral-950 sm:text-[42px]">
                {selectedAudience.eligibleCount.toLocaleString('en-US')}
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                eligible opted-in customers
              </p>

              <ul className="mt-6 space-y-2 text-xs font-medium text-neutral-900">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-neutral-900" strokeWidth={2.2} />
                  <span>
                    {selectedAudience.excludedCount} opted-out customers excluded
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-neutral-900" strokeWidth={2.2} />
                  <span>Duplicate phone numbers removed</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-neutral-900" strokeWidth={2.2} />
                  <span>Messages logged to customer timelines</span>
                </li>
              </ul>
            </section>

            {/* Recent Campaigns Card */}
            <section className="rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
                Recent campaigns
              </h2>

              <div className="mt-5 space-y-5">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id}>
                    <h3 className="text-xs font-bold text-neutral-950 sm:text-[13px]">
                      {campaign.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-400">
                      {campaign.meta}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}