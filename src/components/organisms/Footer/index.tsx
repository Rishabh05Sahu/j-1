import { Globe } from "lucide-react";
import Link from "next/link";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { Logo } from "@/components/molecules/Logo";
import { NavigationItem } from "@/components/molecules/NavigationItem";
import { brand } from "@/config/brand";
import { footerColumns } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-noir text-pearl">
      <div className="container-luxe pb-10 pt-20 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo size="md" withTagline className="items-start text-pearl" />
            <p className="mt-8 max-w-[340px] text-[0.8125rem] leading-[1.8] text-pearl/60">{brand.statement}</p>
            <div className="mt-8 flex items-center gap-2">
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="AURELLE on Instagram"
                className="flex size-10 items-center justify-center border border-pearl/15 text-pearl/80 transition-colors duration-300 hover:border-pearl/50 hover:text-pearl"
              >
                <SocialIcon name="instagram" />
              </a>
              <a
                href={brand.social.pinterest}
                target="_blank"
                rel="noreferrer"
                aria-label="AURELLE on Pinterest"
                className="flex size-10 items-center justify-center border border-pearl/15 text-pearl/80 transition-colors duration-300 hover:border-pearl/50 hover:text-pearl"
              >
                <SocialIcon name="pinterest" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow text-[0.625rem] text-gold">{col.title}</h2>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <NavigationItem href={link.href} variant="footer">
                        {link.label}
                      </NavigationItem>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-pearl/10 pt-8 text-[0.6875rem] tracking-[0.06em] text-pearl/45 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <Globe aria-hidden="true" strokeWidth={1.1} className="size-3.5" />
            <span>Shipping to: {brand.region}</span>
          </p>
          <p>
            © {brand.founded}–2026 {brand.legalName}. All rights reserved.
          </p>
          <p>
            <Link href="/client-care/terms" className="transition-colors hover:text-pearl/80">
              A frontend demonstration — no real transactions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
