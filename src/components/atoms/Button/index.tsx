import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "../Spinner";

export type ButtonVariant = "primary" | "outline" | "light" | "solid-light" | "link";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps & Omit<ComponentProps<"button">, keyof BaseProps> & { href?: undefined };
type ButtonAsLink = BaseProps & Omit<ComponentProps<typeof Link>, keyof BaseProps | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-espresso text-pearl border border-espresso hover:bg-[#3b352f] hover:border-[#3b352f]",
  outline: "border border-espresso/80 text-espresso hover:bg-espresso hover:text-pearl",
  light: "border border-pearl/70 text-pearl hover:bg-pearl hover:text-espresso hover:border-pearl",
  "solid-light": "bg-pearl text-espresso border border-pearl hover:bg-white hover:border-white",
  link: "link-underline-static !h-auto !px-0 !py-0 text-current",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-8",
  lg: "h-14 px-10",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: Pick<BaseProps, "variant" | "size" | "fullWidth" | "className">) {
  return cn(
    "eyebrow group relative inline-flex select-none items-center justify-center gap-3 whitespace-nowrap",
    "transition-[background-color,color,border-color,opacity,background-size] duration-500 ease-luxe",
    "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
    sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className,
  );
}

/** Call-to-action. Renders a Next.js Link when `href` is provided. */
export function Button(props: ButtonProps) {
  const { variant, size, fullWidth, loading, icon, iconPosition = "end", className, children, ...rest } = props;
  const classes = buttonClasses({ variant, size, fullWidth, className });
  const content = (
    <>
      {icon && iconPosition === "start" && (
        <span aria-hidden="true" className="inline-flex">
          {icon}
        </span>
      )}
      <span className={cn(loading && "opacity-0")}>{children}</span>
      {icon && iconPosition === "end" && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex transition-transform duration-500 ease-luxe group-hover:translate-x-1",
            loading && "opacity-0",
          )}
        >
          {icon}
        </span>
      )}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
    </>
  );

  if (typeof rest.href === "string") {
    const linkProps = rest as Omit<ButtonAsLink, keyof BaseProps>;
    return (
      <Link {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof BaseProps>;
  return (
    <button
      type="button"
      {...buttonProps}
      aria-busy={loading || undefined}
      disabled={buttonProps.disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}
