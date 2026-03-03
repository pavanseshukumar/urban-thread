"use client";

import { useState } from "react";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export type Filters = {
  category: string | null;
  sizes: string[];
  colors: string[];
  minPrice: string;
  maxPrice: string;
  sort: SortOption;
  search: string;
};

type FilterPanelProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  allSizes: string[];
  allColors: string[];
  resultCount: number;
};

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-subtle/60 py-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-foreground"
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? "mt-5 max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

const COLOR_MAP: Record<string, string> = {
  White: "#ffffff",
  Beige: "#d4c5a9",
  "Light Blue": "#a0c4e8",
  Charcoal: "#3a3a3c",
  Navy: "#1b2a4a",
  Tan: "#c4a67d",
  Black: "#111111",
  Olive: "#6b7c4e",
  Cream: "#f5f0e1",
  Grey: "#9a9a9a",
  Champagne: "#f7e7ce",
  "Dusty Rose": "#c9a0a0",
  "Light Wash": "#b8c9dc",
  Indigo: "#3f4c82",
  Camel: "#c0956b",
  "Forest Green": "#2d4a30",
  Sand: "#d2b48c",
};

export default function FilterPanel({
  filters,
  onChange,
  allSizes,
  allColors,
  resultCount,
}: FilterPanelProps) {
  function setCategory(cat: string | null) {
    onChange({ ...filters, category: cat });
  }

  function toggleSize(size: string) {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: next });
  }

  function toggleColor(color: string) {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors: next });
  }

  function setPrice(key: "minPrice" | "maxPrice", value: string) {
    onChange({ ...filters, [key]: value });
  }

  const hasFilters =
    filters.category !== null ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "";

  function clearAll() {
    onChange({
      category: null,
      sizes: [],
      colors: [],
      minPrice: "",
      maxPrice: "",
      sort: filters.sort,
      search: "",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          {resultCount} {resultCount === 1 ? "piece" : "pieces"}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-[10px] uppercase tracking-[0.15em] text-dimmed transition-colors duration-200 hover:text-foreground"
          >
            Clear All
          </button>
        )}
      </div>

      <Section title="Category">
        <div className="flex flex-col gap-2.5">
          {(["men", "women"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(filters.category === cat ? null : cat)}
              className={`flex items-center gap-3 text-[12px] transition-colors duration-200 ${
                filters.category === cat
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center border transition-all duration-200 ${
                  filters.category === cat
                    ? "border-foreground bg-foreground"
                    : "border-subtle"
                }`}
              >
                {filters.category === cat && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-background"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="capitalize">{cat}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Price Range">
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setPrice("minPrice", e.target.value)}
            className="w-full border-b border-subtle bg-transparent pb-2 text-[13px] text-foreground outline-none transition-colors duration-200 placeholder:text-dimmed/50 focus:border-foreground"
          />
          <span className="text-[12px] text-dimmed">&ndash;</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setPrice("maxPrice", e.target.value)}
            className="w-full border-b border-subtle bg-transparent pb-2 text-[13px] text-foreground outline-none transition-colors duration-200 placeholder:text-dimmed/50 focus:border-foreground"
          />
        </div>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`border px-3.5 py-1.5 text-[11px] tracking-wide transition-all duration-200 ${
                filters.sizes.includes(size)
                  ? "border-foreground bg-foreground text-background"
                  : "border-subtle text-muted hover:border-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-3">
          {allColors.map((color) => {
            const hex = COLOR_MAP[color] ?? "#888888";
            const selected = filters.colors.includes(color);
            const isLight =
              hex === "#ffffff" || hex === "#f5f0e1" || hex === "#f7e7ce";

            return (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                title={color}
                className={`group relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
                  selected
                    ? "ring-1 ring-foreground ring-offset-2 ring-offset-background"
                    : "hover:ring-1 hover:ring-subtle hover:ring-offset-2 hover:ring-offset-background"
                }`}
              >
                <span
                  className={`block h-full w-full rounded-full ${
                    isLight ? "border border-subtle/80" : ""
                  }`}
                  style={{ backgroundColor: hex }}
                />
              </button>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
