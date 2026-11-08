import { cn } from "@/lib/utils";

/** Minimal line-art social marks (brand icons are not shipped by Lucide). */
export function SocialIcon({ name, className }: { name: "instagram" | "pinterest"; className?: string }) {
  if (name === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
        className={cn("size-[18px]", className)}
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      className={cn("size-[18px]", className)}
    >
      <circle cx="12" cy="12" r="9" />
      <path
        d="M10.4 20.7 12.3 13m0 0c-.6-1-.6-2.4.1-3.5.9-1.3 2.7-1.4 3.3-.3.8 1.5-.3 4.7-2.2 4.7-1 0-1.5-.5-1.2-.9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
