import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WatchShop.com — Premium Watches for Every Moment",
    template: "%s · WatchShop.com",
  },
  description:
    "Discover timeless style and unmatched quality. Rolex, Omega, Seiko, Tissot, Casio and 120+ maisons — certified authentic, shipped worldwide with insurance.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream-50 font-sans text-forest-950 antialiased">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
