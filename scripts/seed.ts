import { config } from "dotenv";
config({ path: ".env" });

const img = (id: number | string, file = "") =>
  `https://images.pexels.com/photos/${id}/${file}?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

type SeedProduct = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  collection: string;
  priceCents: number;
  originalPriceCents: number | null;
  rating: string;
  reviewCount: number;
  badge: string | null;
  description: string;
  specs: Record<string, string>;
  image: string;
  imageAlt: string;
  stock: number;
};

const catalog: SeedProduct[] = [
  // ---- MEN ----
  {
    slug: "rolex-datejust-41",
    name: "Datejust 41 Oystersteel",
    brand: "Rolex",
    category: "men",
    collection: "luxury",
    priceCents: 825000,
    originalPriceCents: 895000,
    rating: "4.9",
    reviewCount: 212,
    badge: "Iconic",
    description:
      "The archetype of the classic watch. A 41mm Oystersteel case, fluted bezel and the signature Jubilee bracelet make the Datejust 41 the definitive luxury daily wearer — certified superlative chronometer precision.",
    specs: {
      Movement: "Rolex Calibre 3235, Automatic",
      Case: "41mm Oystersteel & white gold bezel",
      "Water Resistance": "100m",
      Bracelet: "Jubilee, five-piece links",
      Warranty: "5-Year International",
    },
    image: img(19810840, "pexels-photo-19810840.jpeg"),
    imageAlt: "Luxury wristwatch with rose gold details on dark background",
    stock: 4,
  },
  {
    slug: "omega-seamaster-diver-300m",
    name: "Seamaster Diver 300M",
    brand: "Omega",
    category: "men",
    collection: "sport",
    priceCents: 535000,
    originalPriceCents: null,
    rating: "4.8",
    reviewCount: 340,
    badge: "Best Seller",
    description:
      "Since 1993 the Seamaster has been the diver's reference. Wave-edged ceramic dial, helium escape valve and the Co-Axial Master Chronometer calibre 8800 — engineered for the deep, finished for the boardroom.",
    specs: {
      Movement: "Omega Calibre 8800, Co-Axial",
      Case: "42mm Stainless steel",
      "Water Resistance": "300m",
      Bracelet: "Steel with diver extension",
      Warranty: "5-Year International",
    },
    image: img(9561286, "pexels-photo-9561286.jpeg"),
    imageAlt: "Close-up of an Omega Seamaster wristwatch",
    stock: 8,
  },
  {
    slug: "tudor-black-bay-58",
    name: "Black Bay Fifty-Eight",
    brand: "Tudor",
    category: "men",
    collection: "luxury",
    priceCents: 389000,
    originalPriceCents: null,
    rating: "4.9",
    reviewCount: 187,
    badge: null,
    description:
      "A tribute to Tudor's first divers' watches of 1958. The slim 39mm case, gilt accents and riveted bracelet deliver vintage soul with modern MT5402 manufacture performance.",
    specs: {
      Movement: "MT5402 Manufacture, COSC",
      Case: "39mm Stainless steel",
      "Water Resistance": "200m",
      Bracelet: "Riveted steel, T-fit clasp",
      Warranty: "5-Year International",
    },
    image: img(39655857, "pexels-photo-39655857.jpeg"),
    imageAlt: "Tudor dive watch with ceramic bezel",
    stock: 6,
  },
  {
    slug: "tag-heuer-carrera-chronograph",
    name: "Carrera Chronograph",
    brand: "TAG Heuer",
    category: "men",
    collection: "luxury",
    priceCents: 450000,
    originalPriceCents: 520000,
    rating: "4.7",
    reviewCount: 98,
    badge: "-13%",
    description:
      "Born on the racetrack in 1963. A glassbox sapphire crystal, tri-compax chronograph layout and the in-house Heuer 02 movement with 80-hour reserve make the Carrera a motorsport legend.",
    specs: {
      Movement: "Heuer 02 Automatic, 80h reserve",
      Case: "42mm Stainless steel",
      "Water Resistance": "100m",
      Bracelet: "H-link steel",
      Warranty: "2-Year International",
    },
    image: img(5447382, "pexels-photo-5447382.jpeg"),
    imageAlt: "Chronograph watch showing intricate mechanics on dark background",
    stock: 5,
  },
  {
    slug: "longines-hydroconquest",
    name: "HydroConquest Ceramic",
    brand: "Longines",
    category: "men",
    collection: "sport",
    priceCents: 160000,
    originalPriceCents: null,
    rating: "4.7",
    reviewCount: 156,
    badge: null,
    description:
      "Technical elegance for land and sea. A ceramic unidirectional bezel, sunray dial and the L888 automatic calibre give the HydroConquest the presence of pieces twice its price.",
    specs: {
      Movement: "L888 Automatic, 72h reserve",
      Case: "41mm Steel, ceramic bezel",
      "Water Resistance": "300m",
      Bracelet: "Steel with double-security clasp",
      Warranty: "2-Year International",
    },
    image: img(39640447, "pexels-photo-39640447.jpeg"),
    imageAlt: "Longines HydroConquest diver watch close-up",
    stock: 9,
  },
  {
    slug: "grand-seiko-heritage-snowfall",
    name: "Heritage 'Snowfall' Hi-Beat",
    brand: "Grand Seiko",
    category: "men",
    collection: "luxury",
    priceCents: 580000,
    originalPriceCents: null,
    rating: "4.9",
    reviewCount: 97,
    badge: "New",
    description:
      "Zaratsu-polished, distortion-free surfaces and a dial inspired by the snowfields of Shinshu. The Hi-Beat 9S85 movement beats at 36,000 vph — Japanese craftsmanship at its absolute peak.",
    specs: {
      Movement: "9S85 Hi-Beat Automatic",
      Case: "40mm Titanium, Zaratsu polish",
      "Water Resistance": "100m",
      Bracelet: "Titanium, three-fold clasp",
      Warranty: "5-Year International",
    },
    image: img(31110067, "pexels-photo-31110067.jpeg"),
    imageAlt: "Silver watch surrounded by artistic ice cubes",
    stock: 3,
  },
  {
    slug: "iwc-portofino-gold",
    name: "Portofino Hand-Wound Gold",
    brand: "IWC",
    category: "men",
    collection: "luxury",
    priceCents: 740000,
    originalPriceCents: 810000,
    rating: "4.9",
    reviewCount: 58,
    badge: "-9%",
    description:
      "Dolce vita on the wrist. An 18-carat 5N gold case, silvery opaline dial and slim hand-wound calibre — the Portofino distils three decades of Mediterranean ease into pure horological form.",
    specs: {
      Movement: "IWC 59220 Hand-wound, 8 days",
      Case: "39mm 18k 5N gold",
      "Water Resistance": "30m",
      Strap: "Alligator leather, Santoni",
      Warranty: "8-Year International",
    },
    image: img(36475262, "pexels-photo-36475262.jpeg"),
    imageAlt: "Gold watch displayed on textured fabric",
    stock: 2,
  },
  {
    slug: "seiko-prospex-diver",
    name: "Prospex 'Samurai' Diver",
    brand: "Seiko",
    category: "men",
    collection: "sport",
    priceCents: 43500,
    originalPriceCents: 52500,
    rating: "4.8",
    reviewCount: 512,
    badge: "Best Seller",
    description:
      "The professional's choice since 1965. 200m water resistance, Seiko's 4R35 automatic calibre and LumiBrite markers that burn all night — a tool watch with a cult following.",
    specs: {
      Movement: "4R35 Automatic, 41h reserve",
      Case: "43.8mm Stainless steel",
      "Water Resistance": "200m",
      Bracelet: "Steel with secure lock",
      Warranty: "3-Year International",
    },
    image: img(36426759, "pexels-photo-36426759.jpeg"),
    imageAlt: "Seiko diver's watch on dark fabric",
    stock: 14,
  },
  {
    slug: "orient-kamasu",
    name: "Kamasu Automatic",
    brand: "Orient",
    category: "men",
    collection: "sport",
    priceCents: 28000,
    originalPriceCents: null,
    rating: "4.6",
    reviewCount: 231,
    badge: null,
    description:
      "The barracuda of value. Sapphire crystal, in-house F6922 movement with hacking and hand-winding, and 200m of water resistance — everything you need, nothing you don't.",
    specs: {
      Movement: "F6922 Automatic, in-house",
      Case: "41.8mm Stainless steel",
      "Water Resistance": "200m",
      Bracelet: "Oyster steel",
      Warranty: "2-Year International",
    },
    image: img(39620185, "pexels-photo-39620185.jpeg"),
    imageAlt: "Orient diver watch with steel bracelet",
    stock: 20,
  },
  {
    slug: "tissot-prx-powermatic-80",
    name: "PRX Powermatic 80",
    brand: "Tissot",
    category: "men",
    collection: "classic",
    priceCents: 72500,
    originalPriceCents: null,
    rating: "4.8",
    reviewCount: 264,
    badge: "Best Seller",
    description:
      "1978 reborn. The integrated bracelet, waffle-texture dial and Powermatic 80 movement with 80 hours of reserve make the PRX the most compelling retro-sport watch of the decade.",
    specs: {
      Movement: "Powermatic 80, 80h reserve",
      Case: "40mm Stainless steel",
      "Water Resistance": "100m",
      Bracelet: "Integrated steel",
      Warranty: "2-Year International",
    },
    image: img(33511755, "pexels-photo-33511755.jpeg"),
    imageAlt: "Silver watch illuminated by studio light",
    stock: 11,
  },
  {
    slug: "casio-edifice-slim",
    name: "Edifice Chronograph Slim",
    brand: "Casio",
    category: "men",
    collection: "sport",
    priceCents: 13500,
    originalPriceCents: 17000,
    rating: "4.7",
    reviewCount: 830,
    badge: "-21%",
    description:
      "Motorsport logic, streetwear attitude. Carbon-fibre dial accents, a slim 8.9mm profile and 5-year battery — the Edifice is the everyday chronograph that never asks twice.",
    specs: {
      Movement: "Quartz chronograph",
      Case: "42mm Stainless steel, 8.9mm",
      "Water Resistance": "100m",
      Strap: "Resin & steel hybrid",
      Warranty: "2-Year International",
    },
    image: img(26626530, "pexels-photo-26626530.jpeg"),
    imageAlt: "Wristwatch resting on a dark wooden table",
    stock: 25,
  },
  {
    slug: "citizen-promaster-diver",
    name: "Promaster Eco-Drive Diver",
    brand: "Citizen",
    category: "men",
    collection: "sport",
    priceCents: 32000,
    originalPriceCents: null,
    rating: "4.7",
    reviewCount: 402,
    badge: null,
    description:
      "Powered by light itself. Citizen's Eco-Drive converts any light source into months of reserve — ISO-certified to 200m, with the unmistakable red-blue Pepsi bezel of a true ISO professional.",
    specs: {
      Movement: "Eco-Drive E168, solar",
      Case: "44mm Stainless steel",
      "Water Resistance": "200m ISO certified",
      Strap: "Polyurethane diver strap",
      Warranty: "5-Year International",
    },
    image: img(33684303, "pexels-photo-33684303.jpeg"),
    imageAlt: "Silver dive watch with black dial and red-blue bezel",
    stock: 16,
  },
  {
    slug: "hamilton-khaki-field",
    name: "Khaki Field Mechanical",
    brand: "Hamilton",
    category: "men",
    collection: "classic",
    priceCents: 59500,
    originalPriceCents: null,
    rating: "4.7",
    reviewCount: 289,
    badge: null,
    description:
      "The soldier's watch, perfected. Hand-wound H-50 calibre with 80-hour reserve, vintage sand-coloured luminous numerals and a no-nonsense 38mm case that wears like history.",
    specs: {
      Movement: "H-50 Hand-wound, 80h reserve",
      Case: "38mm Stainless steel",
      "Water Resistance": "50m",
      Strap: "Green textile NATO",
      Warranty: "2-Year International",
    },
    image: img(36174613, "pexels-photo-36174613.jpeg"),
    imageAlt: "Classic watch displayed on a geometric mat",
    stock: 13,
  },
  // ---- WOMEN ----
  {
    slug: "cartier-ballon-bleu",
    name: "Ballon Bleu 33mm",
    brand: "Cartier",
    category: "women",
    collection: "luxury",
    priceCents: 620000,
    originalPriceCents: null,
    rating: "5.0",
    reviewCount: 64,
    badge: "New",
    description:
      "A floating sapphire cabochon, crown nestled inside a perfect curve. The Ballon Bleu is pure Cartier: sculptural, jewellery-coded and instantly iconic on any wrist.",
    specs: {
      Movement: "Automatic mechanical",
      Case: "33mm Stainless steel",
      "Water Resistance": "30m",
      Bracelet: "Polished steel links",
      Warranty: "8-Year International",
    },
    image: img(16562985, "pexels-photo-16562985.jpeg"),
    imageAlt: "Elegant wristwatch with pearls on dark background",
    stock: 4,
  },
  {
    slug: "michael-kors-parker",
    name: "Parker Rose-Gold Glitz",
    brand: "Michael Kors",
    category: "women",
    collection: "classic",
    priceCents: 19500,
    originalPriceCents: 25000,
    rating: "4.6",
    reviewCount: 389,
    badge: "-22%",
    description:
      "Jet-set glamour in rose gold. A pavé crystal bezel, sunray blush dial and slim bracelet — the Parker turns every glance at the time into a small occasion.",
    specs: {
      Movement: "Quartz three-hand",
      Case: "39mm Rose gold-tone",
      "Water Resistance": "50m",
      Bracelet: "Rose gold-tone steel",
      Warranty: "2-Year International",
    },
    image: img(14410757, "pexels-photo-14410757.jpeg"),
    imageAlt: "Rose gold wristwatch on a sleek dark surface",
    stock: 18,
  },
  {
    slug: "daniel-wellington-petite",
    name: "Petite Melrose 28mm",
    brand: "Daniel Wellington",
    category: "women",
    collection: "classic",
    priceCents: 19900,
    originalPriceCents: null,
    rating: "4.5",
    reviewCount: 276,
    badge: null,
    description:
      "Scandinavian minimalism at 6.7mm thin. An eggshell-white dial on rose-gold mesh — the Petite is the quiet confidence of Stockholm design traditions.",
    specs: {
      Movement: "Japanese quartz",
      Case: "28mm Rose gold-tone",
      "Water Resistance": "30m",
      Strap: "Mesh, quick-release",
      Warranty: "2-Year International",
    },
    image: img(22032443, "pexels-photo-22032443.jpeg"),
    imageAlt: "Classic Daniel Wellington wristwatch with leather strap",
    stock: 22,
  },
  {
    slug: "olivia-burton-rose-gold-mesh",
    name: "Lucky Bee Rose Gold",
    brand: "Olivia Burton",
    category: "women",
    collection: "classic",
    priceCents: 14500,
    originalPriceCents: null,
    rating: "4.6",
    reviewCount: 198,
    badge: null,
    description:
      "London whimsy in fine mesh. A 3D sculpted bee motif rests on a blush sunray dial — playful, poetic, and unmistakably British.",
    specs: {
      Movement: "Japanese quartz",
      Case: "30mm Rose gold-tone",
      "Water Resistance": "10m",
      Strap: "Rose gold mesh",
      Warranty: "2-Year International",
    },
    image: img(35080771, "pexels-photo-35080771.jpeg"),
    imageAlt: "Rose gold watch on a white box with soft shadows",
    stock: 15,
  },
  {
    slug: "michael-kors-darci",
    name: "Darci Pearl Pavé",
    brand: "Michael Kors",
    category: "women",
    collection: "luxury",
    priceCents: 24000,
    originalPriceCents: 28900,
    rating: "4.5",
    reviewCount: 154,
    badge: "-17%",
    description:
      "Cocktail-hour shine. Mother-of-pearl beneath a ring of hand-set pavé crystals, finished in polished gold-tone steel — jewellery that happens to keep perfect time.",
    specs: {
      Movement: "Quartz three-hand",
      Case: "33mm Gold-tone",
      "Water Resistance": "50m",
      Bracelet: "Gold-tone steel",
      Warranty: "2-Year International",
    },
    image: img(34833638, "pexels-photo-34833638.jpeg"),
    imageAlt: "Pearl bracelet and watch flat lay with rose petals",
    stock: 12,
  },
  {
    slug: "fossil-jacqueline",
    name: "Jacqueline Three-Hand",
    brand: "Fossil",
    category: "women",
    collection: "classic",
    priceCents: 12900,
    originalPriceCents: 15900,
    rating: "4.4",
    reviewCount: 342,
    badge: "-19%",
    description:
      "Mid-century charm for modern days. Roman numerals, a sculpted 36mm case and supple leather strap — the Jacqueline is Fossil's love letter to classic dress watches.",
    specs: {
      Movement: "Quartz three-hand",
      Case: "36mm Stainless steel",
      "Water Resistance": "30m",
      Strap: "Tan leather",
      Warranty: "2-Year Limited",
    },
    image: img(5212419, "pexels-photo-5212419.jpeg"),
    imageAlt: "Stylish wristwatch next to flowers",
    stock: 19,
  },
  // ---- SMART ----
  {
    slug: "apple-watch-series-10",
    name: "Watch Series 10 GPS 46mm",
    brand: "Apple",
    category: "smart",
    collection: "smart",
    priceCents: 42900,
    originalPriceCents: null,
    rating: "4.8",
    reviewCount: 1240,
    badge: "New",
    description:
      "The thinnest, biggest-screened Apple Watch ever. Sleep apnoea alerts, depth gauge for snorkeling and all-day battery — your health, now with a sapphire lens.",
    specs: {
      Display: "1.96\" LTPO OLED, 2000 nits",
      Case: "46mm Aluminum, Sapphire",
      Battery: "Up to 18 hours",
      Sensors: "ECG, SpO2, Temp, Depth",
      Warranty: "1-Year Apple",
    },
    image: img(9142237, "pexels-photo-9142237.jpeg"),
    imageAlt: "Sleek smartwatch with monochrome digital design",
    stock: 30,
  },
  {
    slug: "samsung-galaxy-watch-7",
    name: "Galaxy Watch 7 44mm",
    brand: "Samsung",
    category: "smart",
    collection: "smart",
    priceCents: 32900,
    originalPriceCents: 43000,
    rating: "4.7",
    reviewCount: 980,
    badge: "-23%",
    description:
      "Galaxy AI on your wrist. Advanced sleep coaching, body composition scanning and a 3nm processor wrapped in sapphire glass and armor aluminum.",
    specs: {
      Display: "1.5\" Super AMOLED, Sapphire",
      Case: "44mm Armor Aluminum",
      Battery: "Up to 40 hours",
      Sensors: "BIA, HR, SpO2, GPS",
      Warranty: "1-Year Samsung",
    },
    image: img(13007642, "pexels-photo-13007642.jpeg"),
    imageAlt: "Modern smartwatch with a white strap",
    stock: 26,
  },
  {
    slug: "garmin-venu-3",
    name: "Venu 3 AMOLED",
    brand: "Garmin",
    category: "smart",
    collection: "smart",
    priceCents: 44900,
    originalPriceCents: null,
    rating: "4.6",
    reviewCount: 455,
    badge: null,
    description:
      "Two weeks of battery, zero compromises. Body Battery energy monitoring, animated workouts and a wheelchair mode — health science with a marathoner's soul.",
    specs: {
      Display: "1.4\" AMOLED, Gorilla Glass 3",
      Case: "45mm Fiber polymer",
      Battery: "Up to 14 days",
      Sports: "30+ built-in profiles",
      Warranty: "1-Year Garmin",
    },
    image: img(31406900, "pexels-photo-31406900.jpeg"),
    imageAlt: "Minimalist white smartwatch on light background",
    stock: 17,
  },
  {
    slug: "fitbit-sense-2",
    name: "Sense 2 Health Watch",
    brand: "Fitbit",
    category: "smart",
    collection: "smart",
    priceCents: 24900,
    originalPriceCents: 29900,
    rating: "4.3",
    reviewCount: 612,
    badge: "-17%",
    description:
      "Stress science, simplified. Continuous EDA sensing, ECG and six-plus days of battery in a featherweight case that disappears on the wrist.",
    specs: {
      Display: "1.58\" AMOLED",
      Case: "40.5mm Aluminum",
      Battery: "6+ days",
      Sensors: "cEDA, ECG, SpO2, HRV",
      Warranty: "1-Year Fitbit",
    },
    image: img(14979022, "pexels-photo-14979022.jpeg"),
    imageAlt: "Smartwatch paired with a smartphone",
    stock: 21,
  },
  // ---- ACCESSORIES ----
  {
    slug: "horween-leather-strap-tan",
    name: "Horween Leather Strap — Tan",
    brand: "WatchShop Atelier",
    category: "accessories",
    collection: "classic",
    priceCents: 8900,
    originalPriceCents: null,
    rating: "4.9",
    reviewCount: 88,
    badge: "Atelier",
    description:
      "Cut, stitched and burnished by hand from genuine Horween Chromexcel. Quick-release spring bars swap your strap in seconds — patina guaranteed for decades.",
    specs: {
      Material: "Horween Chromexcel leather",
      Widths: "18 / 20 / 22mm",
      Hardware: "Brushed steel buckle",
      Handmade: "Yes — saddle stitched",
      Origin: "Made in USA",
    },
    image: img(4061280, "pexels-photo-4061280.jpeg"),
    imageAlt: "Wristwatch with a brown leather strap close-up",
    stock: 40,
  },
  {
    slug: "saffiano-watch-roll-noir",
    name: "Saffiano Watch Roll — Noir",
    brand: "WatchShop Atelier",
    category: "accessories",
    collection: "luxury",
    priceCents: 12000,
    originalPriceCents: null,
    rating: "4.8",
    reviewCount: 54,
    badge: "Atelier",
    description:
      "Three watches, zero scratches. Cross-grained saffiano leather outside, alcantara cushions inside — your collection's first-class cabin.",
    specs: {
      Material: "Saffiano leather / Alcantara",
      Capacity: "3 timepieces",
      Closure: "Hidden magnetic snap",
      Dimensions: "24 × 9 × 8 cm",
      Handmade: "Yes",
    },
    image: img(22032438, "pexels-photo-22032438.jpeg"),
    imageAlt: "Black leather wristwatch on black silk fabric",
    stock: 25,
  },
];

const quotes = [
  {
    name: "James Carter",
    role: "Verified Buyer — Rolex Datejust",
    quote:
      "Impeccable quality and fast delivery! My watch arrived in a beautiful box, well-protected. Absolutely satisfied — Highly recommended.",
    rating: 5,
    initials: "JC",
  },
  {
    name: "Emily Roberts",
    role: "Verified Buyer — Omega Seamaster",
    quote:
      "Authenticity guaranteed and service that felt personal. The serials checked out instantly and they even sized the bracelet before shipping.",
    rating: 5,
    initials: "ER",
  },
  {
    name: "Ahmed Khan",
    role: "Verified Buyer — Seiko Prospex",
    quote:
      "Great service and a smooth shopping experience. The watch was fairly priced, shipped the same day, and the tracking was flawless throughout.",
    rating: 5,
    initials: "AK",
  },
  {
    name: "Sofia Laurent",
    role: "Verified Buyer — Cartier Ballon Bleu",
    quote:
      "I've bought from three online dealers before — none offered this level of packaging, certification and after-care. WatchShop has a customer for life.",
    rating: 5,
    initials: "SL",
  },
  {
    name: "Marcus Chen",
    role: "Verified Buyer — Grand Seiko",
    quote:
      "The Snowfall dial is even more stunning in person. Their concierge answered every nerdy movement question I had. Ten out of ten.",
    rating: 5,
    initials: "MC",
  },
];

async function main() {
  const { db } = await import("../src/db");
  const { products, testimonials } = await import("../src/db/schema");

  console.log("Seeding products…");
  await db.delete(products);
  await db.insert(products).values(catalog);
  console.log(`Inserted ${catalog.length} products.`);

  console.log("Seeding testimonials…");
  await db.delete(testimonials);
  await db.insert(testimonials).values(quotes);
  console.log(`Inserted ${quotes.length} testimonials.`);

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
