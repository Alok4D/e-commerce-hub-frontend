"use client";

import React, { useState } from "react";
import { Share2, CheckCircle2, Clock, AlertCircle, RefreshCw } from "lucide-react";

export default function SocialPublishingPage() {
  const socialPosts = [
    {
      id: "sp-1",
      product: "HOCO W35 Air ANC Active Noise Cancelling Headphones",
      platform: "Facebook Page",
      status: "PUBLISHED",
      publishedAt: "Today, 10:30 AM",
      reach: "1,240 people",
    },
    {
      id: "sp-2",
      product: "Pro-Grade 21V Brushless Cordless Impact Drill Kit",
      platform: "Instagram",
      status: "PUBLISHED",
      publishedAt: "Yesterday, 4:15 PM",
      reach: "890 impressions",
    },
    {
      id: "sp-3",
      product: "Smart Visual Air Fryer 5.5L Panoramic Window",
      platform: "Facebook & Instagram",
      status: "QUEUED",
      publishedAt: "Scheduled for Tomorrow 6:00 PM",
      reach: "-",
    },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 font-sans text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-zinc-950">
            Social Publishing &amp; Distribution
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Single-point publishing log across connected Facebook, Instagram, and TikTok accounts.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-100 text-zinc-400 text-[11px] font-medium">
              <th className="py-3.5 px-6 font-normal">Product</th>
              <th className="py-3.5 px-6 font-normal">Platform</th>
              <th className="py-3.5 px-6 font-normal">Status</th>
              <th className="py-3.5 px-6 font-normal">Time</th>
              <th className="py-3.5 px-6 font-normal text-right">Reach / Clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 font-medium">
            {socialPosts.map((post) => (
              <tr key={post.id} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-4 px-6 font-semibold text-zinc-900 max-w-sm truncate">
                  {post.product}
                </td>
                <td className="py-4 px-6 text-zinc-700">
                  {post.platform}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      post.status === "PUBLISHED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-zinc-500 font-mono text-[11px]">
                  {post.publishedAt}
                </td>
                <td className="py-4 px-6 text-right font-mono text-zinc-800">
                  {post.reach}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
