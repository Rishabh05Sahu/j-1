const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Formats a number as Indian Rupees, e.g. ₹1,48,000. */
export function formatPrice(amount: number): string {
  return inrFormatter.format(amount);
}
