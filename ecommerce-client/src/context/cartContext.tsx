import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IProduct } from "../models/product";

export type ICartContext = {
     cart: { product: IProduct; quantity: number }[];
    AddToCart: (product: IProduct, quantity: number) => void;
    UpdateCart: (product: IProduct, quantity: number) => void;
    DeleteFromCart: (product: IProduct, quantity: number) => void; 
}

const CartContext = createContext<ICartContext|null>( null
/*     cart: [],
    AddToCart: () => {},
    UpdateCart: () => {},
    DeleteFromCart: () => {} */
  );

export const CartProvider = ({children}: PropsWithChildren) => {
  const [cart, setCart] = useState<{ product: IProduct; quantity: number }[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : []; 
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]); 
  
  const AddToCart = (product: IProduct, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...prevCart, { product, quantity }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const UpdateCart = (product: IProduct, newQuantity: number) => {

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: newQuantity }
          : item
      );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
    });
  }

  const DeleteFromCart = (product: IProduct, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - quantity }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  return (
    <CartContext.Provider value={{cart, AddToCart, UpdateCart, DeleteFromCart}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext