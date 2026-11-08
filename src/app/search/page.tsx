import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/atoms/Spinner";
import { SearchTemplate } from "@/components/templates/SearchTemplate";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the AURELLE collections by name, gemstone, metal or collection.",
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-stone">
          <Spinner label="Loading search" />
        </div>
      }
    >
      <SearchTemplate />
    </Suspense>
  );
}
