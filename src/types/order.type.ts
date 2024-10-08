import { IProduct } from "./product.type";

export interface IUserAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  apartmentNumber?: string;
}

export interface IProductInOrder {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface IOrder {
  _id: string;
  userId: string;
  products: IProductInOrder[];
  totalPrice: number;
  shippingAddress: IUserAddress;
  paymentMethod: string;
  orderStatus: string;
  shippingCost: number;
  taxAmount: number;
  discount: number;
  orderDate: Date;
  notes: string;
}
