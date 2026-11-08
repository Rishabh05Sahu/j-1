import type { EditorialPage, InformationPage, JournalArticle, NavLink, ProductImage } from "@/types";
import { images } from "./images";

/* ==================================================================
   Homepage
   ================================================================== */

export const homeContent = {
  hero: {
    eyebrow: "The Art of Timeless Beauty",
    title: "Jewelry That Becomes Part of Your Story.",
    text: "Discover exceptional creations designed to celebrate life's most meaningful moments.",
    image: images.necklaceGoldDress,
    primaryCta: { label: "Explore the Collection", href: "/collections" },
    secondaryCta: { label: "Discover AURELLE", href: "/our-story" },
  },
  categories: {
    eyebrow: "The Maison",
    title: "Discover Fine Jewelry",
    subtitle: "Exceptional creations for every expression of you.",
    items: [
      { label: "Rings", href: "/collections/rings", image: images.ringTray },
      { label: "Necklaces", href: "/collections/necklaces", image: images.necklaceLayeredModel },
      { label: "Earrings", href: "/collections/earrings", image: images.earringsTwistTwo },
      { label: "Bracelets", href: "/collections/bracelets", image: images.braceletHandsModel },
      { label: "Bridal", href: "/collections/bridal", image: images.brideBeach },
    ],
  },
  featuredCollection: {
    eyebrow: "The Signature",
    title: "The Eternal Collection",
    text: "An exploration of exceptional forms, precious materials, and enduring elegance.",
    detail:
      "Pure lines, perfectly proportioned halos and diamonds chosen for their life rather than their size — Eternal is designed to be loved for a hundred years.",
    image: images.modelHandsWhite,
    secondaryImage: images.ringHaloWhite,
    cta: { label: "Discover the Collection", href: "/collections/eternal" },
  },
  bestsellers: {
    eyebrow: "Bestsellers",
    title: "Most Loved Creations",
    subtitle: "Discover the pieces that become part of your everyday.",
    cta: { label: "View All Jewelry", href: "/collections" },
  },
  brandStory: {
    eyebrow: "The Maison",
    title: "More Than Jewelry. A Legacy of Meaning.",
    text: "Every AURELLE creation begins with a vision, shaped by skilled hands and finished with an enduring attention to detail.",
    image: images.necklaceGinkgoModel,
    detailImage: images.looseDiamonds,
    cta: { label: "Our Story", href: "/our-story" },
    stats: [
      { value: "2009", label: "Founded in Mumbai" },
      { value: "48", label: "Master artisans" },
      { value: "120+", label: "Hours in a single piece" },
    ],
  },
  craftsmanship: {
    eyebrow: "Savoir-Faire",
    title: "The Art of Making",
    pillars: [
      {
        icon: "gem",
        title: "The Finest Materials",
        text: "Only thoughtfully selected precious materials find their place in our creations.",
        image: images.looseDiamonds,
      },
      {
        icon: "pen",
        title: "Thoughtful Design",
        text: "Every detail is considered, every silhouette designed to endure.",
        image: images.ringGoldCluster,
      },
      {
        icon: "hand",
        title: "Crafted With Care",
        text: "A commitment to quality, precision, and timeless artistry.",
        image: images.ringPearCluster,
      },
    ],
    cta: { label: "Discover Our Craftsmanship", href: "/craftsmanship" },
  },
  bridal: {
    eyebrow: "Bridal",
    title: "For the Moments That Last Forever.",
    text: "Explore extraordinary bridal creations designed for life's most meaningful celebrations.",
    image: images.bridalMonochrome,
    cta: { label: "Explore Bridal", href: "/collections/bridal" },
  },
  journal: {
    eyebrow: "Stories & Expertise",
    title: "The AURELLE Journal",
    cta: { label: "Read the Journal", href: "/journal" },
  },
  appointment: {
    eyebrow: "Private Appointments",
    title: "An Experience, Personally Yours.",
    text: "Discover your next treasured piece with the guidance of an AURELLE jewelry specialist.",
    image: images.ringsBox,
    cta: { label: "Book an Appointment", href: "/book-appointment" },
    secondaryCta: { label: "Contact Client Care", href: "/contact" },
  },
  newsletter: {
    eyebrow: "Correspondence",
    title: "A Letter from AURELLE",
    text: "Be the first to discover new collections, stories, and exceptional creations.",
  },
};

export const trustPromises = [
  { icon: "truck", title: "Insured Delivery", text: "Complimentary on orders above ₹25,000" },
  { icon: "shield", title: "Certified Stones", text: "Every diamond independently graded" },
  { icon: "gift", title: "Signature Packaging", text: "Presented in our ivory keepsake box" },
  { icon: "rotate", title: "30-Day Returns", text: "Effortless exchanges and returns" },
] as const;

/* ==================================================================
   Journal
   ================================================================== */

export const journalArticles: JournalArticle[] = [
  {
    slug: "the-art-of-choosing-a-diamond",
    title: "The Art of Choosing a Diamond",
    category: "Diamond Guide",
    excerpt: "Beyond the four Cs: how our gemologists look for life, fire and character in every stone.",
    readingTime: "6 min read",
    publishedAt: "2026-09-12",
    image: images.ringPearCluster,
    body: [
      {
        type: "lede",
        text: "A diamond is not chosen by a certificate alone. It is chosen in the hand, under the loupe and in the light — and, ultimately, by the feeling it gives.",
      },
      { type: "heading", text: "Understanding the four Cs" },
      {
        type: "paragraph",
        text: "Cut, colour, clarity and carat weight provide a shared language for describing diamonds. Of the four, cut matters most: it determines how light enters the stone and returns to the eye as brilliance, fire and scintillation.",
      },
      {
        type: "paragraph",
        text: "Colour is graded from D (colourless) to Z. Within the near-colourless range, the differences are subtle and often invisible once a diamond is set — particularly in yellow or rose gold, which lend their own warmth.",
      },
      {
        type: "quote",
        text: "We reject far more diamonds than we accept. The ones we keep have something that cannot be written on paper.",
        cite: "Head Gemologist, AURELLE",
      },
      { type: "heading", text: "Choosing a shape" },
      {
        type: "paragraph",
        text: "Round brilliants offer the most sparkle; emerald cuts reveal a hall-of-mirrors clarity; pears and ovals elongate the finger. The right shape is the one that feels like the wearer.",
      },
      { type: "image", image: images.ringYellowSolitaire, caption: "The Celeste Diamond Ring, emerald cut in 18K yellow gold." },
      { type: "heading", text: "Seeing in person" },
      {
        type: "paragraph",
        text: "Our specialists will present a curated selection of stones side by side, in daylight and candlelight, so that the choice becomes instinctive. Appointments can be arranged in any of our boutiques or virtually.",
      },
      {
        type: "statement",
        text: "Discover your diamond with an AURELLE specialist.",
        cta: { label: "Book an Appointment", href: "/book-appointment" },
      },
    ],
  },
  {
    slug: "understanding-gold-and-precious-metals",
    title: "Understanding Gold and Precious Metals",
    category: "Materials",
    excerpt: "Yellow, white, rose or platinum — what each metal brings to a piece, and how to choose.",
    readingTime: "5 min read",
    publishedAt: "2026-07-03",
    image: images.goldBars,
    body: [
      {
        type: "lede",
        text: "Metal is the architecture of a jewel. It carries the stones, defines the silhouette and — over decades — develops a character of its own.",
      },
      { type: "heading", text: "Why 18 karat" },
      {
        type: "paragraph",
        text: "All AURELLE gold is 18 karat: 75% pure gold alloyed for strength. It offers the richness of high-purity gold with the resilience needed for fine settings that will be worn every day.",
      },
      { type: "heading", text: "Yellow, white and rose" },
      {
        type: "paragraph",
        text: "Yellow gold is warm and classic. White gold is alloyed with palladium and finished with rhodium for a cool brilliance. Rose gold owes its blush to a touch of copper, and softens beautifully over time.",
      },
      { type: "heading", text: "Platinum" },
      {
        type: "paragraph",
        text: "Dense, naturally white and exceptionally durable, platinum is our metal of choice for many engagement rings. It holds diamonds securely and develops a soft patina that many cherish.",
      },
      { type: "image", image: images.ringWeddingBands, caption: "Eternal Wedding Bands in 18K gold." },
      {
        type: "statement",
        text: "Explore our creations in gold.",
        cta: { label: "Shop Gold Jewelry", href: "/collections/gold-jewelry" },
      },
    ],
  },
  {
    slug: "jewelry-that-transcends-generations",
    title: "Jewelry That Transcends Generations",
    category: "Heritage",
    excerpt: "On heirlooms: the pieces we inherit, the stories they carry and how to care for them.",
    readingTime: "4 min read",
    publishedAt: "2026-05-21",
    image: images.necklacePearlBox,
    body: [
      {
        type: "lede",
        text: "Some jewels are bought. Others are inherited, reset, re-worn and handed on — each generation adding a chapter.",
      },
      {
        type: "paragraph",
        text: "An heirloom is defined less by its value than by its memory. A strand of pearls worn at three weddings; a ring reset for a granddaughter; a pendant that has rested on four different collarbones.",
      },
      {
        type: "quote",
        text: "We design every piece imagining the person who will inherit it.",
        cite: "Creative Director, AURELLE",
      },
      {
        type: "paragraph",
        text: "Our Heritage atelier offers restoration, resizing and remodelling of family jewelry — honouring the original while making it wearable for a new life.",
      },
      {
        type: "statement",
        text: "Discover the Heritage collection.",
        cta: { label: "Explore Heritage", href: "/collections/heritage" },
      },
    ],
  },
];

export const getArticleBySlug = (slug: string) => journalArticles.find((a) => a.slug === slug);

/* ==================================================================
   Our Story & Craftsmanship
   ================================================================== */

export const ourStoryPage: EditorialPage = {
  slug: "our-story",
  eyebrow: "Our Story",
  title: "A Maison Devoted to Meaning.",
  intro:
    "Founded in Mumbai in 2009, AURELLE creates fine jewelry for the moments that shape a life — and for the generations who will wear it after.",
  heroImage: images.necklaceCloseModel,
  blocks: [
    {
      type: "lede",
      text: "AURELLE was born from a simple belief: that a jewel should be as meaningful as the moment it marks. We design with restraint, craft with patience and finish every piece as though it were the only one.",
    },
    {
      type: "split",
      eyebrow: "Philosophy",
      title: "Quiet Luxury, Enduring Form",
      text: [
        "We are drawn to the essential. Pure lines, balanced proportions and materials of uncompromising quality allow each stone to speak for itself.",
        "Our pieces are not designed for a season. They are designed to be worn daily, loved deeply and handed on.",
      ],
      image: images.modelHandsWhite,
    },
    {
      type: "split",
      eyebrow: "Inspiration",
      title: "From Nature and Architecture",
      text: [
        "The curve of a ginkgo leaf. The geometry of a Mumbai Art Deco façade. The way morning light falls through a jaali screen.",
        "Our design studio collects these impressions and translates them into forms that feel both familiar and new.",
      ],
      image: images.necklaceGinkgoModel,
      reverse: true,
    },
    {
      type: "quote",
      text: "A jewel is a promise in a permanent material.",
      cite: "Founder, AURELLE",
    },
    {
      type: "split",
      eyebrow: "Craftsmanship",
      title: "Made by Hand, Finished by Eye",
      text: [
        "Forty-eight master artisans work in our Mumbai atelier — setters, polishers, engravers and goldsmiths whose skills have been handed down through families.",
        "A single high-jewelry piece can take more than 120 hours to complete.",
      ],
      image: images.ringPearCluster,
    },
    {
      type: "columns",
      eyebrow: "Our Commitments",
      title: "What We Promise",
      items: [
        { title: "Responsible Sourcing", text: "Conflict-free diamonds and recycled gold wherever possible, traceable to source." },
        { title: "Lifetime Care", text: "Complimentary cleaning, inspection and re-polishing for as long as you own your piece." },
        { title: "Certified Quality", text: "Every significant diamond is independently graded and accompanied by its certificate." },
      ],
    },
    {
      type: "statement",
      eyebrow: "The Maison",
      text: "Jewelry that becomes part of your story — and the stories of those who come after.",
      cta: { label: "Explore the Collections", href: "/collections" },
    },
  ],
};

export const craftsmanshipPage: EditorialPage = {
  slug: "craftsmanship",
  eyebrow: "Savoir-Faire",
  title: "The Art of Making.",
  intro:
    "From the selection of a single diamond to the final polish, every AURELLE creation passes through dozens of expert hands.",
  heroImage: images.ringPearCluster,
  blocks: [
    {
      type: "lede",
      text: "Craftsmanship is the patient accumulation of countless small decisions, each made with care. Here is how an AURELLE jewel comes to life.",
    },
    {
      type: "split",
      eyebrow: "01 — Materials",
      title: "Precious Metals of Integrity",
      text: [
        "We work exclusively in 18-karat gold, platinum and sterling silver, prioritising recycled and responsibly sourced metals.",
        "Each alloy is chosen for its colour, strength and the way it ages with the wearer.",
      ],
      image: images.goldBars,
    },
    {
      type: "split",
      eyebrow: "02 — Diamond Selection",
      title: "Chosen One by One",
      text: [
        "Our gemologists assess every diamond for cut, colour, clarity and carat — and for that elusive quality we call life.",
        "Fewer than one in ten stones presented to us meets the AURELLE standard.",
      ],
      image: images.looseDiamonds,
      reverse: true,
    },
    {
      type: "split",
      eyebrow: "03 — Design",
      title: "From Sketch to Wax",
      text: [
        "Each piece begins as a hand drawing in our design studio, refined through gouache renderings and carved wax models.",
        "Proportions are adjusted by fractions of a millimetre until the piece feels inevitable.",
      ],
      image: images.ringGoldCluster,
    },
    {
      type: "split",
      eyebrow: "04 — Finishing",
      title: "The Final Hours",
      text: [
        "Setting, engraving and polishing are performed entirely by hand. A polisher may spend a full day bringing a single ring to its final lustre.",
        "Every surface — including those no one will see — is finished with equal care.",
      ],
      image: images.ringHaloBlack,
      reverse: true,
    },
    {
      type: "columns",
      eyebrow: "05 — Quality Commitment",
      title: "Our Standard",
      items: [
        { title: "Hallmarked", text: "All gold is BIS hallmarked and independently assayed for purity." },
        { title: "Certified", text: "Diamonds above 0.30 carat are accompanied by an independent grading certificate." },
        { title: "Inspected", text: "Each piece undergoes a 32-point inspection before it leaves the atelier." },
      ],
    },
    {
      type: "statement",
      text: "See our craftsmanship up close in a private appointment.",
      cta: { label: "Book an Appointment", href: "/book-appointment" },
    },
  ],
};

/* ==================================================================
   Information pages
   ================================================================== */

export const careGuidePage: InformationPage = {
  slug: "care-guide",
  eyebrow: "Client Care",
  title: "Caring for Your Jewelry",
  intro:
    "Fine jewelry is made to be worn. With a little care, your AURELLE pieces will keep their brilliance for generations.",
  image: images.ringsBox,
  sections: [
    {
      id: "gold",
      title: "Gold Jewelry",
      intro: "18-karat gold is durable yet soft enough to show wear over time — which is part of its beauty.",
      items: [
        { title: "Everyday wear", text: "Remove gold jewelry before swimming, exercising or using household cleaning products." },
        { title: "Polishing", text: "Use a soft, lint-free cloth to restore lustre. Avoid abrasive cloths on textured finishes." },
        { title: "White gold", text: "White gold is rhodium plated. We recommend complimentary re-plating every 12–18 months." },
      ],
    },
    {
      id: "diamonds",
      title: "Diamond Care",
      intro: "Diamonds attract natural oils, which can dull their sparkle.",
      items: [
        { title: "Gentle cleaning", text: "Soak in warm water with a drop of mild soap, then brush gently behind the stone with a soft toothbrush." },
        { title: "Check settings", text: "Have prongs and settings inspected annually — complimentary at every AURELLE boutique." },
        { title: "Avoid knocks", text: "Diamonds are hard but not indestructible. Remove rings during heavy manual work." },
      ],
    },
    {
      id: "pearls",
      title: "Pearl Care",
      intro: "Pearls are organic gems and require the gentlest care of all.",
      items: [
        { title: "Last on, first off", text: "Apply perfume, cosmetics and hairspray before putting on pearls." },
        { title: "Wipe after wear", text: "Wipe with a soft, damp cloth after each wearing. Never use cleaning solutions or ultrasonic cleaners." },
        { title: "Restringing", text: "Strands worn often should be restrung every one to two years." },
      ],
    },
    {
      id: "storage",
      title: "Storage",
      items: [
        { title: "Separate pieces", text: "Store each piece in its own pouch or compartment to prevent scratches." },
        { title: "Lay pearls flat", text: "Store pearl strands flat to avoid stretching the silk." },
        { title: "Keep dry", text: "Store away from humidity and direct sunlight. Your AURELLE box is designed for long-term storage." },
      ],
    },
    {
      id: "cleaning",
      title: "Cleaning Recommendations",
      paragraphs: [
        "For most gold, platinum and diamond pieces, warm water, a few drops of mild soap and a soft brush are all you need. Rinse well and pat dry with a lint-free cloth.",
        "Avoid ultrasonic cleaners for gemstones such as emeralds, pearls and opals, and for any piece with fractures or treatments.",
        "Every AURELLE piece is entitled to complimentary professional cleaning and inspection for life. Visit any boutique, or book a care appointment with our team.",
      ],
    },
  ],
};

export const clientCarePages: InformationPage[] = [
  {
    slug: "shipping",
    eyebrow: "Client Care",
    title: "Shipping & Delivery",
    intro: "Every AURELLE order is fully insured and delivered with the utmost discretion.",
    sections: [
      {
        id: "options",
        title: "Delivery Options",
        items: [
          { title: "Complimentary Insured Delivery", text: "On all orders above ₹25,000. Delivered in 3–5 business days across India." },
          { title: "Standard Delivery", text: "₹750 for orders below ₹25,000. Delivered in 4–6 business days." },
          { title: "Complimentary Express Delivery", text: "Available in Mumbai, Delhi NCR and Bengaluru within 1–2 business days." },
        ],
      },
      {
        id: "made-to-order",
        title: "Made-to-Order Creations",
        paragraphs: [
          "Made-to-order and personalised pieces are crafted in our Mumbai atelier and typically dispatched within 3–4 weeks. Bridal suites may take 6–8 weeks.",
        ],
      },
      {
        id: "security",
        title: "Security & Signature",
        paragraphs: [
          "All deliveries require a signature and government-issued ID from the named recipient. Parcels are discreetly packaged with no external branding.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    eyebrow: "Client Care",
    title: "Returns & Exchanges",
    intro: "If your piece is not quite right, we will make it so.",
    sections: [
      {
        id: "policy",
        title: "30-Day Returns",
        paragraphs: [
          "Unworn pieces in their original packaging may be returned or exchanged within 30 days of delivery. Complimentary insured collection is arranged by our client care team.",
          "Engraved, resized and made-to-order pieces are final sale, but remain covered by our lifetime care service.",
        ],
      },
      {
        id: "exchanges",
        title: "Size Exchanges",
        paragraphs: ["Ring resizing is complimentary within the first 60 days for eligible designs."],
      },
    ],
  },
  {
    slug: "privacy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "Your trust is fundamental to our relationship. This demonstration site does not collect personal data.",
    sections: [
      {
        id: "data",
        title: "Information We Collect",
        paragraphs: [
          "This is a frontend demonstration. Information entered in forms remains in your browser and is never transmitted to a server.",
          "Your bag and wishlist are stored locally in your browser's storage so they persist between visits. You can clear them at any time by clearing your browser data.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies & Local Storage",
        paragraphs: ["We use local storage only for your bag, wishlist, recently viewed pieces and demonstration account."],
      },
    ],
  },
  {
    slug: "terms",
    eyebrow: "Legal",
    title: "Terms & Conditions",
    intro: "Please read these terms carefully. This website is a design demonstration and no real transactions are processed.",
    sections: [
      {
        id: "demo",
        title: "Demonstration Website",
        paragraphs: [
          "All products, prices and orders shown on this website are fictional. No payment is taken and no goods will be dispatched.",
        ],
      },
      {
        id: "content",
        title: "Intellectual Property",
        paragraphs: [
          "The AURELLE name and identity are fictional. Photography is used under the Unsplash licence and remains the property of its respective photographers.",
        ],
      },
    ],
  },
];

export const getClientCarePage = (slug: string) => clientCarePages.find((p) => p.slug === slug);

/* ==================================================================
   Contact & Appointment
   ================================================================== */

export const appointmentContent = {
  eyebrow: "Private Appointments",
  title: "Book a Consultation",
  intro:
    "Meet an AURELLE specialist in one of our boutiques or by video call — to discover a piece, design something bespoke or select the perfect diamond.",
  image: images.ringTray as ProductImage,
  interests: [
    "Engagement Rings",
    "Wedding Bands",
    "Bridal Jewelry",
    "Diamond Jewelry",
    "High Jewelry",
    "Gifting",
    "Bespoke Design",
    "Jewelry Care & Repair",
  ],
  timeSlots: ["11:00 am", "12:30 pm", "2:00 pm", "3:30 pm", "5:00 pm", "6:30 pm"],
  locations: ["Mumbai — Kala Ghoda", "New Delhi — The Chanakya", "Bengaluru — UB City", "Virtual Appointment"],
  benefits: [
    "A private, unhurried consultation of up to 90 minutes",
    "A curated selection prepared in advance",
    "Champagne or masala chai, as you prefer",
  ],
};

export const contactContent = {
  eyebrow: "Client Care",
  title: "We Are Here for You",
  intro:
    "Our client advisors are available to assist with product enquiries, orders, aftercare and appointments.",
  image: images.flatlay as ProductImage,
  subjects: ["Product Enquiry", "Order Assistance", "Aftercare & Repairs", "Bespoke Commission", "Press", "Other"],
  quickLinks: [
    { label: "Shipping & Delivery", href: "/client-care/shipping" },
    { label: "Returns & Exchanges", href: "/client-care/returns" },
    { label: "Jewelry Care Guide", href: "/care-guide" },
  ] as NavLink[],
};

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

/* ==================================================================
   Product page — shared service copy
   ================================================================== */

export const productServiceCopy = {
  materials:
    "Each AURELLE creation is crafted in our Mumbai atelier from 18-karat gold or platinum, hallmarked for purity. Stones are set by hand under magnification and every surface is finished by a master polisher.",
  shipping:
    "Complimentary insured delivery on orders above ₹25,000, in 3–5 business days. Made-to-order pieces are dispatched within 3–4 weeks. Every order arrives in our signature ivory box.",
  returns:
    "Unworn pieces may be returned or exchanged within 30 days. Ring resizing is complimentary within 60 days for eligible designs. Engraved and made-to-order pieces are final sale.",
  care:
    "Store your piece in its pouch, away from other jewelry. Remove before swimming or exercise, and clean gently with warm, soapy water. Complimentary professional cleaning is offered for life.",
};
