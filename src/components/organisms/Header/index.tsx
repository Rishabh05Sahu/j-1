"use client";

import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { Logo } from "@/components/molecules/Logo";
import { NavigationItem } from "@/components/molecules/NavigationItem";
import { AnnouncementBar } from "@/components/organisms/AnnouncementBar";
import { MegaMenu } from "@/components/organisms/MegaMenu";
import { brand } from "@/config/brand";
import { mainNavigation } from "@/data/navigation";
import { useCart } from "@/hooks/useCart";
import { useScrolled } from "@/hooks/useScrolled";
import { useUI } from "@/hooks/useUI";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

/** Routes whose first section is a full-bleed image the header can float over. */
const OVERLAY_ROUTES = new Set(["/", "/our-story", "/craftsmanship"]);
const hasOverlayHero = (pathname: string) => OVERLAY_ROUTES.has(pathname) || /^\/journal\/[^/]+$/.test(pathname);

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(40);
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openCart, openWishlist, openSearch, openMenu } = useUI();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const overlayCapable = hasOverlayHero(pathname);
  const transparent = overlayCapable && !scrolled && !activeMenu && !hovered;

  const scheduleMenu = (label: string | null, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActiveMenu(label), delay);
  };
  const closeMenu = () => {
    clearTimeout(timer.current);
    setActiveMenu(null);
  };

  // Close the mega menu with Escape and whenever the route changes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveMenu(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer.current);
    };
  }, []);

  const iconSize = "size-[19px]";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ease-luxe",
          transparent ? "bg-transparent text-pearl" : "bg-ivory text-espresso",
          !transparent && scrolled && "shadow-[0_1px_0_var(--color-line)]",
        )}
        onMouseEnter={() => overlayCapable && setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          scheduleMenu(null, 160);
        }}
      >
        <AnnouncementBar message={brand.announcement} collapsed={scrolled} />

        {/* Main row */}
        <div
          className={cn(
            "container-luxe grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500 ease-luxe",
            scrolled ? "h-16 lg:h-[68px]" : "h-16 lg:h-[84px]",
          )}
        >
          <div className="flex items-center gap-1 lg:gap-2">
            <IconButton
              label="Open menu"
              icon={<Menu strokeWidth={1.1} className="size-[22px]" />}
              onClick={openMenu}
              className="-ml-2.5 lg:hidden"
            />
            <button
              type="button"
              onClick={openSearch}
              className="group/search flex h-11 items-center gap-3 px-1 transition-opacity hover:opacity-70 lg:-ml-1"
              aria-label="Search the collections"
            >
              <Search aria-hidden="true" strokeWidth={1.1} className={iconSize} />
              <span className="eyebrow hidden text-[0.625rem] lg:inline">Search</span>
            </button>
          </div>

          <Logo size={scrolled ? "sm" : "md"} className="transition-all duration-500" />

          <div className="flex items-center justify-end gap-0 sm:gap-1">
            <Link
              href="/account"
              aria-label="Your account"
              className="hidden size-11 items-center justify-center transition-opacity hover:opacity-70 sm:inline-flex"
            >
              <User aria-hidden="true" strokeWidth={1.1} className={iconSize} />
            </Link>
            <IconButton
              label="Wishlist"
              badge={wishlistCount}
              icon={<Heart strokeWidth={1.1} className={iconSize} />}
              onClick={openWishlist}
            />
            <IconButton
              label="Shopping bag"
              badge={cartCount}
              icon={<ShoppingBag strokeWidth={1.1} className={iconSize} />}
              onClick={openCart}
              className="-mr-2.5"
            />
          </div>
        </div>

        {/* Navigation row (desktop) */}
        <nav
          aria-label="Main"
          className="relative hidden lg:block"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeMenu();
          }}
        >
          <ul
            className={cn(
              "container-luxe flex h-12 items-center justify-center gap-12 border-t transition-colors duration-500",
              transparent ? "border-pearl/20" : "border-line",
            )}
          >
            {mainNavigation.map((item) => {
              const menuId = `mega-${item.label.toLowerCase()}`;
              const open = activeMenu === item.label;
              return (
                <li
                  key={item.label}
                  className="flex h-full items-center"
                  onMouseEnter={() => scheduleMenu(item.megaMenu ? item.label : null, item.megaMenu ? 90 : 120)}
                  onFocus={() => item.megaMenu && setActiveMenu(item.label)}
                >
                  <NavigationItem
                    href={item.href}
                    active={isActive(pathname, item.href) && !item.megaMenu}
                    data-active={open || undefined}
                    aria-expanded={item.megaMenu ? open : undefined}
                    aria-controls={item.megaMenu ? menuId : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavigationItem>
                  {item.megaMenu && <MegaMenu id={menuId} menu={item.megaMenu} open={open} onNavigate={closeMenu} />}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Dim page content beneath an open mega menu */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-0 z-40 bg-noir/25 transition-opacity duration-500 ease-luxe",
          activeMenu ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Reserve space on routes where the header does not overlay a hero */}
      {!overlayCapable && <div aria-hidden="true" className="h-[100px] lg:h-[168px]" />}
    </>
  );
}
