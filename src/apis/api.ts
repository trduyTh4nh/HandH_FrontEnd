import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

class API {
  private axiosInstance: AxiosInstance;

  constructor() {
    const url = process.env.API_URL;
    this.axiosInstance = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers.authorization = `Bearer ${token}`;
        //   console.log("HEADER config: ", config.headers);
        // }
        // TODO: cứng. sau khi t làm xong login thì lấy token từ localStorage ra.
        config.headers.authorization =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZiNzdjZmY4NDhlYjkzOWRiMTVjYzY2IiwiZW1haWwiOiJkdXl0aGFuaEBnbWFpbC5jb20iLCJpYXQiOjE3Mjc3ODIzMzQsImV4cCI6MTcyNzk1NTEzNH0.0X0hjsrb-c_koVal0mX-xYYLMGCdBXE1Ev8U1_ZoYc0";
        config.headers["x-client-id"] = "66b77cff848eb939db15cc66";

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
}

export default API;
