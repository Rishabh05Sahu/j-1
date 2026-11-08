"use client";

import Link from "next/link";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { NavigationItem } from "@/components/molecules/NavigationItem";
import { cn } from "@/lib/utils";
import type { MegaMenu as MegaMenuData } from "@/types";

export function MegaMenu({
  id,
  menu,
  open,
  onNavigate,
}: {
  id: string;
  menu: MegaMenuData;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      id={id}
      className={cn(
        "absolute inset-x-0 top-full border-t border-line bg-ivory text-espresso shadow-[0_30px_60px_-30px_rgba(23,21,19,0.18)]",
        "transition-[opacity,transform,visibility] duration-500 ease-luxe",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
      )}
      inert={!open}
    >
      <div className="container-luxe grid grid-cols-12 gap-8 py-12">
        {menu.columns.map((column, ci) => (
          <div key={column.title} className={cn("col-span-3", ci === 0 && "col-start-2")}>
            <p className="eyebrow mb-6 text-[0.625rem] text-gold-deep">{column.title}</p>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link, li) => (
                <li
                  key={link.href + link.label}
                  className={cn("transition-[opacity,transform] duration-700 ease-luxe", open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}
                  style={{ transitionDelay: open ? `${80 + li * 35}ms` : "0ms" }}
                >
                  <NavigationItem href={link.href} variant="mega" onClick={onNavigate}>
                    {link.label}
                  </NavigationItem>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link
          href={menu.feature.href}
          onClick={onNavigate}
          className="group/feature col-span-4 col-start-9 block"
        >
          <ImageFrame
            image={menu.feature.image}
            ratio="4/3"
            sizes="33vw"
            imgClassName="duration-[1600ms] group-hover/feature:scale-[1.04]"
          />
          <p className="eyebrow mt-5 text-[0.625rem] text-mute">{menu.feature.eyebrow}</p>
          <p className="mt-2 font-serif text-[1.375rem]">
            <span className="link-underline group-hover/feature:[background-size:100%_1px]">{menu.feature.title}</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
