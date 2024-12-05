import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

class API {
  private axiosInstance: AxiosInstance;

  constructor({ headerType = "json", authorization, idUser }: { headerType?: "json" | "formdata", authorization?: string, idUser?: string }) {
    const url = import.meta.env.VITE_API_URL;
    let headers = {
      "Content-Type": "application/json",
    };

    if (headerType === "formdata") {
      headers["Content-Type"] = "multipart/form-data";
    }

    this.axiosInstance = axios.create({
      baseURL: url,
      headers: headers,
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        const rToken = localStorage.getItem("refreshToken");
        if (token || authorization) {
          config.headers.authorization = `${authorization ? authorization : token}`;
        }
        if (rToken) {
          config.headers["x-rtoken-id"] = rToken;
        }
        const user = localStorage.getItem("user");
        if (user || idUser) {
          const userObj = JSON.parse(user);
          config.headers["x-client-id"] = idUser ? idUser : userObj._id;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  public async get<T>(url: string, params?: object): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: object,
    headersConfig?: { "Content-Type"?: string } // Optional headers config
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, {
      headers: headersConfig,
    });
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: object,
    headersConfig?: { "Content-Type"?: string } | any
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, {
      headers: headersConfig,
    });
    return response.data;
  }
  public async patch<T>(url: string, data?: object): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response.data;
  }
}

export default API;
