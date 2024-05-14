"use client";
import { createContext, useState, useContext } from "react";

const CartContext = createContext<any>({});

interface CartUse {
  cart: any;
  setCart: any;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartUse>();

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
