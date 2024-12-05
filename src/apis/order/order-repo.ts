import { AxiosError } from "axios";
import API from "../api";
import { IUserAddress } from "@/types/user.type";

const api = new API({ headerType: "json" });

export async function createOrderFromCart(
  products: string[],
  cartId: string,
  userId: string,
  address: IUserAddress
) {
  try {
    const body = {
      cartId: cartId,
      userId: userId,
      shippingAddress: address,
      paymentMethod: "vnpay",
      notes: "",
      cartDetail: products,
    };
    const res = await api.post("order/createOrderFromCart", body);
    return res;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e;
    }
    console.error(e);
    return null;
  }
}
export async function generageQRCode(idOrder: string, amount: number) {
  try {
    const res = await api.post(`https://api.vietqr.io/v2/generate`, {
      accountNo: 27030893890,
      accountName: "TIEU TRI QUANG",
      acqId: 970423,
      amount: amount,
      addInfo: idOrder,
      format: "text",
      template: "compact",
    });
    return res;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e;
    }
    console.error(e);
    return null;
  }
}
export async function getAllOrderAdmin() {
  try {
    const res = await api.get("order/getAllOrder");
    return res;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e;
    }
    console.error(e);
    return null;
  }
}
export async function updateOrderStatus(id: string, status: string) {
  try {
    const res = await api.put(`order/updateStatusOrder`, {
      status: status,
      idOrder: id,
    });
    return res;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e;
    }
    console.error(e);
    return null;
  }
}