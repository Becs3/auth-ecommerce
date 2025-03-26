import { RowDataPacket } from "mysql2"

export interface IProduct extends RowDataPacket {
    id: number
    name: string 
    description: string 
    price: number
    stock: number
    category: string
    image: string
    created_at: string
  }

  export class Product {
    public id: number = Math.random();
    public created_at: string = new Date().toISOString();

    constructor(
        public name: string,
        public description: string,
        public price: number,
        public stock: number,
        public category: string,
        public image: string
    ) {}
}

export type updateProd = Pick<IProduct, "name" | "description" | "price" | "category" | "stock">