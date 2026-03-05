import { Product } from "@/src/types/product";

type WishlistState = {
  items: Product[];
};

type Listener = () => void;

const STORAGE_KEY = "urban-thread-wishlist";

function loadFromStorage(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createWishlistStore() {
  let state: WishlistState = { items: [] };
  const listeners = new Set<Listener>();

  function emit() {
    saveToStorage(state.items);
    listeners.forEach((l) => l());
  }

  function getState() {
    return state;
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function init() {
    state = { items: loadFromStorage() };
    emit();
  }

  function addToWishlist(product: Product) {
    if (state.items.some((p) => p.id === product.id)) return;
    state = { items: [...state.items, product] };
    emit();
  }

  function removeFromWishlist(productId: string) {
    state = { items: state.items.filter((p) => p.id !== productId) };
    emit();
  }

  function toggleWishlist(product: Product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  function isInWishlist(productId: string) {
    return state.items.some((p) => p.id === productId);
  }

  function getTotalItems() {
    return state.items.length;
  }

  return {
    getState,
    subscribe,
    init,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getTotalItems,
  };
}

export const wishlistStore = createWishlistStore();
