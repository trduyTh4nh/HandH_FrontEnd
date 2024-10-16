import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
type RegisterPersonalProps = {
    onSubmit: (data: z.infer<typeof registerSchema>) => void;
    defaultValue?: any;
}
const registerSchema = z
  .object({
    fullName: z
      .string({ required_error: "Họ tên không được bỏ trống" })
      .min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
    email: z
      .string({ required_error: "Email không được bỏ trống" })
      .email({ message: "Email không hợp lệ" }),
    phone: z
      .string({
        required_error: "Số điện thoại không được bỏ trống",
        invalid_type_error: "Số điện thoại không hợp lệ",
      })
      .min(10, { message: "Số điện thoại phải có ít nhất 10 số" }),
    password: z
      .string({ required_error: "Mật khẩu không được bỏ trống" })
      .min(8, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: "Mật khẩu phải có ít nhất 8 chữ số, 1 chữ và 1 số.",
      }),
    rePassword: z
      .string({ required_error: "Bạn phải nhập lại mật khẩu của mình" })
      .min(8, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Mật khẩu không khớp",
    path: ["rePassword"],
  });
export default function RegisterPersonal(props: RegisterPersonalProps) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: props.defaultValue,
  });
  async function onSubmit(data: z.infer<typeof registerSchema>) {
    props.onSubmit(data);
  }
  return (
    <>
      <p className="text-center">
        Hãy nhập những thông tin cá nhân của bạn và ấn 'Tiếp tục'.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Họ Tên (Bắt buộc)"
                    name="nameText"
                    id="nameText"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Email (Bắt buộc)"
                    name="emailText"
                    id="emailText"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    placeholder="Số điện thoại (Bắt buộc)"
                    name="phoneText"
                    id="phoneText"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Mật khẩu (Bắt buộc)"
                    name="passwordText"
                    id="passwordText"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Nhập lại mật khẩu (Bắt buộc)"
                    name="rePasswordText"
                    id="rePasswordText"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Tiếp theo</Button>
        </form>
      </Form>
    </>
  );
}
