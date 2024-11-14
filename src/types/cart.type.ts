import { IProduct, productList } from "./product.type";

export interface ICart {
    _id?: string
    cart_user: string;
    cart_products: ICartDetail[];
    cart_count: number;
    cart_status: string;
    total_price: number,
}

export interface ICartDetail {
    product: IProduct;
    quantity: number;
    colorPicked: string,
    sizePicked: string
}

export const cartSample: ICart = {
    _id: "cart123",
    cart_user: "user456",
    cart_products: [
        {
            product: productList[0],
            quantity: 4,
            colorPicked: "#8DB4D2",
            sizePicked: "L"
        },
        {
            product: productList[2],
            quantity: 2,
            colorPicked: "#FFD1DC",
            sizePicked: "M"
        },
        {
            product: productList[4],
            quantity: 2,
            colorPicked: "#000",
            sizePicked: "XL"
        },
        {
            product: productList[4],
            quantity: 2,
            colorPicked: "#000",
            sizePicked: "XL"
        },
        {
            product: productList[4],
            quantity: 2,
            colorPicked: "#000",
            sizePicked: "XL"
        }
    ],
    cart_count: 3,
    cart_status: "active",
    total_price: 5000000
};

