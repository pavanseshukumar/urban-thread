"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { products } from "@/src/data/products";

type SearchOverlayProps = {
  query: string;
  visible: boolean;
  onClose: () => void;
};

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-foreground/10 px-0.5">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchOverlay({
  query,
  visible,
  onClose,
}: SearchOverlayProps) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    setActiveIdx(-1);
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      onClose();
      window.location.href = href;
    },
    [onClose],
  );

  useEffect(() => {
    if (!visible) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIdx >= 0 && results[activeIdx]) {
          navigate(`/products/${results[activeIdx].slug}`);
        } else if (query.trim()) {
          navigate(`/products?search=${encodeURIComponent(query.trim())}`);
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visible, results, activeIdx, query, navigate]);

  if (!visible || !query.trim()) return null;

  return (
    <div
      ref={listRef}
      className="absolute left-0 top-full w-full border-t border-subtle/60 bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        {results.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-muted">
            No results for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <>
            <div className="divide-y divide-subtle/40">
              {results.map((product, i) => (
                <a
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/products/${product.slug}`);
                  }}
                  className={`flex items-center gap-5 py-4 transition-colors duration-150 ${
                    activeIdx === i ? "bg-faint" : ""
                  }`}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden bg-faint">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] text-foreground">
                      {highlightMatch(product.name, query)}
                    </p>
                    <p className="mt-0.5 text-[11px] capitalize text-muted">
                      {product.category}
                    </p>
                  </div>
                  <p className="shrink-0 text-[13px] tabular-nums text-muted">
                    ${product.price}
                  </p>
                </a>
              ))}
            </div>
            <a
              href={`/products?search=${encodeURIComponent(query.trim())}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  `/products?search=${encodeURIComponent(query.trim())}`,
                );
              }}
              className="mt-2 block border-t border-subtle/40 pt-4 text-center text-[11px] uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:text-foreground"
            >
              View all results
            </a>
          </>
        )}
      </div>
    </div>
  );
}
