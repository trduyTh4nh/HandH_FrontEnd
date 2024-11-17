import { IProduct, productList } from "./product.type";

export interface ICart {
  _id?: string;
  cart_user: string;
  cart_products: ICartDetail[];
  cart_count: number;
  cart_status: string;
  total_price: number;
}

export interface ICartDetail {
  product: any;
  quantity: number;
  colorPicked: { color: string; priceColor: number };
  sizePicked: { size: string; priceSize: number };
  priceCartDetail: number;
  idCart: string;
  idCartDetail: string;
}

