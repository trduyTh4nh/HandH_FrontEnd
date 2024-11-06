import { AxiosError } from "axios";
import API from "../api";
import { log } from "console";
import { ICategory } from "@/types/category";

const api = new API({headerType: "json"});

//   async getCate() {
//     try {
//       const response = await api.get("category");
//       log;
//       return response;
//     } catch (error) {
//       const e = error as AxiosError;
//       return {
//         status: e.response?.status,
//         message: "Lỗi khi lấy danh sách danh mục sản phẩm",
//       };
//     }
//   }

// export default CateRepo;

export async function getCate() {
  try{
    const response = await api.get("category");
    return response;
  }catch(error){
    const e=error as AxiosError;
    return error
  }
}

export async function addCate(newCategory:ICategory) {
  try {
    const response = await api.post('category', {
      category: newCategory,
    });
    return response;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e)
    return error;
  }
  
}