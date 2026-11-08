import { products } from "@/data/products";
import { getCollectionBySlug } from "@/data/collections";
import type {
  Availability,
  CategorySlug,
  Collection,
  FilterOption,
  FilterState,
  Gemstone,
  Metal,
  PriceRange,
  Product,
  SortOption,
} from "@/types";

/* ------------------------------------------------------------------ lookups */

export const getAllProducts = () => products;
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductsByIds = (ids: string[]) =>
  ids.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));

/** Bestsellers, diversified so that each category is represented before any repeats. */
export function getBestSellers(limit = 4): Product[] {
  const pool = products.filter((p) => p.isBestSeller);
  const picked: Product[] = [];
  const seen = new Set<string>();
  for (const p of pool) {
    if (!seen.has(p.category)) {
      picked.push(p);
      seen.add(p.category);
    }
  }
  for (const p of pool) if (!picked.includes(p)) picked.push(p);
  return picked.slice(0, limit);
}

export function matchesCollection(product: Product, collection: Collection): boolean {
  const r = collection.rule;
  const checks: boolean[] = [];
  if (r.categories || r.tags) {
    checks.push(
      Boolean(r.categories?.includes(product.category)) ||
        Boolean(r.tags?.some((t) => product.tags.includes(t))),
    );
  }
  if (r.collections) checks.push(r.collections.includes(product.collection));
  if (r.gemstones) checks.push(r.gemstones.includes(product.gemstone));
  if (r.metals) checks.push(r.metals.includes(product.metal));
  if (r.isNew) checks.push(Boolean(product.isNew));
  if (r.minPrice) checks.push(product.price >= r.minPrice);
  return checks.length > 0 && checks.every(Boolean);
}

export function getProductsForCollection(slug: string): Product[] {
  const collection = getCollectionBySlug(slug);
  if (!collection) return [];
  return products.filter((p) => matchesCollection(p, collection));
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.collection === product.collection) score += 3;
      if (p.category === product.category) score += 2;
      if (p.gemstone === product.gemstone) score += 1;
      if (p.tags.some((t) => product.tags.includes(t))) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

/* ------------------------------------------------------------------ search */

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

function searchableText(p: Product) {
  return normalize(
    [p.name, p.subtitle, p.category, p.collection, p.metal, p.gemstone, p.shortDescription, ...p.tags].join(" "),
  );
}

const searchIndex = new Map(products.map((p) => [p.id, searchableText(p)]));

/** Matches every word of the query against name, category, collection, metal, gemstone and tags. */
export function searchProducts(query: string, source: Product[] = products): Product[] {
  const terms = normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    // tolerate simple plurals: "rings" → "ring"
    .map((t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t));
  if (terms.length === 0) return [];
  return source
    .map((p) => {
      const haystack = searchIndex.get(p.id) ?? searchableText(p);
      if (!terms.every((t) => haystack.includes(t))) return null;
      const name = normalize(p.name);
      const score = terms.reduce((s, t) => s + (name.includes(t) ? 2 : 1), 0);
      return { p, score };
    })
    .filter((x): x is { p: Product; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

/* ------------------------------------------------------------------ filtering */

export const METALS: Metal[] = ["18K Yellow Gold", "18K White Gold", "18K Rose Gold", "Platinum", "Sterling Silver"];
export const GEMSTONES: Gemstone[] = ["Diamond", "Emerald", "Ruby", "Sapphire", "Pearl", "None"];
export const CATEGORIES: { value: CategorySlug; label: string }[] = [
  { value: "rings", label: "Rings" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "bridal", label: "Bridal" },
];
export const AVAILABILITY: { value: Availability; label: string }[] = [
  { value: "in-stock", label: "Ready to Ship" },
  { value: "made-to-order", label: "Made to Order" },
  { value: "sold-out", label: "Sold Out" },
];
export const PRICE_RANGES: PriceRange[] = [
  { id: "under-50k", label: "Under ₹50,000", min: 0, max: 49999 },
  { id: "50k-1l", label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { id: "1l-2.5l", label: "₹1,00,000 – ₹2,50,000", min: 100001, max: 250000 },
  { id: "2.5l-5l", label: "₹2,50,000 – ₹5,00,000", min: 250001, max: 500000 },
  { id: "above-5l", label: "Above ₹5,00,000", min: 500001, max: Number.POSITIVE_INFINITY },
];
export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const emptyFilters = (): FilterState => ({
  categories: [],
  metals: [],
  gemstones: [],
  collections: [],
  availability: [],
  priceRanges: [],
});

export const countActiveFilters = (f: FilterState) =>
  f.categories.length +
  f.metals.length +
  f.gemstones.length +
  f.collections.length +
  f.availability.length +
  f.priceRanges.length;

/** Products may be offered in several metals; the metal filter matches any of them. */
const productMetals = (p: Product) => p.availableMetals ?? [p.metal];

type FilterKey = keyof FilterState;

function passes(p: Product, f: FilterState, skip?: FilterKey): boolean {
  if (skip !== "categories" && f.categories.length && !f.categories.includes(p.category)) return false;
  if (skip !== "metals" && f.metals.length && !productMetals(p).some((m) => f.metals.includes(m))) return false;
  if (skip !== "gemstones" && f.gemstones.length && !f.gemstones.includes(p.gemstone)) return false;
  if (skip !== "collections" && f.collections.length && !f.collections.includes(p.collection)) return false;
  if (skip !== "availability" && f.availability.length && !f.availability.includes(p.availability)) return false;
  if (skip !== "priceRanges" && f.priceRanges.length) {
    const ranges = PRICE_RANGES.filter((r) => f.priceRanges.includes(r.id));
    if (!ranges.some((r) => p.price >= r.min && p.price <= r.max)) return false;
  }
  return true;
}

export const filterProducts = (list: Product[], f: FilterState) => list.filter((p) => passes(p, f));

const featuredScore = (p: Product) => Number(Boolean(p.isFeatured)) * 2 + Number(Boolean(p.isBestSeller));

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.launchedAt.localeCompare(a.launchedAt));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy.sort((a, b) => featuredScore(b) - featuredScore(a));
  }
}

export interface FilterGroups {
  categories: FilterOption<CategorySlug>[];
  metals: FilterOption<Metal>[];
  gemstones: FilterOption<Gemstone>[];
  collections: FilterOption[];
  availability: FilterOption<Availability>[];
  priceRanges: FilterOption[];
}

function isSelected(f: FilterState, value: string) {
  return (Object.values(f) as string[][]).some((arr) => arr.includes(value));
}

/**
 * Builds facet options with live counts. Each facet's counts reflect the
 * other active filters, so shoppers never land on an empty result.
 */
export function buildFilterGroups(
  list: Product[],
  f: FilterState,
  collectionLabels: Record<string, string>,
): FilterGroups {
  const count = (key: FilterKey, test: (p: Product) => boolean) =>
    list.filter((p) => passes(p, f, key) && test(p)).length;
  function present<T extends string>(options: FilterOption<T>[]): FilterOption<T>[] {
    return options.filter((o) => o.count > 0 || isSelected(f, o.value));
  }

  const collectionSlugs = Array.from(new Set(list.map((p) => p.collection)));

  return {
    categories: present(CATEGORIES.map((c) => ({ ...c, count: count("categories", (p) => p.category === c.value) }))),
    metals: present(
      METALS.map((m) => ({ value: m, label: m, count: count("metals", (p) => productMetals(p).includes(m)) })),
    ),
    gemstones: present(
      GEMSTONES.map((g) => ({
        value: g,
        label: g === "None" ? "No Gemstone" : g,
        count: count("gemstones", (p) => p.gemstone === g),
      })),
    ),
    collections: present(
      collectionSlugs
        .map((slug) => ({
          value: slug,
          label: collectionLabels[slug] ?? slug,
          count: count("collections", (p) => p.collection === slug),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ),
    availability: present(
      AVAILABILITY.map((a) => ({ ...a, count: count("availability", (p) => p.availability === a.value) })),
    ),
    priceRanges: present(
      PRICE_RANGES.map((r) => ({
        value: r.id,
        label: r.label,
        count: count("priceRanges", (p) => p.price >= r.min && p.price <= r.max),
      })),
    ),
  };
}

/* ------------------------------------------------------------------ labels */

export const categoryLabel = (slug: CategorySlug) => CATEGORIES.find((c) => c.value === slug)?.label ?? slug;

export const availabilityLabel = (a: Availability) =>
  a === "in-stock" ? "Ready to ship" : a === "made-to-order" ? "Made to order · 3–4 weeks" : "Currently unavailable";

/** Returns the single most relevant badge for a product, if any. */
export function getProductBadge(p: Product): string | undefined {
  if (p.availability === "sold-out") return "Sold Out";
  if (p.isNew) return "New";
  if (p.isBestSeller) return "Bestseller";
  if (p.availability === "made-to-order") return "Made to Order";
  return undefined;
}

export const cartLineKey = (productId: string, metal?: string, size?: string) =>
  [productId, metal ?? "", size ?? ""].join("|");
