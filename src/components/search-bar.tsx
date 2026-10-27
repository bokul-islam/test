"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, TrendingUp } from "lucide-react";
import type { ProductDTO } from "@/db/schema";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

const TRENDING = ["Rolex", "Diver", "Smart", "Gold", "Chronograph"];

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<ProductDTO[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false);
    setQ("");
  }, [pathname]);

  // Debounced live search
  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(q)}&limit=6`);
        const data = await res.json();
        setResults(data.items ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 240);
    return () => window.clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!q.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <form onSubmit={submit} role="search">
        <div className="group relative flex items-center overflow-hidden rounded-full border border-forest-900/15 bg-cream-100/70 transition focus-within:border-gold-500 focus-within:bg-white">
          <Search className="ml-4 h-4 w-4 shrink-0 text-forest-500" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search for your favorite watch…"
            aria-label="Search watches"
            className="w-full bg-transparent px-3 py-2.5 text-sm text-forest-950 placeholder:text-forest-400 focus:outline-none"
          />
          {loading && <Loader2 className="mr-3 h-4 w-4 animate-spin text-gold-600" />}
        </div>
      </form>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-forest-900/10 bg-white shadow-lift"
          >
            {!q.trim() && (
              <div className="p-4">
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                  <TrendingUp className="h-3.5 w-3.5 text-gold-600" /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        router.push(`/shop?q=${t}`);
                        setOpen(false);
                      }}
                      className="rounded-full border border-forest-900/15 px-3 py-1 text-xs text-forest-700 transition hover:border-gold-500 hover:text-forest-950"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q.trim() !== "" && results.length === 0 && !loading && (
              <p className="px-4 py-5 text-sm text-forest-500">
                No pieces matched “{q}”. Try a brand — Rolex, Seiko, Omega…
              </p>
            )}

            {results.length > 0 && (
              <ul className="max-h-[340px] divide-y divide-forest-900/5 overflow-y-auto">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-cream-100/70"
                    >
                      <span className="relative h-11 w-10 shrink-0 overflow-hidden rounded-md bg-cream-100">
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] uppercase tracking-wider text-gold-700">
                          {p.brand}
                        </span>
                        <span className="block truncate text-sm font-medium text-forest-950">
                          {p.name}
                        </span>
                      </span>
                      <span className="text-sm font-semibold text-forest-900">
                        {formatMoney(p.priceCents)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {results.length > 0 && (
              <button
                onClick={() => submit()}
                className="w-full border-t border-forest-900/10 bg-cream-100/60 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-forest-800 transition hover:bg-cream-100"
              >
                View all results for “{q}”
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
