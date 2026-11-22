export type OrderStatus = 'Confirmed' | 'Pending' | 'Shipped';

export interface OrderItem {
  id: string;
  customer: string;
  itemsCount: number;
  total: string;
  status: OrderStatus;
}

export interface KpiStat {
  id: string;
  label: string;
  value: string;
  subtext: string;
  hasArrow: boolean;
}

export interface ChartPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface AttentionItem {
  id: string;
  label: string;
  href: string;
}

export const DATE_RANGES = ['Last 30 days', 'Last 7 days', 'Last 90 days', 'This year'];

export const KPI_STATS: KpiStat[] = [
  {
    id: 'revenue',
    label: 'Total revenue',
    value: '৳284,650',
    subtext: '18.4% vs last month',
    hasArrow: true,
  },
  {
    id: 'orders',
    label: 'Orders',
    value: '148',
    subtext: '12.1% vs last month',
    hasArrow: true,
  },
  {
    id: 'customers',
    label: 'Customers',
    value: '1,284',
    subtext: '8.2% vs last month',
    hasArrow: true,
  },
  {
    id: 'follow-ups',
    label: 'Follow-ups due',
    value: '12',
    subtext: '3 need your attention',
    hasArrow: false,
  },
];

export const CHART_DATA: ChartPoint[] = [
  { date: '01 Oct', revenue: 11, orders: 5 },
  { date: '', revenue: 21, orders: 9 },
  { date: '05 Oct', revenue: 14, orders: 7 },
  { date: '', revenue: 48, orders: 18 },
  { date: '10 Oct', revenue: 39, orders: 15 },
  { date: '', revenue: 58, orders: 22 },
  { date: '15 Oct', revenue: 43, orders: 17 },
  { date: '', revenue: 70, orders: 28 },
  { date: '20 Oct', revenue: 60, orders: 24 },
  { date: '', revenue: 81, orders: 32 },
  { date: '25 Oct', revenue: 74, orders: 29 },
  { date: '', revenue: 88, orders: 35 },
  { date: '', revenue: 79, orders: 31 },
  { date: '', revenue: 94, orders: 39 },
];

export const ATTENTION_ITEMS: AttentionItem[] = [
  { id: '1', label: '8 products running low', href: '#low-stock' },
  { id: '2', label: '5 orders to confirm', href: '#pending-orders' },
  { id: '3', label: '3 overdue follow-ups', href: '#follow-ups' },
  { id: '4', label: '2 shipments arriving soon', href: '#shipments' },
];

export const RECENT_ORDERS: OrderItem[] = [
  {
    id: '#NX-10482',
    customer: 'Ayesha Rahman',
    itemsCount: 2,
    total: '৳4,660',
    status: 'Confirmed',
  },
  {
    id: '#NX-10481',
    customer: 'Rafiqul Islam',
    itemsCount: 1,
    total: '৳2,270',
    status: 'Pending',
  },
  {
    id: '#NX-10480',
    customer: 'Nusrat Jahan',
    itemsCount: 3,
    total: '৳6,440',
    status: 'Shipped',
  },
];

export const STATUS_STYLES: Record<OrderStatus, string> = {
  Confirmed: 'bg-neutral-100 text-neutral-900 font-semibold',
  Pending: 'bg-[#F6E9D2] text-[#B87D1E] font-medium',
  Shipped: 'bg-neutral-100 text-neutral-900 font-semibold',
};
