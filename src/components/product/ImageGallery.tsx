"use client";

import { useState } from "react";
import Image from "next/image";

type ImageGalleryProps = {
  images: string[];
  alt: string;
  sizes?: string;
  compact?: boolean;
};

export default function ImageGallery({
  images,
  alt,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  compact = false,
}: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  const thumbSize = compact ? "h-14 w-14" : "h-[72px] w-[72px]";
  const gap = compact ? "gap-2" : "gap-3";

  return (
    <div className={compact ? "" : "flex flex-col-reverse gap-4 lg:flex-row lg:gap-5"}>
      {/* Thumbnails */}
      <div
        className={`flex ${compact ? "mt-3 " : "lg:flex-col "} ${gap} shrink-0`}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative ${thumbSize} shrink-0 overflow-hidden bg-faint transition-all duration-200 ${
              active === i
                ? "ring-1 ring-foreground ring-offset-1 ring-offset-background"
                : "opacity-60 hover:opacity-100"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="72px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        className={`relative w-full overflow-hidden bg-faint ${
          compact ? "aspect-3/4 md:aspect-auto md:min-h-[480px]" : "aspect-3/4"
        }`}
      >
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`${alt} ${i + 1}`}
            fill
            priority={i === 0}
            sizes={sizes}
            className={`object-cover transition-opacity duration-300 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
