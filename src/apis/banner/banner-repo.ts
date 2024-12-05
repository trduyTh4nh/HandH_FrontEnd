import { AxiosError } from "axios";
import API from "../api";
import { IBanner } from "@/types/banner.type";
import { json } from "stream/consumers";

const api = new API({ headerType: "json" });
const specialApi = new API({ headerType: "formdata" });

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
export async function getABanner(id: string) {
  try {
    const response = await api.get(`upload/getABanner/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    return error;
  }
}
export async function createBanner(
  banner: IBanner,
  file: File,
  products: string[]
) {
  try {
    const formData = new FormData();
    formData.append("title", banner.title);
    formData.append("content", banner.title);
    formData.append("file", file);
    const response = await specialApi.post("upload/uploadBanner", formData);
    if (products && products.length > 0) {
      const response2 = await api.put("upload/addProductToBanner", {
        //@ts-ignore
        idBanner: response.metadata._id,
        products: products,
      });
      return response2;
    }
    return response;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    return error;
  }
}

export async function unPublishBanner(id: string) {
  try {
    const response = await api.put(`upload/activeBanner/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function publishBanner(id: string) {
  try {
    const response = await api.put(`upload/unActiveBanner/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteBanner(id: string) {
  try {
    const response = await api.delete(`upload/deleteBanner/${id}`);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateModeBanner(id: string, mode: boolean) {
  try {
    const response = await api.put(`upload/updateModeBanner`, {
      idBanner: id,
      mode: mode,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
