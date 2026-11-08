import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Eyebrow, Heading, Text } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  caps?: boolean;
  action?: NavLink;
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  as = "h2",
  size = "lg",
  caps,
  action,
  className,
  id,
}: SectionHeadingProps) {
  const light = tone === "light";
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col", centered ? "max-w-[720px] items-center" : "max-w-[640px]")}>
        {eyebrow && (
          <Eyebrow tone={light ? "light" : "gold"} className="mb-4 md:mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <Heading id={id} as={as} size={size} caps={caps} className={light ? "text-pearl" : "text-espresso"}>
          {title}
        </Heading>
        {subtitle && (
          <Text size="md" tone={light ? "light" : "muted"} className="mt-4 md:mt-5">
            {subtitle}
          </Text>
        )}
      </div>
      {action && (
        <Button href={action.href} variant="link" className={cn(light ? "text-pearl" : "text-espresso", !centered && "shrink-0")}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
