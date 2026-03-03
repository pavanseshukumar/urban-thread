"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/src/store/useCart";
import Button from "@/src/components/ui/Button";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/20 transition-opacity duration-300 dark:bg-black/50 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-surface transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-foreground">
            Cart
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-dimmed transition-colors duration-300 hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mx-8 border-t border-subtle/60" />

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="text-3xl opacity-40" role="img" aria-hidden="true">
              &#128717;
            </span>
            <p className="mt-4 text-[13px] font-medium text-foreground">
              Your cart is empty
            </p>
            <p className="mt-1.5 text-[12px] text-dimmed">
              Add something you love.
            </p>
            <Button href="/products" onClick={onClose} className="mt-8">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-8">
              <div className="divide-y divide-subtle/60">
                {items.map((item, i) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-5 py-6 animate-stagger-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="relative h-[100px] w-[72px] shrink-0 overflow-hidden bg-faint">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between py-0.5">
                      <div>
                        <h3 className="text-[13px] text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-dimmed">
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
                            className={`flex h-6 w-6 items-center justify-center border text-[11px] transition-colors duration-200 ${
                              item.quantity <= 1
                                ? "cursor-not-allowed border-subtle text-dimmed/40"
                                : "border-subtle text-muted hover:border-foreground hover:text-foreground"
                            }`}
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="w-4 text-center text-[12px] tabular-nums text-foreground">
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
                            className="flex h-6 w-6 items-center justify-center border border-subtle text-[11px] text-muted transition-colors duration-200 hover:border-foreground hover:text-foreground"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-[13px] tabular-nums text-foreground">
                            ${item.price * item.quantity}
                          </span>
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
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-subtle/60 px-8 py-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
                  Total
                </p>
                <p className="text-[15px] font-medium tabular-nums text-foreground">
                  ${getTotalPrice()}
                </p>
              </div>
              <Button
                href="/checkout"
                onClick={onClose}
                size="lg"
                className="mt-5 w-full"
              >
                Checkout
              </Button>
              <a
                href="/cart"
                onClick={onClose}
                className="mt-4 block text-center text-[11px] tracking-wide text-dimmed transition-colors duration-300 hover:text-foreground"
              >
                View full cart
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
