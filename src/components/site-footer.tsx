import Link from "next/link";
import { Mail, MapPin, Phone, Watch } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

type SvgProps = { className?: string };

const FacebookIcon = ({ className }: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
  </svg>
);

const InstagramIcon = ({ className }: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = ({ className }: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.2 4.5h2.7l-6 6.9 7 8.6h-5.5l-4.3-5.7-5 5.7H3.4l6.4-7.4L3.1 4.5h5.7l3.9 5.2 4.5-5.2Zm-1 14h1.5L8.1 6h-1.6l9.7 12.5Z" />
  </svg>
);

const YoutubeIcon = ({ className }: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  </svg>
);

const socials = [
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "X", Icon: XIcon },
  { label: "YouTube", Icon: YoutubeIcon },
];

const serviceLinks = [
  { label: "Shipping & Delivery", href: "/#" },
  { label: "Returns & Exchanges", href: "/#" },
  { label: "Watch Servicing", href: "/#" },
  { label: "Authentication", href: "/#" },
  { label: "FAQ", href: "/#" },
  { label: "Warranty", href: "/#" },
];

const paymentBadges = ["VISA", "MASTERCARD", "AMEX", "PAYPAL", "UNIONPAY"];

export function SiteFooter() {
  return (
    <footer id="contact" className="grain relative overflow-hidden bg-forest-950 text-cream-50">
      {/* giant watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-semibold italic leading-none text-cream-50/[0.025]"
      >
        WatchShop
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-4 pb-10 pt-16 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/60 text-gold-400">
                <Watch className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight">
                Watch<span className="italic text-gold-400">Shop</span>
                <span className="text-cream-50/50">.com</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-50/60">
              Timeless pieces, carefully curated. Authentic certification, insured worldwide
              delivery and a concierge team that speaks horology.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-cream-50/15 text-cream-50/70 transition hover:border-gold-500 hover:bg-gold-500 hover:text-forest-950"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-cream-50/65 transition hover:pl-1 hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service */}
          <nav aria-label="Customer service">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Customer Service
            </h3>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-cream-50/65 transition hover:pl-1 hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Get in Touch
            </h3>
            <ul className="space-y-3.5 text-sm text-cream-50/65">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  support@watchshop.com
                  <br />
                  <span className="text-cream-50/40">Replies within 24 hours</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  +1 (415) 555-0197
                  <br />
                  <span className="text-cream-50/40">Mon–Sat, 9am–8pm EST</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  188 Madison Avenue, New York,
                  <br />
                  NY 10016, United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-cream-50/10 pt-6 sm:flex-row">
          <p className="text-xs text-cream-50/40">
            © {new Date().getFullYear()} WatchShop.com — All rights reserved. Prices include VAT.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {paymentBadges.map((b) => (
              <span
                key={b}
                className="rounded-md border border-cream-50/15 bg-forest-900 px-2.5 py-1 text-[9px] font-bold tracking-widest text-cream-50/70"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
