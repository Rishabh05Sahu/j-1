import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
}: {
  as?: ElementType;
  size?: "default" | "narrow" | "prose";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "container-luxe",
        size === "narrow" && "max-w-[1180px]",
        size === "prose" && "max-w-[860px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
