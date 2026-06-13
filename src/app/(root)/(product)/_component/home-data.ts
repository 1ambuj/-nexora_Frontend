const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * ─── USE YOUR OWN IMAGES ───────────────────────────────────────────
 * 1. Add photos to:  public/images/hero/
 *    - hero-1.jpg  (main banner)
 *    - hero-2.jpg
 *    - hero-3.jpg
 *    - hero-4.jpg
 *
 * 2. Set USE_LOCAL_HERO_IMAGES = true below
 *
 * Recommended size: 1920×1080 or 1600×900 (landscape), JPG/WebP, under 500KB
 * ─────────────────────────────────────────────────────────────────
 */
export const USE_LOCAL_HERO_IMAGES = false;

const localHero = (n: number) => `/images/hero/hero-${n}.jpg`;

const heroImage = (localIndex: number, unsplashId: string) =>
  USE_LOCAL_HERO_IMAGES ? localHero(localIndex) : img(unsplashId);

export const heroSlides = [
  {
    image: heroImage(1, "photo-1515372039744-b8f02a3ae446"),
    objectPosition: "center 20%",
    tag: "Spring / Summer",
    title: "The Art of Dressing",
    subtitle:
      "Editorial silhouettes. Runway-inspired cuts. Crafted for the modern icon.",
    cta: "Shop Collection",
    redirect: "/search?collection=trending",
  },
  {
    image: heroImage(2, "photo-1524504388940-b1c1722653e1"),
    objectPosition: "center 15%",
    tag: "Haute Casual",
    title: "Quiet Luxury",
    subtitle:
      "Understated elegance in every thread — where minimal meets magnificent.",
    cta: "Explore Essentials",
    redirect: "/search?category=t-shirt",
  },
  {
    image: heroImage(3, "photo-1496747611176-843222e1e57c"),
    objectPosition: "center 25%",
    tag: "Limited Edition",
    title: "Refined Silhouettes",
    subtitle:
      "Statement pieces designed for those who define style — not follow it.",
    cta: "View Lookbook",
    redirect: "/search?category=hoodies",
  },
  {
    image: heroImage(4, "photo-1539109136881-3be0616acf4b"),
    objectPosition: "center 30%",
    tag: "New Arrivals",
    title: "Beyond Ordinary",
    subtitle:
      "Premium fabrics. Impeccable fit. The Nexora standard of excellence.",
    cta: "Discover Now",
    redirect: "/search?collection=latest",
  },
];

export const marqueeItems = [
  "Carbon-neutral shipping",
  "AI-assisted sizing",
  "48h express delivery",
  "Lifetime quality guarantee",
  "Recycled premium cotton",
];

export const trustFeatures = [
  { label: "Free shipping", desc: "Orders over ₹999" },
  { label: "Easy returns", desc: "30-day window" },
  { label: "Secure checkout", desc: "Encrypted payments" },
  { label: "Premium quality", desc: "Built to last" },
];

export const quickShopLinks = [
  { label: "Hoodies", href: "/search?category=hoodies" },
  { label: "Tees", href: "/search?category=t-shirt" },
  { label: "Joggers", href: "/search?category=joggers" },
  { label: "New in", href: "/search?collection=latest" },
  { label: "Best sellers", href: "/search?collection=best-sellers" },
];

export const collectionBento = [
  {
    title: "Oversized Tees",
    subtitle: "Volume meets structure",
    image: img("photo-1487412720507-e7ab37603c6f", 1000),
    redirect: "/search?category=oversized-tees",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Hoodies",
    subtitle: "Thermal core layers",
    image: img("photo-1544005313-94ddf0286df2", 800),
    redirect: "/search?category=hoodies",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Joggers",
    subtitle: "Motion engineered",
    image: img("photo-1506629082955-511b1aa562c8", 700),
    redirect: "/search?category=joggers",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Cargo",
    subtitle: "Utility redefined",
    image: img("photo-1594938298603-c8148c4dae35", 900),
    redirect: "/search?category=cargo-pants",
    span: "md:col-span-2 md:row-span-1",
  },
];

export const featuredEditorial = {
  image: img("photo-1539109136881-3be0616acf4b", 1200),
  tag: "Editorial 08",
  title: "Where luxury meets everyday.",
  body: "Each piece is a statement — designed for those who appreciate craftsmanship, fit, and timeless appeal.",
  cta: "Read the story",
  redirect: "/search?collection=latest",
};

export const ctaBannerImage = img("photo-1529626455594-4ff0802cfb7e", 1400);

export const brandStats = [
  { value: "2.4M+", label: "Pieces crafted" },
  { value: "98%", label: "Fit satisfaction" },
  { value: "40+", label: "Cities shipped" },
  { value: "0", label: "Compromise" },
];

export const fallbackCategories = [
  {
    name: "Hoodies",
    slug: "hoodies",
    icon: img("photo-1556821840-3a63f95609a7", 500),
  },
  {
    name: "T-Shirts",
    slug: "t-shirt",
    icon: img("photo-1521572163474-6864f9cf17ab", 500),
  },
  {
    name: "Joggers",
    slug: "joggers",
    icon: img("photo-1506629082955-511b1aa562c8", 500),
  },
  {
    name: "Cargo",
    slug: "cargo-pants",
    icon: img("photo-1594938298603-c8148c4dae35", 500),
  },
];

export const fallbackProducts = [
  {
    name: "Aero Oversized Tee — Slate",
    price: 1499,
    discount: 35,
    imgLink: img("photo-1583743814966-8936f5b7be1a", 600),
    slug: "aero-oversized-tee",
    batchId: "1",
    code: "NX001",
  },
  {
    name: "Nova Fleece Hoodie — Onyx",
    price: 2999,
    discount: 40,
    imgLink: img("photo-1556821840-3a63f95609a7", 600),
    slug: "nova-fleece-hoodie",
    batchId: "1",
    code: "NX002",
  },
  {
    name: "Pulse Travel Jogger — Graphite",
    price: 2499,
    discount: 30,
    imgLink: img("photo-1624378439575-d8705ad7ae80", 600),
    slug: "pulse-travel-jogger",
    batchId: "1",
    code: "NX003",
  },
  {
    name: "Edge Cargo Pant — Stone",
    price: 2799,
    discount: 25,
    imgLink: img("photo-1594938298603-c8148c4dae35", 600),
    slug: "edge-cargo-pant",
    batchId: "1",
    code: "NX004",
  },
];
