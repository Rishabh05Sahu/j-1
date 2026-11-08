import type { FooterColumn, MainNavItem, NavLink } from "@/types";
import { images } from "./images";

export const mainNavigation: MainNavItem[] = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  {
    label: "Jewelry",
    href: "/collections",
    megaMenu: {
      columns: [
        {
          title: "Categories",
          links: [
            { label: "Rings", href: "/collections/rings" },
            { label: "Necklaces", href: "/collections/necklaces" },
            { label: "Earrings", href: "/collections/earrings" },
            { label: "Bracelets", href: "/collections/bracelets" },
            { label: "Diamond Jewelry", href: "/collections/diamond-jewelry" },
            { label: "Gold Jewelry", href: "/collections/gold-jewelry" },
          ],
        },
        {
          title: "Discover",
          links: [
            { label: "New Arrivals", href: "/collections/new-arrivals" },
            { label: "High Jewelry", href: "/collections/high-jewelry" },
            { label: "Gifts", href: "/collections/gifts" },
            { label: "Bridal", href: "/collections/bridal" },
            { label: "All Jewelry", href: "/collections" },
          ],
        },
      ],
      feature: {
        eyebrow: "New Season",
        title: "The Aurelia Collection",
        href: "/collections/aurelia",
        image: images.necklaceGinkgoModel,
      },
    },
  },
  {
    label: "Collections",
    href: "/collections",
    megaMenu: {
      columns: [
        {
          title: "Signature Collections",
          links: [
            { label: "Eternal", href: "/collections/eternal" },
            { label: "Celeste", href: "/collections/celeste" },
            { label: "Lumière", href: "/collections/lumiere" },
            { label: "Solstice", href: "/collections/solstice" },
            { label: "Aurelia", href: "/collections/aurelia" },
          ],
        },
        {
          title: "Gemstone Stories",
          links: [
            { label: "Étoile", href: "/collections/etoile" },
            { label: "Rosé", href: "/collections/rose" },
            { label: "Serene", href: "/collections/serene" },
            { label: "Nuit", href: "/collections/nuit" },
            { label: "Heritage", href: "/collections/heritage" },
          ],
        },
      ],
      feature: {
        eyebrow: "The Signature",
        title: "The Eternal Collection",
        href: "/collections/eternal",
        image: images.modelHandsWhite,
      },
    },
  },
  { label: "Bridal", href: "/collections/bridal" },
  { label: "Our Story", href: "/our-story" },
];

export const secondaryNavigation: NavLink[] = [
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "The Journal", href: "/journal" },
  { label: "Book an Appointment", href: "/book-appointment" },
  { label: "Contact Us", href: "/contact" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Delivery", href: "/client-care/shipping" },
      { label: "Returns", href: "/client-care/returns" },
      { label: "Jewelry Care", href: "/care-guide" },
      { label: "Book an Appointment", href: "/book-appointment" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Collections", href: "/collections" },
      { label: "Rings", href: "/collections/rings" },
      { label: "Necklaces", href: "/collections/necklaces" },
      { label: "Bridal", href: "/collections/bridal" },
    ],
  },
  {
    title: "About AURELLE",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/client-care/privacy" },
      { label: "Terms & Conditions", href: "/client-care/terms" },
    ],
  },
];

export const popularSearches = ["Diamond ring", "Gold hoops", "Pearl", "Emerald", "Tennis bracelet", "Bridal"];

export const searchCategoryShortcuts: NavLink[] = [
  { label: "Rings", href: "/collections/rings" },
  { label: "Necklaces", href: "/collections/necklaces" },
  { label: "Earrings", href: "/collections/earrings" },
  { label: "Bracelets", href: "/collections/bracelets" },
  { label: "Bridal", href: "/collections/bridal" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
];
