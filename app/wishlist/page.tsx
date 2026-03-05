"use client";

import { useWishlist } from "@/src/store/useWishlist";
import ProductCard from "@/src/components/product/ProductCard";
import Button from "@/src/components/ui/Button";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
          Saved
        </p>
        <h1 className="mt-2 text-[26px] font-normal tracking-tight text-foreground sm:text-[32px]">
          Your Wishlist
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-subtle"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="mt-6 text-[15px] font-medium text-foreground">
            Your wishlist is empty
          </p>
          <p className="mt-2 text-[13px] text-dimmed">
            Save pieces you love to revisit them later.
          </p>
          <a href="/products" className="mt-8">
            <Button variant="secondary" size="lg">
              Discover Products
            </Button>
          </a>
        </div>
      ) : (
        <>
          <p className="mt-6 text-[11px] uppercase tracking-[0.15em] text-dimmed">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
