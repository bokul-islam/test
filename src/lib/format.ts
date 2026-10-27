export function formatMoney(cents: number): string {
  const dollars = cents / 100;
  const hasDecimals = cents % 100 !== 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(dollars);
}

export function discountPercent(priceCents: number, originalCents: number | null): number | null {
  if (!originalCents || originalCents <= priceCents) return null;
  return Math.round(((originalCents - priceCents) / originalCents) * 100);
}
