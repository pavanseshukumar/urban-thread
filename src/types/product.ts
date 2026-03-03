export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: "men" | "women";
  sizes: string[];
  colors: string[];
  description: string;
  featured: boolean;
};
