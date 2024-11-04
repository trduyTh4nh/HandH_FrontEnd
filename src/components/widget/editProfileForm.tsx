import { IUser } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import useAddressPicker from "@/hooks/use-address-picker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

const editProfileSchema = z.object({
  name: z.string({ required_error: "Tên không được để trống" }),
  email: z.string({ required_error: "Email không được để trống" }).email(),
  phone: z
    .string({ required_error: "Số điện thoại không được để trống" })
    .min(10, { message: "Số điện thoại không hợp lệ" })
    .max(10, { message: "Số điện thoại không hợp lệ" }),
  street: z.string({ required_error: "Địa chỉ không được để trống" }),
  city: z.string({ required_error: "Quận/Huyện không được để trống" }),
  ward: z.string({ required_error: "Phường/Xã không được để trống" }),
  state: z.string().readonly(),
  country: z.string().readonly(),
  apartmentNumber: z.string().optional(),
  avatar: z
    .instanceof(File, { message: "Hình ảnh không được để trống" })
    .refine((x) => x.size < 104857600, {
      message: "kích cỡ file không được vượt quá 100MB",
    })
    .optional(),
  birthDay: z.date().optional(),
});
type UserSchema = z.infer<typeof editProfileSchema>;
type EditProfileFormProps = {
  user?: UserSchema;
  onSubmit?: (user: UserSchema) => void;
};
export default function EditProfileForm(props: EditProfileFormProps) {
  const form = useForm<UserSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: props.user,
  });
  const { getDistricts, getWards, districts, wards } = useAddressPicker({});
  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(props.onSubmit)}
          className="flex gap-2"
        >
          <div className="w-1/2 flex flex-col gap-2">
            <p className="text-lg font-semibold leading-none tracking-tight">
              Thông tin cá nhân
            </p>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <>
                  <Label className="cursor-pointer" htmlFor="avatar-input">
                    <Card className="flex flex-col justify-center p-4 items-center gap-2">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={
                            field.value
                              ? URL.createObjectURL(field.value)
                              : null
                          }
                        ></AvatarImage>
                        <AvatarFallback>
                          {form
                            .getValues("name")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm">
                        Ấn vào đây để chỉnh sửa ảnh đại diện
                      </p>
                    </Card>
                  </Label>
                  <input
                    id="avatar-input"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                    }}
                  />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Họ tên <span className="text-red-400">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
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
                  <Label>
                    Số điện thoại <span className="text-red-400">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <hr className="h-full border-r border-gray-200" />
          <div className="space-y-2 w-1/2">
            <p className="text-lg font-semibold leading-none tracking-tight">
              Thông tin giao hàng
            </p>
            <p className="text-sm">
              Chính sách giao hàng: Chỉ giao hàng miễn phí trong khu vực trung
              tâm TP. Hồ Chí Minh
            </p>
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Địa chỉ <span className="text-red-400">*</span>
                  </Label>
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
                <FormItem>
                  <Label>
                    Quận/Huyện <span className="text-red-400">*</span>
                  </Label>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(e) => {
                        getWards(e);
                        field.onChange(e);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
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
                <FormItem>
                  <Label>
                    Phường/Xã <span className="text-red-400">*</span>
                  </Label>
                  <FormControl>
                    <Select
                      disabled={wards.length == 0}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường/xã"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((ward) => (
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
          </div>
        </form>
        <DialogFooter className="flex gap-4">
          <DialogClose className="flex gap-4">
            <Button type="button" variant="secondary">
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </DialogClose>
        </DialogFooter>
      </Form>
    </div>
  );
}
