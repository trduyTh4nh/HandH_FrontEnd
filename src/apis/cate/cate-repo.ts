import { AxiosError } from "axios";
import API from "../api";
import { log } from "console";

const api = new API();

class CateRepo {
  async getCate() {
    try {
      const response = await api.get("category");
      log;
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return {
        status: e.response?.status,
        message: "Lỗi khi lấy danh sách danh mục sản phẩm",
      };
    }
  }
}

export default CateRepo;
