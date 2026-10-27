import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  className,
  size = 13,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const stars = Array.from({ length: 5 }, (_, i) => i);
  return (
    <span className={cn("relative inline-flex", className)} aria-label={`Rated ${rating} of 5`}>
      <span className="flex gap-0.5 text-forest-900/15">
        {stars.map((i) => (
          <Star key={i} style={{ width: size, height: size }} className="fill-current" />
        ))}
      </span>
      <span
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-gold-500"
        style={{ width: `${pct}%` }}
      >
        {stars.map((i) => (
          <Star key={i} style={{ width: size, height: size }} className="shrink-0 fill-current" />
        ))}
      </span>
    </span>
  );
}
