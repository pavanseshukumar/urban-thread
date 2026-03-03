"use client";

import { useEffect, useSyncExternalStore } from "react";
import { cartStore } from "./cartStore";

export function useCart() {
  const state = useSyncExternalStore(
    cartStore.subscribe,
    () => cartStore.getState(),
    () => ({ items: [] }),
  );

  useEffect(() => {
    cartStore.init();
  }, []);

  return {
    items: state.items,
    addToCart: cartStore.addToCart,
    removeFromCart: cartStore.removeFromCart,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
    getTotalPrice: cartStore.getTotalPrice,
    getTotalItems: cartStore.getTotalItems,
  };
}
