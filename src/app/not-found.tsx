import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700">404</p>
      <h1 className="mt-3 font-display text-4xl font-medium text-forest-950">Piece not found</h1>
      <p className="mt-3 text-sm text-forest-600">
        This reference has left the vault — or the link is a little off.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-forest-900 px-7 py-3 text-sm font-semibold text-cream-50 transition hover:bg-forest-800"
      >
        Back to WatchShop
      </Link>
    </div>
  );
}
