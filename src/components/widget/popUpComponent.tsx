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
import { DialogClose } from "../ui/dialog";

function PopupComponent({ handleChange, switchToRegister }: any) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
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
    try {
      const response = await api.post("access/login", {
        email: data.email,
        password: data.password,
      });
      console.log(response);
      //@ts-ignore
      localStorage.setItem("token", response.metadata.tokens.accessToken);
      //@ts-ignore
      localStorage.setItem("user", JSON.stringify(response.metadata.user));
      //@ts-ignore
      toast({
        //@ts-ignore
        title: `Chào mừng, ${response.metadata.user.name}`,
        description: "Bạn đã đăng nhập thành công!",
      });
      handleChange(true);
    } catch (error) {
      const e = error as AxiosError;
      const response = e.response;
      if (response?.status === 401 || response?.status === 400) {
        form.setError("password", {
          message: "Email hoặc mật khẩu không đúng",
        });
      }
      console.log(response);
    }
    setLoading(false);
  }
  return (
    <div className="flex gap-4 items-center w-full">
      <div className="flex-1 h-full">
        <img
          src="src/assets/image/imglogin.jpg"
          alt="login"
          className="w-full rounded-2xl object-contain h-full"
        />
      </div>
      <div className="flex flex-col items-center gap-4 w-1/2">
        <img src="src/assets/image/logo_header.svg" />
        <h2 style={{ fontWeight: "bold" }}>Đăng nhập</h2>
        <p className="text-center">
          Chào mừng quay lại, hãy tiếp tục mua sắm với chúng tôi nào.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="w-full flex flex-col gap-2"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
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
            <Button type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Tiếp theo"}
            </Button>
          </form>
        </Form>
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
