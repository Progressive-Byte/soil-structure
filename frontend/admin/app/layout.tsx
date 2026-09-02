import type { Metadata } from "next";
import "../../../styles/globals.css";
import { AdminGuard } from "./AdminGuard";

export const metadata: Metadata = {
  title: "Admin — Soil & Structure",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bone">
        <AdminGuard>{children}</AdminGuard>
      </body>
    </html>
  );
}
