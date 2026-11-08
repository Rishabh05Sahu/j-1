export const brand = {
  name: "AURELLE",
  legalName: "Aurelle Maison de Joaillerie Pvt. Ltd.",
  tagline: "Maison de Joaillerie",
  statement:
    "A contemporary jewelry maison creating exceptional pieces in precious metals, diamonds and rare gemstones — designed to be worn, treasured and passed on.",
  announcement: "Complimentary insured delivery on orders above ₹25,000",
  freeShippingThreshold: 25000,
  standardShippingFee: 750,
  expressShippingFee: 0,
  locale: "en-IN",
  currency: "INR",
  region: "India / INR",
  founded: 2009,
  contact: {
    phone: "+91 22 4000 2009",
    phoneHref: "tel:+912240002009",
    email: "clientcare@aurelle.in",
    whatsapp: "+91 98200 02009",
    hours: [
      { days: "Monday – Saturday", time: "10:00 am – 8:00 pm IST" },
      { days: "Sunday", time: "11:00 am – 6:00 pm IST" },
    ],
  },
  boutiques: [
    {
      city: "Mumbai",
      name: "AURELLE Kala Ghoda",
      address: "14 Rampart Row, Kala Ghoda, Fort, Mumbai 400001",
    },
    {
      city: "New Delhi",
      name: "AURELLE The Chanakya",
      address: "Ground Floor, The Chanakya, Chanakyapuri, New Delhi 110021",
    },
    {
      city: "Bengaluru",
      name: "AURELLE UB City",
      address: "Level 1, UB City, Vittal Mallya Road, Bengaluru 560001",
    },
  ],
  social: {
    instagram: "https://www.instagram.com/",
    pinterest: "https://www.pinterest.com/",
  },
  siteUrl: "https://aurelle.example",
} as const;

export const STORAGE_KEYS = {
  cart: "aurelle:cart:v1",
  wishlist: "aurelle:wishlist:v1",
  recent: "aurelle:recent:v1",
  account: "aurelle:account:v1",
} as const;
