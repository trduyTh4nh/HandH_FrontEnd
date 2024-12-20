import { IProduct } from "./product.type";

export interface IBanner {
  _id?: string;
  title?: string;
  url?: string;
  content?: string;
  products?: string[];
  isActive?: boolean;
  isPublished?: boolean;
  imageUrl?: string;
  type: "main" | "sub";
  isMain?: boolean;
}
