import useAddressPicker from "@/hooks/use-address-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
const registerSchema = z
  .object({
    street: z.string({ required_error: "Địa chỉ không được để trống" }),
    state: z.string({ required_error: "Vui lòng chọn Quận/Huyện" }),
    ward: z.string({ required_error: "Vui lòng chọn Phường/Xã" }),
    zipCode: z.string().readonly(),
    city: z.string().readonly(),
  })
  .required();
type RegisterPersonalProps = {
  onSubmit: (data?: { userAddress: z.infer<typeof registerSchema> }) => void;
  onBackPressed: (data?: {
    userAddress: z.infer<typeof registerSchema>;
  }) => void;
  defaultValues?: any;
};
export default function RegisterAddress(props: RegisterPersonalProps) {
  const address = useAddressPicker({ defaultValues: props.defaultValues });
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: props.defaultValues || {
      city: "Thành phố Hồ Chí Minh",
      zipCode: "700000",
    },
  });
  async function onSubmit(data: z.infer<typeof registerSchema>) {
      const tmp = data;
      console.log(tmp)
    tmp.state = JSON.parse(tmp.state).full_name;
    tmp.ward = JSON.parse(tmp.ward).full_name;
    props.onSubmit({
      userAddress: tmp,
    });
  }
  return (
    <>
      <p className="text-center">
        Hãy nhập địa chỉ giao hàng của bạn và ấn 'Tiếp tục', bạn có thể bỏ qua
        bước này.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="street"
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
              name="state"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select
                      disabled={address.districts.length == 0}
                      onValueChange={(v) => {
                        const addressId = JSON.parse(v).id;
                        address.getWards(addressId);
                        field.onChange(v);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            address.districts.length == 0
                              ? "Đang tải..."
                              : `Quận/Huyện (*)`
                          }
                        ></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="flex-1">
                        {address.districts.map((e) => (
                          //@ts-ignore
                          <SelectItem value={JSON.stringify(e)} key={e.id}>
                            {e.full_name}
                          </SelectItem>
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
              name="ward"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select
                      disabled={address.wards.length == 0}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Phường/Xã (*)"></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="flex-1">
                        {address.wards.map((e) => (
                          //@ts-ignore
                          <SelectItem value={JSON.stringify(e)} key={e.id}>
                            {e.full_name}
                          </SelectItem>
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Thành phố" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Mã zip (Bắt buộc)" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button type="submit">Tiếp theo</Button>
        </form>
      </Form>
      <div className="w-full flex gap-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => {
            props.onBackPressed({ userAddress: form.getValues() });
          }}
        >
          Quay lại
        </Button>
        <Dialog>
          <DialogTrigger className="flex-1">
            <Button variant="secondary" className="w-full">
              Bỏ qua
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Bỏ qua nhập thông tin địa chỉ?</DialogTitle>
            <p>
              Việc này sẽ khiến bạn không thể đặt hàng giao tận nơi. Nhưng bạn
              có thể thay đổi sau khi đăng ký.
            </p>
            <DialogFooter>
              <DialogClose>
                <Button variant="secondary">Huỷ</Button>
              </DialogClose>
              <DialogClose>
                <Button>Đồng ý</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
