import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

class API {
  private axiosInstance: AxiosInstance;

  constructor({ headerType = "json" }: { headerType?: "json" | "formdata" }) {
    const url = import.meta.env.VITE_API_URL;
    console.log(url);

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
        if (token) {
          config.headers.authorization = `${token}`;
        }
        const user = localStorage.getItem("user");
        if (user) {
          const userObj = JSON.parse(user);
          config.headers["x-client-id"] = userObj._id;
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

  public async put<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.put<T>(url);
    return response.data;
  }
}

export default API;
