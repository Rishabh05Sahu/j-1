"use client";

import { Search, X } from "lucide-react";
import type { ComponentProps, FormEvent } from "react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends Omit<ComponentProps<"input">, "onChange" | "value" | "size" | "onSubmit"> {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  size?: "md" | "lg";
  label?: string;
}

export function SearchInput({
  value,
  onValueChange,
  onSubmit,
  size = "md",
  label = "Search AURELLE",
  className,
  ref,
  ...rest
}: SearchInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("relative flex items-center border-b border-espresso/80", className)}>
      <Search
        aria-hidden="true"
        strokeWidth={1.1}
        className={cn("shrink-0 text-stone", size === "lg" ? "size-6" : "size-[18px]")}
      />
      <label className="sr-only" htmlFor={rest.id ?? "search-input"}>
        {label}
      </label>
      <input
        ref={ref}
        id={rest.id ?? "search-input"}
        type="search"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          "w-full min-w-0 bg-transparent font-serif text-espresso outline-none placeholder:text-mute focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none",
          size === "lg" ? "h-16 px-4 text-[1.75rem] md:h-20 md:text-[2.5rem]" : "h-12 px-3 text-[1.25rem]",
        )}
        {...rest}
      />
      {value && (
        <button
          type="button"
          onClick={() => onValueChange("")}
          aria-label="Clear search"
          className="shrink-0 p-2 text-stone transition-colors hover:text-espresso"
        >
          <X strokeWidth={1.25} className="size-4" />
        </button>
      )}
    </form>
  );
}
