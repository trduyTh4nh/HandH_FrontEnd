import { AxiosError } from "axios";
import API from "../api";
import { IColorProductVariation, IProduct } from "@/types/product.type";

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
export async function publishProduct(id: string) {
  try {
    const response = await api.patch(`product/publicProduct/${id}`);
    return response;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    return error;
  }
}
export async function draftProduct(id: string) {
  try {
    const response = await api.patch(`product/draftProduct/${id}`);
    return response;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    return error;
  }
}
export async function unDraftProduct(id: string) {
  try {
    const response = await api.patch(`product/unDaftProduct/${id}`);
    return response;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    return error;
  }
}
export async function unPublishProduct(id: string) {
  try {
    const response = await api.patch(`product/unPublicProduct/${id}`);
    return response;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    return error;
  }
}
export async function addImageToProduct(
  id: string,
  image: File[],
  onUploadProgressChange: (progress: number) => void
) {
  let step: number = 100 / image.length;
  let progress: number = 0;
  try {
    for (let img of image) {
      const formData = new FormData();
      console.log(`progress: ${progress}, step: ${step}, image: ${img.name}`);
      formData.append("file", img);
      await formApi.put(`product/addImageProduct/${id}`, formData);
      progress += step;
      onUploadProgressChange(progress);
    }
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    return error;
  }
}
export async function addColorsToProduct(
  id: string,
  colors: IColorProductVariation[],
  onUploadProgressChange: (progress: number) => void
) {
  try {
    let colorInt = 111110;
    let step = 100 / colors.length;
    let progress = 0;
    for (let color of colors) {
      const formData = new FormData();
      formData.append("file", color.color_image as File);
      formData.append("idProduct", id);
      formData.append("color_code", `#${colorInt.toString()}`);
      formData.append("color_price", color.color_price.toString());
      formData.append(
        "color_isPicked",
        color.color_isPicked ? "true" : "false"
      );
      console.log(id);
      colorInt++;
      await formApi.put(`product/addColorProduct`, formData);
      progress += step;
      onUploadProgressChange(progress);
    }
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
