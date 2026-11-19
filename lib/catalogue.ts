import { products } from "@/data/products";

export type Fulfilment = "ready" | "made" | "custom";

export interface Variant {
  label: string;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  category: string; // category slug
  price?: number; // omit when the price is not confirmed or when variants carry it
  variants?: Variant[];
  fulfilment: Fulfilment;
  size?: string;
  blurb?: string;
  designs?: string[];
  designGroups?: { label: string; count: number }[];
  colours?: string[];
  customise?: string; // how personalising works and what it costs
  moq?: number;
  image?: string; // file in /public/products, e.g. "/products/sunny-ray.jpg"
  featured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  tone: "yellow" | "ink" | "coral" | "green" | "sand" | "sky";
}

export const categories: Category[] = [
  { slug: "papergoods", name: "Papergoods", blurb: "Greeting cards, bookmarks, Sunny Rays, postcards, polaroids", tone: "yellow" },
  { slug: "accessories", name: "Accessories", blurb: "Magnets, pins, keyholders, mousepads and small trinkets", tone: "ink" },
  { slug: "message-jars", name: "Message Jars", blurb: "Jars filled with 30 notes for gratitude, prayer, memories and love", tone: "coral" },
  { slug: "drinkware", name: "Drinkware", blurb: "Tumblers, flasks, mugs and glassware", tone: "sky" },
  { slug: "books-stationery", name: "Books & Stationery", blurb: "Notebooks, scrapbooks, pens and colouring books", tone: "sand" },
  { slug: "apparel-textiles", name: "Apparel & Textiles", blurb: "T-shirts, hoodies, hats, aprons, socks and bags", tone: "green" },
  { slug: "complimentaries", name: "Complimentaries", blurb: "Chocolate, candles and gift extras", tone: "coral" },
  { slug: "gift-packaging", name: "Gift Packaging", blurb: "Boxes, bags, envelopes and ribbon", tone: "yellow" },
  { slug: "home-decor", name: "Home Decor", blurb: "Frames, pegs and keepsake boxes", tone: "sand" },
];

export const allProducts: Product[] = products;

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return allProducts.find((p) => p.slug === slug);
}

export function productsIn(categorySlug: string) {
  return allProducts.filter((p) => p.category === categorySlug);
}

export function lowestPrice(p: Product): number | undefined {
  if (p.variants && p.variants.length) return Math.min(...p.variants.map((v) => v.price));
  return p.price;
}

export function hasPriceRange(p: Product) {
  if (!p.variants || p.variants.length < 2) return false;
  const prices = p.variants.map((v) => v.price);
  return Math.min(...prices) !== Math.max(...prices);
}

export function fulfilmentLabel(f: Fulfilment) {
  if (f === "ready") return "Ready to ship";
  if (f === "made") return "Made to order";
  return "Made for you";
}
