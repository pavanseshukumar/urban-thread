import { CartItem } from "@/src/types/cart";

type CartState = {
  items: CartItem[];
};

type Listener = () => void;

const STORAGE_KEY = "urban-thread-cart";

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createCartStore() {
  let state: CartState = { items: [] };
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

  function addToCart(
    product: { id: string; name: string; price: number; images: string[] },
    size: string,
    color: string,
  ) {
    const existing = state.items.find(
      (item) =>
        item.id === product.id && item.size === size && item.color === color,
    );

    if (existing) {
      state = {
        items: state.items.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    } else {
      state = {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size,
            color,
            quantity: 1,
          },
        ],
      };
    }
    emit();
  }

  function removeFromCart(id: string, size: string, color: string) {
    state = {
      items: state.items.filter(
        (item) => !(item.id === id && item.size === size && item.color === color),
      ),
    };
    emit();
  }

  function updateQuantity(id: string, size: string, color: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    state = {
      items: state.items.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item,
      ),
    };
    emit();
  }

  function clearCart() {
    state = { items: [] };
    emit();
  }

  function getTotalPrice() {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  function getTotalItems() {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }

  return {
    getState,
    subscribe,
    init,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };
}

export const cartStore = createCartStore();
