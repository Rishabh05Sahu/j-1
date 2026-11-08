/* ------------------------------------------------------------------
   Catalogue
   ------------------------------------------------------------------ */

export type Metal =
  | "18K Yellow Gold"
  | "18K White Gold"
  | "18K Rose Gold"
  | "Platinum"
  | "Sterling Silver";

export type Gemstone = "Diamond" | "Emerald" | "Ruby" | "Sapphire" | "Pearl" | "None";

export type CategorySlug = "rings" | "necklaces" | "earrings" | "bracelets" | "bridal";

export type Availability = "in-stock" | "made-to-order" | "sold-out";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  /** One-line description used on product cards. */
  shortDescription: string;
  description: string;
  category: CategorySlug;
  /** Slug of the named collection (e.g. "celeste"). */
  collection: string;
  price: number;
  compareAtPrice?: number;

  images: ProductImage[];

  metal: Metal;
  gemstone: Gemstone;
  carat?: string;
  materialWeight?: string;

  sizes?: string[];
  availableMetals?: Metal[];

  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;

  availability: Availability;
  /** ISO date — used for "Newest" sorting. */
  launchedAt: string;

  details: ProductDetail[];
  tags: string[];
}

export interface CollectionRule {
  categories?: CategorySlug[];
  collections?: string[];
  tags?: string[];
  gemstones?: Gemstone[];
  metals?: Metal[];
  isNew?: boolean;
  minPrice?: number;
}

export type CollectionKind = "category" | "collection" | "curation";

export interface Collection {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  /** Longer editorial copy for collection overview pages. */
  story?: string;
  kind: CollectionKind;
  image: ProductImage;
  rule: CollectionRule;
}

/* ------------------------------------------------------------------
   Commerce state
   ------------------------------------------------------------------ */

export interface CartLine {
  /** Unique per product + variant combination. */
  key: string;
  productId: string;
  quantity: number;
  metal?: Metal;
  size?: string;
}

export interface CartLineDetailed extends CartLine {
  product: Product;
  lineTotal: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  image?: ProductImage;
  action?: { label: string; type: "open-cart" | "open-wishlist" };
}

/* ------------------------------------------------------------------
   Catalogue browsing
   ------------------------------------------------------------------ */

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface FilterState {
  categories: CategorySlug[];
  metals: Metal[];
  gemstones: Gemstone[];
  collections: string[];
  availability: Availability[];
  priceRanges: string[];
}

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
  count: number;
}

/* ------------------------------------------------------------------
   Navigation & content
   ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export interface MegaMenu {
  columns: MegaMenuColumn[];
  feature: {
    eyebrow: string;
    title: string;
    href: string;
    image: ProductImage;
  };
}

export interface MainNavItem extends NavLink {
  megaMenu?: MegaMenu;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  image: ProductImage;
  body: EditorialBlock[];
}

/** Data-driven blocks used by the editorial template. */
export type EditorialBlock =
  | { type: "lede"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | {
      type: "split";
      eyebrow?: string;
      title: string;
      text: string[];
      image: ProductImage;
      reverse?: boolean;
    }
  | { type: "image"; image: ProductImage; caption?: string }
  | {
      type: "columns";
      eyebrow?: string;
      title?: string;
      items: { title: string; text: string }[];
    }
  | { type: "statement"; eyebrow?: string; text: string; cta?: NavLink };

export interface EditorialPage {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: ProductImage;
  blocks: EditorialBlock[];
}

export interface InformationSection {
  id: string;
  title: string;
  intro?: string;
  items?: { title: string; text: string }[];
  paragraphs?: string[];
}

export interface InformationPage {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: InformationSection[];
  image?: ProductImage;
}

export interface MockOrder {
  reference: string;
  date: string;
  status: string;
  total: number;
  productIds: string[];
}
