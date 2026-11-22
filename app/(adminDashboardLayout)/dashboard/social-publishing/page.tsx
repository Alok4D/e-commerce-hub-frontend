"use client";

import { useState } from "react";
import {
  Share2,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Plus,
  Shield,
  Layers,
  Facebook,
  Instagram,
  Check,
} from "lucide-react";

interface SocialAccount {
  id: string;
  platform: "Facebook" | "Instagram" | "TikTok";
  accountName: string;
  handle: string;
  status: "Connected" | "Expired" | "Disconnected";
  followers: string;
  lastSync: string;
  avatar: string;
}

interface SocialPost {
  id: string;
  product: string;
  platform: string;
  status: "PUBLISHED" | "QUEUED" | "FAILED";
  publishedAt: string;
  reach: string;
  clicks: number;
  postUrl?: string;
}

const INITIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: "sa-1",
    platform: "Facebook",
    accountName: "Nexora Retail Bangladesh",
    handle: "@nexorabd.official",
    status: "Connected",
    followers: "42.8K followers",
    lastSync: "Today, 11:20 AM",
    avatar: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "sa-2",
    platform: "Instagram",
    accountName: "Nexora Life & Gadgets",
    handle: "@nexora.bd",
    status: "Connected",
    followers: "18.5K followers",
    lastSync: "Today, 10:45 AM",
    avatar: "https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "sa-3",
    platform: "TikTok",
    accountName: "Nexora Import Hub",
    handle: "@nexora_live",
    status: "Disconnected",
    followers: "8.2K followers",
    lastSync: "Not connected",
    avatar: "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?auto=format&fit=crop&w=120&q=80",
  },
];

const INITIAL_POSTS: SocialPost[] = [
  {
    id: "sp-1",
    product: "HOCO W35 Air ANC Active Noise Cancelling Headphones",
    platform: "Facebook Page & Instagram",
    status: "PUBLISHED",
    publishedAt: "Today, 10:30 AM",
    reach: "1,240 people",
    clicks: 86,
    postUrl: "https://facebook.com",
  },
  {
    id: "sp-2",
    product: "Pro-Grade 21V Brushless Cordless Impact Drill Kit",
    platform: "Instagram",
    status: "PUBLISHED",
    publishedAt: "Yesterday, 4:15 PM",
    reach: "890 impressions",
    clicks: 42,
    postUrl: "https://instagram.com",
  },
  {
    id: "sp-3",
    product: "Smart Visual Air Fryer 5.5L Panoramic Window",
    platform: "Facebook Page",
    status: "QUEUED",
    publishedAt: "Scheduled for Tomorrow, 6:00 PM",
    reach: "Pending",
    clicks: 0,
  },
  {
    id: "sp-4",
    product: "24-in-1 Precision Aluminum Alloy Tool Kit",
    platform: "Facebook Page",
    status: "FAILED",
    publishedAt: "20 Oct, 2:10 PM · Token Expired",
    reach: "0",
    clicks: 0,
  },
];

export default function SocialPublishingPage() {
  const [activeTab, setActiveTab] = useState<"history" | "accounts">("history");
  const [accounts, setAccounts] = useState<SocialAccount[]>(INITIAL_ACCOUNTS);
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_POSTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleAccountConnection = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const nextStatus = acc.status === "Connected" ? "Disconnected" : "Connected";
          showToast(`${acc.platform} account ${nextStatus.toLowerCase()} successfully.`);
          return {
            ...acc,
            status: nextStatus,
            lastSync: nextStatus === "Connected" ? "Just now" : "Disconnected",
          };
        }
        return acc;
      })
    );
  };

  const handleRetry = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, status: "PUBLISHED", publishedAt: "Just now (Retried)", reach: "Queued sync" }
          : p
      )
    );
    showToast("Post retried and published successfully!");
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16 font-sans text-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Social Publishing &amp; Distribution
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Single-point publishing hub across connected Facebook, Instagram, and TikTok accounts (SRS Section 5).
          </p>
        </div>

        {toastMessage && (
          <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-zinc-200/90 rounded-xl">
          <span className="text-xs text-zinc-500">Connected Accounts</span>
          <p className="text-2xl font-bold text-zinc-950 mt-2">
            {accounts.filter((a) => a.status === "Connected").length} / {accounts.length}
          </p>
          <span className="text-[11px] text-emerald-600 mt-1 block">OAuth active &amp; healthy</span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/90 rounded-xl">
          <span className="text-xs text-zinc-500">Total Published</span>
          <p className="text-2xl font-bold text-zinc-950 mt-2">
            {posts.filter((p) => p.status === "PUBLISHED").length} posts
          </p>
          <span className="text-[11px] text-zinc-500 mt-1 block">Automated on product upload</span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/90 rounded-xl">
          <span className="text-xs text-zinc-500">Queued in Buffer</span>
          <p className="text-2xl font-bold text-zinc-950 mt-2">
            {posts.filter((p) => p.status === "QUEUED").length} posts
          </p>
          <span className="text-[11px] text-blue-600 mt-1 block">Scheduled for peak hours</span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/90 rounded-xl">
          <span className="text-xs text-zinc-500">Total Audience Reach</span>
          <p className="text-2xl font-bold text-zinc-950 mt-2">69.5K</p>
          <span className="text-[11px] text-zinc-500 mt-1 block">Combined followers across channels</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-zinc-200 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`pb-3 font-semibold transition-colors border-b-2 cursor-pointer ${
            activeTab === "history"
              ? "border-black text-black"
              : "border-transparent text-zinc-500 hover:text-black"
          }`}
        >
          Publishing Queue &amp; History
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("accounts")}
          className={`pb-3 font-semibold transition-colors border-b-2 cursor-pointer ${
            activeTab === "accounts"
              ? "border-black text-black"
              : "border-transparent text-zinc-500 hover:text-black"
          }`}
        >
          Connected Social Accounts ({accounts.filter((a) => a.status === "Connected").length})
        </button>
      </div>

      {/* TAB 1: PUBLISHING QUEUE & HISTORY */}
      {activeTab === "history" && (
        <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-950">Multi-Channel Broadcast Log</h2>
            <span className="text-xs text-zinc-400">Syncs automatically via background queue</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium bg-zinc-50/50">
                  <th className="py-3 px-6 font-normal">Product Title</th>
                  <th className="py-3 px-6 font-normal">Platform Channel</th>
                  <th className="py-3 px-6 font-normal">Status</th>
                  <th className="py-3 px-6 font-normal">Published / Scheduled Time</th>
                  <th className="py-3 px-6 font-normal">Reach &amp; Clicks</th>
                  <th className="py-3 px-6 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-zinc-900 max-w-sm truncate">
                      {post.product}
                    </td>
                    <td className="py-4 px-6 text-zinc-700">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-[11px]">
                        {post.platform}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800"
                            : post.status === "QUEUED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[11px]">
                      {post.publishedAt}
                    </td>
                    <td className="py-4 px-6 text-zinc-800 font-mono text-xs">
                      {post.reach} {post.clicks > 0 && `· ${post.clicks} clicks`}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {post.status === "FAILED" ? (
                        <button
                          type="button"
                          onClick={() => handleRetry(post.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white hover:bg-zinc-800 text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      ) : post.postUrl ? (
                        <a
                          href={post.postUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-zinc-500 hover:text-black text-xs transition-colors"
                        >
                          <span>View Post</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-zinc-400 text-xs">In Queue</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CONNECTED ACCOUNTS (SRS Section 5.1 OAuth Linking) */}
      {activeTab === "accounts" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-xl border border-zinc-200/90 p-6 flex flex-col justify-between shadow-2xs space-y-5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      acc.status === "Connected"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        acc.status === "Connected" ? "bg-emerald-500" : "bg-zinc-400"
                      }`}
                    />
                    {acc.status}
                  </span>

                  <span className="text-xs font-mono text-zinc-400">{acc.platform}</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={acc.avatar}
                    alt={acc.accountName}
                    className="w-12 h-12 rounded-full object-cover border border-zinc-200"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-zinc-950">{acc.accountName}</h3>
                    <p className="text-xs text-zinc-500 font-mono">{acc.handle}</p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 space-y-1.5 text-xs text-zinc-600">
                  <div className="flex justify-between">
                    <span>Audience:</span>
                    <span className="font-semibold text-zinc-900">{acc.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Token Sync:</span>
                    <span className="font-mono text-zinc-500">{acc.lastSync}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toggleAccountConnection(acc.id)}
                  className={`w-full py-2 px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    acc.status === "Connected"
                      ? "border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      : "bg-black text-white hover:bg-zinc-800"
                  }`}
                >
                  {acc.status === "Connected" ? "Disconnect Channel" : "Connect via OAuth"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
