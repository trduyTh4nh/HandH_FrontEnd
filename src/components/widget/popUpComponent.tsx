import { Close } from "@mui/icons-material";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import API from "@/apis/api";
import { AxiosError } from "axios";
import { useState } from "react";
import { Loader, Loader2 } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";

function PopupComponent({ handleChange, switchToRegister }: any) {
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const loginSchema = z
    .object({
      email: z
        .string({ required_error: "Email không được để trống" })
        .email({ message: "Email không hợp lệ" }),
      password: z.string({ required_error: "Mật khẩu không được để trống" }),
    })
    .required({
      email: true,
      password: true,
    });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  async function handleLogin(data: z.infer<typeof loginSchema>) {
    setLoading(true);
    console.log(data);
    const api = new API();
    try{
      const response = await api.post("access/login", {"email": data.email, "password": data.password});
      console.log(response);
      //@ts-ignore
      localStorage.setItem("token", response.metadata.tokens.accessToken);
      //@ts-ignore
      localStorage.setItem("user", JSON.stringify(response.metadata.user));
      //@ts-ignore
      toast({title: `Chào mừng, ${response.metadata.user.name}`, description: "Bạn đã đăng nhập thành công!"});
      handleChange();
    } catch (error) {
      const e = error as AxiosError;
      const response = e.response;
      if (response?.status === 401 || response?.status === 400) {
        form.setError("password", {message: "Email hoặc mật khẩu không đúng"});
      }
      console.log(response);
    }
    setLoading(false);
  }
  return (
    <div className="overlay">
      <div className="popup-login">
        <div className="btn-close">
          <Close onClick={handleChange}></Close>
        </div>
        <h1 style={{ fontWeight: "bold" }}>Đăng nhập</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="w-[85%] flex flex-col gap-2"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-primary-grey w-full"
                      type="text"
                      placeholder="Email"
                      name="emailText"
                      id="emailText"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-primary-grey"
                      type="password"
                      placeholder="Mật khẩu"
                      name="passText"
                      id="passText"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>{loading ? <Loader className="animate-spin"/> : "Tiếp theo"}</Button>
          </form>
        </Form> 

        <h3 className="or-text">Hoặc</h3>
        <button className="btn-continute-with-google">
          <img
            className="h-8 w-auto"
            src="\src\assets\image\logo_google.png"
            alt="Logo"
          />
          Tiếp tục với Google
        </button>
        <div className="bottom-popup-login">
          <h4>Chưa có tài khoản?</h4>
          <h4
            onClick={switchToRegister}
            className="text-color-secondnary"
            id="text-register"
          >
            Đăng ký
          </h4>
        </div>
      </div>
    </div>
  );
}

export default PopupComponent;
