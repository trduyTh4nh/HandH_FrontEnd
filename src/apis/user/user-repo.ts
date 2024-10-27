import { Axios, AxiosError } from "axios";
import API from "../api";
import { IUser } from "@/types/user.type";

const api = new API({ headerType: "json" });
async function login(data) { }
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
export async function getUsers() {
  try {
    const res = await api.get<IUser>("access/getAllUser");
    return res;
  } catch (e) {
    if(e instanceof AxiosError){
      return e
    }
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
export async function getLoggedInUser(id) {
    try {
        const res = await api.get(`access/getUser/${id}`)
        //@ts-ignore
        return res.metadata
    } catch (error) {
        if (error instanceof AxiosError) {
            console.warn(error)
            throw error
        }
        throw error
    }
}
export async function changePassword(body) {
    try {
        const res: any = await api.put("access/changePassword", body);
        return res.metadata;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.warn(error);
            throw error;
        }
        throw error;
    }
}
export async function changeInformation(_id) {
    try {
        const res: any = await api.put(`access/updateInformationUser/${_id}`);
        return res.metadata;
    } catch (err) {
        console.error(err);
    }
}
