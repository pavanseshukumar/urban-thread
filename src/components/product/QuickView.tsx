"use client";

import { useState } from "react";
import { Product } from "@/src/types/product";
import { useCart } from "@/src/store/useCart";
import Button from "@/src/components/ui/Button";
import ImageGallery from "./ImageGallery";
import WishlistButton from "./WishlistButton";

type QuickViewProps = {
  product: Product;
  onClose: () => void;
};

export default function QuickView({ product, onClose }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const canAdd = selectedSize && selectedColor;

  function handleAdd() {
    if (!canAdd) return;
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 800);
  }

  return (
    <div className="grid md:grid-cols-2">
      <ImageGallery
        images={product.images}
        alt={product.name}
        sizes="(max-width: 768px) 90vw, 480px"
        compact
      />

      <div className="flex flex-col justify-center px-8 py-8 md:px-10 md:py-10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
          {product.category}&apos;s collection
        </p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h2 className="text-[22px] font-normal tracking-tight text-foreground sm:text-[26px]">
            {product.name}
          </h2>
          <WishlistButton product={product} size={19} className="mt-1 shrink-0" />
        </div>
        <p className="mt-3 text-[16px] font-light tabular-nums text-muted">
          ${product.price}
        </p>
        <p className="mt-5 line-clamp-3 text-[13px] leading-[1.8] text-muted">
          {product.description}
        </p>

        <div className="mt-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-dimmed">
            Size
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-2 text-[11px] tracking-wide transition-all duration-300 ${
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

        <div className="mt-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-dimmed">
            Color
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`border px-4 py-2 text-[11px] tracking-wide transition-all duration-300 ${
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
          onClick={handleAdd}
          disabled={!canAdd}
          size="lg"
          className="mt-8 w-full"
        >
          {added ? "Added \u2713" : "Add to Cart"}
        </Button>

        {!canAdd && (
          <p className="mt-3 text-center text-[10px] tracking-wide text-dimmed">
            Select size and color
          </p>
        )}

        <a
          href={`/products/${product.slug}`}
          className="mt-5 block text-center text-[11px] tracking-wide text-dimmed transition-colors duration-300 hover:text-foreground"
        >
          View full details
        </a>
      </div>
    </div>
  );
}
