"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Input, Textarea } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { fieldA11y, FormField } from "@/components/molecules/FormField";
import { useForm, type Errors } from "@/hooks/useForm";
import { isValidEmail, isValidIndianPhone } from "@/lib/utils";

interface ContactValues extends Record<string, string | boolean> {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

const initial: ContactValues = { name: "", email: "", phone: "", subject: "", message: "", consent: false };

function validate(v: ContactValues): Errors<ContactValues> {
  const e: Errors<ContactValues> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!isValidEmail(v.email)) e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !isValidIndianPhone(v.phone)) e.phone = "Please enter a valid 10-digit mobile number.";
  if (!v.subject) e.subject = "Please choose a subject.";
  if (v.message.trim().length < 10) e.message = "Please share a few more details (at least 10 characters).";
  if (!v.consent) e.consent = "Please confirm we may contact you about your enquiry.";
  return e;
}

/** Contact form with validation and a simulated submission. */
export function ContactForm({ subjects }: { subjects: string[] }) {
  const { values, errors, status, setValue, bind, handleSubmit, reset } = useForm(initial, validate);

  if (status === "success") {
    return (
      <div role="status" className="flex animate-fade-up flex-col items-start bg-white/70 p-8 md:p-12">
        <span className="flex size-12 items-center justify-center rounded-full border border-gold/60">
          <Check strokeWidth={1.1} className="size-5 text-gold-deep" />
        </span>
        <h2 className="mt-6 font-serif text-[2rem] font-light leading-tight">Thank you, {values.name.split(" ")[0]}.</h2>
        <p className="mt-4 max-w-[440px] text-[0.9375rem] leading-relaxed text-stone">
          Your message has been received. A client advisor will reply to {values.email} within one business day.
        </p>
        <p className="mt-2 text-[0.75rem] text-mute">Demonstration only — no message was sent.</p>
        <Button variant="outline" className="mt-8" onClick={reset}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(() => undefined)} noValidate className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
      <FormField id="ct-name" label="Full Name" error={errors.name} required>
        <Input {...fieldA11y("ct-name", errors.name)} {...bind("name")} autoComplete="name" />
      </FormField>
      <FormField id="ct-email" label="Email" error={errors.email} required>
        <Input {...fieldA11y("ct-email", errors.email)} {...bind("email")} type="email" autoComplete="email" />
      </FormField>
      <FormField id="ct-phone" label="Phone (optional)" error={errors.phone}>
        <Input {...fieldA11y("ct-phone", errors.phone)} {...bind("phone")} type="tel" autoComplete="tel" />
      </FormField>
      <FormField id="ct-subject" label="Subject" error={errors.subject} required>
        <Select
          {...fieldA11y("ct-subject", errors.subject)}
          {...bind("subject")}
          placeholder="Select a subject"
          options={subjects.map((s) => ({ value: s, label: s }))}
        />
      </FormField>
      <FormField id="ct-message" label="Message" error={errors.message} required className="sm:col-span-2">
        <Textarea {...fieldA11y("ct-message", errors.message)} {...bind("message")} rows={6} className="mt-3" placeholder="How may we help you?" />
      </FormField>
      <div className="sm:col-span-2">
        <Checkbox
          name="consent"
          label="I agree that AURELLE may contact me regarding this enquiry."
          checked={values.consent}
          onChange={(e) => setValue("consent", e.target.checked)}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? "ct-consent-error" : undefined}
        />
        {errors.consent && (
          <p id="ct-consent-error" role="alert" className="mt-1 text-[0.75rem] text-error">
            {errors.consent}
          </p>
        )}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" loading={status === "submitting"} className="w-full sm:w-auto">
          Send Message
        </Button>
      </div>
    </form>
  );
}
