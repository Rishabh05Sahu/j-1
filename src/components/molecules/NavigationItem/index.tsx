import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "header" | "footer" | "mega" | "mobile";

const variants: Record<Variant, string> = {
  header: "eyebrow py-3 text-[0.6875rem] tracking-[0.2em]",
  footer: "text-[0.8125rem] text-pearl/70 transition-colors duration-300 hover:text-pearl",
  mega: "font-serif text-[1.25rem] leading-[1.5] text-espresso transition-colors duration-300 hover:text-gold-deep",
  mobile: "font-serif text-[1.75rem] leading-tight text-espresso",
};

export interface NavigationItemProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
  variant?: Variant;
  active?: boolean;
  children: ReactNode;
}

/** A navigation link with the maison's understated underline animation. */
export function NavigationItem({ href, variant = "header", active, className, children, ...rest }: NavigationItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(variants[variant], variant !== "mobile" && "link-underline", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
