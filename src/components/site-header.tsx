"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Heart, Menu, Search, ShoppingBag, User, Watch, X } from "lucide-react";
import { MARQUEE_BRANDS, NAV_LINKS } from "@/lib/constants";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";
import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";

export function SiteHeader() {
  const pathname = usePathname();
  const cart = useCart();
  const wishlist = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[60]">
      {/* Announcement bar */}
      <div className="grain bg-forest-950 text-cream-50">
        <p className="relative z-[2] mx-auto max-w-7xl px-4 py-2 text-center text-[11px] tracking-[0.18em] uppercase">
          <span className="text-gold-400">Complimentary worldwide shipping</span>
          <span className="mx-2 text-cream-50/30">·</span>
          <span className="text-cream-50/80">on orders over $500</span>
        </p>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b border-forest-900/10 bg-cream-50/90 backdrop-blur-xl transition-shadow duration-300",
          scrolled && "shadow-[0_10px_40px_-18px_rgba(11,32,23,0.35)]",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:gap-6 lg:px-6">
          {/* Mobile menu button */}
          <button
            ref={menuRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-forest-900 transition hover:bg-forest-900/5 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="WatchShop home">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/60 bg-forest-900 text-gold-400 transition-transform duration-500 group-hover:rotate-[360deg]">
              <Watch className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold tracking-tight text-forest-950">
                Watch<span className="italic text-gold-600">Shop</span>
                <span className="text-forest-400">.com</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-forest-500">
                Timepieces since 2009
              </span>
            </span>
          </Link>

          {/* Desktop search */}
          <SearchBar className="hidden flex-1 md:block" />

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="rounded-full p-2.5 text-forest-800 transition hover:bg-forest-900/5 md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            <span className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-forest-700 transition hover:bg-forest-900/5 xl:flex">
              <Globe className="h-4 w-4" />
              EN <span className="text-forest-400">/</span> USD
            </span>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative rounded-full p-2.5 text-forest-800 transition hover:bg-forest-900/5"
            >
              <Heart className="h-5 w-5" />
              {wishlist.count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {wishlist.count}
                </span>
              )}
            </Link>

            <button
              aria-label="Account"
              className="hidden rounded-full p-2.5 text-forest-800 transition hover:bg-forest-900/5 sm:block"
            >
              <User className="h-5 w-5" />
            </button>

            <button
              onClick={() => cart.setOpen(true)}
              aria-label="Open shopping bag"
              className="relative flex items-center gap-2 rounded-full bg-forest-900 px-3.5 py-2.5 text-cream-50 transition hover:bg-forest-800"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              <span className="hidden text-xs font-semibold uppercase tracking-wider sm:block">
                Bag
              </span>
              <AnimatePresence>
                {cart.count > 0 && (
                  <motion.span
                    key={cart.count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-forest-950"
                  >
                    {cart.count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-forest-900/10 md:hidden"
            >
              <div className="px-4 py-3">
                <SearchBar className="w-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop nav */}
        <nav className="hidden border-t border-forest-900/5 lg:block" aria-label="Primary">
          <div className="mx-auto flex max-w-7xl items-center gap-7 px-6 py-2.5">
            {NAV_LINKS.map((link) => {
              if (link.label === "Brands") {
                return (
                  <div key={link.label} className="group relative">
                    <Link
                      href={link.href}
                      className="link-underline flex items-center gap-1 py-1 text-[13px] font-medium text-forest-800 transition hover:text-forest-950"
                      data-active={pathname.startsWith("/shop")}
                    >
                      Brands
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </Link>
                    <div className="invisible absolute left-1/2 top-full z-50 w-[480px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="grid grid-cols-3 gap-1 rounded-2xl border border-forest-900/10 bg-white p-3 shadow-lift">
                        {MARQUEE_BRANDS.map((b) => (
                          <Link
                            key={b}
                            href={`/shop?brand=${encodeURIComponent(b)}`}
                            className="rounded-lg px-3 py-2 text-center font-display text-sm text-forest-800 transition hover:bg-cream-100 hover:text-forest-950"
                          >
                            {b}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  data-active={pathname === "/" && link.label === "Home"}
                  className={cn(
                    "link-underline py-1 text-[13px] font-medium transition",
                    "accent" in link && link.accent
                      ? "text-gold-700 hover:text-gold-600"
                      : "text-forest-800 hover:text-forest-950",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile nav drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-forest-900/10 bg-cream-50 lg:hidden"
              aria-label="Mobile"
            >
              <div className="space-y-1 px-4 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-forest-900/5",
                        "accent" in link && link.accent ? "text-gold-700" : "text-forest-900",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
