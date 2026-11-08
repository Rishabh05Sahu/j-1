"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Spinner } from "@/components/atoms/Spinner";
import { cn, isValidEmail } from "@/lib/utils";

/** Newsletter sign-up — validation and a simulated (frontend-only) submission. */
export function NewsletterForm({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string>();
  const light = tone === "light";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(undefined);
    setState("submitting");
    window.setTimeout(() => setState("success"), 900);
  };

  if (state === "success") {
    return (
      <div role="status" className={cn("flex animate-fade-up flex-col items-center gap-3 text-center", className)}>
        <span className={cn("flex size-10 items-center justify-center rounded-full border", light ? "border-pearl/40" : "border-gold/60")}>
          <Check strokeWidth={1.25} className="size-4 text-gold" />
        </span>
        <p className="font-serif text-[1.375rem]">Thank you for joining us.</p>
        <p className={cn("text-[0.875rem]", light ? "text-pearl/70" : "text-stone")}>
          Your first letter from AURELLE will arrive shortly at <span className="whitespace-nowrap">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <div
        className={cn(
          "flex items-center border-b transition-colors duration-300",
          light ? "border-pearl/40 focus-within:border-pearl" : "border-espresso/40 focus-within:border-espresso",
          error && "border-error",
        )}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(undefined);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "h-14 w-full min-w-0 bg-transparent text-[0.9375rem] outline-none focus-visible:outline-none",
            light ? "text-pearl placeholder:text-pearl/50" : "text-espresso placeholder:text-mute",
          )}
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="eyebrow group flex h-14 shrink-0 items-center gap-2 pl-4 transition-opacity hover:opacity-70"
        >
          {state === "submitting" ? <Spinner label="Subscribing" /> : "Subscribe"}
          {state !== "submitting" && (
            <ArrowRight aria-hidden="true" strokeWidth={1.25} className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          )}
        </button>
      </div>
      <p id={`${id}-error`} role={error ? "alert" : undefined} className="mt-2 min-h-5 text-left text-[0.75rem] text-error">
        {error}
      </p>
      <p className={cn("mt-1 text-[0.6875rem] leading-relaxed", light ? "text-pearl/50" : "text-mute")}>
        By subscribing you agree to receive correspondence from AURELLE. You may unsubscribe at any time.
      </p>
    </form>
  );
}
