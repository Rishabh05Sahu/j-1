"use client";

import { Heart, LogOut, Package, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Input } from "@/components/atoms/Input";
import { Price } from "@/components/atoms/Price";
import { Spinner } from "@/components/atoms/Spinner";
import { fieldA11y, FormField } from "@/components/molecules/FormField";
import { PageHeader } from "@/components/organisms/PageHeader";
import { STORAGE_KEYS } from "@/config/brand";
import { mockOrders } from "@/data/testimonials";
import { useCart } from "@/hooks/useCart";
import { useForm, type Errors } from "@/hooks/useForm";
import { useWishlist } from "@/hooks/useWishlist";
import { createPersistentStore } from "@/lib/persistent-store";
import { getProductsByIds } from "@/lib/product-utils";
import { cn, formatDate, isValidEmail } from "@/lib/utils";

interface MockAccount {
  name: string;
  email: string;
  memberSince: string;
}

const accountStore = createPersistentStore<MockAccount | null>(STORAGE_KEYS.account, null, (raw) =>
  raw && typeof raw === "object" && "email" in raw && "name" in raw ? (raw as MockAccount) : null,
);
const noop = () => () => {};

type Tab = "overview" | "orders" | "details";

export function AccountTemplate() {
  const account = useSyncExternalStore(accountStore.subscribe, accountStore.get, accountStore.getServer);
  const hydrated = useSyncExternalStore(noop, () => true, () => false);

  return (
    <>
      <PageHeader
        eyebrow="My AURELLE"
        title={account ? `Welcome, ${account.name.split(" ")[0]}` : "Your Account"}
        intro={
          account
            ? "Your orders, saved creations and personal details — all in one place."
            : "Sign in to view your orders, manage your wishlist and book private appointments."
        }
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Account" }]}
      />
      <Container className="pb-24 md:pb-32">
        {!hydrated ? (
          <div className="flex justify-center py-20 text-stone">
            <Spinner label="Loading account" />
          </div>
        ) : account ? (
          <Dashboard account={account} />
        ) : (
          <SignIn />
        )}
      </Container>
    </>
  );
}

/* ------------------------------------------------------------------ Sign in */

interface AuthValues extends Record<string, string | boolean> {
  name: string;
  email: string;
  password: string;
}

function SignIn() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const validate = (v: AuthValues): Errors<AuthValues> => {
    const e: Errors<AuthValues> = {};
    if (mode === "register" && v.name.trim().length < 2) e.name = "Please enter your name.";
    if (!isValidEmail(v.email)) e.email = "Please enter a valid email address.";
    if (v.password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  };
  const { errors, status, bind, handleSubmit } = useForm<AuthValues>({ name: "", email: "", password: "" }, validate);

  const onValid = (v: AuthValues) => {
    const fallbackName = v.email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    accountStore.set({
      name: mode === "register" ? v.name.trim() : fallbackName,
      email: v.email.trim(),
      memberSince: "2026-11-08",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-14 border-t border-line pt-12 lg:grid-cols-2 lg:gap-20 lg:pt-16">
      <div className="max-w-[480px]">
        <div role="tablist" aria-label="Account access" className="flex gap-8 border-b border-line">
          {(["signin", "register"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "eyebrow -mb-px border-b pb-4 transition-colors",
                mode === m ? "border-espresso text-espresso" : "border-transparent text-mute hover:text-espresso",
              )}
            >
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>
        <form key={mode} onSubmit={handleSubmit(onValid, 900)} noValidate className="mt-10 flex animate-fade-in flex-col gap-8">
          {mode === "register" && (
            <FormField id="ac-name" label="Full Name" error={errors.name} required>
              <Input {...fieldA11y("ac-name", errors.name)} {...bind("name")} autoComplete="name" />
            </FormField>
          )}
          <FormField id="ac-email" label="Email" error={errors.email} required>
            <Input {...fieldA11y("ac-email", errors.email)} {...bind("email")} type="email" autoComplete="email" />
          </FormField>
          <FormField id="ac-password" label="Password" error={errors.password} required hint="Demonstration only — any 6+ characters work. Nothing is sent anywhere.">
            <Input
              {...fieldA11y("ac-password", errors.password, "hint")}
              {...bind("password")}
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </FormField>
          <Button type="submit" variant="primary" size="lg" loading={status === "submitting"}>
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </div>
      <div className="bg-champagne/60 p-8 md:p-12">
        <p className="eyebrow text-gold-deep">Membership</p>
        <h2 className="mt-4 font-serif text-[2rem] font-light leading-tight">The Privileges of an AURELLE Account</h2>
        <ul className="mt-8 flex flex-col gap-5 text-[0.9375rem] text-stone">
          {[
            { icon: Package, text: "Track orders and insured deliveries" },
            { icon: Heart, text: "Save your wishlist across visits" },
            { icon: User, text: "Priority access to private appointments" },
            { icon: ShoppingBag, text: "Early previews of new collections" },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-4">
              <Icon aria-hidden="true" strokeWidth={1.1} className="size-5 text-gold-deep" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Dashboard */

function Dashboard({ account }: { account: MockAccount }) {
  const [tab, setTab] = useState<Tab>("overview");
  const { count: wishlistCount, ids } = useWishlist();
  const { count: cartCount } = useCart();
  const saved = getProductsByIds(ids).slice(0, 3);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "orders", label: "Orders" },
    { id: "details", label: "Personal Details" },
  ];

  return (
    <div className="grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16">
      <nav aria-label="Account" className="min-w-0 lg:col-span-3">
        <ul role="tablist" className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-4 lg:px-0">
          {tabs.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                data-active={tab === t.id}
                className="link-underline whitespace-nowrap font-serif text-[1.25rem] text-espresso"
              >
                {t.label}
              </button>
            </li>
          ))}
          <li>
            <Link href="/wishlist" className="link-underline whitespace-nowrap font-serif text-[1.25rem] text-espresso">
              Wishlist ({wishlistCount})
            </Link>
          </li>
          <li className="lg:mt-6">
            <button
              type="button"
              onClick={() => accountStore.set(null)}
              className="eyebrow flex items-center gap-2 whitespace-nowrap text-stone hover:text-espresso"
            >
              <LogOut aria-hidden="true" strokeWidth={1.1} className="size-4" /> Sign Out
            </button>
          </li>
        </ul>
      </nav>

      <div role="tabpanel" className="min-w-0 animate-fade-in lg:col-span-9" key={tab}>
        {tab === "overview" && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { label: "Orders", value: mockOrders.length, href: undefined as string | undefined, onClick: () => setTab("orders") },
                { label: "Wishlist", value: wishlistCount, href: "/wishlist" },
                { label: "In Your Bag", value: cartCount, href: "/cart" },
              ].map((s) => {
                const inner = (
                  <>
                    <span className="block font-serif text-[2rem] font-light leading-none sm:text-[2.75rem]">{s.value}</span>
                    <span className="eyebrow mt-3 block text-[0.625rem] text-stone">{s.label}</span>
                  </>
                );
                return s.href ? (
                  <Link key={s.label} href={s.href} className="border border-line p-4 text-left transition-colors hover:border-espresso sm:p-6">
                    {inner}
                  </Link>
                ) : (
                  <button key={s.label} type="button" onClick={s.onClick} className="border border-line p-4 text-left transition-colors hover:border-espresso sm:p-6">
                    {inner}
                  </button>
                );
              })}
            </div>
            <div className="bg-white/70 p-6 md:p-8">
              <p className="eyebrow text-gold-deep">Latest Order</p>
              <OrderRow order={mockOrders[0]} />
            </div>
            {saved.length > 0 && (
              <div>
                <p className="eyebrow mb-5 text-espresso">Recently Saved</p>
                <ul className="grid grid-cols-3 gap-4">
                  {saved.map((p) => (
                    <li key={p.id}>
                      <Link href={`/products/${p.slug}`} className="group block">
                        <ImageFrame image={p.images[0]} ratio="4/5" sizes="200px" />
                        <p className="mt-3 font-serif text-[1rem] leading-snug">{p.name}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col items-start justify-between gap-5 bg-champagne/70 p-6 sm:flex-row sm:items-center md:p-8">
              <p className="font-serif text-[1.375rem] font-light">Your next appointment awaits.</p>
              <Button href="/book-appointment" variant="outline" size="sm">
                Book an Appointment
              </Button>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {mockOrders.map((o) => (
              <li key={o.reference} className="py-6">
                <OrderRow order={o} />
              </li>
            ))}
          </ul>
        )}

        {tab === "details" && (
          <dl className="grid max-w-[560px] grid-cols-[auto_1fr] gap-x-10 gap-y-5 text-[0.9375rem]">
            <dt className="eyebrow text-[0.625rem] text-stone">Name</dt>
            <dd>{account.name}</dd>
            <dt className="eyebrow text-[0.625rem] text-stone">Email</dt>
            <dd>{account.email}</dd>
            <dt className="eyebrow text-[0.625rem] text-stone">Member Since</dt>
            <dd>{formatDate(account.memberSince)}</dd>
            <dt className="eyebrow text-[0.625rem] text-stone">Region</dt>
            <dd>India / INR</dd>
          </dl>
        )}
      </div>
    </div>
  );
}

function OrderRow({ order }: { order: (typeof mockOrders)[number] }) {
  const items = getProductsByIds(order.productIds);
  return (
    <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
      <div className="flex gap-2">
        {items.map((p) => (
          <div key={p.id} className="w-16">
            <ImageFrame image={p.images[0]} ratio="4/5" sizes="64px" />
          </div>
        ))}
      </div>
      <div className="flex-1">
        <p className="font-serif text-[1.125rem]">{items.map((p) => p.name).join(", ")}</p>
        <p className="mt-1 text-[0.75rem] text-stone">
          {order.reference} · {formatDate(order.date)} · <span className="text-success">{order.status}</span>
        </p>
      </div>
      <Price amount={order.total} size="sm" />
    </div>
  );
}
