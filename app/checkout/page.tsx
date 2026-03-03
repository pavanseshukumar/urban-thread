"use client";

import { useState } from "react";
import { useCart } from "@/src/store/useCart";
import Button from "@/src/components/ui/Button";
import EmptyState from "@/src/components/ui/EmptyState";

const SHIPPING_COST = 5;

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

type FormData = typeof emptyForm;

const fields: {
  key: keyof FormData;
  label: string;
  type: string;
  half?: boolean;
}[] = [
  { key: "fullName", label: "Full Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "address", label: "Address", type: "text" },
  { key: "city", label: "City", type: "text", half: true },
  { key: "state", label: "State", type: "text", half: true },
  { key: "postalCode", label: "Postal Code", type: "text", half: true },
  { key: "country", label: "Country", type: "text", half: true },
];

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const [form, setForm] = useState<FormData>(emptyForm);

  const subtotal = getTotalPrice();
  const total = subtotal + (items.length > 0 ? SHIPPING_COST : 0);

  const formComplete = Object.values(form).every((v) => v.trim() !== "");
  const canPlace = items.length > 0 && formComplete;

  function update(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  if (items.length === 0) {
    return (
      <main>
        <EmptyState
          icon="&#128230;"
          title="Nothing to check out"
          description="Your cart is empty. Browse our collection and add some items first."
          actionLabel="Browse Products"
          actionHref="/products"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-dimmed">
          Finalize
        </p>
        <h1 className="mt-2 text-[26px] font-normal tracking-tight text-foreground sm:text-[32px]">
          Checkout
        </h1>
      </div>

      <div className="mt-14 grid gap-16 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-foreground">
            Shipping Information
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.half ? "" : "sm:col-span-2"}>
                <label
                  htmlFor={f.key}
                  className="block text-[11px] uppercase tracking-[0.15em] text-dimmed"
                >
                  {f.label}
                </label>
                <input
                  id={f.key}
                  type={f.type}
                  required
                  value={form[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="mt-2 w-full border-b border-subtle bg-transparent pb-3 text-[14px] text-foreground outline-none transition-colors duration-300 placeholder:text-dimmed/40 focus:border-foreground"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-foreground">
              Order Summary
            </h2>

            <ul className="mt-8 divide-y divide-subtle/60">
              {items.map((item) => (
                <li
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="text-[13px] text-foreground">{item.name}</p>
                    <p className="mt-0.5 text-[11px] text-dimmed">
                      {item.size} &middot; {item.color} &middot; Qty{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="text-[13px] tabular-nums text-foreground">
                    ${item.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4 border-t border-subtle/60 pt-6">
              <div className="flex justify-between text-[13px]">
                <span className="text-muted">Subtotal</span>
                <span className="tabular-nums text-foreground">${subtotal}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted">Shipping</span>
                <span className="tabular-nums text-foreground">
                  ${SHIPPING_COST}
                </span>
              </div>
              <div className="flex justify-between border-t border-subtle/60 pt-4">
                <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
                  Total
                </span>
                <span className="text-[18px] font-medium tabular-nums text-foreground">
                  ${total}
                </span>
              </div>
            </div>

            <Button
              disabled={!canPlace}
              size="lg"
              className="mt-8 w-full"
            >
              Place Order
            </Button>

            {!formComplete && (
              <p className="mt-4 text-center text-[11px] tracking-wide text-dimmed">
                Complete all fields to continue
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
