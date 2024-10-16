import { AxiosError } from "axios";
import API from "../api";

const api = new API();

export async function getAllBanner() {
  try {
    const response = await api.get("upload/getAllBanner");
    return response;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    return error;
  }
}
