import { AxiosError } from "axios";
import API from "../api";
import { IProduct } from "@/types/product.type";

const api = new API({ headerType: "json" });
const formApi = new API({ headerType: "formdata" });
export async function getProductsByCate(cate: string) {
  console.log(cate);
  try {
    const response = await api.get(`product/getProductCate/${cate}`);
    return response;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
}
export async function getProductById(id: string) {
  try {
    const response = await api.get(`product/getAProduct/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    return e;
  }
}
export async function getNewestProduct(n: number) {
  try {
    const response = await api.get<any>(`product/getLastestProduct/${n}`);
    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e as AxiosError;
      console.log(error);
      return error;
    }
    console.log(e);
    throw e;
  }
}
export async function getProduct() {
  try {
    const response = await api.get("product");
    return response;
  } catch (error) {
    const e = error as AxiosError;
    return error;
  }
}
export async function updateImageToProduct(id: string, image: File) {
  try {
    const formData = new FormData();
    formData.append("file", image);
    const response = await formApi.post(
      `product/updateImageProduct/${id}`,
      formData
    );
    return response;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    return error;
  }
}
export async function createProduct(product: IProduct) {
  try {
    const response = await api.post("product/createProduct", {
      product: product,
    });
    return response;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    return error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await api.delete(`product/deleteProduct/${id}`);
    return response;
  } catch (error) {
    const e = error as AxiosError;
    return error;
  }
}

export async function getProductFilter(
  dataFilter: any,
  skip: number,
  take: number
) {
  try {
    const response = await api.post("product/searchProductFilter", {
      filter: dataFilter,
      skip: skip,
      take: take,
    });
    return response;
  } catch (error) {
    return error as AxiosError;
  }
}

export async function getProductPage(skip: number, take: number) {
  try {
    const response = await api.post("product/getProductPage", {
      skip: skip,
      take: take,
    });
    return response;
  } catch (error) {
    const e = error as AxiosError;
    return error;
  }
}
