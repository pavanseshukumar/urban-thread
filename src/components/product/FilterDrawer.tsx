"use client";

import { useEffect } from "react";
import FilterPanel, { type Filters } from "./FilterPanel";

type FilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (filters: Filters) => void;
  allSizes: string[];
  allColors: string[];
  resultCount: number;
};

export default function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  allSizes,
  allColors,
  resultCount,
}: FilterDrawerProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
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
        className={`fixed left-0 top-0 z-50 flex h-full w-full max-w-[320px] flex-col bg-surface transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-foreground">
            Filters
          </h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="text-dimmed transition-colors duration-200 hover:text-foreground"
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

        <div className="mx-6 border-t border-subtle/60" />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <FilterPanel
            filters={filters}
            onChange={onChange}
            allSizes={allSizes}
            allColors={allColors}
            resultCount={resultCount}
          />
        </div>

        <div className="border-t border-subtle/60 px-6 py-5">
          <button
            onClick={onClose}
            className="w-full bg-foreground py-3 text-[12px] uppercase tracking-[0.15em] text-background transition-opacity duration-200 hover:opacity-90"
          >
            Show {resultCount} {resultCount === 1 ? "Result" : "Results"}
          </button>
        </div>
      </div>
    </>
  );
}
