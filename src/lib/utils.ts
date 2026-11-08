type ClassValue = string | number | false | null | undefined | ClassValue[];

/** Minimal className combiner (no runtime dependency). */
export function cn(...classes: ClassValue[]): string {
  const out: string[] = [];
  for (const c of classes) {
    if (!c) continue;
    if (Array.isArray(c)) {
      const inner = cn(...c);
      if (inner) out.push(inner);
    } else {
      out.push(String(c));
    }
  }
  return out.join(" ");
}

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
) {
  return new Intl.DateTimeFormat("en-IN", options).format(new Date(iso));
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function createId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Dummy order reference — e.g. AUR-482913. */
export function createOrderReference() {
  return `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
export const isValidIndianPhone = (value: string) =>
  /^(\+91)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ""));
export const isValidPinCode = (value: string) => /^[1-9]\d{5}$/.test(value.trim());
