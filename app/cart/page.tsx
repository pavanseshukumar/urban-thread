"use client";

import Image from "next/image";
import { useCart } from "@/src/store/useCart";
import Button from "@/src/components/ui/Button";
import EmptyState from "@/src/components/ui/EmptyState";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main>
        <EmptyState
          icon="&#128722;"
          title="Your cart is empty"
          description="Explore our collection and add something you love."
          actionLabel="Continue Shopping"
          actionHref="/products"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
          Review
        </p>
        <h1 className="mt-2 text-[26px] font-normal tracking-tight text-foreground sm:text-[32px]">
          Your Cart
        </h1>
      </div>

      <div className="mt-12 divide-y divide-subtle/60">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}-${item.color}`}
            className="flex gap-6 py-8"
          >
            <div className="relative h-[120px] w-[85px] shrink-0 overflow-hidden bg-faint">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="85px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between py-0.5">
              <div>
                <h3 className="text-[13px] text-foreground">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-[11px] text-dimmed">
                  {item.size} &middot; {item.color}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        item.quantity - 1,
                      )
                    }
                    disabled={item.quantity <= 1}
                    className={`flex h-7 w-7 items-center justify-center border text-[12px] transition-colors duration-200 ${
                      item.quantity <= 1
                        ? "cursor-not-allowed border-subtle text-dimmed/40"
                        : "border-subtle text-muted hover:border-foreground hover:text-foreground"
                    }`}
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="w-5 text-center text-[13px] tabular-nums text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        item.quantity + 1,
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center border border-subtle text-[12px] text-muted transition-colors duration-200 hover:border-foreground hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="ml-3 text-[13px] tabular-nums text-muted">
                    ${item.price * item.quantity}
                  </span>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id, item.size, item.color)
                  }
                  className="text-[11px] text-dimmed transition-colors duration-200 hover:text-foreground"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-subtle/60 pt-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
            Total
          </p>
          <p className="text-[18px] font-medium tabular-nums text-foreground">
            ${getTotalPrice()}
          </p>
        </div>

        <Button href="/checkout" size="lg" className="mt-8 w-full">
          Proceed to Checkout
        </Button>
      </div>
    </main>
  );
}
