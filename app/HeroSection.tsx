"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/src/components/ui/Button";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-svh w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
          willChange: "transform",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
          alt="Urban Thread editorial"
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/25 to-black/60 dark:from-black/30 dark:via-black/50 dark:to-black/80" />
      <div className="relative flex h-full flex-col items-center justify-end px-6 pb-24 text-center sm:pb-32">
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">
          New Season
        </p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2rem,7vw,5rem)] font-light leading-[1.05] tracking-tight text-white">
          Quiet Luxury,{" "}
          <br className="hidden sm:block" />
          Worn Every Day
        </h1>
        <p className="mt-5 max-w-md text-[14px] font-light leading-relaxed text-white/70">
          Timeless pieces designed for the way you actually live.
          Effortless quality, nothing unnecessary.
        </p>
        <Button
          href="/products"
          size="lg"
          variant="secondary"
          className="mt-10 border-white/30 text-white hover:border-white hover:text-white"
        >
          Explore Collection
        </Button>
      </div>
    </section>
  );
}
