import type { Collection } from "@/types";
import { images } from "./images";

/**
 * Every browsable listing — product categories, named collections and
 * editorial curations — is described here and resolved by `rule`.
 */
export const collections: Collection[] = [
  /* Categories */
  {
    slug: "rings",
    kind: "category",
    eyebrow: "Fine Jewelry",
    title: "Rings",
    description:
      "From luminous solitaires to sculptural cocktail rings — each one made to mark a moment and be worn for a lifetime.",
    image: images.ringStackGold,
    rule: { categories: ["rings"] },
  },
  {
    slug: "necklaces",
    kind: "category",
    eyebrow: "Fine Jewelry",
    title: "Necklaces",
    description:
      "Pendants, strands and layered chains in precious metals — designed to rest close to the heart.",
    image: images.necklaceLayeredModel,
    rule: { categories: ["necklaces"] },
  },
  {
    slug: "earrings",
    kind: "category",
    eyebrow: "Fine Jewelry",
    title: "Earrings",
    description:
      "Studs, hoops and drops that frame the face with light, from everyday gold to evening brilliance.",
    image: images.earringsTwistTwo,
    rule: { categories: ["earrings"] },
  },
  {
    slug: "bracelets",
    kind: "category",
    eyebrow: "Fine Jewelry",
    title: "Bracelets",
    description:
      "Tennis lines, bangles and gold links — crafted to move with you and to be stacked, gifted and treasured.",
    image: images.braceletHandsModel,
    rule: { categories: ["bracelets"] },
  },
  {
    slug: "bridal",
    kind: "category",
    eyebrow: "For Ever After",
    title: "Bridal",
    description:
      "Engagement rings, wedding bands and heirloom bridal suites for life's most meaningful celebrations.",
    image: images.brideBeach,
    rule: { categories: ["bridal"], tags: ["bridal"] },
  },

  /* Curations */
  {
    slug: "new-arrivals",
    kind: "curation",
    eyebrow: "Just Arrived",
    title: "New Arrivals",
    description: "The latest creations from the AURELLE ateliers, revealed this season.",
    image: images.necklaceGinkgoModel,
    rule: { isNew: true },
  },
  {
    slug: "diamond-jewelry",
    kind: "curation",
    eyebrow: "Brilliance",
    title: "Diamond Jewelry",
    description:
      "Natural diamonds, selected one by one for their fire, clarity and character — then set to let the light speak.",
    image: images.braceletDiamondBlack,
    rule: { gemstones: ["Diamond"] },
  },
  {
    slug: "gold-jewelry",
    kind: "curation",
    eyebrow: "Precious Metals",
    title: "Gold Jewelry",
    description: "Warm, luminous 18-karat gold, sculpted and finished by hand in yellow and rose.",
    image: images.necklaceCoinLayered,
    rule: { metals: ["18K Yellow Gold", "18K Rose Gold"], gemstones: ["None"] },
  },
  {
    slug: "high-jewelry",
    kind: "curation",
    eyebrow: "The Exceptional",
    title: "High Jewelry",
    description: "Rare stones and extraordinary craftsmanship — creations of singular character.",
    image: images.ringFlowerDiamond,
    rule: { minPrice: 300000 },
  },
  {
    slug: "gifts",
    kind: "curation",
    eyebrow: "The Art of Giving",
    title: "Gifts",
    description: "Thoughtful creations to celebrate the people and moments that matter most.",
    image: images.necklaceRosePendants,
    rule: { tags: ["gift"] },
  },

  /* Named collections */
  {
    slug: "eternal",
    kind: "collection",
    eyebrow: "Collection",
    title: "The Eternal Collection",
    description: "An exploration of exceptional forms, precious materials, and enduring elegance.",
    story:
      "Eternal began with a single question: how do you design something to be loved for a hundred years? The answer was restraint — pure lines, perfectly proportioned halos and diamonds chosen for their life rather than their size.",
    image: images.modelHandsWhite,
    rule: { collections: ["eternal"] },
  },
  {
    slug: "celeste",
    kind: "collection",
    eyebrow: "Collection",
    title: "Celeste",
    description: "Celestial geometry rendered in gold and diamonds — light, luminous and modern.",
    story:
      "Inspired by the clarity of a night sky, Celeste pairs crisp geometric cuts with warm gold for pieces that feel both precise and soft.",
    image: images.ringYellowSolitaire,
    rule: { collections: ["celeste"] },
  },
  {
    slug: "lumiere",
    kind: "collection",
    eyebrow: "Collection",
    title: "Lumière",
    description: "Our most brilliant creations, designed entirely around the play of light.",
    story:
      "Every Lumière piece is engineered for brilliance: open galleries, hand-cut settings and diamonds placed so that each catches light from another.",
    image: images.ringPearCluster,
    rule: { collections: ["lumiere"] },
  },
  {
    slug: "solstice",
    kind: "collection",
    eyebrow: "Collection",
    title: "Solstice",
    description: "Sun-warmed gold in sculptural links, medallions and knots for every day.",
    story: "Solstice celebrates gold in its most honest form — weighty, warm and made to be lived in.",
    image: images.necklaceCoinLayered,
    rule: { collections: ["solstice"] },
  },
  {
    slug: "aurelia",
    kind: "collection",
    eyebrow: "Collection",
    title: "Aurelia",
    description: "Nature, sculpted in gold — leaves, blooms and twisted forms with a tactile finish.",
    story:
      "Named for the maison itself, Aurelia translates the organic forms of nature into hand-textured gold.",
    image: images.necklaceGinkgoModel,
    rule: { collections: ["aurelia"] },
  },
  {
    slug: "etoile",
    kind: "collection",
    eyebrow: "Collection",
    title: "Étoile",
    description: "Pearls and starlit diamonds, for a timeless kind of radiance.",
    story: "Étoile pairs the soft glow of pearls with the sparkle of diamonds, like starlight on water.",
    image: images.necklacePearlBox,
    rule: { collections: ["etoile"] },
  },
  {
    slug: "rose",
    kind: "collection",
    eyebrow: "Collection",
    title: "Rosé",
    description: "The tenderness of rose gold with blush sapphires and delicate diamonds.",
    story: "Rosé is AURELLE at its most romantic — rose gold, soft colour and graceful proportions.",
    image: images.ringPinkSapphire,
    rule: { collections: ["rose"] },
  },
  {
    slug: "heritage",
    kind: "collection",
    eyebrow: "Collection",
    title: "Heritage",
    description: "Archive-inspired jewels with engraved details and heirloom craftsmanship.",
    story:
      "Heritage revisits the maison's archive of drawings, translating vintage motifs with today's precision.",
    image: images.necklaceBridalSet,
    rule: { collections: ["heritage"] },
  },
  {
    slug: "serene",
    kind: "collection",
    eyebrow: "Collection",
    title: "Serene",
    description: "Colombian emeralds in calm, contemporary settings.",
    story: "Serene is devoted to the emerald — a gemstone of renewal — in quiet, modern settings.",
    image: images.ringEmerald,
    rule: { collections: ["serene"] },
  },
  {
    slug: "nuit",
    kind: "collection",
    eyebrow: "Collection",
    title: "Nuit",
    description: "Midnight sapphires and diamond constellations for the evening.",
    story: "Nuit captures the depth of a midnight sky in sapphires of rare saturation.",
    image: images.ringSapphireBlack,
    rule: { collections: ["nuit"] },
  },
];

export const categoryCollections = collections.filter((c) => c.kind === "category");
export const namedCollections = collections.filter((c) => c.kind === "collection");
export const curations = collections.filter((c) => c.kind === "curation");

export const getCollectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);

export const collectionName = (slug: string) =>
  namedCollections.find((c) => c.slug === slug)?.title.replace(/^The | Collection$/g, "") ?? slug;
