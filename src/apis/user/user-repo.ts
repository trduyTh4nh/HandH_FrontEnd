import { AxiosError } from "axios";
import API from "../api";

const api = new API();
export async function logout() {
    try {
        await api.post("logout")
    } catch (error) {
        const e = error as AxiosError
        return e
    }
}
