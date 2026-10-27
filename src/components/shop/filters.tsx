"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  { value: "men", label: "Men's Watches" },
  { value: "women", label: "Women's Watches" },
  { value: "smart", label: "Smart Watches" },
  { value: "accessories", label: "Accessories" },
  { value: "luxury", label: "Luxury Brands" },
];

const COLLECTION_OPTIONS = [
  { value: "classic", label: "Classic" },
  { value: "sport", label: "Sport" },
  { value: "luxury", label: "Luxury" },
  { value: "smart", label: "Smart" },
];

const PRICE_OPTIONS = [
  { value: "0-25000", label: "Under $250" },
  { value: "25000-100000", label: "$250 – $1,000" },
  { value: "100000-500000", label: "$1,000 – $5,000" },
  { value: "500000-999999999", label: "$5,000 & Above" },
];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

function FilterGroup({
  label,
  children,
  defaultOpen = true,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-forest-900/10 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-forest-900"
      >
        {label}
        <ChevronDown
          className={cn("h-4 w-4 text-forest-500 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OptionRow({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group flex w-full items-center gap-2.5 py-1.5 text-left">
      <span
        className={cn(
          "grid h-4 w-4 shrink-0 place-items-center rounded border transition",
          active
            ? "border-gold-500 bg-gold-500 text-forest-950"
            : "border-forest-900/25 bg-white group-hover:border-gold-500",
        )}
      >
        {active && <Check className="h-3 w-3" />}
      </span>
      <span
        className={cn(
          "text-sm transition",
          active ? "font-medium text-forest-950" : "text-forest-700 group-hover:text-forest-950",
        )}
      >
        {label}
      </span>
    </button>
  );
}

export function ShopFilters({ brands }: { brands: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openMobile, setOpenMobile] = useState(false);

  const paramsString = searchParams.toString();
  const current = useMemo(() => new URLSearchParams(paramsString), [paramsString]);

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(current.toString());
      if (value === null) next.delete(key);
      else next.set(key, value);
      router.push(`/shop?${next.toString()}`, { scroll: false });
    },
    [current, router],
  );

  let activeCount = 0;
  for (const k of ["category", "collection", "brand", "min", "max", "deals", "q"]) {
    if (current.get(k)) activeCount++;
  }

  const priceValue = current.get("min") && current.get("max") ? `${current.get("min")}-${current.get("max")}` : null;

  const panel = (
    <div>
      <FilterGroup label="Category">
        {CATEGORY_OPTIONS.map((o) => (
          <OptionRow
            key={o.value}
            label={o.label}
            active={current.get("category") === o.value || (o.value === "luxury" && current.get("collection") === "luxury" && !current.get("category"))}
            onClick={() => {
              if (o.value === "luxury") {
                const next = new URLSearchParams(current.toString());
                next.delete("category");
                next.set("collection", "luxury");
                router.push(`/shop?${next.toString()}`, { scroll: false });
              } else {
                const isActive = current.get("category") === o.value;
                setParam("category", isActive ? null : o.value);
              }
            }}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Collection">
        {COLLECTION_OPTIONS.map((o) => (
          <OptionRow
            key={o.value}
            label={o.label}
            active={current.get("collection") === o.value}
            onClick={() =>
              setParam("collection", current.get("collection") === o.value ? null : o.value)
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Brand">
        <div className="max-h-52 overflow-y-auto pr-1">
          {brands.map((b) => (
            <OptionRow
              key={b}
              label={b}
              active={current.get("brand") === b}
              onClick={() => setParam("brand", current.get("brand") === b ? null : b)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Price">
        {PRICE_OPTIONS.map((o) => (
          <OptionRow
            key={o.value}
            label={o.label}
            active={priceValue === o.value}
            onClick={() => {
              const next = new URLSearchParams(current.toString());
              if (priceValue === o.value) {
                next.delete("min");
                next.delete("max");
              } else {
                const [min, max] = o.value.split("-");
                next.set("min", min);
                next.set("max", max);
              }
              router.push(`/shop?${next.toString()}`, { scroll: false });
            }}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Offers">
        <OptionRow
          label="On sale only"
          active={current.get("deals") === "true"}
          onClick={() => setParam("deals", current.get("deals") === "true" ? null : "true")}
        />
      </FilterGroup>

      {activeCount > 0 && (
        <button
          onClick={() => router.push("/shop")}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-forest-900/20 py-2.5 text-xs font-semibold uppercase tracking-wider text-forest-800 transition hover:bg-forest-900 hover:text-cream-50"
        >
          <X className="h-3.5 w-3.5" />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpenMobile((v) => !v)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm font-medium text-forest-900 shadow-card lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gold-600" />
          Filters
          {activeCount > 0 && (
            <span className="grid h-5 w-5 place-items-center rounded-full bg-forest-900 text-[10px] font-bold text-cream-50">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", openMobile && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {openMobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden rounded-xl border border-forest-900/15 bg-white px-5 shadow-card lg:hidden"
          >
            {panel}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="sticky top-32 hidden w-60 shrink-0 self-start rounded-2xl border border-forest-900/8 bg-white px-5 pb-5 shadow-card lg:block">
        {panel}
      </aside>
    </>
  );
}

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get("sort") ?? "featured";

  return (
    <label className="flex items-center gap-2 text-xs text-forest-600">
      <span className="hidden sm:block">Sort by</span>
      <select
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(searchParams.toString());
          if (e.target.value === "featured") next.delete("sort");
          else next.set("sort", e.target.value);
          router.push(`/shop?${next.toString()}`, { scroll: false });
        }}
        className="rounded-full border border-forest-900/15 bg-white px-4 py-2 text-sm font-medium text-forest-900 shadow-card transition focus:border-gold-500 focus:outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
