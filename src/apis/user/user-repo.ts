import { Axios, AxiosError } from "axios";
import API from "../api";

const api = new API({ headerType: "json" });
async function login(data) {}
export async function logout() {
    try {
        await api.post("access/logout")
    } catch (error) {
        const e = error as AxiosError
        return e
    }
}
export async function getLoggedInUser(id) {
    try {
        const res = await api.get(`access/getUser/${id}`)
        //@ts-ignore
        return res.metadata
    } catch (error) {
        if(error instanceof AxiosError){
            console.warn(error)
            throw error
        }
        throw error
    }
}