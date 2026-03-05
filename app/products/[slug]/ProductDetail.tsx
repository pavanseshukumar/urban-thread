"use client";

import { useState } from "react";
import { Product } from "@/src/types/product";
import { useCart } from "@/src/store/useCart";
import Button from "@/src/components/ui/Button";
import ImageGallery from "@/src/components/product/ImageGallery";
import WishlistButton from "@/src/components/product/WishlistButton";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const canAdd = selectedSize && selectedColor;

  function handleAddToCart() {
    if (!canAdd) return;
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <ImageGallery
          images={product.images}
          alt={product.name}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        <div className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
            {product.category}&apos;s collection
          </p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="text-[28px] font-normal tracking-tight text-foreground sm:text-[34px]">
              {product.name}
            </h1>
            <WishlistButton product={product} size={22} className="mt-2 shrink-0" />
          </div>
          <p className="mt-4 text-[18px] font-light tabular-nums text-muted">
            ${product.price}
          </p>
          <p className="mt-8 text-[14px] leading-[1.8] text-muted">
            {product.description}
          </p>

          <div className="mt-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
              Size
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-5 py-2.5 text-[12px] tracking-wide transition-all duration-300 ${
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-subtle text-muted hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
              Color
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-5 py-2.5 text-[12px] tracking-wide transition-all duration-300 ${
                    selectedColor === color
                      ? "border-foreground bg-foreground text-background"
                      : "border-subtle text-muted hover:border-foreground"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!canAdd}
            size="lg"
            className="mt-12 w-full"
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </Button>

          {!canAdd && (
            <p className="mt-4 text-center text-[11px] tracking-wide text-dimmed">
              Select a size and color to continue
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
