"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/src/components/product/ProductCard";
import FilterPanel, {
  type Filters,
  type SortOption,
} from "@/src/components/product/FilterPanel";
import FilterDrawer from "@/src/components/product/FilterDrawer";
import { products } from "@/src/data/products";

const allSizes = [...new Set(products.flatMap((p) => p.sizes))];
const allColors = [...new Set(products.flatMap((p) => p.colors))];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const emptyFilters: Filters = {
  category: null,
  sizes: [],
  colors: [],
  minPrice: "",
  maxPrice: "",
  sort: "featured",
};

function filtersFromParams(params: URLSearchParams): Filters {
  const cat = params.get("category");
  const sizes = params.get("size")?.split(",").filter(Boolean) ?? [];
  const colors = params.get("color")?.split(",").filter(Boolean) ?? [];
  const sort = params.get("sort") as SortOption | null;
  const validSort =
    sort && SORT_OPTIONS.some((o) => o.value === sort) ? sort : "featured";

  return {
    category: cat === "men" || cat === "women" ? cat : null,
    sizes,
    colors,
    minPrice: params.get("min") ?? "",
    maxPrice: params.get("max") ?? "",
    sort: validSort,
  };
}

function filtersToParams(filters: Filters): string {
  const p = new URLSearchParams();
  if (filters.category) p.set("category", filters.category);
  if (filters.sizes.length > 0) p.set("size", filters.sizes.join(","));
  if (filters.colors.length > 0) p.set("color", filters.colors.join(","));
  if (filters.minPrice) p.set("min", filters.minPrice);
  if (filters.maxPrice) p.set("max", filters.maxPrice);
  if (filters.sort !== "featured") p.set("sort", filters.sort);
  const str = p.toString();
  return str ? `?${str}` : "";
}

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isInitial = useRef(true);

  const [filters, setFiltersState] = useState<Filters>(() =>
    filtersFromParams(searchParams),
  );

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    setFiltersState(filtersFromParams(searchParams));
  }, [searchParams]);

  const setFilters = useCallback(
    (next: Filters) => {
      setFiltersState(next);
      const url = `/products${filtersToParams(next)}`;
      router.push(url, { scroll: false });
    },
    [router],
  );

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const results = useMemo(() => {
    const filtered = products.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((s) => p.sizes.includes(s))
      )
        return false;
      if (
        filters.colors.length > 0 &&
        !filters.colors.some((c) => p.colors.includes(c))
      )
        return false;
      if (filters.minPrice !== "") {
        const min = Number(filters.minPrice);
        if (!isNaN(min) && p.price < min) return false;
      }
      if (filters.maxPrice !== "") {
        const max = Number(filters.maxPrice);
        if (!isNaN(max) && p.price > max) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    switch (filters.sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.reverse();
        break;
      case "featured":
      default:
        sorted.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
    }

    return sorted;
  }, [filters]);

  const activeTags = useMemo(() => {
    const tags: { label: string; remove: () => void }[] = [];
    if (filters.category) {
      const cat = filters.category;
      tags.push({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        remove: () => setFilters({ ...filters, category: null }),
      });
    }
    for (const s of filters.sizes) {
      tags.push({
        label: `Size ${s}`,
        remove: () =>
          setFilters({
            ...filters,
            sizes: filters.sizes.filter((x) => x !== s),
          }),
      });
    }
    for (const c of filters.colors) {
      tags.push({
        label: c,
        remove: () =>
          setFilters({
            ...filters,
            colors: filters.colors.filter((x) => x !== c),
          }),
      });
    }
    if (filters.minPrice) {
      tags.push({
        label: `Min $${filters.minPrice}`,
        remove: () => setFilters({ ...filters, minPrice: "" }),
      });
    }
    if (filters.maxPrice) {
      tags.push({
        label: `Max $${filters.maxPrice}`,
        remove: () => setFilters({ ...filters, maxPrice: "" }),
      });
    }
    return tags;
  }, [filters, setFilters]);

  const hasFilters = activeTags.length > 0;

  return (
    <>
      <main className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
              Browse
            </p>
            <h1 className="mt-2 text-[26px] font-normal tracking-tight text-foreground sm:text-[32px]">
              Shop Collection
            </h1>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:text-foreground lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="14" y2="12" />
              <line x1="4" y1="18" x2="9" y2="18" />
            </svg>
            Filters
          </button>
        </div>

        <div className="mt-14 flex gap-16">
          {/* Desktop sidebar */}
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              allSizes={allSizes}
              allColors={allColors}
              resultCount={results.length}
            />
          </aside>

          {/* Product grid area */}
          <div className="min-w-0 flex-1">
            {/* Toolbar: result count on mobile, sort, active tags */}
            <div className="mb-8 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.15em] text-dimmed">
                  {results.length}{" "}
                  {results.length === 1 ? "piece" : "pieces"}
                </p>

                <div className="relative">
                  <select
                    value={filters.sort}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        sort: e.target.value as SortOption,
                      })
                    }
                    className="appearance-none border-b border-subtle bg-surface px-2 pb-2 pt-1 pr-7 text-[11px] uppercase tracking-[0.12em] text-foreground outline-none transition-colors duration-200 focus:border-foreground"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-surface px-3 py-2 text-foreground"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {hasFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  {activeTags.map((tag) => (
                    <button
                      key={tag.label}
                      onClick={tag.remove}
                      className="group flex items-center gap-1.5 border border-subtle px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-muted transition-all duration-200 hover:border-foreground hover:text-foreground"
                    >
                      {tag.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-40 transition-opacity duration-200 group-hover:opacity-100"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  ))}
                  <button
                    onClick={() => setFilters({ ...emptyFilters })}
                    className="px-2 py-1.5 text-[10px] uppercase tracking-[0.12em] text-dimmed transition-colors duration-200 hover:text-foreground"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {results.length === 0 ? (
              <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                <span
                  className="text-3xl opacity-40"
                  role="img"
                  aria-hidden="true"
                >
                  &#128269;
                </span>
                <p className="mt-4 text-[13px] font-medium text-foreground">
                  No products found
                </p>
                <p className="mt-1.5 text-[12px] text-dimmed">
                  Try adjusting your filters.
                </p>
                <button
                  onClick={() => setFilters({ ...emptyFilters })}
                  className="mt-6 text-[11px] uppercase tracking-[0.15em] text-muted underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((product, i) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <FilterDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        filters={filters}
        onChange={setFilters}
        allSizes={allSizes}
        allColors={allColors}
        resultCount={results.length}
      />
    </>
  );
}
