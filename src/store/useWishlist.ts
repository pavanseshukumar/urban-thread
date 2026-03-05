"use client";

import { useEffect, useSyncExternalStore } from "react";
import { wishlistStore } from "./wishlistStore";

export function useWishlist() {
  const state = useSyncExternalStore(
    wishlistStore.subscribe,
    () => wishlistStore.getState(),
    () => ({ items: [] }),
  );

  useEffect(() => {
    wishlistStore.init();
  }, []);

  return {
    items: state.items,
    addToWishlist: wishlistStore.addToWishlist,
    removeFromWishlist: wishlistStore.removeFromWishlist,
    toggleWishlist: wishlistStore.toggleWishlist,
    isInWishlist: wishlistStore.isInWishlist,
    getTotalItems: wishlistStore.getTotalItems,
  };
}
