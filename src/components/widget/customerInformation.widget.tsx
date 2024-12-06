import useUser from "@/hooks/user-user";
import { Loader, Loader2, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import useAddressPicker from "@/hooks/use-address-picker";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { FormControl } from "@mui/material";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useCart } from "@/providers/CartContext";
import { createOrderFromCart } from "@/apis/order/order-repo";
import { useNavigate } from "react-router-dom";
export const addressSchema = z.object({
  street: z.string({ required_error: "Địa chỉ không được để trống" }),
  city: z.string({ required_error: "Quận/Huyện không được để trống" }),
  ward: z.string({ required_error: "Phường/Xã không được để trống" }),
  state: z.string().readonly(),
  country: z.string().readonly(),
  apartmentNumber: z.string().optional(),
});
export default function CustomerInformationPayment() {
  const { user, setUser, updateAddressUser } = useUser();
  const { paymentProducts, cart, createPendingOrder } = useCart();
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      state: "Thành phố Hồ Chí Minh",
      country: "Việt Nam",
    },
  });
  async function nextStep(data?: z.infer<typeof addressSchema>) {
    setLoading(true)
    const res = await createPendingOrder(user._id, data || user.userAddress)
    if(res instanceof Error) {
      console.error(res);
      return;
    }
    navigate("/payment/process")
    setLoading(false);
  }
  async function onSubmit(data: z.infer<typeof addressSchema>) {
    setLoading(true);
    const res = await updateAddressUser(data);
    if (res instanceof Error) {
      console.error(res);
      return;
    }
    await nextStep(data);
    setLoading(false);
  }
  const addressPicker = useAddressPicker({});
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-4  ">
      <b>Thông tin cá nhân</b>
      <div>
        <p>
          <span>
            <b>Họ tên:</b>
          </span>{" "}
          {user.name}
        </p>
        <p>
          <span>
            <b>Số điện thoại: </b>
          </span>{" "}
          {user.phone}
        </p>
        <p>
          <span>
            <b>Email: </b>
          </span>{" "}
          {user.email}
        </p>
      </div>
      <div>
        <b>Thông tin giao hàng</b>
        <p>
          Cửa hàng chỉ giao hàng trong khu vực trung tâm thành phố Hồ Chí Minh.
          Không tính phí giao hàng
        </p>
      </div>
      {user.userAddress ? (
        <>
          <div className="flex gap-2 items-center">
            <MapPin />
            <p>
              Địa chỉ: {user.userAddress.street}, {user.userAddress.city},{" "}
              {user.userAddress.state}
            </p>
          </div>
          <Button onClick={() => {nextStep()}}>
            {loading ? <Loader className="animate-spin" /> : "Tiếp theo"}
          </Button>
        </>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Label>Địa chỉ</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Label>Quận/Huyện</Label>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(e) => {
                        addressPicker.getWards(e);
                        field.onChange(e);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {addressPicker.districts.map((district) => (
                          <SelectItem value={district.name} key={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Label>Phường/Xã</Label>
                  <FormControl>
                    <Select
                      disabled={addressPicker.wards.length == 0}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường/xã"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {addressPicker.wards.map((ward) => (
                          <SelectItem value={ward.name} key={ward.id}>
                            {ward.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartmentNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Label>Căn hộ</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {loading ? <Loader className="animate-spin" /> : "Tiếp theo"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
