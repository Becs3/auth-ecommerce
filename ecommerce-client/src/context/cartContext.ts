import { createContext } from "react";
import { IProduct } from "../models/product";

export type ICartContext = {
    cart: { product: IProduct; quantity: number }[];
    AddToCart: (product: IProduct, quantity: number) => void;
    UpdateCart: (product: IProduct, quantity: number) => void;
    DeleteFromCart: (product: IProduct, quantity: number) => void;
}
export const CartContext = createContext<ICartContext>({
    cart: [],
    AddToCart: () => {},
    UpdateCart: () => {},
    DeleteFromCart: () => {}
  });

