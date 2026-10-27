export const SITE_NAME = "WatchShop";
export const SITE_DOMAIN = "WatchShop.com";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Men's Watches", href: "/shop?category=men" },
  { label: "Women's Watches", href: "/shop?category=women" },
  { label: "Smart Watches", href: "/shop?category=smart" },
  { label: "Brands", href: "/shop#brands" },
  { label: "Accessories", href: "/shop?category=accessories" },
  { label: "Deals", href: "/shop?deals=true", accent: true },
  { label: "Contact", href: "/#contact" },
] as const;

export const CATEGORY_META: Record<
  string,
  { label: string; tagline: string; image: string }
> = {
  men: {
    label: "Men's Watches",
    tagline: "Precision instruments",
    image:
      "https://images.pexels.com/photos/5350693/pexels-photo-5350693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  women: {
    label: "Women's Watches",
    tagline: "Elegance, refined",
    image:
      "https://images.pexels.com/photos/9945473/pexels-photo-9945473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  smart: {
    label: "Smart Watches",
    tagline: "Connected living",
    image:
      "https://images.pexels.com/photos/267391/pexels-photo-267391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  accessories: {
    label: "Watch Accessories",
    tagline: "Straps, rolls & winders",
    image:
      "https://images.pexels.com/photos/4061280/pexels-photo-4061280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  luxury: {
    label: "Luxury Brands",
    tagline: "Haute horlogerie",
    image:
      "https://images.pexels.com/photos/37383653/pexels-photo-37383653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
};

export const COLLECTION_META: Record<
  string,
  { label: string; tagline: string; image: string }
> = {
  classic: {
    label: "Classic",
    tagline: "Timeless elegance",
    image:
      "https://images.pexels.com/photos/15776434/pexels-photo-15776434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  sport: {
    label: "Sport",
    tagline: "Built for adventure",
    image:
      "https://images.pexels.com/photos/36426758/pexels-photo-36426758.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  luxury: {
    label: "Luxury",
    tagline: "For the elite",
    image:
      "https://images.pexels.com/photos/19810831/pexels-photo-19810831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  smart: {
    label: "Smart",
    tagline: "Stay connected",
    image:
      "https://images.pexels.com/photos/31406895/pexels-photo-31406895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
};

export const MARQUEE_BRANDS = [
  "Rolex",
  "Omega",
  "Seiko",
  "Tissot",
  "Casio",
  "Michael Kors",
  "Citizen",
  "Cartier",
  "Tudor",
  "Longines",
  "TAG Heuer",
  "Grand Seiko",
] as const;
