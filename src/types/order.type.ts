import { IProduct } from "./product.type";

export interface IUserAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  apartmentNumber?: string;
}
export const orderStatus = {
  pending: "Đang chờ",
  completed: "Đã hoàn thành",
  failed: "Đã huỷ",
  packing: "Đang xử lý"
}
export const orderStatusClass = {
  pending: "bg-gray-100",
  completed: "bg-green-200",
  failed: "bg-red-200",
  packing: "bg-primary"
}
export interface IProductInOrder extends IProduct {
  _id: string;
  priceAtPurchase?: number;
  productId?: string;  
  quantity?: number;
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
