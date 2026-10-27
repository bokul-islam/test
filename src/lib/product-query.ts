export type ProductQuery = {
  q?: string;
  category?: string;
  collection?: string;
  brand?: string;
  deals?: boolean;
  min?: number;
  max?: number;
  sort?: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
  ids?: number[];
  limit?: number;
};
