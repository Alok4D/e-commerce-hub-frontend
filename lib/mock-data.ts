export type UserRole = "SUPER_ADMIN" | "CATALOG_MANAGER" | "SALES_STAFF" | "CUSTOMER";

export interface DynamicSpec {
  key: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  price: number;
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  subCategory: string;
  tags: string[];
  price: number;
  regularPrice: number;
  costOfGoods: number;
  stock: number;
  status: "IN_STOCK" | "LOW_STOCK" | "INCOMING_PRE_ORDER" | "OUT_OF_STOCK";
  incomingDate?: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  highlights: string[];
  specs: DynamicSpec[];
  variants: ProductVariant[];
  socialDraft?: {
    facebookCaption: string;
    instagramCaption: string;
    autoPublish: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  itemCount: number;
  subCategories: { id: string; name: string; slug: string }[];
}

export interface OrderItem {
  productId: string;
  title: string;
  variantTitle?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: "Inside Dhaka" | "Outside Dhaka";
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: "CASH_ON_DELIVERY" | "BKASH" | "NAGAD" | "CARD";
  paymentStatus: "PAID" | "PENDING";
  orderStatus: "PENDING" | "CONFIRMED" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
  courierName?: "Steadfast" | "Pathao" | "RedX" | "Paperfly";
  courierTrackingCode?: string;
  createdAt: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  city: string;
  totalOrders: number;
  lifetimeSpend: number;
  lastOrderDate: string;
  tags: ("VIP" | "Wholesale Inquiry" | "Gadget Buyer" | "Needs Follow-Up" | "Frequent Buyer")[];
  timeline: {
    id: string;
    date: string;
    type: "ORDER" | "NOTE" | "CALL" | "CAMPAIGN";
    title: string;
    details: string;
    staffName?: string;
  }[];
  followUpReminder?: {
    dueDate: string;
    task: string;
    completed: boolean;
  };
}

// ================= MOCK DATASETS =================

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Gadgets & Smart Tech",
    slug: "gadgets-smart-tech",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    itemCount: 84,
    subCategories: [
      { id: "sub-1", name: "Smartwatches & Bands", slug: "smartwatches" },
      { id: "sub-2", name: "TWS Earbuds & Audio", slug: "tws-earbuds" },
      { id: "sub-3", name: "Power Banks & Fast Chargers", slug: "chargers-powerbanks" },
      { id: "sub-4", name: "Car Mounts & Accessories", slug: "car-accessories" },
    ],
  },
  {
    id: "cat-2",
    name: "Tools & Hardware",
    slug: "tools-hardware",
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
    itemCount: 42,
    subCategories: [
      { id: "sub-5", name: "Cordless Drills & Drivers", slug: "cordless-drills" },
      { id: "sub-6", name: "Precision Screwdriver Kits", slug: "screwdriver-kits" },
      { id: "sub-7", name: "Laser Distance Meters", slug: "laser-meters" },
    ],
  },
  {
    id: "cat-3",
    name: "Home & Kitchen Appliances",
    slug: "home-kitchen",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
    itemCount: 65,
    subCategories: [
      { id: "sub-8", name: "Air Fryers & Blenders", slug: "air-fryers" },
      { id: "sub-9", name: "Electric Kettles & Flasks", slug: "kettles" },
      { id: "sub-10", name: "Smart Aroma Diffusers", slug: "diffusers" },
    ],
  },
  {
    id: "cat-4",
    name: "LED Lights & Living",
    slug: "lights-living",
    icon: "Lamp",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80",
    itemCount: 38,
    subCategories: [
      { id: "sub-11", name: "RGB Ambient Strip Lights", slug: "rgb-strips" },
      { id: "sub-12", name: "Motion Sensor Night Lights", slug: "motion-lights" },
      { id: "sub-13", name: "Desk Study Lamps", slug: "desk-lamps" },
    ],
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "hoco-w35-air-anc-wireless-headphones",
    title: "HOCO W35 Air ANC Active Noise Cancelling Headphones",
    category: "Gadgets & Smart Tech",
    subCategory: "TWS Earbuds & Audio",
    tags: ["Trending", "New Arrival"],
    price: 2450,
    regularPrice: 3200,
    costOfGoods: 1450,
    stock: 45,
    status: "IN_STOCK",
    rating: 4.8,
    reviewsCount: 124,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
    ],
    description: "Premium studio sound with high-precision Active Noise Cancellation.",
    highlights: [
      "Active Noise Cancellation (ANC) up to -25dB",
      "45 Hours playback time with Type-C fast charge",
      "Bluetooth 5.3 + 3.5mm AUX wired dual mode",
    ],
    specs: [
      { key: "Battery Capacity", value: "400 mAh" },
      { key: "Driver Unit", value: "40mm Dynamic Driver" },
      { key: "Charging Port", value: "USB Type-C" },
      { key: "Origin", value: "Guangdong, China" },
    ],
    variants: [
      { id: "v1-1", sku: "HC-W35-SLV", title: "Space Silver", price: 2450, stock: 25 },
      { id: "v1-2", sku: "HC-W35-BLK", title: "Midnight Black", price: 2450, stock: 20 },
    ],
  },
  {
    id: "prod-2",
    slug: "brushless-21v-cordless-impact-drill-combo",
    title: "Pro-Grade 21V Brushless Cordless Impact Drill & Driver Kit",
    category: "Tools & Hardware",
    subCategory: "Cordless Drills & Drivers",
    tags: ["Best Seller", "Tools"],
    price: 4850,
    regularPrice: 5900,
    costOfGoods: 2900,
    stock: 12,
    status: "LOW_STOCK",
    rating: 4.9,
    reviewsCount: 78,
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
    ],
    description: "Heavy-duty 21V cordless hammer drill equipped with pure copper brushless motor.",
    highlights: [
      "Pure copper brushless motor with 60 N.m torque",
      "Dual 2.0Ah Lithium-Ion battery packs included",
    ],
    specs: [
      { key: "Motor Type", value: "Brushless Pure Copper" },
      { key: "Max Torque", value: "60 N.m" },
      { key: "Voltage", value: "21V Max" },
    ],
    variants: [
      { id: "v2-1", sku: "DRL-21V-2BAT", title: "2 Batteries + Full 32Pcs Kit", price: 4850, stock: 12 },
    ],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "NX-10482",
    customerName: "Ayesha Rahman",
    phone: "01712345678",
    email: "ayesha@gmail.com",
    address: "House 24, Road 11, Banani",
    city: "Inside Dhaka",
    items: [
      {
        productId: "prod-1",
        title: "HOCO W35 Air ANC Active Noise Cancelling Headphones",
        variantTitle: "Space Silver",
        price: 2450,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 4900,
    shippingFee: 70,
    discount: 310,
    total: 4660,
    paymentMethod: "CASH_ON_DELIVERY",
    paymentStatus: "PENDING",
    orderStatus: "CONFIRMED",
    createdAt: "2026-11-22T08:15:00Z",
  },
  {
    id: "ord-102",
    orderNumber: "NX-10481",
    customerName: "Rafiqul Islam",
    phone: "01899887766",
    address: "GEC Circle, Chattogram",
    city: "Outside Dhaka",
    items: [
      {
        productId: "prod-1",
        title: "HOCO W35 Air ANC Active Noise Cancelling Headphones",
        price: 2450,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 2450,
    shippingFee: 130,
    discount: 310,
    total: 2270,
    paymentMethod: "BKASH",
    paymentStatus: "PAID",
    orderStatus: "PENDING",
    createdAt: "2026-11-21T18:40:00Z",
  },
  {
    id: "ord-103",
    orderNumber: "NX-10480",
    customerName: "Nusrat Jahan",
    phone: "01611223344",
    address: "Sector 7, Uttara, Dhaka",
    city: "Inside Dhaka",
    items: [
      {
        productId: "prod-2",
        title: "Pro-Grade 21V Cordless Drill",
        price: 4850,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 4850,
    shippingFee: 70,
    discount: 0,
    total: 6440,
    paymentMethod: "CASH_ON_DELIVERY",
    paymentStatus: "PENDING",
    orderStatus: "SHIPPED",
    createdAt: "2026-11-20T14:10:00Z",
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "cust-1",
    name: "Ayesha Rahman",
    phone: "01712345678",
    email: "ayesha@gmail.com",
    deliveryAddress: "House 24, Road 11, Banani",
    city: "Inside Dhaka",
    totalOrders: 4,
    lifetimeSpend: 14200,
    lastOrderDate: "2026-11-22",
    tags: ["VIP", "Gadget Buyer"],
    timeline: [],
  },
  {
    id: "cust-2",
    name: "Rafiqul Islam",
    phone: "01899887766",
    email: "rafiqul.ctg@yahoo.com",
    deliveryAddress: "GEC Circle, Chattogram",
    city: "Outside Dhaka",
    totalOrders: 2,
    lifetimeSpend: 6800,
    lastOrderDate: "2026-11-21",
    tags: ["Wholesale Inquiry"],
    timeline: [],
  },
  {
    id: "cust-3",
    name: "Nusrat Jahan",
    phone: "01611223344",
    email: "nusrat.j@outlook.com",
    deliveryAddress: "Sector 7, Uttara, Dhaka",
    city: "Inside Dhaka",
    totalOrders: 3,
    lifetimeSpend: 9800,
    lastOrderDate: "2026-11-20",
    tags: ["Frequent Buyer"],
    timeline: [],
  },
];
