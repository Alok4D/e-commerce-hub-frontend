import { ArrowUp } from 'lucide-react';
import { KPI_STATS, type KpiStat } from './overview-data';

interface KpiStatsGridProps {
  stats?: KpiStat[];
}

export function KpiStatsGrid({ stats = KPI_STATS }: KpiStatsGridProps) {
  return (
    <section
      aria-label="Key Performance Indicators"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="rounded-lg border border-neutral-200/90 bg-white px-5 py-5 transition-colors hover:border-neutral-300"
        >
          <p className="text-xs font-normal text-neutral-500">{stat.label}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 sm:text-[26px]">
            {stat.value}
          </p>
          <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-neutral-700">
            {stat.hasArrow && (
              <ArrowUp className="h-3 w-3 text-neutral-800" strokeWidth={2.2} />
            )}
            <span>{stat.subtext}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
