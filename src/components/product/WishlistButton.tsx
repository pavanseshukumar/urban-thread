"use client";

import { useState, useCallback } from "react";
import { Product } from "@/src/types/product";
import { useWishlist } from "@/src/store/useWishlist";

type WishlistButtonProps = {
  product: Product;
  className?: string;
  size?: number;
};

export default function WishlistButton({
  product,
  className = "",
  size = 18,
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [popping, setPopping] = useState(false);

  const active = isInWishlist(product.id);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(product);
      setPopping(true);
      setTimeout(() => setPopping(false), 300);
    },
    [product, toggleWishlist],
  );

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`group/heart flex items-center justify-center transition-transform duration-300 ${
        popping ? "scale-125" : "scale-100"
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-colors duration-300 ${
          active
            ? "text-red-500"
            : "text-foreground/60 group-hover/heart:text-foreground"
        }`}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
