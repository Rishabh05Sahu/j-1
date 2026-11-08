import type { Metadata } from "next";
import { AccountTemplate } from "@/components/templates/AccountTemplate";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your AURELLE orders, wishlist and personal details.",
  robots: { index: false },
};

export default function AccountPage() {
  return <AccountTemplate />;
}
