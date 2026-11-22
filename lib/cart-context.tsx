"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "./mock-data";

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("demo_cart");
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("demo_cart", JSON.stringify(items));
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.variant?.id === variant?.id
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, variant, quantity }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.variant?.id === variantId)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id === productId && i.variant?.id === variantId) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((acc, item) => {
    const price = item.variant?.price || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      items: [],
      isOpen: false,
      openCart: () => {},
      closeCart: () => {},
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      subtotal: 0,
      totalCount: 0,
    };
  }
  return context;
}
