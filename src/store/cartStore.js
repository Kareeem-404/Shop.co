import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      favorites: [],
      toggleFavorite: (product) =>
        set((state) => ({
          favorites: state.favorites.some((item) => item.id === product.id)
            ? state.favorites.filter((item) => item.id !== product.id)
            : [product, ...state.favorites],
        })),
      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== productId),
        })),
      addItem: (product, size, color, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.size === size &&
              (item.color || "Olive") === color,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.size === size &&
                (item.color || "Olive") === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                product: {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail || product.images?.[0],
                },
                size,
                color,
                quantity,
              },
            ],
          }
        }),
      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size &&
                (item.color || "Olive") === color
              ),
          ),
        })),
      setQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (item) =>
                    !(
                      item.product.id === productId &&
                      item.size === size &&
                      (item.color || "Olive") === color
                    ),
                )
              : state.items.map((item) =>
                  item.product.id === productId &&
                  item.size === size &&
                  (item.color || "Olive") === color
                    ? { ...item, quantity }
                    : item,
                ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shop-co-cart',
      version: 3,
      migrate: (persistedState) => ({
        ...persistedState,
        items: (persistedState.items || []).map((item) => ({
          ...item,
          color: item.color || 'Olive',
        })),
        favorites: persistedState.favorites || [],
      }),
      partialize: (state) => ({ items: state.items, favorites: state.favorites }),
    },
  ),
)
