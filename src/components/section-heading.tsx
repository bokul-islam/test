import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  dark?: boolean;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  subtitle,
  href,
  hrefLabel = "View All",
  dark = false,
  align = "left",
}: Props) {
  return (
    <Reveal
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        align === "center" && "flex-col items-center text-center",
      )}
    >
      <div className={cn(align === "center" && "flex flex-col items-center")}>
        {subtitle && (
          <p
            className={cn(
              "mb-2 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em]",
              dark ? "text-gold-400" : "text-gold-700",
            )}
          >
            <span className="h-px w-8 bg-current" />
            {subtitle}
          </p>
        )}
        <h2
          className={cn(
            "font-display text-3xl font-medium tracking-tight sm:text-4xl",
            dark ? "text-cream-50" : "text-forest-950",
          )}
        >
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className={cn(
            "group mb-1 inline-flex items-center gap-1.5 text-sm font-medium transition",
            dark ? "text-gold-300 hover:text-gold-200" : "text-forest-700 hover:text-forest-950",
          )}
        >
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
