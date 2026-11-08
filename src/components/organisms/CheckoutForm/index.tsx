"use client";

import { Building2, CreditCard, Lock, Smartphone } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { fieldA11y, FormField } from "@/components/molecules/FormField";
import { OptionCard } from "@/components/molecules/OptionCard";
import { indianStates } from "@/data/editorial";
import { useForm, type Errors } from "@/hooks/useForm";
import { formatPrice } from "@/lib/currency";
import { shippingFee, shippingMethods, type ShippingMethod } from "@/lib/shipping";
import { isValidEmail, isValidIndianPhone, isValidPinCode } from "@/lib/utils";

export type PaymentMethod = "card" | "upi" | "netbanking";

export interface CheckoutValues extends Record<string, string | boolean> {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  area: string;
  city: string;
  state: string;
  pin: string;
  newsletter: boolean;
}

const initialValues: CheckoutValues = {
  email: "",
  phone: "",
  fullName: "",
  address: "",
  area: "",
  city: "",
  state: "",
  pin: "",
  newsletter: false,
};

function validate(v: CheckoutValues): Errors<CheckoutValues> {
  const e: Errors<CheckoutValues> = {};
  if (!isValidEmail(v.email)) e.email = "Please enter a valid email address.";
  if (!isValidIndianPhone(v.phone)) e.phone = "Please enter a valid 10-digit Indian mobile number.";
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (v.address.trim().length < 5) e.address = "Please enter your street address.";
  if (v.city.trim().length < 2) e.city = "Please enter your city.";
  if (!v.state) e.state = "Please select your state.";
  if (!isValidPinCode(v.pin)) e.pin = "Please enter a valid 6-digit PIN code.";
  return e;
}

const payments: { value: PaymentMethod; title: string; description: string; icon: ReactNode }[] = [
  { value: "card", title: "Credit / Debit Card", description: "Visa, Mastercard, RuPay and American Express.", icon: <CreditCard strokeWidth={1.1} className="size-5" /> },
  { value: "upi", title: "UPI", description: "Pay with any UPI app.", icon: <Smartphone strokeWidth={1.1} className="size-5" /> },
  { value: "netbanking", title: "Net Banking", description: "All major Indian banks.", icon: <Building2 strokeWidth={1.1} className="size-5" /> },
];

function Step({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-8">
      <legend className="float-left mb-8 flex w-full items-baseline gap-4">
        <span className="font-serif text-[1.125rem] italic text-gold-deep">{String(index).padStart(2, "0")}</span>
        <span className="font-serif text-[1.625rem] font-light leading-none">{title}</span>
      </legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

export interface CheckoutFormProps {
  subtotal: number;
  shipping: ShippingMethod;
  onShippingChange: (method: ShippingMethod) => void;
  payment: PaymentMethod;
  onPaymentChange: (method: PaymentMethod) => void;
  onComplete: (values: CheckoutValues) => void;
}

/** Contact, delivery, shipping and (visual-only) payment selection. */
export function CheckoutForm({ subtotal, shipping, onShippingChange, payment, onPaymentChange, onComplete }: CheckoutFormProps) {
  const { values, errors, status, setValue, bind, handleSubmit } = useForm(initialValues, validate);

  const field = (
    key: keyof CheckoutValues & string,
    label: string,
    inputProps: ComponentProps<"input"> = {},
    options: { className?: string; optional?: boolean } = {},
  ) => (
    <FormField id={`co-${key}`} label={label} error={errors[key]} required={!options.optional} className={options.className}>
      <Input {...fieldA11y(`co-${key}`, errors[key])} {...bind(key)} {...inputProps} />
    </FormField>
  );

  return (
    <form onSubmit={handleSubmit(onComplete, 1600)} noValidate className="flex flex-col gap-12">
      <Step index={1} title="Contact Information">
        <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
          {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email", placeholder: "you@example.com" })}
          {field("phone", "Mobile Number", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "98765 43210" })}
        </div>
        <Checkbox
          className="mt-5"
          label="Keep me informed of new collections and private events"
          checked={values.newsletter}
          onChange={(e) => setValue("newsletter", e.target.checked)}
        />
      </Step>

      <Step index={2} title="Delivery Address">
        <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
          {field("fullName", "Full Name", { autoComplete: "name" }, { className: "sm:col-span-2" })}
          {field("address", "Address", { autoComplete: "address-line1", placeholder: "House / flat number and street" }, { className: "sm:col-span-2" })}
          {field("area", "Apartment / Area (optional)", { autoComplete: "address-line2" }, { className: "sm:col-span-2", optional: true })}
          {field("city", "City", { autoComplete: "address-level2" })}
          <FormField id="co-state" label="State" error={errors.state} required>
            <Select
              {...fieldA11y("co-state", errors.state)}
              {...bind("state")}
              autoComplete="address-level1"
              placeholder="Select state"
              options={indianStates.map((s) => ({ value: s, label: s }))}
            />
          </FormField>
          {field("pin", "PIN Code", { autoComplete: "postal-code", inputMode: "numeric", maxLength: 6, placeholder: "400001" })}
          <FormField id="co-country" label="Country">
            <Input id="co-country" value="India" readOnly className="text-stone" />
          </FormField>
        </div>
      </Step>

      <Step index={3} title="Shipping Method">
        <div className="flex flex-col gap-3">
          {shippingMethods.map((m) => {
            const fee = shippingFee(subtotal, m.value);
            return (
              <OptionCard
                key={m.value}
                name="shipping"
                value={m.value}
                checked={shipping === m.value}
                onChange={(v) => onShippingChange(v as ShippingMethod)}
                title={m.title}
                description={m.description}
                meta={fee === 0 ? "Complimentary" : formatPrice(fee)}
              />
            );
          })}
        </div>
      </Step>

      <Step index={4} title="Payment">
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Payment method">
          {payments.map((p) => (
            <OptionCard
              key={p.value}
              name="payment"
              value={p.value}
              checked={payment === p.value}
              onChange={(v) => onPaymentChange(v as PaymentMethod)}
              title={p.title}
              description={p.description}
              icon={p.icon}
            />
          ))}
        </div>
        <p className="mt-5 flex items-start gap-3 bg-champagne/70 p-4 text-[0.8125rem] leading-relaxed text-stone">
          <Lock aria-hidden="true" strokeWidth={1.25} className="mt-0.5 size-4 shrink-0 text-gold-deep" />
          This is a demonstration checkout. No payment details are requested, collected or processed, and no order will be fulfilled.
        </p>
      </Step>

      <div className="border-t border-line pt-8">
        <Button type="submit" variant="primary" size="lg" fullWidth loading={status === "submitting"}>
          Place Order
        </Button>
        <p className="mt-4 text-center text-[0.75rem] text-mute">
          By placing your order you agree to our{" "}
          <Link href="/client-care/terms" className="link-underline-static">
            Terms & Conditions
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
