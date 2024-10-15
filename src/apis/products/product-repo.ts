import { AxiosError } from "axios";
import API from "../api";

const api = new API()
export async function getProduct(){
    try {
        const response = await api.get("product");
        return response;
    } catch (error) {
        const e = error as AxiosError
        return error;
    }
}
export async function deleteProduct(id) {
    try {
        const response = await api.delete(`product/deleteProduct/${id}`);
        return response;
    } catch (error) {
        const e = error as AxiosError
        return error;
    }
}
