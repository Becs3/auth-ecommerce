import { RowDataPacket } from "mysql2"

export interface ICustomer extends RowDataPacket {
    id: number
    firstname: string
    lastname: string
    email: string
    password: string
    phone: string
    street_address: string
    postal_code: string
    city: string
    country: string
    created_at: string
  }

    export class Customer {
      public id: number = Math.random();
      public created_at: string = new Date().toISOString();
  
      constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public phone: string,
        public street_address: string,
        public postal_code: string,
        public city: string,
        public country: string,
      ) {}
  }
  
  export type updateCust = Pick<ICustomer, "firstname" | "lastname" | "email" | "phone" | "street_address" | "postal_code" | "city" | "country">