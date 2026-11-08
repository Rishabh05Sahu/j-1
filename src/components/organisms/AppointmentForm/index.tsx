"use client";

import { CalendarCheck } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { Input, Textarea } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { fieldA11y, FormField } from "@/components/molecules/FormField";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { useForm, type Errors } from "@/hooks/useForm";
import { createOrderReference, formatDate, isValidEmail, isValidIndianPhone } from "@/lib/utils";

interface AppointmentValues extends Record<string, string | boolean> {
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;
  time: string;
  interest: string;
  message: string;
}

const initial: AppointmentValues = { name: "", email: "", phone: "", location: "", date: "", time: "", interest: "", message: "" };

const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Tomorrow's date, read only on the client (no time access during prerender). */
let cachedTomorrow: string | undefined;
function getTomorrow() {
  if (!cachedTomorrow) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    cachedTomorrow = toISODate(d);
  }
  return cachedTomorrow;
}
const noopSubscribe = () => () => {};

export interface AppointmentFormProps {
  interests: string[];
  timeSlots: string[];
  locations: string[];
}

export function AppointmentForm({ interests, timeSlots, locations }: AppointmentFormProps) {
  const minDate = useSyncExternalStore(noopSubscribe, getTomorrow, () => undefined);
  const [reference, setReference] = useState("");

  const validate = (v: AppointmentValues): Errors<AppointmentValues> => {
    const e: Errors<AppointmentValues> = {};
    if (v.name.trim().length < 2) e.name = "Please enter your name.";
    if (!isValidEmail(v.email)) e.email = "Please enter a valid email address.";
    if (!isValidIndianPhone(v.phone)) e.phone = "Please enter a valid 10-digit mobile number.";
    if (!v.location) e.location = "Please choose a boutique or a virtual appointment.";
    if (!v.date) e.date = "Please choose a preferred date.";
    else if (minDate && v.date < minDate) e.date = "Please choose a date from tomorrow onwards.";
    if (!v.time) e.time = "Please choose a preferred time.";
    if (!v.interest) e.interest = "Please tell us what you would like to discover.";
    return e;
  };

  const { values, errors, status, setValue, bind, handleSubmit, reset } = useForm(initial, validate);

  if (status === "success") {
    return (
      <div role="status" className="animate-fade-up bg-white/70 p-8 text-center md:p-12">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/60">
          <CalendarCheck strokeWidth={1} className="size-6 text-gold-deep" />
        </span>
        <p className="eyebrow mt-6 text-gold-deep">Request Received</p>
        <h2 className="mt-3 font-serif text-[2.25rem] font-light leading-tight">We look forward to welcoming you.</h2>
        <Divider variant="ornament" className="my-7" />
        <dl className="mx-auto grid max-w-[420px] grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-left text-[0.875rem]">
          <dt className="text-mute">Reference</dt>
          <dd>{reference}</dd>
          <dt className="text-mute">Location</dt>
          <dd>{values.location}</dd>
          <dt className="text-mute">Date</dt>
          <dd>{formatDate(values.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</dd>
          <dt className="text-mute">Time</dt>
          <dd>{values.time}</dd>
          <dt className="text-mute">Interest</dt>
          <dd>{values.interest}</dd>
        </dl>
        <p className="mx-auto mt-8 max-w-[440px] text-[0.875rem] leading-relaxed text-stone">
          A specialist will confirm your appointment at {values.email} within a few hours. (Demonstration — no booking was made.)
        </p>
        <Button variant="outline" className="mt-8" onClick={reset}>
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(() => setReference(createOrderReference().replace("AUR", "APT")))}
      noValidate
      className="grid gap-x-6 gap-y-8 sm:grid-cols-2"
    >
      <FormField id="ap-name" label="Full Name" error={errors.name} required className="sm:col-span-2">
        <Input {...fieldA11y("ap-name", errors.name)} {...bind("name")} autoComplete="name" />
      </FormField>
      <FormField id="ap-email" label="Email" error={errors.email} required>
        <Input {...fieldA11y("ap-email", errors.email)} {...bind("email")} type="email" autoComplete="email" />
      </FormField>
      <FormField id="ap-phone" label="Mobile Number" error={errors.phone} required>
        <Input {...fieldA11y("ap-phone", errors.phone)} {...bind("phone")} type="tel" autoComplete="tel" />
      </FormField>
      <FormField id="ap-location" label="Location" error={errors.location} required>
        <Select
          {...fieldA11y("ap-location", errors.location)}
          {...bind("location")}
          placeholder="Choose a boutique"
          options={locations.map((l) => ({ value: l, label: l }))}
        />
      </FormField>
      <FormField id="ap-interest" label="Jewelry Interest" error={errors.interest} required>
        <Select
          {...fieldA11y("ap-interest", errors.interest)}
          {...bind("interest")}
          placeholder="What would you like to discover?"
          options={interests.map((i) => ({ value: i, label: i }))}
        />
      </FormField>
      <FormField id="ap-date" label="Preferred Date" error={errors.date} required className="sm:col-span-2">
        <Input {...fieldA11y("ap-date", errors.date)} {...bind("date")} type="date" min={minDate} />
      </FormField>
      <div className="sm:col-span-2">
        <p id="ap-time-label" className="eyebrow text-[0.625rem] text-stone">
          Preferred Time<span aria-hidden="true" className="ml-1 text-gold">*</span>
        </p>
        <input type="hidden" name="time" value={values.time} />
        <SizeSelector
          sizes={timeSlots}
          value={values.time}
          onChange={(t) => setValue("time", t)}
          invalid={Boolean(errors.time)}
          label="Preferred time"
          className="mt-4 [&>button]:px-4"
        />
        {errors.time && (
          <p role="alert" className="mt-2 text-[0.75rem] text-error">
            {errors.time}
          </p>
        )}
      </div>
      <FormField id="ap-message" label="Additional Message (optional)" className="sm:col-span-2">
        <Textarea {...fieldA11y("ap-message")} {...bind("message")} rows={4} className="mt-3" placeholder="Anything we should prepare for your visit?" />
      </FormField>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" loading={status === "submitting"} className="w-full sm:w-auto">
          Request Appointment
        </Button>
      </div>
    </form>
  );
}
