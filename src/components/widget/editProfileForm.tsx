import { IUser } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
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
import { CalendarIcon, Loader } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

const editProfileSchema = z
  .object({
    name: z.string({ required_error: "Tên không được để trống" }).max(128, {message: "Tên không được dài quá 128 ký tự"}),
    email: z.string({ required_error: "Email không được để trống" }).email(),
    phone: z
      .string({ required_error: "Số điện thoại không được để trống" })
      .min(10, { message: "Số điện thoại không hợp lệ" })
      .max(10, { message: "Số điện thoại không hợp lệ" }),
    street: z
      .string({ required_error: "Địa chỉ không được để trống" })
      .optional(),
    city: z
      .string({ required_error: "Quận/Huyện không được để trống" })
      .optional(),
    ward: z
      .string({ required_error: "Phường/Xã không được để trống" })
      .optional(),
    state: z.string().readonly(),
    country: z.string().readonly(),
    apartmentNumber: z.string().optional(),
    avatar: z
      .instanceof(File, { message: "Hình ảnh không được để trống" })
      .refine((x) => x.size < 104857600, {
        message: "kích cỡ file không được vượt quá 100MB",
      })
      .optional()
      .nullable(),
    birthDay: z.date({ required_error: "Ngày sinh không được để trống" }).optional().nullable(),
  })
  .required({
    name: true,
    email: true,
    phone: true,
  });
export type UserSchema = z.infer<typeof editProfileSchema>;
type EditProfileFormProps = {
  defaultValues?: {
    user: UserSchema;
    profilePicture?: string;
  };
  onSubmit?: (user: UserSchema) => void;
  loading?: boolean;
};
export default function EditProfileForm(props: EditProfileFormProps) {
  const form = useForm<UserSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {...props.defaultValues?.user, birthDay: props.defaultValues?.user.birthDay ? new Date(props.defaultValues?.user.birthDay) : null, state: "Thành phố Hồ Chí Minh", country: "Việt Nam"},
  });
  const { getDistricts, getWards, districts, wards } = useAddressPicker({defaultDistrict: props.defaultValues && props.defaultValues?.user.city});
  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(props.onSubmit, (e) => {console.error(e)})}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2 w-full">
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
                                : props.defaultValues?.profilePicture
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
                    <FormControl>
                      <Input
                        id="avatar-input"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          field.onChange(e.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
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
                name="birthDay"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label>Ngày sinh</Label>
                    <Popover>
                      <PopoverTrigger>
                        <FormControl>
                          <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal rounded-md",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Chọn ngày sinh</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown"
                          defaultMonth={new Date()}
                          
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                  <FormItem>
                    <Label>Quận/Huyện</Label>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(e) => {
                          getWards(e);
                          field.onChange(e);
                          form.setValue("ward", wards[0].name); 
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
                    <Label>Phường/Xã</Label>
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
              <FormField
                control={form.control}
                name="apartmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <Label>Căn hộ</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="button" variant="secondary">
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" disabled={props.loading}>
              {props.loading ? <Loader className="animate-spin" /> : "Lưu"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
