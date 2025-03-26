import { RowDataPacket } from "mysql2";

export interface IOrderItem extends RowDataPacket {
  id: number
  order_id: number
  product_id: number
  product_name: string
  quantity: number
  unit_price: number
  created_at: string
}

export type updateOrItem = Pick<IOrderItem, "quantity">

/* export class OrderItem {
  public id: number = Math.random();
  public created_at: string = new Date().toISOString();

  constructor(
  public order_id: number,
  public product_id: number,
  public product_name: string,
  public quantity: number,
  public unit_price: number,
  ) {}
} */