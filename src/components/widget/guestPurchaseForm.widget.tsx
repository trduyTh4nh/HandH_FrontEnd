import { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  Form,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
type GuestPurchaseFormProps = {
  onSubmit: (data: any) => void;
};
export default function GuestPurchaseForm(props: GuestPurchaseFormProps) {
  const formSchema = z
    .object({
      surname: z
        .string({
          required_error: "Họ không được để trống",
        })
        .min(2, { message: "Họ phải có ít nhất 2 ký tự" }),
      name: z
        .string({
          required_error: "Tên không được để trống",
        })
        .min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
      email: z
        .string()
        .email({ message: "Email không hợp lệ" })
        .optional()
        .or(z.literal("")),
      phone: z
        .string({ required_error: "Số điện thoại không được để trống" })
        .min(10, { message: "Số điện thoại không hợp lệ" })
        .max(11, { message: "Số điện thoại không hợp lệ" }),
      addressAve: z.string({
        required_error: "Địa chỉ không được để trống",
      }),
      addressDistrict: z.string({ required_error: "Vui lòng chọn Quận/Huyện" }),
      addressWard: z.string({ required_error: "Vui lòng chọn Phường/Xã" }),
      addressCity: z.string().readonly(),
    })
    .required({
      surname: true,
      name: true,
      phone: true,
      addressAve: true,
      addressDistrict: true,
      addressWard: true,
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressCity: "Thành phố Hồ Chí Minh",
    },
  });
  function onSubmit(value: z.infer<typeof formSchema>) {
    //TODO: Submit form
    console.log(value);
    props.onSubmit(value);
  }
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  async function getDistricts() {
    const res = await axios.get("https://esgoo.net/api-tinhthanh/2/79.htm");
    setDistricts(res.data.data);
  }
  async function getWards(districtId: any) {
    const res = await axios.get(
      `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
    );
    setWards(res.data.data);
  }
  useEffect(() => {
    getDistricts();
  }, []);
  return (
    <>
      <b>Thông tin khách hàng</b>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Họ (Bắt buộc)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Tên (Bắt buộc)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Số điện thoại (Bắt buộc)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="addressAve"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Địa chỉ (Bắt buộc)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="addressDistrict"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select
                      disabled={districts.length == 0}
                      onValueChange={(v) => {
                        getWards(v);
                        field.onChange(v);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            districts.length == 0 ? "Đang tải..." : `Quận/Huyện (Bắt buộc)`
                          }
                        ></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((e) => (
                          //@ts-ignore
                          <SelectItem value={e.id} key={e.id}>{e.full_name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="addressWard"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select disabled={wards.length == 0} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Phường/Xã (Bắt buộc)"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((e) => (
                          //@ts-ignore
                          <SelectItem value={e.id} key={e.id}>{e.full_name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormField
              control={form.control}
              name="addressCity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Thành phố" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          <Button type="submit">Tiếp theo</Button>
        </form>
      </Form>
      {/* <div className="flex gap-2">
        <Input placeholder="Họ" />
        <Input placeholder="Tên" />
      </div>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Số điện thoại" type="phone" />
      <b>Thông tin giao hàng</b>
      <p>
        Cửa hàng chỉ giao hàng trong khu vực trung tâm thành phố. Không tính phí
        giao hàng
      </p>
      <Input placeholder="Địa chỉ" />
      <div className="flex gap-2">
        <Select
          disabled={districts.length == 0}
          onValueChange={(v) => {
            setWards([]);
            getWards(v);
          }}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={districts.length == 0 ? "Đang tải..." : `Quận/Huyện`}
            ></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {districts.map((e) => (
              //@ts-ignore
              <SelectItem value={e.id}>{e.full_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select disabled={wards.length == 0}>
          <SelectTrigger>
            <SelectValue placeholder="Phường/Xã"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {wards.map((e) => (
              //@ts-ignore
              <SelectItem value={e}>{e.full_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input value="Thành phồ Hồ Chí Minh" disabled /> */}
    </>
  );
}
