import { AxiosError } from "axios";
import API from "../api";
import { IUserAddress } from "@/types/user.type";

const api = new API({ headerType: "json" });

export async function createOrderFromCart(products: string[], cartId: string, userId: string, address: IUserAddress) {
    try {
        const body = {
            cartId: cartId,
            userId: userId,
            shippingAddress: address,
            paymentMethod: "cash",
            notes: "",
            cartDetail: products
        }
        const res = await api.post("order/createOrderFromCart", body)
        return res
    } catch (e) {
        if (e instanceof AxiosError){
            return e
        }
        console.error(e);
        return null
    }
}