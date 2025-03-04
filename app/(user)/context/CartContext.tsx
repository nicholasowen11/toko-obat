"use client";

import { createContext } from "react";
import { CartItem, Product } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

// const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = () => {
  // const [cart, setCart] = useState<CartItem[]>([]);

  // const addToCart = (product: Product) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.productId === product.id);
  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.productId === product.id
  //           ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
  //           : item
  //       );
  //     }
  //     return [...prevCart, { productId: product.id, name: product.name, price: product.price, quantity: 1, stock: product.stock, imageUrl: product.imageUrl }];
  //   });
  // };

  // const removeFromCart = (id: string) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.productId !== id));
  // };

  // const updateQuantity = (id: string, quantity: number) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.productId === id ? { ...item, quantity: Math.min(quantity, item.stock) } : item
  //     )
  //   );
  // };

  return (
    // <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
    //   {children}
    // </CartContext.Provider>
    <div>
      
    </div>
  );
};

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within a CartProvider");
//   return context;
// };
