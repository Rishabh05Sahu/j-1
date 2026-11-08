"use client";

import { ChevronDown, Heart, Mail, Phone, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { Drawer } from "@/components/molecules/Overlay";
import { brand } from "@/config/brand";
import { mainNavigation, secondaryNavigation } from "@/data/navigation";
import { useCart } from "@/hooks/useCart";
import { useUI } from "@/hooks/useUI";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const { menuOpen, close, openCart } = useUI();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [expanded, setExpanded] = useState<string | null>(null);
  const onClose = () => close("menu");

  return (
    <Drawer open={menuOpen} onClose={onClose} title="Menu" side="left" width="sm:max-w-[420px]">
      <nav aria-label="Mobile" className="px-6 pb-10 pt-6">
        <ul className="flex flex-col">
          {mainNavigation.map((item, i) => {
            const isOpen = expanded === item.label;
            return (
              <li
                key={item.label}
                className={cn(
                  "border-b border-line transition-[opacity,transform] duration-700 ease-luxe",
                  menuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
                )}
                style={{ transitionDelay: menuOpen ? `${120 + i * 50}ms` : "0ms" }}
              >
                {item.megaMenu ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between py-5 text-left font-serif text-[1.625rem] leading-none"
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        strokeWidth={1}
                        className={cn("size-5 text-stone transition-transform duration-500", isOpen && "rotate-180")}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-500 ease-luxe",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden" inert={!isOpen}>
                        {item.megaMenu.columns.map((col) => (
                          <div key={col.title} className="pb-5">
                            <p className="eyebrow mb-3 text-[0.625rem] text-gold-deep">{col.title}</p>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                              {col.links.map((link) => (
                                <li key={link.href + link.label}>
                                  <Link href={link.href} onClick={onClose} className="text-[0.9375rem] text-espresso">
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} onClick={onClose} className="block py-5 font-serif text-[1.625rem] leading-none">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <ul className="mt-8 flex flex-col gap-4">
          {secondaryNavigation.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className="eyebrow text-stone">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid grid-cols-3 border-y border-line text-center">
          <Link href="/account" onClick={onClose} className="flex flex-col items-center gap-2 py-5 text-[0.6875rem] uppercase tracking-[0.14em]">
            <User aria-hidden="true" strokeWidth={1.1} className="size-5" />
            Account
          </Link>
          <Link href="/wishlist" onClick={onClose} className="flex flex-col items-center gap-2 border-x border-line py-5 text-[0.6875rem] uppercase tracking-[0.14em]">
            <Heart aria-hidden="true" strokeWidth={1.1} className="size-5" />
            Wishlist{wishlistCount > 0 && ` (${wishlistCount})`}
          </Link>
          <button type="button" onClick={openCart} className="flex flex-col items-center gap-2 py-5 text-[0.6875rem] uppercase tracking-[0.14em]">
            <ShoppingBag aria-hidden="true" strokeWidth={1.1} className="size-5" />
            Bag{cartCount > 0 && ` (${cartCount})`}
          </button>
        </div>

        <div className="mt-10 space-y-3 text-[0.8125rem] text-stone">
          <a href={brand.contact.phoneHref} className="flex items-center gap-3">
            <Phone aria-hidden="true" strokeWidth={1.1} className="size-4" /> {brand.contact.phone}
          </a>
          <a href={`mailto:${brand.contact.email}`} className="flex items-center gap-3">
            <Mail aria-hidden="true" strokeWidth={1.1} className="size-4" /> {brand.contact.email}
          </a>
          <div className="flex gap-4 pt-3">
            <a href={brand.social.instagram} target="_blank" rel="noreferrer" aria-label="AURELLE on Instagram">
              <SocialIcon name="instagram" />
            </a>
            <a href={brand.social.pinterest} target="_blank" rel="noreferrer" aria-label="AURELLE on Pinterest">
              <SocialIcon name="pinterest" />
            </a>
          </div>
        </div>
      </nav>
    </Drawer>
  );
}
