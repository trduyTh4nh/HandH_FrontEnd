import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Dropzone from "react-dropzone";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  IColorProductVariation,
  IProduct,
  ISizeProductVarication,
} from "@/types/product.type";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ICategory } from "@/types/category";
import { getCate } from "@/apis/cate/cate-repo";
import { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ProductItem from "./productItem.widget";
import { CircleHelp, Delete, Image, Trash2, X } from "lucide-react";
import { formatBytes } from "@/utils";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableCell } from "@mui/material";
import { Switch } from "../ui/switch";
import { DialogClose } from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
type ProductUploadFormProps = {
  onSubmit: (data: IProduct) => void;
  defaultValue?: IProduct;
};
export default function ProductUploadForm(props: ProductUploadFormProps) {
  function addProductColor() {
    setColorList([
      ...colorList,
      {
        color_code: "#000",
        color_name: "Đen",
        color_isPicked: true,
        color_price: 0,
      },
    ]);
  }
  function addProductSize() {
    setSizeList([
      ...sizeList,
      {
        size_name: "",
        size_price: 0,
        size_isPicked: true,
      },
    ]);
  }
  function setSizeProperty(value: ISizeProductVarication, index: number) {
    const arr = sizeList.map((e, i) => {
      if (i == index) {
        return value;
      }
      return e;
    });
    setSizeList(arr);
  }
  function deleteSize(value: ISizeProductVarication) {
    setSizeList(sizeList.filter((e) => e != value));
  }
  function deleteColor(value: IColorProductVariation) {
    setColorList(colorList.filter((e) => e != value));
  }
  function setColorProperty(value: IColorProductVariation, index: number) {
    const arr = colorList.map((e, i) => {
      if (i == index) {
        return value;
      }
      return e;
    });
    setColorList(arr);
  }
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
  const [cateList, setCateList] = useState<ICategory[]>([]);
  const [colorList, setColorList] = useState<IColorProductVariation[]>([
    {
      color_code: "#000",
      color_price: 0,
      color_name: "",
      color_isPicked: true,
    },
  ]);
  const [sizeList, setSizeList] = useState<ISizeProductVarication[]>([
    {
      size_name: "S",
      size_price: 0,
      size_isPicked: true,
    },
    {
      size_name: "M",
      size_price: 0,
      size_isPicked: true,
    },
    {
      size_name: "L",
      size_price: 0,
      size_isPicked: true,
    },
    {
      size_name: "XL",
      size_price: 0,
      size_isPicked: true,
    },
  ]);
  const [sizeValidationMessage, setSizeValidationMessage] =
    useState<string>(null);
  const [colorValidationMessage, setColorvalidationMessage] =
    useState<string>(null);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_price: 0,
    },
  });
  //TODO: return kiểu IProduct.
  function parseToIProduct(data: z.infer<typeof schema>): IProduct {
    const tmpData = {
      ...data,
      product_sizes: sizeList,
      product_colors: colorList,
      isDraft: true,
      isPublished: false,
    };
    return tmpData;
  }
  function validateColor(): boolean {
    const requiredFieldsFilled =
      colorList.filter(
        (e) => e.color_code == "" || e.color_name == "" || e.color_price < 0
      ).length == 0;
    console.error(
      colorList.filter(
        (e) => e.color_code == "" || e.color_name == "" || e.color_price < 0
      )
    );
    return requiredFieldsFilled;
  }
  function validateSize(): boolean {
    const requiredFieldsFilled =
      sizeList.filter((e) => e.size_name == "" || e.size_price < 0).length == 0;
    return requiredFieldsFilled;
  }
  async function onSubmit(data: z.infer<typeof schema>) {
    if (!validateColor() && (colorList.length > 0 || sizeList.length > 0)) {
      setColorvalidationMessage(
        "Vui lòng nhập đầy đủ các trường bắt buộc của màu sắc"
      );
      if (!validateSize() && sizeList.length > 0) {
        setSizeValidationMessage(
          "Vui lòng nhập đẩy đủ các trường bắt buộc của kích cỡ"
        );
      }
      return;
    }
    const tmpData = parseToIProduct(data);
    console.log(tmpData);
    setColorvalidationMessage(null);
    setSizeValidationMessage(null);
    props.onSubmit(tmpData);
  }
  return (
    <Form {...form}>
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
        <hr className="h-full border-r border-gray-200" />
        <div className="flex-1 flex flex-col gap-2">
          <FormField
            control={form.control}
            name="product_thumb"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Hình sản phẩm <span className="text-red-400">*</span>
                </Label>
                <FormControl>
                  <Label
                    htmlFor="image_picker"
                    className={`w-100 min-h-24 flex flex-col gap-2 border ${
                      field.value ? "border-solid shadow-sm" : "border-dashed"
                    } border-gray-200 rounded-2xl justify-center items-center py-4 hover:border-solid hover:shadow-sm transition-all active:scale-95`}
                  >
                    {!field.value && (
                      <>
                        <Image className="text-gray-200" />
                        <p>Đăng tải hình ảnh</p>
                      </>
                    )}
                    {field.value && (
                      <>
                        <img
                          src={
                            field.value ? URL.createObjectURL(field.value) : ""
                          }
                          className="h-24"
                        />
                        <p>{field.value.name}</p>
                        <p
                          className={`${
                            field.value.size >= 104857600
                              ? "text-red-400 font-bold"
                              : ""
                          }`}
                        >
                          {formatBytes(field.value.size)}
                        </p>
                      </>
                    )}
                    <Input
                      className="hidden"
                      id="image_picker"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        console.log(e.target.files);
                        field.onChange(e.target.files[0]);
                      }}
                      placeholder="Bắt buộc"
                    />
                  </Label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Label>
            Màu sản phẩm <span className="text-red-400">*</span>
          </Label>
          <div
            className={`border ${
              colorList.length == 0 ? "border-dashed" : "border-solid"
            } p-4 rounded-2xl flex justify-center flex-col gap-2`}
          >
            {colorList.length != 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      Màu sắc <span className="text-red-400">*</span>
                    </TableHead>
                    <TableHead>
                      Tên màu <span className="text-red-400">*</span>
                    </TableHead>
                    <TableHead>Giá màu</TableHead>
                    <TableHead>Hiển thị</TableHead>
                    <TableHead>H. Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colorList.map((e, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          onChange={(el) => {
                            setColorProperty(
                              {
                                ...e,
                                color_code: el.target.value,
                              },
                              index
                            );
                          }}
                          value={e.color_code}
                          id={`color-input-${index}`}
                          className="p-0 rounded-none border-0"
                          type="color"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={e.color_name}
                          onChange={(el) => {
                            setColorProperty(
                              {
                                ...e,
                                color_name: el.target.value,
                              },
                              index
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="0"
                          value={e.color_price == 0 ? "" : e.color_price}
                          type="number"
                          onChange={(el) => {
                            setColorProperty(
                              {
                                ...e,
                                color_price: Number(el.target.value),
                              },
                              index
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          onCheckedChange={(el) => {
                            setColorProperty(
                              {
                                ...e,
                                color_isPicked: el,
                              },
                              index
                            );
                          }}
                          checked={e.color_isPicked}
                        ></Switch>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            deleteColor(e);
                          }}
                        >
                          <Trash2 width={16} height={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
            <Button
              type="button"
              variant="outline"
              className="text-sm"
              onClick={addProductColor}
            >
              Thêm màu
            </Button>
          </div>
          <p className="text-sm text-red-400">{colorValidationMessage}</p>
          <p className="text-sm">Kích cỡ sản phẩm</p>
          <div
            className={`border ${
              sizeList.length == 0 ? "border-dashed" : "border-solid"
            } p-4 rounded-2xl flex justify-center flex-col gap-2`}
          >
            {sizeList.length != 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Tên kích cỡ <span className="text-red-400">*</span>
                    </TableHead>
                    <TableHead>Giá kích cỡ</TableHead>
                    <TableHead>Hiển thị</TableHead>
                    <TableHead>H. Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeList.map((e, i) => (
                    <TableRow>
                      <TableCell>
                        <Input
                          onChange={(el) => {
                            setSizeProperty(
                              {
                                ...e,
                                size_name: el.target.value,
                              },
                              i
                            );
                          }}
                          value={e.size_name}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="0"
                          onChange={(el) => {
                            setSizeProperty(
                              {
                                ...e,
                                size_price: Number(el.target.value),
                              },
                              i
                            );
                          }}
                          value={
                            e.size_price == -1 || e.size_price == 0
                              ? ""
                              : e.size_price
                          }
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          onCheckedChange={(el) => {
                            setSizeProperty(
                              {
                                ...e,
                                size_isPicked: el,
                              },
                              i
                            );
                          }}
                          checked={e.size_isPicked}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            deleteSize(e);
                          }}
                          variant="outline"
                          type="button"
                        >
                          <Trash2 width={16} height={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
            <Button
              type="button"
              variant="outline"
              className="text-sm"
              onClick={addProductSize}
            >
              Thêm kích cỡ
            </Button>
          </div>
          <p className="text-sm text-red-400">{sizeValidationMessage}</p>
          <div className="flex gap-2">
            <DialogClose className="flex-1">
              <Button variant="secondary" className="w-full" type="button">
                Huỷ
              </Button>
            </DialogClose>
            <Button className="flex-1">Thêm sản phẩm</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
