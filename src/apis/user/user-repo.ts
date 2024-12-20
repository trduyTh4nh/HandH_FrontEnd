import { Axios, AxiosError } from "axios";
import API from "../api";
import { IUser } from "@/types/user.type";

const api = new API({ headerType: "json" });
const formApi = new API({ headerType: "formdata" });
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
  const { fullName, rePassword, ...rest } = data;
  try {
    const res = await api.post("access/register", {
      ...rest,
      name: fullName,
    });
    //@ts-ignore
    return res;
  } catch (error) {
    const e = error as AxiosError;
    console.error(e);
    return e;
  }
}
export class UnauthenticatedError extends Error {
  code: number;
  constructor(message, code) {
    super();
    this.message = message;
    this.name = "USER_UNAUTHENTICATED";
    this.code = code;
  }
}
export async function getUsers() {
  try {
    const res = await api.get<IUser>("access/getAllUser");
    return res;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e;
    }
  }
}
export async function getLoggedInUser() {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    throw new UnauthenticatedError("Người dùng chưa đăng nhập", 401);
  }
  const userObj = JSON.parse(userStr);
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
export async function updateAvatarUser(file: File, id: string) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await formApi.post(`access/updateImageForUser/${id}`, formData);
    return res;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e;
    }
  }
}
export async function getAllUsers() {
  try {
    const res = await api.get("access/getAllUser");
    return res;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e;
    }
  }
}
export async function changeInformation(body: IUser) {
  const {avatar, email, ...rest} = body
  console.log(rest)
  // const userStr = JSON.parse(localStorage.getItem("user"))
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    throw new UnauthenticatedError("Người dùng chưa đăng nhập", 401);
  }
  const userObj = JSON.parse(userStr);
  try {
    const res: any = await api.put(
      `access/updateInformationUser/${userObj._id}`,
      {
        user: rest
      }
    );
    console.log(userObj._id);
    return res.metadata;
  } catch (err) {
    console.error("Lỗi xảy ra:", err);
    if (err instanceof AxiosError && err.response) {
      return err
      console.error("Chi tiết lỗi:", err.response.data); // Kiểm tra thông tin lỗi
    }
  }
}
