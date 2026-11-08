"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export type Errors<T> = Partial<Record<keyof T, string>>;

/**
 * Minimal form state with validation on submit and re-validation of
 * touched fields as the shopper corrects them. Submission is simulated.
 */
export function useForm<T extends Record<string, string | boolean>>(initial: T, validate: (values: T) => Errors<T>) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const setValue = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (submitted) setErrors(validate(next));
      return next;
    });
  };

  /** Props for a native input/select/textarea bound to `key`. */
  const bind = (key: keyof T & string) => ({
    name: key,
    value: values[key] as string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValue(key, e.target.value as T[typeof key]),
  });

  const handleSubmit = (onValid: (values: T) => void, delay = 1100) => (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      const el = (e.currentTarget as HTMLFormElement).querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      onValid(values);
    }, delay);
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setSubmitted(false);
    setStatus("idle");
  };

  return { values, errors, status, setValue, bind, handleSubmit, reset };
}
