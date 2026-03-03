"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cartStore } from "@/src/store/cartStore";
import CartDrawer from "@/src/components/cart/CartDrawer";
import MegaMenu, { columns } from "./MegaMenu";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/lookbook", label: "Lookbook" },
  { href: "/products?category=men", label: "Men" },
  { href: "/products?category=women", label: "Women" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  const megaTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const closeCart = useCallback(() => setCartOpen(false), []);

  function openMega() {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }

  function closeMega() {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  }

  useEffect(() => {
    cartStore.init();
    setCartCount(cartStore.getTotalItems());

    return cartStore.subscribe(() => {
      setCartCount(cartStore.getTotalItems());
    });
  }, []);

  useEffect(() => {
    return () => {
      if (megaTimeout.current) clearTimeout(megaTimeout.current);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg transition-colors duration-300">
        <div className="border-b border-subtle/60">
          <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
            <a
              href="/"
              className="text-[15px] font-semibold uppercase tracking-[0.12em] text-foreground"
            >
              Urban Thread
            </a>

            <ul className="hidden items-center gap-10 md:flex">
              <li
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <a
                  href="/products"
                  className={`text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    megaOpen ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  Shop
                </a>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5">
              <ThemeToggle />

              <button
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
                className="relative text-muted transition-colors duration-300 hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-foreground text-[9px] font-medium text-background">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className="flex flex-col justify-center gap-[5px] md:hidden"
              >
                <span
                  className={`h-px w-[18px] bg-foreground transition-all duration-300 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`}
                />
                <span
                  className={`h-px w-[18px] bg-foreground transition-all duration-300 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* Desktop mega menu */}
        <div
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          className="hidden md:block"
        >
          <MegaMenu visible={megaOpen} />
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-subtle/60 bg-background md:hidden">
            <ul className="flex flex-col px-6 py-4">
              {/* Shop accordion */}
              <li>
                <button
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                  className="flex w-full items-center justify-between py-3 text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-foreground"
                >
                  Shop
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${mobileShopOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    mobileShopOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-6 pb-4 pl-4 pt-2">
                    {columns.map((col) => (
                      <div key={col.title}>
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                          {col.title}
                        </p>
                        <ul className="mt-2.5 space-y-2">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <a
                                href={link.href}
                                className="text-[12px] text-foreground/70 transition-colors duration-200 hover:text-foreground"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-3 text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
}
