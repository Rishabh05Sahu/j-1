import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Accessible props to spread onto the control rendered inside a FormField. */
export function fieldA11y(id: string, error?: string, hint?: string) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ");
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  } as const;
}

/** Label + control + hint + validation message. */
export function FormField({ id, label, error, hint, required, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="eyebrow text-[0.625rem] text-stone">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-gold">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[0.75rem] text-mute">
          {hint}
        </p>
      )}
      <p
        id={`${id}-error`}
        role={error ? "alert" : undefined}
        className={cn(
          "text-[0.75rem] text-error transition-all duration-300",
          error ? "mt-2 opacity-100" : "h-0 overflow-hidden opacity-0",
        )}
      >
        {error}
      </p>
    </div>
  );
}
