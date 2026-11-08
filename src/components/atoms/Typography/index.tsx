import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingSize = "display" | "xl" | "lg" | "md" | "sm" | "xs";

const headingSizes: Record<HeadingSize, string> = {
  display: "text-display font-light",
  xl: "text-[2.375rem] leading-[1.06] md:text-[3.5rem] font-light tracking-[-0.01em]",
  lg: "text-[2rem] leading-[1.1] md:text-[2.75rem] font-light",
  md: "text-[1.625rem] leading-[1.18] md:text-[2rem] font-light",
  sm: "text-[1.25rem] leading-[1.3] md:text-[1.5rem]",
  xs: "text-[1.125rem] leading-[1.35]",
};

export interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  size?: HeadingSize;
  /** Classic uppercase serif treatment for campaign headings. */
  caps?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
}

export function Heading({ as: Tag = "h2", size = "lg", caps, className, children, id }: HeadingProps) {
  return (
    <Tag
      id={id}
      className={cn("font-serif", headingSizes[size], caps && "uppercase !tracking-[0.05em]", className)}
    >
      {children}
    </Tag>
  );
}

type Tone = "default" | "muted" | "gold" | "light" | "inherit";
const tones: Record<Tone, string> = {
  default: "text-espresso",
  muted: "text-stone",
  gold: "text-gold-deep",
  light: "text-pearl/80",
  inherit: "",
};

export function Eyebrow({
  as: Tag = "p",
  tone = "muted",
  className,
  children,
}: {
  as?: ElementType;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn("eyebrow", tones[tone], className)}>{children}</Tag>;
}

type TextSize = "lg" | "md" | "sm" | "xs";
const textSizes: Record<TextSize, string> = {
  lg: "text-[1.0625rem] leading-[1.75] md:text-[1.125rem]",
  md: "text-[0.9375rem] leading-[1.75]",
  sm: "text-[0.8125rem] leading-[1.65]",
  xs: "text-[0.75rem] leading-[1.6]",
};

export function Text({
  as: Tag = "p",
  size = "md",
  tone = "muted",
  className,
  children,
}: {
  as?: ElementType;
  size?: TextSize;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(textSizes[size], tones[tone], className)}>{children}</Tag>;
}
