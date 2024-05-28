"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>({});

interface CartUse {
  cart: any;
  setCart: any;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartUse>();
  const [search, setSearch] = useState<string>("");

  return (
    <CartContext.Provider value={{ cart, setCart, search, setSearch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
