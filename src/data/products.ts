import { Product } from "@/src/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Linen Shirt",
    slug: "oversized-linen-shirt",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1598032895455-1e3c1a1c0a07?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Beige", "Light Blue"],
    description:
      "A relaxed-fit linen shirt crafted for warm-weather ease. Breathable fabric with a soft hand feel.",
    featured: true,
  },
  {
    id: "2",
    name: "Tailored Wool Trousers",
    slug: "tailored-wool-trousers",
    price: 145,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    category: "men",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Charcoal", "Navy", "Tan"],
    description:
      "Slim-cut wool trousers with a pressed crease. Perfect for office or evening wear.",
    featured: true,
  },
  {
    id: "3",
    name: "Ribbed Knit Midi Dress",
    slug: "ribbed-knit-midi-dress",
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Olive", "Cream"],
    description:
      "A body-skimming ribbed knit dress that transitions effortlessly from day to night.",
    featured: true,
  },
  {
    id: "4",
    name: "Cotton Crew Neck Tee",
    slug: "cotton-crew-neck-tee",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
    ],
    category: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey"],
    description:
      "Heavyweight organic cotton tee with a classic crew neck. A wardrobe essential.",
    featured: false,
  },
  {
    id: "5",
    name: "Silk Camisole Top",
    slug: "silk-camisole-top",
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Black", "Dusty Rose"],
    description:
      "Delicate silk camisole with adjustable straps. Layer it or wear it on its own.",
    featured: true,
  },
  {
    id: "6",
    name: "Relaxed Denim Jacket",
    slug: "relaxed-denim-jacket",
    price: 135,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80",
      "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Wash", "Indigo"],
    description:
      "A timeless denim jacket with a relaxed silhouette. Stonewashed for a lived-in feel.",
    featured: false,
  },
  {
    id: "7",
    name: "Merino Wool Sweater",
    slug: "merino-wool-sweater",
    price: 110,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      "https://images.unsplash.com/photo-1614975059251-992f11792571?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cda3a64?w=800&q=80",
    ],
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Charcoal", "Forest Green"],
    description:
      "Fine-gauge merino wool sweater with a clean silhouette. Lightweight warmth for layering.",
    featured: false,
  },
  {
    id: "8",
    name: "Wide Leg Linen Pants",
    slug: "wide-leg-linen-pants",
    price: 98,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sand", "White", "Black"],
    description:
      "Flowy wide-leg linen pants with an elasticated waist. Effortless summer style.",
    featured: true,
  },
];
