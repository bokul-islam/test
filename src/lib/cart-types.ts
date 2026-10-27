export type CartProduct = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  priceCents: number;
  originalPriceCents: number | null;
  image: string;
  imageAlt: string;
  stock: number;
};

export type CartLine = {
  id: number;
  quantity: number;
  product: CartProduct;
};

export type CartResponse = {
  items: CartLine[];
  count: number;
  subtotalCents: number;
};
