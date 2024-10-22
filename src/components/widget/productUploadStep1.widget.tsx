import { getCate } from "@/apis/cate/cate-repo";
import { ICategory } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { CircleHelp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const schema = z.object({
    product_name: z.string({ required_error: "Vui lòng nhập sản phẩm" }),
    product_description: z
      .string()
      .max(1024, { message: "Mô tả sản phẩm không được lớn hơn 1024 ký tự" }),
    product_thumb: z
      .instanceof(File, { message: "Hình ảnh không được để trống" })
      .refine((x) => x.size < 104857600, {
        message: "kích cỡ file không được vượt quá 100MB",
      }),
    product_price: z.coerce
      .number({
        required_error: "Giá sản phẩm không được để trống.",
        invalid_type_error: "Giá sản phẩm phải là một số",
      })
      .int({ message: "Giá sản phẩm phải là một số nguyên" })
      .positive({ message: "Giá không được âm." })
      .min(500, { message: "Giá sản phẩn phải lớn hơn 500 đồng." }),
    product_category: z.string({
      required_error: "Loại sản phẩm không được để trống.",
    }),
  });
export default function ProductUploadStep1() {
    const [cateList, setCateList] = useState<ICategory[]>([]);
    async function getAllCate() {
        try {
          const cateResult = await getCate();
          const cate: ICategory[] = cateResult.metadata;
          console.log(cate);
          setCateList(cate);
        } catch (e) {
          if (e instanceof AxiosError) {
            console.log(e);
          }
          console.log(e);
        }
      }
      useEffect(() => {
        getAllCate();
      }, []);
      const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
          product_price: 0,
        },
      });
    function onSubmit(data: z.infer<typeof schema>){
        
    }
      return <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 w-full"
      >
        <div className="flex-1 flex flex-col gap-2">
          <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Tên sản phẩm <span className="text-red-400">*</span>
                </Label>
                <FormControl>
                  <Input {...field} placeholder="Bắt buộc" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_description"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Mô tả sản phẩm <span className="text-red-400">*</span>
                </Label>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Bắt buộc, dưới 1024 ký tự"
                  />
                </FormControl>
                <p
                  className={`text-sm ${
                    (field.value ? field.value.length : 0) >= 1024
                      ? "text-red-400 font-bold"
                      : ""
                  }`}
                >
                  {field.value ? field.value.length : 0} / 1024 ký tự
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_price"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Giá sản phẩm (giá sàn) <span className="text-red-400">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelp width={16} height={16} />
                      </TooltipTrigger>
                      <TooltipContent className="bg-background shadow-lg max-w-64">
                        <b>Giá sàn sản phẩm</b>
                        <p>
                          Đây là mức giá ban đầu của sản phẩm. Khi bạn thêm các
                          kích cỡ và màu sắc, thì giá sẽ tăng theo giá của kích
                          cỡ và màu sắc mà người dùng chọn.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <FormControl>
                  <Input {...field} placeholder="Bắt buộc" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_category"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Loại sản phẩm <span className="text-red-400">*</span>
                </Label>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(e) => field.onChange(e)}
                    disabled={cateList.length == 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục của sản phẩm..."></SelectValue>
                      <SelectContent>
                        {cateList.map((e) => (
                          <SelectItem value={e._id} key={e._id}>
                            {e.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        </form>
      </Form>
}