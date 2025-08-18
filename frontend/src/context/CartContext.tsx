import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../models/product';
import { CartItem, CartState } from '../models/cart';

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productCode: string) => void;
  updateQuantity: (productCode: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartState>({ items: [] });

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingItem = prev.items.find((item) => item.product._id === product._id);
      
      if (existingItem) {
        return {
          items: prev.items.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          items: [...prev.items, { product, quantity }],
        };
      }
    });
  };

  const removeFromCart = (productCode: string) => {
    setCart((prev) => ({
      items: prev.items.filter((item) => item.product._id !== productCode),
    }));
  };

  const updateQuantity = (productCode: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productCode);
      return;
    }

    setCart((prev) => ({
      items: prev.items.map((item) =>
        item.product._id === productCode ? { ...item, quantity } : item
      ),
    }));
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};