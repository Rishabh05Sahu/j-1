import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { ShopOverlays } from "@/components/organisms/ShopOverlays";
import { brand } from "@/config/brand";
import { ShopProvider } from "@/providers/ShopProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: "AURELLE — Fine Jewelry Maison",
    template: "%s | AURELLE",
  },
  description:
    "AURELLE is a contemporary luxury jewelry maison creating exceptional fine jewelry, diamonds, gemstones and bridal collections.",
  openGraph: {
    type: "website",
    siteName: "AURELLE",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f6f1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-svh flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="eyebrow fixed left-4 top-4 z-[100] -translate-y-24 bg-espresso px-5 py-3 text-pearl transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ShopProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ShopOverlays />
        </ShopProvider>
      </body>
    </html>
  );
}
