import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ATTENTION_ITEMS, type AttentionItem } from './overview-data';

interface NeedsAttentionCardProps {
  items?: AttentionItem[];
}

export function NeedsAttentionCard({ items = ATTENTION_ITEMS }: NeedsAttentionCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-neutral-200/90 bg-white p-5 sm:p-6 lg:col-span-4">
      <h2 className="text-base font-bold text-neutral-950 sm:text-[17px]">
        Needs attention
      </h2>

      <ul className="mt-5 flex flex-1 flex-col justify-between gap-4">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="group flex items-center justify-between py-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600"
            >
              <span>{item.label}</span>
              <ArrowRight
                className="h-4 w-4 text-neutral-800 transition-transform duration-150 group-hover:translate-x-1"
                strokeWidth={1.8}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
