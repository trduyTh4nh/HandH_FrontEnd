import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  FileEdit,
  AwardIcon,
  Loader,
  AlertTriangle,
  Image,
  ImageUp,
  Info,
} from "lucide-react";
import { IBanner } from "@/types/banner.type";
import HomeBanner from "@/components/widget/homeBanner";

import {
  createBanner,
  deleteBanner,
  getAllBanner,
  publishBanner,
  unPublishBanner,
  updateModeBanner,
} from "@/apis/banner/banner-repo";
import { AxiosError } from "axios";
import { IProduct } from "@/types/product.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { convertMoney } from "@/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getProduct } from "@/apis/products/product-repo";
import { Checkbox } from "@/components/ui/checkbox";

type togglePublish = {
  loading?: boolean;
  id?: string;
};

type toggleBannerMode = {
  loading?: boolean;
  id?: string;
};

const BannerPage: React.FC = () => {
  // const [banners, setBanners] = useState<IBanner[]>([]);
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [checkPublich, setCheckPublich] = useState(false);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [loadingBannerMode, setLoadingBannerMode] =
    React.useState<toggleBannerMode>({
      loading: false,
      id: null,
    });
  const [banner, setBanner] = React.useState([]);
  const [mainBanner, setMainBanner] = React.useState(null);
  const [stateIdDelete, setStateIdDelete] = React.useState("");
  const [checkMain, setCheckMain] = React.useState(false);
  const [togglePublish, setTogglePublish] = useState<togglePublish>({
    loading: false,
    id: "",
  });

  async function fetch() {
    setLoading(true);
    const data = await getAllBanner();
    if (data instanceof AxiosError) {
      console.log("Data: ", data.message);
      setError(data);
    } else {
      setBanner(data.metadata);
      console.log("Banner: ", data.metadata);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    setMainBanner(banner.find((ban) => ban.isMain));
  }, [banner]);
  const handleAddBanner = (newBanner: IBanner) => {
    console.log("add banner new", newBanner);

    fetch();
    setIsAddDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    console.log("CONFIRM DELETE:");
    console.log(stateIdDelete);

    const bannerDelete = await banner.find((ban) => ban._id === stateIdDelete);

    if (bannerDelete.isActive) {
      setCheckPublich(true);
    } else {
      setLoadingDelete(true);
      await deleteBanner(bannerDelete._id);
      setLoadingDelete(false);

      setBanner(banner.filter((banner) => banner._id !== bannerDelete._id));
    }

    console.log(bannerDelete);

    setIsConfirmDialogOpen(false);
  };

  const handleDeleteBanner = (id: string) => {
    console.log("DELETE BANNER: ", id);
    setStateIdDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const handleTogglePublish = async (id: string, typeCall: boolean) => {
    console.log("typeCall", typeCall);
    setTogglePublish({ loading: true, id: id });
    const result = typeCall
      ? await publishBanner(id)
      : await unPublishBanner(id);
    console.log("result", result);
    setTogglePublish(result.metadata.isActive);

    setBanner((prevBanners: any) =>
      prevBanners.map((banner) =>
        banner._id === id
          ? { ...banner, isActive: result.metadata.isActive }
          : banner
      )
    );
    setTogglePublish({ loading: false, id: null });
  };

  function ConfirmDialog() {
    return (
      <form onSubmit={handleConfirmDelete} className="space-y-4">
        <div className="space-y-2">
          <Label>Bạn có chắc muốn xóa?</Label>
        </div>
        <div className=" flex justify-end gap-4">
          <Button
            className="w-24"
            type="button"
            onClick={() => setIsConfirmDialogOpen(false)}
          >
            Hủy
          </Button>
          <Button className="w-24" type="submit">
            {loadingDelete ? (
              <Loader className="animate-spin" />
            ) : (
              <div>Có</div>
            )}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6 w-full h-screen">
      <h1 className="text-3xl font-bold">Quản lý hình ảnh</h1>
      <Tabs defaultValue="main">
        <TabsList>
          <TabsTrigger value="main">Banner chính</TabsTrigger>
          <TabsTrigger value="sub">Banner con</TabsTrigger>
        </TabsList>
        <TabsContent value="main">
          <Card>
            <CardHeader>
              <CardTitle>Banner chính</CardTitle>
            </CardHeader>
            <CardContent>
              {mainBanner && (
                <HomeBanner
                  title={mainBanner.title}
                  description={mainBanner.content}
                  image={mainBanner.url}
                  link=""
                  button=""
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sub">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Banner</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm banner
                  </Button>
                </DialogTrigger>
                <DialogContent className="min-w-[50%] max-h-screen overflow-auto">
                  <DialogHeader>
                    <DialogTitle>Thêm banner</DialogTitle>
                  </DialogHeader>
                  <BannerForm onSubmit={handleAddBanner} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={isConfirmDialogOpen}
                onOpenChange={setIsConfirmDialogOpen}
              >
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent>
                  <ConfirmDialog></ConfirmDialog>
                </DialogContent>
              </Dialog>

              <Dialog open={checkPublich} onOpenChange={setCheckPublich}>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent>
                  <h2>Banner phải được ẩn trước khi xóa! 🥺</h2>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hình ảnh</TableHead>
                    <TableHead>Nội dung</TableHead>
                    <TableHead>Url hình ảnh</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!loading ? (
                    banner.map((banner) => (
                      <TableRow key={banner._id}>
                        <TableCell>
                          <img
                            src={banner.url}
                            alt={banner.title}
                            className="w-20 h-auto"
                          />
                        </TableCell>
                        <TableCell>{banner.title}</TableCell>
                        <TableCell className="max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                          {banner.url}
                        </TableCell>
                        <TableCell>
                          {banner.isActive ? "Công khai" : "Ẩn"}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 justify-between">
                            <Dialog>
                              {/* <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingBanner(banner)}
                                >
                                  <Pencil className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </DialogTrigger> */}
                              {/* <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Chỉnh sửa banner</DialogTitle>
                                </DialogHeader>
                                <BannerForm
                                  banner={banner}
                                  onSubmit={handleEditBanner}
                                />
                              </DialogContent> */}
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteBanner(banner._id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleTogglePublish(banner._id, banner.isActive)
                              }
                            >
                              {togglePublish.id &&
                              togglePublish.id === banner._id ? (
                                togglePublish.loading ? (
                                  <Loader className="animate-spin" />
                                ) : banner.isActive ? (
                                  <>
                                    <EyeOff className="h-4 w-4 mr-1" />
                                    Unpublish
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-1" />
                                    Publish
                                  </>
                                )
                              ) : banner.isActive ? (
                                <>
                                  <EyeOff className="h-4 w-4 mr-1" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-1" />
                                  Publish
                                </>
                              )}

                              {/* {
                                banner.isActive ? (
                                  <>
                                    <EyeOff className="h-4 w-4 mr-1" />
                                    Unpublish
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-1" />
                                    Publish
                                  </>
                                )
} */}
                            </Button>
                            <div className="wrap-switch-checkmain flex items-center gap-4">
                              <Label>Banner mode</Label>
                              {loadingBannerMode.id === banner._id &&
                              loadingBannerMode.loading ? (
                                <Loader className="animate-spin" />
                              ) : (
                                <Switch
                                  id="isPublished"
                                  checked={banner.isMain}
                                  onCheckedChange={async (checked) => {
                                    setLoadingBannerMode({
                                      loading: true,
                                      id: banner._id,
                                    });

                                    const result = await updateModeBanner(
                                      banner._id,
                                      checked
                                    );

                                    setBanner((prevBanners: any) =>
                                      prevBanners.map((bannerItem) =>
                                        bannerItem._id === banner._id
                                          ? {
                                              ...bannerItem,
                                              isMain: !result.metadata.isMain,
                                            }
                                          : bannerItem
                                      )
                                    );

                                    setLoadingBannerMode({
                                      loading: false,
                                      id: banner._id,
                                    });

                                    console.log(result.metadata);
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Loader className="animate-spin" />
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const bannerSchema = z.object({
  title: z.string({ required_error: "Tiêu đề không được để trống" }),
  content: z.string({ required_error: "Nội dung không được để trống" }),
  file: z
    .instanceof(File, { message: "Hình ảnh không được để trống" })
    .refine((x) => x.size < 104857600, {
      message: "kích cỡ file không được vượt quá 100MB",
    }),
});

interface BannerFormProps {
  banner?: IBanner;
  onSubmit: (banner: IBanner) => void;
}

function BannerForm({ banner, onSubmit }: BannerFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [bannerProducts, setBannerProducts] = React.useState<IProduct[]>([]);
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  async function handleSubmit(e: z.infer<typeof bannerSchema>) {
    console.log("Data update: ", e);
    console.log("Image update", image);
    setLoadingUpload(true);
    const { file, ...rest } = e;
    const response = await createBanner(
      {
        ...rest,
        type: "sub",
      },
      file,
      bannerProducts.map((e) => e._id)
    );
    setLoadingUpload(false);
    console.log("CHECK DONE: ", response);
    onSubmit(
      banner
        ? { ...e, _id: banner._id, type: "sub" }
        : { ...e, type: "sub", imageUrl: URL.createObjectURL(file) }
    );
  }
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Data update: ", formData);
  //   console.log("Image update", image);
  //   setLoadingUpload(true);
  //   const response = await createBanner(formData, image);
  //   setLoadingUpload(false);
  //   console.log("CHECK DONE: ", response);
  //   onSubmit(banner ? { ...formData, id: banner.id } : formData);
  // };
  const form = useForm({
    resolver: zodResolver(bannerSchema),
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <>
              <AspectRatio ratio={3}>
                <Label
                  className="cursor-pointer w-full h-full relative group"
                  htmlFor="avatar-input"
                >
                  {field.value ? (
                    <>
                      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] p-4 scale-100 bg-white/85 backdrop-blur-lg opacity-1 rounded-2xl group-hover:opacity-0 group-hover:scale-90 group-hover:blur-sm transition-all flex flex-col gap-2 items-center">
                        <ImageUp />
                        <p>Ấn vào để thay đổi hình ảnh</p>
                      </div>
                      <img
                        src={URL.createObjectURL(field.value)}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    </>
                  ) : (
                    <Card className="flex flex-col justify-center p-4 items-center gap-2 w-full h-full">
                      <Image />
                      <p className="text-sm">
                        Đăng tải hình ảnh cho bảng quảng cáo{" "}
                        <span className="text-red-400">*</span>
                      </p>
                    </Card>
                  )}
                </Label>
              </AspectRatio>
              <FormControl>
                <Input
                  id="avatar-input"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label>
                Tiêu đề <span className="text-red-400">*</span>
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <Label>
                Nội dung <span className="text-red-400">*</span>
              </Label>
              <FormControl>
                <Textarea {...field} placeholder="Bắt buộc" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <b className="text-sm">Danh sách sản phẩm</b>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tên SP</TableHead>
              <TableHead>Giá sàn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bannerProducts.map((e) => (
              <TableRow>
                <TableCell>
                  <img
                    src={e.product_thumb as string}
                    alt={e.product_name}
                    className="w-20 h-auto"
                  />
                </TableCell>
                <TableCell>{e.product_name}</TableCell>
                <TableCell>{convertMoney(e.product_price)}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex items-center gap-2 flex-1">
                            <Badge variant="secondary">
                              {e.isDraft ? "Bản nháp" : "Bản chính"}
                            </Badge>
                            <Badge variant="secondary">
                              {e.isPublished ? "Hiển thị" : "Không hiển thị"}
                            </Badge>
                          </div>
                          <Info width={16} height={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-44 bg-background shadow-lg">
                        <b>Chế độ hiển thị</b>
                        <p>
                          Đây là trạng thái hiển thị sản phẩm của bạn trên trang
                          của khách hàng, với trạng thái "Hiển thị" là sản phẩm
                          đang được hiển thị trên cửa hàng và khách hàng có thể
                          mua, "Đã ẩn" là ngược lại.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBannerProducts(
                        bannerProducts.filter((p) => p._id !== e._id)
                      );
                    }}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
          <DialogTrigger className="w-full">
            <Button type="button" className="w-full" variant="outline">
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[75%] max-h-screen overflow-auto">
            <DialogHeader className="bg-background">
              <DialogTitle>Thêm sản phẩm vào miêu bảng quảng cáo</DialogTitle>
            </DialogHeader>
            <ProductAddForm
              availableProducts={bannerProducts}
              onSubmit={(e) => {
                if (
                  !e.some((product) =>
                    bannerProducts.some(
                      (bannerProduct) => bannerProduct._id === product._id
                    )
                  )
                ) {
                  setBannerProducts([...bannerProducts, ...e]);
                  setShowAddProduct(false);
                }
              }}
            />
          </DialogContent>
        </Dialog>
        <Button type="submit">
          {loadingUpload ? (
            <Loader className="animate-spin" />
          ) : banner ? (
            "Update Banner"
          ) : (
            "Thêm Bảng quảng cáo"
          )}
        </Button>
      </form>
    </Form>

    // <form onSubmit={handleSubmit} className="space-y-4">
    //   <div className="space-y-2">
    //     <Label htmlFor="title">Nội dung</Label>
    //     <Input
    //       id="title"
    //       name="title"
    //       value={formData.title}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <Label htmlFor="imageUrl">URL hình ảnh</Label>
    //     <Input
    //       type="file"
    //       id="imageUrl"
    //       name="imageUrl"
    //       value={formData.imageUrl}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     {/* <Label htmlFor="link">Link</Label>
    //     <Input
    //       id="link"
    //       name="link"
    //       value={formData.link}
    //       onChange={handleChange}
    //       required
    //     /> */}
    //   </div>
    //   {/* <div className="flex items-center space-x-2">
    //     <Switch
    //       id="isPublished"
    //       checked={formData.isPublished}
    //       onCheckedChange={(checked) =>
    //         setFormData((prev) => ({ ...prev, isPublished: checked }))
    //       }
    //     />
    //     <Label htmlFor="isPublished">Bạn có muốn </Label>
    //   </div> */}
    //   <Button type="submit">
    //     {loadingUpload ? (
    //       <Loader className="animate-spin" />
    //     ) : banner ? (
    //       "Update Banner"
    //     ) : (
    //       "Add Banner"
    //     )}
    //   </Button>
    // </form>
  );
}
type ProductAddFormProps = {
  onSubmit?: (prods: IProduct[]) => void;
  availableProducts?: IProduct[];
};
function ProductAddForm(props: ProductAddFormProps) {
  const [products, setProducts] = useState<IProduct[]>(null);
  const [queryProducts, setQueryProducts] = useState<IProduct[]>(null);
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterMode, setFilterMode] = useState(false);
  const [searchQueryProduct, setSearchQueryProduct] = useState("");
  function editProduct(add: boolean, product: IProduct) {
    if (add) {
      if (props.availableProducts.some((p) => p._id == product._id)) {
        return;
      }
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((e) => e._id !== product._id)
      );
    }
  }
  function addAll(add: boolean) {
    if (add) {
      setSelectedProducts(
        products.filter(
          (e) => !props.availableProducts.some((p) => p._id == e._id)
        )
      );
    } else {
      setSelectedProducts([]);
    }
  }
  async function getAllProducts() {
    setLoading(true);
    const data = await getProduct();
    if (data instanceof AxiosError) {
      console.log(data.message);
    } else {
      setQueryProducts(data.metadata);
      setProducts(data.metadata.filter((e) => e.isPublished));
    }
    setFilterMode(true);
    setLoading(false);
  }
  useEffect(() => {
    if (!products) {
      getAllProducts();
    }
  });
  function changeFilterMode(val: boolean) {
    if (searchQueryProduct != "") {
      setFilterMode(val);
      return;
    }
    setProducts(
      val ? queryProducts.filter((e) => e.isPublished) : queryProducts
    );
    setFilterMode(val);
  }
  useEffect(() => {
    if (searchQueryProduct != "") {
      searchProduct(searchQueryProduct);
    }
  }, [filterMode]);
  function searchProduct(query: string, filter?: boolean) {
    if (query == "") {
      setProducts(
        filterMode || filter
          ? queryProducts.filter((e) => e.isPublished)
          : queryProducts
      );
    } else {
      const filteredProducts = queryProducts.filter((e) =>
        e.product_name.toLowerCase().includes(query.toLowerCase())
      );
      if (filterMode) {
        setProducts(filteredProducts.filter((e) => e.isPublished));
      } else {
        setProducts(filteredProducts);
      }
    }
    setSearchQueryProduct(query);
  }
  return (
    <>
      <Input
        placeholder="Tìm kiếm sản phẩm"
        onChange={(e) => {
          searchProduct(e.target.value);
        }}
      />
      <div className="flex gap-2 items-center">
        <Switch
          checked={filterMode}
          disabled={loading}
          onCheckedChange={changeFilterMode}
          id="switch"
        ></Switch>
        <Label htmlFor="switch">
          Chỉ hiện sản phẩm đã được hiển thị trên trang chủ
        </Label>
      </div>
      <div className="flex flex-col gap-2 w-full h-full">
        <Table className="flex-1">
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    products &&
                    products.filter(
                      (e) =>
                        !props.availableProducts.some((p) => p._id == e._id)
                    ).length == selectedProducts.length
                  }
                  onCheckedChange={addAll}
                />
              </TableHead>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tên SP</TableHead>
              <TableHead>Giá sàn</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.map((e) => (
                <TableRow key={e._id}>
                  <TableCell>
                    <Checkbox
                      disabled={props.availableProducts.some(
                        (p) => p._id == e._id
                      )}
                      id={e._id}
                      checked={selectedProducts.some(
                        (selectedProduct) => selectedProduct._id === e._id
                      )}
                      onCheckedChange={(checked) =>
                        editProduct(checked as boolean, e)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={e.product_thumb as string}
                      alt={e.product_name}
                      className="w-20 h-auto"
                    />
                  </TableCell>
                  <TableCell>{e.product_name}</TableCell>
                  <TableCell>{convertMoney(e.product_price)}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <div className="flex items-center gap-2 w-full">
                            <div className="flex items-center gap-2 flex-1">
                              <Badge variant="secondary">
                                {e.isDraft ? "Bản nháp" : "Bản chính"}
                              </Badge>
                              <Badge variant="secondary">
                                {e.isPublished ? "Hiển thị" : "Không hiển thị"}
                              </Badge>
                            </div>
                            <Info width={16} height={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-44 bg-background shadow-lg">
                          <b>Chế độ hiển thị</b>
                          <p>
                            Đây là trạng thái hiển thị sản phẩm của bạn trên
                            trang của khách hàng, với trạng thái "Hiển thị" là
                            sản phẩm đang được hiển thị trên cửa hàng và khách
                            hàng có thể mua, "Đã ẩn" là ngược lại.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Button
        onClick={() => {
          props.onSubmit(selectedProducts);
        }}
        className="sticky w-full bottom-0"
      >
        Thêm các sản phẩm
      </Button>
    </>
  );
}
export default BannerPage;
