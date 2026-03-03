import Image from "next/image";
import ProductCard from "@/src/components/product/ProductCard";
import Button from "@/src/components/ui/Button";
import Reveal from "@/src/components/ui/Reveal";
import HeroSection from "./HeroSection";
import { products } from "@/src/data/products";

const featuredProducts = products.filter((p) => p.featured);

const collections = [
  {
    title: "Men",
    href: "/products?category=men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80",
  },
  {
    title: "Women",
    href: "/products?category=women",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80",
  },
  {
    title: "Essentials",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Curated Collections */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-dimmed">
              Shop by category
            </p>
            <h2 className="mt-3 text-[24px] font-normal tracking-tight text-foreground sm:text-[28px]">
              Curated Collections
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {collections.map((col, i) => (
            <Reveal key={col.title} delay={i * 120}>
              <a
                href={col.href}
                className="group relative block aspect-3/4 overflow-hidden"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-[13px] uppercase tracking-[0.2em] text-white/90">
                    {col.title}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-subtle/50" />
      </div>

      {/* Editorial Split */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-3/4 w-full overflow-hidden bg-faint">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80"
                alt="Urban Thread editorial lookbook"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="max-w-lg lg:py-12">
            <Reveal delay={100}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-dimmed">
                Our Philosophy
              </p>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="mt-4 text-[28px] font-normal leading-[1.2] tracking-tight text-foreground sm:text-[36px]">
                Designed to Be
                <br />
                Lived In
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 text-[14px] leading-[1.9] text-muted">
                We believe clothing should feel invisible — pieces so well-made
                and considered that you forget you&apos;re wearing them. Every
                fabric, stitch, and silhouette is chosen with intention. No logos,
                no noise. Just quiet confidence.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a
                href="/products"
                className="mt-8 inline-block text-[12px] uppercase tracking-[0.2em] text-foreground underline underline-offset-4 decoration-subtle transition-colors duration-300 hover:decoration-foreground"
              >
                Discover the Story
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-subtle/50" />
      </div>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <Reveal>
          <div className="flex items-end justify-between border-b border-subtle/60 pb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
                Curated for you
              </p>
              <h2 className="mt-2 text-[22px] font-normal tracking-tight text-foreground sm:text-[26px]">
                Featured Pieces
              </h2>
            </div>
            <Button href="/products" variant="ghost" size="sm">
              View all
            </Button>
          </div>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <Reveal key={product.id} delay={i * 100}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brand Statement */}
      <section className="bg-faint px-6 py-36 transition-colors duration-300">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[clamp(1.25rem,3.5vw,2rem)] font-light leading-normal tracking-tight text-foreground">
              &ldquo;We don&apos;t chase trends. We make clothes
              you&apos;ll reach for every morning — pieces that get
              better the more you wear them.&rdquo;
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-dimmed">
              Urban Thread
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
