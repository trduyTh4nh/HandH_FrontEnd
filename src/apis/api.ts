import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

class API {
  private axiosInstance: AxiosInstance;

  constructor() {
    const url = import.meta.env.VITE_API_URL;
    console.log(url);
    this.axiosInstance = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.authorization = `${token}`;
          console.log("HEADER config: ", config.headers);
        }
        const user = localStorage.getItem("user");
        if (user) {
          const userObj = JSON.parse(user);
          config.headers["x-client-id"] = userObj._id;
        }
        // TODO: cứng. sau khi t làm xong login thì lấy token từ localStorage ra.

        console.log("HEADER config: ", config.headers);
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

  public async post<T>(url: string, data?: object): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
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
