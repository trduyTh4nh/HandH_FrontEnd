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
              {/* {banners
                .filter((banner) => banner.type === "main")
                .map((banner) => (
                  <div key={banner.id} className="space-y-4">
                    <p>Xem trước banner</p>
                    <HomeBanner
                      image={banner.imageUrl}
                      title={banner.title}
                      description={banner.title}
                      link={banner.link}
                      button="Mua ngay"
                    />
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{banner.title}</h3>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingBanner(banner)}
                            >
                              <Pencil className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa banner</DialogTitle>
                            </DialogHeader>
                            <BannerForm
                              banner={banner}
                              onSubmit={handleEditBanner}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleTogglePublish(banner.id, banner.isPublished)
                          }
                        >
                          {banner.isPublished ? (
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
                        </Button>
                      </div>
                    </div>
                  </div>
                ))} */}
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
                <DialogContent className="min-w-[50%]">
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
  async function handleSubmit(e: z.infer<typeof bannerSchema>) {
    console.log("Data update: ", e);
    console.log("Image update", image);
    setLoadingUpload(true);
    const {file, ...rest} = e;
    const response = await createBanner({
      ...rest,
      type: "sub"
    }, file);
    setLoadingUpload(false);
    console.log("CHECK DONE: ", response);
    onSubmit(banner ? { ...e, id: banner.id, type: "sub" } : {...e, type: "sub", imageUrl: URL.createObjectURL(file)});
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
                        <ImageUp/>
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

export default BannerPage;
