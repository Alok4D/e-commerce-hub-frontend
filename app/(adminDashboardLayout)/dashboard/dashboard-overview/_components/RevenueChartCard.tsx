'use client';

import { useState } from 'react';
import { CHART_DATA, type ChartPoint } from './overview-data';

interface RevenueChartCardProps {
  data?: ChartPoint[];
}

export function RevenueChartCard({ data = CHART_DATA }: RevenueChartCardProps) {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'orders'>('revenue');

  const width = 640;
  const height = 185;
  const maxVal = activeMetric === 'revenue' ? 100 : 45;

  const polylinePoints = data
    .map((point, index) => {
      const val = activeMetric === 'revenue' ? point.revenue : point.orders;
      const x = (index / (data.length - 1)) * width;
      const y = height - (val / maxVal) * height;
      return `${x},${y}`;
    })
    .join(' ');

  const yLabels =
    activeMetric === 'revenue'
      ? ['90k', '60k', '30k', '0']
      : ['40', '25', '10', '0'];
  const xLabels = ['01 Oct', '05 Oct', '10 Oct', '15 Oct', '20 Oct', '25 Oct'];

  return (
    <div className="flex flex-col justify-between rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6 lg:col-span-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
          Revenue overview
        </h2>

        <div className="flex items-center gap-5 text-xs font-medium text-neutral-900">
          <button
            type="button"
            onClick={() => setActiveMetric('revenue')}
            className="inline-flex items-center gap-2 focus:outline-none cursor-pointer"
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
            className="inline-flex items-center gap-2 focus:outline-none cursor-pointer"
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
  );
}
