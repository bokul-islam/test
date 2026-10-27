import { config } from "dotenv";
config({ path: ".env" });

import { CATALOG_SEED, TESTIMONIALS } from "../src/data/catalog";

async function main() {
  const { db } = await import("../src/db");
  const { products, testimonials } = await import("../src/db/schema");

  console.log("Seeding products…");
  await db.delete(products);
  await db.insert(products).values(CATALOG_SEED);
  console.log(`Inserted ${CATALOG_SEED.length} products.`);

  console.log("Seeding testimonials…");
  await db.delete(testimonials);
  await db.insert(testimonials).values(TESTIMONIALS);
  console.log(`Inserted ${TESTIMONIALS.length} testimonials.`);

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
