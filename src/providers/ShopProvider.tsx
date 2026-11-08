"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { STORAGE_KEYS } from "@/config/brand";
import { createPersistentStore } from "@/lib/persistent-store";
import { cartLineKey, getProductById } from "@/lib/product-utils";
import { createId } from "@/lib/utils";
import type { CartLine, CartLineDetailed, Metal, ToastMessage } from "@/types";

/* ------------------------------------------------------------------
   Persistent stores (module singletons, client only)
   ------------------------------------------------------------------ */

const isStringArray = (raw: unknown): string[] =>
  Array.isArray(raw) ? raw.filter((id): id is string => typeof id === "string" && Boolean(getProductById(id))) : [];

const EMPTY_CART: CartLine[] = [];
const EMPTY_IDS: string[] = [];

const cartStore = createPersistentStore<CartLine[]>(STORAGE_KEYS.cart, EMPTY_CART, (raw) =>
  Array.isArray(raw)
    ? raw
        .filter(
          (l): l is CartLine =>
            l && typeof l.productId === "string" && Boolean(getProductById(l.productId)) && Number(l.quantity) > 0,
        )
        .map((l) => ({ ...l, quantity: Math.min(10, Math.floor(l.quantity)), key: cartLineKey(l.productId, l.metal, l.size) }))
    : EMPTY_CART,
);
const wishlistStore = createPersistentStore<string[]>(STORAGE_KEYS.wishlist, EMPTY_IDS, isStringArray);
const recentStore = createPersistentStore<string[]>(STORAGE_KEYS.recent, EMPTY_IDS, isStringArray);

const noopSubscribe = () => () => {};

/* ------------------------------------------------------------------
   Context shapes
   ------------------------------------------------------------------ */

export interface AddToCartOptions {
  metal?: Metal;
  size?: string;
  quantity?: number;
  /** How to confirm the addition to the shopper. */
  reveal?: "drawer" | "toast" | "none";
}

export interface CartContextValue {
  hydrated: boolean;
  lines: CartLineDetailed[];
  count: number;
  subtotal: number;
  addToCart: (productId: string, options?: AddToCartOptions) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
}

export interface WishlistContextValue {
  hydrated: boolean;
  ids: string[];
  count: number;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  recentlyViewed: string[];
  trackView: (productId: string) => void;
}

export interface UIContextValue {
  cartOpen: boolean;
  wishlistOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  quickViewId: string | null;
  openCart: () => void;
  openWishlist: () => void;
  openSearch: () => void;
  openMenu: () => void;
  openQuickView: (productId: string) => void;
  closeAll: () => void;
  close: (panel: "cart" | "wishlist" | "search" | "menu" | "quickView") => void;
}

export interface ToastContextValue {
  toasts: ToastMessage[];
  notify: (toast: Omit<ToastMessage, "id">) => void;
  dismiss: (id: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
export const WishlistContext = createContext<WishlistContextValue | null>(null);
export const UIContext = createContext<UIContextValue | null>(null);
export const ToastContext = createContext<ToastContextValue | null>(null);

/* ------------------------------------------------------------------
   Provider
   ------------------------------------------------------------------ */

type Panel = "cart" | "wishlist" | "search" | "menu" | "quickView" | null;

export function ShopProvider({ children }: { children: ReactNode }) {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.get, cartStore.getServer);
  const wishlist = useSyncExternalStore(wishlistStore.subscribe, wishlistStore.get, wishlistStore.getServer);
  const recent = useSyncExternalStore(recentStore.subscribe, recentStore.get, recentStore.getServer);
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  /* ---------------- UI panels (one overlay at a time) */
  const [panel, setPanel] = useState<Panel>(null);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);

  const ui = useMemo<UIContextValue>(
    () => ({
      cartOpen: panel === "cart",
      wishlistOpen: panel === "wishlist",
      searchOpen: panel === "search",
      menuOpen: panel === "menu",
      quickViewId: panel === "quickView" ? quickViewId : null,
      openCart: () => setPanel("cart"),
      openWishlist: () => setPanel("wishlist"),
      openSearch: () => setPanel("search"),
      openMenu: () => setPanel("menu"),
      openQuickView: (id) => {
        setQuickViewId(id);
        setPanel("quickView");
      },
      closeAll: () => setPanel(null),
      close: (p) => setPanel((current) => (current === p ? null : current)),
    }),
    [panel, quickViewId],
  );

  /* ---------------- Toasts */
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const notify = useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = createId("toast");
      setToasts((t) => [...t.slice(-2), { ...toast, id }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), 4200),
      );
    },
    [dismiss],
  );

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  const toastValue = useMemo<ToastContextValue>(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss]);

  /* ---------------- Cart */
  const cartValue = useMemo<CartContextValue>(() => {
    const lines: CartLineDetailed[] = cart.flatMap((line) => {
      const product = getProductById(line.productId);
      return product ? [{ ...line, product, lineTotal: product.price * line.quantity }] : [];
    });

    return {
      hydrated,
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      addToCart: (productId, options = {}) => {
        const product = getProductById(productId);
        if (!product || product.availability === "sold-out") return;
        const metal = options.metal ?? product.metal;
        const size = options.size;
        const quantity = options.quantity ?? 1;
        const key = cartLineKey(productId, metal, size);
        cartStore.set((prev) => {
          const existing = prev.find((l) => l.key === key);
          if (existing) {
            return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(10, l.quantity + quantity) } : l));
          }
          return [...prev, { key, productId, metal, size, quantity }];
        });
        const reveal = options.reveal ?? "toast";
        if (reveal === "drawer") setPanel("cart");
        if (reveal === "toast") {
          notify({
            title: "Added to your bag",
            description: product.name,
            image: product.images[0],
            action: { label: "View Bag", type: "open-cart" },
          });
        }
      },
      updateQuantity: (key, quantity) =>
        cartStore.set((prev) =>
          quantity <= 0
            ? prev.filter((l) => l.key !== key)
            : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(10, quantity) } : l)),
        ),
      removeFromCart: (key) => cartStore.set((prev) => prev.filter((l) => l.key !== key)),
      clearCart: () => cartStore.set([]),
    };
  }, [cart, hydrated, notify]);

  /* ---------------- Wishlist & recently viewed */
  const wishlistValue = useMemo<WishlistContextValue>(
    () => ({
      hydrated,
      ids: wishlist,
      count: wishlist.length,
      isWishlisted: (id) => wishlist.includes(id),
      toggleWishlist: (id) => {
        const product = getProductById(id);
        if (!product) return;
        const adding = !wishlistStore.get().includes(id);
        wishlistStore.set((prev) => (adding ? [id, ...prev] : prev.filter((x) => x !== id)));
        notify(
          adding
            ? {
                title: "Saved to your wishlist",
                description: product.name,
                image: product.images[0],
                action: { label: "View Wishlist", type: "open-wishlist" },
              }
            : { title: "Removed from your wishlist", description: product.name },
        );
      },
      removeFromWishlist: (id) => wishlistStore.set((prev) => prev.filter((x) => x !== id)),
      recentlyViewed: recent,
      trackView: (id) => recentStore.set((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 12)),
    }),
    [wishlist, recent, hydrated, notify],
  );

  return (
    <UIContext value={ui}>
      <ToastContext value={toastValue}>
        <CartContext value={cartValue}>
          <WishlistContext value={wishlistValue}>{children}</WishlistContext>
        </CartContext>
      </ToastContext>
    </UIContext>
  );
}
