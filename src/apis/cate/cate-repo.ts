import { AxiosError } from "axios";
import API from "../api";

const api = new API();
async function getCate(){
    try {
        const response = await api.get("category");
        return response;
    } catch (error) {
        const e = error as AxiosError;
        return {
            status: e.response?.status,
            message: "Lỗi khi lấy danh sách danh mục sản phẩm"
        }
    }
    
}