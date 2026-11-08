import type { MockOrder, Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "From the first consultation to the moment she opened the box, every detail felt considered. The ring is even more beautiful in person.",
    author: "Arjun M.",
    location: "Mumbai",
  },
  {
    id: "t2",
    quote:
      "I inherited my grandmother's love of fine jewelry. AURELLE is the first maison that made me feel I was beginning a heritage of my own.",
    author: "Meera S.",
    location: "Bengaluru",
  },
  {
    id: "t3",
    quote:
      "Our specialist guided us through every diamond with such patience. We left with our wedding bands — and a story we will always tell.",
    author: "Kabir & Ananya",
    location: "New Delhi",
  },
];

/** Demonstration order history shown in the mock account area. */
export const mockOrders: MockOrder[] = [
  {
    reference: "AUR-284716",
    date: "2026-09-14",
    status: "Delivered",
    total: 182000,
    productIds: ["p-016", "p-024"],
  },
  {
    reference: "AUR-271093",
    date: "2026-03-02",
    status: "Delivered",
    total: 58000,
    productIds: ["p-021"],
  },
];
