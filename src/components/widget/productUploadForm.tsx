import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import Dropzone from "react-dropzone";
import { prominent } from "color.js";
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
import {
  CircleHelp,
  Delete,
  HelpCircle,
  Image,
  ImagePlus,
  Images,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { formatBytes } from "@/utils";
import { Button, buttonVariants } from "../ui/button";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    product_name: z.string({ required_error: "Vui lòng nhập sản phẩm" }),
    product_description: z
      .string({ required_error: "Mô tả sản phẩm không được để trống" })
      .max(1024, { message: "Mô tả sản phẩm không được lớn hơn 1024 ký tự" })
      .optional(),
    product_thumb: z
      .instanceof(File, { message: "Hình ảnh không được để trống" })
      .refine((x) => x.size < 104857600, {
        message: "kích cỡ file không được vượt quá 100MB",
      })
      .optional(),
    product_price: z.coerce
      .number({
        required_error: "Giá sản phẩm không được để trống.",
        invalid_type_error: "Giá sản phẩm phải là một số",
      })
      .int({ message: "Giá sản phẩm phải là một số nguyên" })
      .positive({ message: "Giá không được âm." })
      .min(500, { message: "Giá sản phẩn phải lớn hơn 500 đồng." }),
    product_category: z
      .string({
        required_error: "Loại sản phẩm không được để trống.",
      })
      .optional(),
    isDraft: z.boolean().optional(),
    isPublished: z.boolean().optional(),
  })
  .required({
    product_name: true,
    product_price: true,
    product_category: true,
  });
export type ProductUploadFormProps = {
  onSubmit: (data: IProduct) => void;
  onUpdate?: (data: IProduct) => void;
  defaultValue?: IProduct;
  readOnly?: boolean;
};
export default function ProductUploadForm(props: ProductUploadFormProps) {
  const productThumbUrl = props.defaultValue
    ? props.defaultValue.product_thumb
    : null;
  function addProductColor() {
    setColorList([
      ...colorList,
      {
        color_code: "#000",
        color_name: "Đen",
        color_isPicked: false,
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
        size_isPicked: false,
      },
    ]);
  }
  function setSizeProperty(value: ISizeProductVarication, index: number) {
    const arr = sizeList.map((e, i) => {
      if (value.size_isPicked) {
        if (i != index) {
          return {
            ...e,
            size_isPicked: false,
          };
        }
      }
      if (i == index) {
        return {
          ...value,
        };
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
      if (value.color_isPicked) {
        if (i != index) {
          return {
            ...e,
            color_isPicked: false,
          };
        }
      }
      if (i == index) {
        return {
          ...value,
        };
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
      const index = cate.findIndex(
        (e) => e._id === props.defaultValue.product_category
      );
      console.log(props.defaultValue.product_category);
      if (props.defaultValue) {
        form.setValue("product_category", cate[index]._id);
      }
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
  const [colorList, setColorList] = useState<IColorProductVariation[]>(
    props.defaultValue
      ? props.defaultValue.product_colors.map((e) => {
          return {
            ...e,
            color_image: e.image_product_col,
          };
        })
      : [
          {
            color_code: "#000",
            color_price: 0,
            color_name: "",
            color_isPicked: true,
          },
        ]
  );
  const [sizeList, setSizeList] = useState<ISizeProductVarication[]>(
    props.defaultValue
      ? props.defaultValue.product_sizes
      : [
          {
            size_name: "S",
            size_price: 0,
            size_isPicked: true,
          },
          {
            size_name: "M",
            size_price: 0,
            size_isPicked: false,
          },
          {
            size_name: "L",
            size_price: 0,
            size_isPicked: false,
          },
          {
            size_name: "XL",
            size_price: 0,
            size_isPicked: false,
          },
        ]
  );
  const [deletedColorList, setDeletedColorList] = useState<string[]>([]);
  const [deletedSizeList, setDeletedSizeList] = useState<string[]>([]);
  const [imageList, setImageList] = useState<(File | string)[]>(
    props.defaultValue ? props.defaultValue.product_images : []
  );
  const [sizeValidationMessage, setSizeValidationMessage] =
    useState<string>(null);
  const [colorValidationMessage, setColorvalidationMessage] =
    useState<string>(null);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: props.defaultValue
      ? {
          product_name: props.defaultValue.product_name,
          product_description: props.defaultValue.product_description,
          product_price: props.defaultValue.product_price,
          product_thumb: null,
          isPublished: props.defaultValue.isPublished,
          isDraft: props.defaultValue.isDraft,
        }
      : {
          product_price: 0,
          isDraft: true,
        },
  });
  //TODO: return kiểu IProduct.
  function parseToIProduct(data: z.infer<typeof schema>): IProduct {
    const tmpData = {
      ...data,
      product_sizes: sizeList,
      product_colors: colorList,
      product_images: imageList,
    };
    return tmpData;
  }
  function validateColor(): boolean {
    const requiredFieldsFilled =
      colorList.filter(
        (e) => e.color_code == "" || !e.color_image
      ).length == 0;
    console.error(
      colorList.filter(
        (e) => e.color_code == ""
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
    if (props.defaultValue) {
      props.onUpdate(tmpData);
    } else {
      props.onSubmit(tmpData);
    }
  }
  function addImages(file: FileList) {
    const files = Array.from(file);
    if (imageList.length + files.length > 6) {
      toast({
        title: "Đã vượt quá số lượng hình ảnh cho phép",
        description: `Số lượng hình ảnh cho phép là 6 hình ảnh, hệ thống đã thêm ${
          6 - imageList.length
        } hình ảnh bạn đã chọn gần nhất.`,
      });
    }
    setImageList([
      ...imageList,
      ...files.filter((e, index) => index + imageList.length + 1 <= 6),
    ]);
  }
  function removeImage(index: number) {
    setImageList(imageList.filter((e, i) => i != index));
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
                  <Input
                    disabled={props.readOnly}
                    {...field}
                    placeholder="Bắt buộc"
                  />
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
                <Label>Mô tả sản phẩm</Label>
                <FormControl>
                  <Textarea
                    disabled={props.readOnly}
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
                <Label className="flex items-center gap-1">
                  Giá sản phẩm (giá sàn) <span className="text-red-400">*</span>
                </Label>
                <p className="text-sm">
                  Giá này sẽ thay đổi theo màu sắc và kích cỡ tương ứng.
                </p>
                <FormControl>
                  <Input
                    disabled={props.readOnly}
                    {...field}
                    placeholder="Bắt buộc"
                  />
                </FormControl>
                <p className="text-sm">
                  {Number(form.getValues("product_price")).toLocaleString() +
                    " "}{" "}
                  đồng
                </p>
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
                    value={cateList.length == 0 ? null : field.value}
                    defaultValue={
                      cateList.length > 0 && props.defaultValue
                        ? props.defaultValue.product_category
                        : ""
                    }
                    onValueChange={(e) => field.onChange(e)}
                    disabled={cateList.length == 0 || props.readOnly}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Chọn danh mục của sản phẩm...`}
                      ></SelectValue>
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
          <FormField
            control={form.control}
            name="product_thumb"
            render={({ field }) => (
              <FormItem>
                <Label>Hình chính của sản phẩm </Label>
                <FormControl>
                  <Label
                    htmlFor="image_picker"
                    className={`w-100 min-h-24 flex flex-col gap-2 border ${
                      field.value ? "border-solid shadow-sm" : "border-dashed"
                    } border-gray-200 rounded-2xl justify-center items-center py-4 hover:border-solid hover:shadow-sm transition-all active:scale-95`}
                  >
                    {
                      (!field.value || !productThumbUrl && (
                        <>
                          <Image className="text-gray-200" />
                          <p>Đăng tải hình ảnh</p>
                        </>
                      ))}
                    {field.value || productThumbUrl ? (
                      <>
                        <img
                          src={
                            field.value
                              ? URL.createObjectURL(field.value)
                              : productThumbUrl
                              ? (productThumbUrl as string)
                              : ""
                          }
                          className="h-24"
                        />
                        <p>
                          {field.value ? field.value.name : "Hình ảnh sản phẩm"}
                        </p>
                        {field.value && (
                          <p
                            className={`${
                              field.value.size >= 104857600
                                ? "text-red-400 font-bold"
                                : ""
                            }`}
                          >
                            {formatBytes(field.value.size)}
                          </p>
                        )}
                      </>
                    ) : null}
                    <Input
                      disabled={props.readOnly}
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
          <Label>Tuỳ chọn lưu</Label>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="isDraft"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl className="flex items-center gap-2">
                      <div>
                        <Switch
                          disabled={
                            !form.formState.isValid ||
                            form.getValues("product_thumb") == null ||
                            imageList.length == 0
                          }
                          checked={field.value}
                          onCheckedChange={(e) => {
                            field.onChange(e);
                            if (e) {
                              form.setValue("isPublished", false);
                            }
                          }}
                          id="draft-switch"
                        ></Switch>
                        <Label htmlFor="draft-switch">Lưu bản nháp</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="flex items-center gap-2">
                    <div>
                      <Switch
                        disabled={form.getValues("isDraft")}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="draft-switch"
                      ></Switch>
                      <Label htmlFor="draft-switch">Hiển thị</Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <hr className="h-full border-r border-gray-200" />
        <div className="flex-1 flex flex-col gap-2">
          <Label>Hình miêu tả sản phẩm</Label>
          <Label
            htmlFor={imageList.length == 0 ? "images-input" : ""}
            className={`px-4 w-100 min-h-24 flex flex-col gap-2 border border-gray-200 rounded-2xl justify-center items-center py-4 ${
              imageList.length != 0 ? "border-solid shadow-sm" : "border-dashed"
            } hover:border-solid hover:shadow-sm transition-all ${
              imageList.length == 0 ? "active:scale-95" : ""
            }`}
          >
            {imageList.length == 0 ? (
              <>
                <Images className="text-gray-200" />
                <p>Chọn 1 hoặc nhiều hình</p>
              </>
            ) : (
              <>
                <div className="w-full grid grid-cols-3 gap-2">
                  {imageList.map((e, index) => (
                    <div className="flex justify-center items-center px-4 py-8 border-gray-200 border rounded-xl relative">
                      {!props.readOnly && (
                        <Button
                          type="button"
                          onClick={() => {
                            removeImage(index);
                          }}
                          variant="secondary"
                          className="absolute right-2 top-2 bg-secondary/80 backdrop-blur-lg"
                        >
                          <Trash2
                            width={16}
                            height={16}
                            className="text-red-400"
                          />
                        </Button>
                      )}
                      <img
                        src={
                          e instanceof File ? URL.createObjectURL(e as File) : e
                        }
                        key={index}
                        className="h-24 object-contain rounded-lg"
                      />
                    </div>
                  ))}
                  {imageList.length != 6 && !props.readOnly && (
                    <label
                      htmlFor="images-input"
                      className="flex justify-center flex-col gap-2 border-gray-200 border items-center px-4 py-8 rounded-2xl relative"
                    >
                      <Plus />
                      <p>Thêm hình</p>
                    </label>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    {!props.readOnly && (
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                      >
                        Xoá tất cả
                      </Button>
                    )}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Xác nhận xoá tất cả hình ảnh sản phẩm
                      </DialogTitle>
                    </DialogHeader>
                    <p>
                      Bạn có chắc là muốn xoá tất cả hình ảnh sản phẩm không?
                      Việc này không thể hoàn tác.
                    </p>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          onClick={() => {
                            setImageList([]);
                          }}
                        >
                          Có
                        </Button>
                      </DialogClose>
                      <DialogClose>
                        <Button variant="secondary">Không</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
            <Input
              
              disabled={(props.readOnly || props.defaultValue) as boolean}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="images-input"
              onChange={(e) => {
                addImages(e.target.files);
              }}
            />
          </Label>
          <p>{imageList.length}/6 hình ảnh</p>
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
                      Hình ảnh <span className="text-red-400">*</span>
                    </TableHead>
                    <TableHead>
                      Mã màu
                    </TableHead>
                    <TableHead>Giá màu</TableHead>
                    <TableHead>Mặc định</TableHead>
                    {!props.readOnly && !props.defaultValue && <TableHead>H. Động</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colorList.map((e, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Label
                          htmlFor={`color-input-${index}`}
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              className: "py-0",
                            })
                          )}
                        >
                          {!e.color_image ? (
                            <ImagePlus width={16} height={16} />
                          ) : (
                            <img
                              className="h-full"
                              src={
                                e.color_image instanceof File
                                  ? URL.createObjectURL(e.color_image)
                                  : e.color_image
                              }
                            />
                          )}
                        </Label>
                        <Input
                          disabled={(props.readOnly || props.defaultValue) as boolean}
                          accept="image/*"
                          onChange={(el) => {
                            if (el.target.files[0]) {
                              prominent(
                                URL.createObjectURL(el.target.files[0]),
                                { amount: 1, format: "hex" }
                              ).then((color) => {
                                setColorList(
                                  colorList.map((e, i) => {
                                    if (i == index) {
                                      return {
                                        ...e,
                                        color_image: el.target.files[0],
                                        color_code: color as string,
                                      };
                                    }
                                    return e;
                                  })
                                );
                              });
                            }
                          }}
                          id={`color-input-${index}`}
                          className="p-0 rounded-none border-0 hidden"
                          type="file"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          disabled
                          value={e.color_code}
                          onChange={(el) => {
                            setColorProperty(
                              {
                                ...e,
                                color_code: el.target.value,
                              },
                              index
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          disabled={(props.readOnly || props.defaultValue) as boolean}
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
                          disabled={(props.readOnly || props.defaultValue) as boolean}
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
                      {!props.readOnly && !props.defaultValue && (
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
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
            {(!props.readOnly || !props.defaultValue) && (
              <Button
                type="button"
                variant="outline"
                className="text-sm"
                onClick={addProductColor}
              >
                Thêm màu
              </Button>
            )}
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
                    <TableHead>Mặc định</TableHead>
                    {!props.readOnly && !props.defaultValue && <TableHead>H. Động</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeList.map((e, i) => (
                    <TableRow>
                      <TableCell>
                        <Input
                          disabled={(props.readOnly || props.defaultValue) as boolean}
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
                          disabled={(props.readOnly || props.defaultValue) as boolean}
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
                          disabled={(props.readOnly || props.defaultValue) as boolean}
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
                        {!props.readOnly && !props.defaultValue && (
                          <Button
                            onClick={() => {
                              deleteSize(e);
                            }}
                            variant="outline"
                            type="button"
                          >
                            <Trash2 width={16} height={16} />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
            {!props.readOnly || props.defaultValue && (
              <Button
                type="button"
                variant="outline"
                className="text-sm"
                onClick={addProductSize}
              >
                Thêm kích cỡ
              </Button>
            )}
          </div>
          <p className="text-sm text-red-400">{sizeValidationMessage}</p>
          <div className="flex gap-2">
            <DialogClose className="flex-1">
              <Button variant="secondary" className="w-full" type="button">
                Huỷ
              </Button>
            </DialogClose>
            <Button className="flex-1">
              {props.defaultValue ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}{" "}
              {form.getValues("isDraft") ? " (nháp)" : ""}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
