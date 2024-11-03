import { IUser } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import useAddressPicker from "@/hooks/use-address-picker";

const editProfileSchema = z.object({
  name: z.string({ required_error: "Tên không được để trống" }),
  email: z.string({ required_error: "Email không được để trống" }).email(),
  phone: z
    .string({ required_error: "Số điện thoại không được để trống" })
    .min(10, { message: "Số điện thoại không hợp lệ" })
    .max(10, { message: "Số điện thoại không hợp lệ" }),
  street: z.string({ required_error: "Địa chỉ không được để trống" }),
  city: z.string({ required_error: "Quận/Huyện không được để trống" }),
  state: z.string().readonly(),
  country: z.string().readonly(),
  apartmentNumber: z.string().optional(),
  avatar: z
    .instanceof(File, { message: "Hình ảnh không được để trống" })
    .refine((x) => x.size < 104857600, {
      message: "kích cỡ file không được vượt quá 100MB",
    })
    .optional(),
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
        <form onSubmit={form.handleSubmit(props.onSubmit)}></form>
      </Form>
    </div>
  );
}
