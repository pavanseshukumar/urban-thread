"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/src/types/product";
import Modal from "@/src/components/ui/Modal";
import QuickView from "./QuickView";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <>
      <div className="group relative">
        <a href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-3/4 w-full overflow-hidden bg-faint">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-0"
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-all duration-700 ease-out opacity-0 group-hover:scale-[1.03] group-hover:opacity-100"
              />
            )}

            <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <WishlistButton
                product={product}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 shadow-sm backdrop-blur-sm dark:bg-surface/70"
                size={15}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickOpen(true);
                }}
                className="bg-surface/90 px-5 py-2 text-[10px] uppercase tracking-[0.18em] text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 hover:bg-surface dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
              >
                Quick View
              </button>
            </div>
          </div>
        </a>

        <div className="mt-5">
          <h3 className="text-[13px] font-normal text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-[13px] tabular-nums text-muted">
            ${product.price}
          </p>
        </div>
      </div>

      <Modal open={quickOpen} onClose={() => setQuickOpen(false)}>
        <QuickView product={product} onClose={() => setQuickOpen(false)} />
      </Modal>
    </>
  );
}
