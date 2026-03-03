import Image from "next/image";
import { products } from "@/src/data/products";

const featuredProduct = products.find((p) => p.featured)!;

const columns = [
  {
    title: "Men",
    links: [
      { label: "New Arrivals", href: "/products?category=men" },
      { label: "Shirts", href: "/products?category=men" },
      { label: "Jackets", href: "/products?category=men" },
      { label: "Essentials", href: "/products?category=men" },
    ],
  },
  {
    title: "Women",
    links: [
      { label: "New Arrivals", href: "/products?category=women" },
      { label: "Dresses", href: "/products?category=women" },
      { label: "Knitwear", href: "/products?category=women" },
      { label: "Essentials", href: "/products?category=women" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Summer Edit", href: "/products" },
      { label: "Minimal Basics", href: "/products" },
      { label: "Evening Wear", href: "/products" },
    ],
  },
];

type MegaMenuProps = {
  visible: boolean;
};

export default function MegaMenu({ visible }: MegaMenuProps) {
  return (
    <div
      className={`absolute left-0 top-full w-full border-t border-subtle/60 bg-surface shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-250 ease-out dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-10 px-6 py-12">
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
              {col.title}
            </p>
            <ul className="mt-5 space-y-3.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-foreground/80 transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            Featured
          </p>
          <a
            href={`/products/${featuredProduct.slug}`}
            className="group mt-5 block"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden bg-faint">
              <Image
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                fill
                sizes="220px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-3 text-[13px] text-foreground transition-colors duration-200 group-hover:text-foreground/70">
              {featuredProduct.name}
            </p>
            <p className="mt-0.5 text-[12px] tabular-nums text-muted">
              ${featuredProduct.price}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export { columns };
