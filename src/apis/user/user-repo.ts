import { Axios, AxiosError } from "axios";
import API from "../api";

const api = new API({ headerType: "json" });
async function login(data) {}
export async function logout() {
  try {
    const res = await api.post("access/logout");
    return res;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
}
export async function register(data) {
    const {fullName, rePassword, ...rest} = data;
  try {
    const res = await api.post("access/register", {
        ...rest,
        name: fullName
    })
    return res
  } catch (error) {
    const e = error as AxiosError;
    console.error(e)
    return e;
  }
}
export class UnauthenticatedError extends Error {
    code: number
    constructor(message, code) {
        super()
        this.message = message;
        this.name = "USER_UNAUTHENTICATED";
        this.code = code
    }
}
export async function getLoggedInUser() {
    const userStr = localStorage.getItem("user")
    if(!userStr){
        throw new UnauthenticatedError("Người dùng chưa đăng nhập", 401)
    }
    const userObj = JSON.parse(userStr)
  try {
    const res = await api.get(`access/getUser/${userObj._id}`);
    //@ts-ignore
    return res.metadata;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.warn(error);
      throw error;
    }
    throw error;
  }
}