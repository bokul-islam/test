import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    category: text("category").notNull(), // men | women | smart | accessories
    collection: text("collection").notNull(), // classic | sport | luxury | smart
    priceCents: integer("price_cents").notNull(),
    originalPriceCents: integer("original_price_cents"),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("4.5"),
    reviewCount: integer("review_count").notNull().default(0),
    badge: text("badge"), // "Best Seller" | "New" | "-20%" ...
    description: text("description").notNull(),
    specs: jsonb("specs").$type<Record<string, string>>().notNull().default({}),
    image: text("image").notNull(),
    imageAlt: text("image_alt").notNull().default(""),
    stock: integer("stock").notNull().default(10),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("products_category_idx").on(t.category),
    index("products_collection_idx").on(t.collection),
    index("products_brand_idx").on(t.brand),
  ],
);

export const cartItems = pgTable(
  "cart_items",
  {
    id: serial("id").primaryKey(),
    cartToken: text("cart_token").notNull(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("cart_items_token_idx").on(t.cartToken)],
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: text("order_number").notNull(),
    email: text("email").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    postalCode: text("postal_code").notNull(),
    country: text("country").notNull(),
    paymentMethod: text("payment_method").notNull().default("card"),
    subtotalCents: integer("subtotal_cents").notNull(),
    shippingCents: integer("shipping_cents").notNull(),
    totalCents: integer("total_cents").notNull(),
    status: text("status").notNull().default("placed"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("orders_number_idx").on(t.orderNumber)],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: integer("product_id").notNull(),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    priceCents: integer("price_cents").notNull(),
    quantity: integer("quantity").notNull(),
    image: text("image").notNull(),
  },
  (t) => [index("order_items_order_idx").on(t.orderId)],
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("newsletter_email_idx").on(t.email)],
);

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull().default(5),
  initials: text("initials").notNull(),
});

export type Product = typeof products.$inferSelect;
export type CartItemRow = typeof cartItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;

export type ProductDTO = Omit<Product, "rating"> & { rating: number };
