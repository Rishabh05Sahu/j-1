# AURELLE — Luxury Jewelry Storefront

A frontend-only luxury fine-jewelry e-commerce experience for **AURELLE**, a fictional contemporary jewelry maison. It is built with Next.js (App Router), TypeScript and Tailwind CSS v4, and organised with Atomic Design.

> **Demonstration only.** There is no backend, database, authentication or payment processing. All products, orders, bookings and accounts are simulated in the browser.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack, Cache Components + Partial Prefetching) |
| UI | React 19, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 with CSS-first design tokens (`@theme` in `src/app/globals.css`) |
| Icons | `lucide-react` (plus two hand-drawn social marks) |
| Fonts | `next/font/google`: Cormorant Garamond (display) and Inter (body) |
| Images | `next/image` with remote Unsplash photography (AVIF/WebP) |
| State | React Context and `useSyncExternalStore` stores persisted to `localStorage` |
| Motion | CSS transitions/keyframes only. No motion library was needed, and `prefers-reduced-motion` is respected |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (80 pages pre-rendered)
npm run start      # serve the production build
npm run lint
```

Node 20+ is recommended (developed on Node 24).

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Cinematic homepage: hero, categories, Eternal collection, bestsellers, brand story, craftsmanship, bridal campaign, journal, appointments, newsletter |
| `/collections` | Overview of categories, signature collections and curations |
| `/collections/[slug]` | Any category, collection or curation, e.g. `rings`, `necklaces`, `earrings`, `bracelets`, `bridal`, `eternal`, `new-arrivals`, `diamond-jewelry`, `gold-jewelry`, `high-jewelry`, `gifts` |
| `/products/[slug]` | Product detail: gallery and lightbox, variants, size, quantity, add to bag, accordions, related and recently viewed |
| `/search?q=` | Search results synced to the URL, with filters and sorting |
| `/wishlist` | Saved pieces, with move to bag |
| `/cart` | Detailed bag with order summary and gift presentation |
| `/checkout` | Mock checkout with confirmation screen |
| `/account` | Mock sign-in and dashboard (orders, details) |
| `/our-story`, `/craftsmanship` | Editorial brand pages |
| `/journal`, `/journal/[slug]` | Journal index and articles |
| `/care-guide`, `/client-care/[slug]` | Information pages (care, shipping, returns, privacy, terms) |
| `/contact`, `/book-appointment` | Service pages with validated, simulated forms |

---

## Folder structure

```text
src/
├── app/                    # Routes only: fetch data from src/data and hand it to templates
├── components/
│   ├── atoms/              # Button, IconButton, Typography, Container, Price, Badge, Divider,
│   │                       # Input/Textarea, Checkbox/Radio, Select, ImageFrame, Reveal, Spinner, SocialIcon
│   ├── molecules/          # Logo, NavigationItem, ProductCard, CartItem, Breadcrumbs, SearchInput,
│   │                       # QuantitySelector, FilterChip, ProductSwatches, SizeSelector, FormField,
│   │                       # NewsletterForm, Accordion, Overlay (Drawer/Modal), SectionHeading,
│   │                       # CategoryTile, EditorialCard, OptionCard, EmptyState
│   ├── organisms/          # Header, Footer, AnnouncementBar, MegaMenu, MobileMenu, HeroSection,
│   │                       # CategoryShowcase, CollectionShowcase, ProductShowcase, ProductGrid,
│   │                       # ProductListing, FilterSidebar, ProductGallery, ProductInformation,
│   │                       # BrandStorySection, CraftsmanshipSection, CampaignSection, JournalSection,
│   │                       # AppointmentSection, NewsletterSection, TrustSection, CartDrawer,
│   │                       # WishlistDrawer, SearchOverlay, QuickViewModal, Toaster, ShopOverlays,
│   │                       # PageHeader, PageSkeleton, EditorialSection, RecentlyViewed,
│   │                       # OrderSummary, CheckoutForm, ContactForm, AppointmentForm
│   └── templates/          # HomeTemplate, CollectionTemplate, CollectionsOverviewTemplate,
│                           # ProductTemplate, SearchTemplate, CartTemplate, WishlistTemplate,
│                           # CheckoutTemplate, AccountTemplate, EditorialTemplate,
│                           # InformationTemplate, ServiceTemplate
├── config/brand.ts         # Brand constants, contact details, storage keys
├── data/                   # The entire content layer (see below)
├── hooks/                  # useCart, useWishlist, useUI/useToast, useSearch, useForm,
│                           # useDialog, useInView, useScrolled, useMoveToBag
├── lib/                    # utils, currency, product-utils (filter/sort/search), shipping,
│                           # persistent-store
├── providers/ShopProvider.tsx
└── types/index.ts
```

## How Atomic Design is applied

- **Atoms** are the smallest styled primitives. They carry no product or page knowledge. `ImageFrame` reserves an aspect ratio, shows a shimmer while loading, fades the image in, and falls back to an AURELLE monogram if the image fails.
- **Molecules** combine atoms into small reusable units: `ProductCard` (hover image, wishlist, quick view, badge, swatches), `CartItem`, `FormField`, and the accessible `Drawer`/`Modal` primitives.
- **Organisms** are complete sections that take content through props. None of them contain hardcoded product or marketing copy.
- **Templates** arrange organisms into page layouts. For example, `EditorialTemplate` serves Our Story, Craftsmanship and every journal article from data-driven `EditorialBlock`s, and `InformationTemplate` serves the care guide and all client-care pages.
- **Pages** (`src/app/**/page.tsx`) are thin: they read from `src/data`, set metadata, and render a template.

Server Components are the default. Only interactive pieces are client components: header, overlays, product card, gallery, purchase panel, listing and forms.

## Dummy data

All content lives in `src/data`:

- `products.ts`: 33 products across rings, necklaces, earrings, bracelets and bridal, in 10 named collections. Each is built by `defineProduct()`, which derives the subtitle and specification rows from typed fields (`Product` in `src/types`). Fields include metal, gemstone, carat, sizes, available metals, availability (`in-stock`, `made-to-order` or `sold-out`), launch date and tags.
- `collections.ts`: every browsable listing (category, named collection or curation) with a declarative `rule`, resolved by `getProductsForCollection()`.
- `images.ts`: a curated photography library referenced by intent (e.g. `images.ringPearBlack`). Every URL was checked to return HTTP 200.
- `navigation.ts`: main navigation with mega menus, footer columns and search shortcuts.
- `editorial.ts`: homepage copy, journal articles, Our Story, Craftsmanship, Care Guide, client-care pages, and appointment/contact content.
- `testimonials.ts`: testimonials and mock order history.

Prices are in INR and formatted with `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })`.

## Cart and wishlist state

`ShopProvider` exposes four contexts: **cart**, **wishlist** (plus recently viewed), **UI** (which single overlay is open: bag, wishlist, search, mobile menu or quick view) and **toasts**. Hooks wrap each context (`useCart`, `useWishlist`, `useUI`, `useToast`).

Persistence uses `createPersistentStore()` (`src/lib/persistent-store.ts`), a small external store read with `useSyncExternalStore`:

- The **server snapshot is always empty**, so the server HTML and the first client render match and there are no hydration mismatches. The persisted bag and wishlist appear immediately after hydration.
- Stored data is **sanitised on load**, so unknown product IDs or bad quantities are dropped.
- Changes sync **across browser tabs** through the `storage` event.

Cart lines are keyed by product, metal and size. Quantities are capped at 10, and sold-out pieces cannot be added. Adding from the product page opens the bag drawer; adding from quick view or the wishlist shows a toast.

## Notes

- Cache Components is enabled, so dynamic routes read `params` inside `<Suspense>` with elegant skeleton fallbacks. Every product, collection, journal and client-care page is pre-rendered through `generateStaticParams`.
- Forms (checkout, contact, appointment, account, newsletter) validate on submit, re-validate as you type, focus the first invalid field, and then show a simulated confirmation.
- Accessibility: semantic landmarks, a skip link, focus-trapped dialogs with Escape and focus restoration, labelled icon buttons, `aria-live` updates for counts and toasts, visible focus rings, and reduced-motion support.

## Credits

Photography from [Unsplash](https://unsplash.com/license). AURELLE is a fictional brand created for this demonstration.
