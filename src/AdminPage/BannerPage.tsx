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
} from "lucide-react";
import { IBanner } from "@/types/banner.type";
import HomeBanner from "@/components/widget/homeBanner";

const initialBanners: IBanner[] = [
  {
    id: "1",
    title: "Banner trang chủ",
    imageUrl:
      "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1728432000&semt=ais_hybrid",
    link: "/",
    isPublished: true,
    type: "main",
  },
  {
    id: "2",
    title: "Lễ hội mùa hè",
    imageUrl: "https://static.thenounproject.com/png/261694-200.png",
    link: "/summer-sale",
    isPublished: true,
    type: "sub",
  },
  {
    id: "3",
    title: "Bộ sưu tập độc đáo",
    imageUrl: "https://static.thenounproject.com/png/261694-200.png",
    link: "/new-collection",
    isPublished: false,
    type: "sub",
  },
];

import {
  createBanner,
  deleteBanner,
  getAllBanner,
  publishBanner,
  unPublishBanner,
} from "@/apis/banner/banner-repo";
import { AxiosError } from "axios";
import { IProduct } from "@/types/product.type";

type togglePublish = {
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
  const [banner, setBanner] = React.useState([]);
  const [stateIdDelete, setStateIdDelete] = React.useState("");

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
          <Label>Mày có chắc muốn xóa?</Label>
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
                <DialogContent>
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
                          <div className="flex space-x-2">
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

interface BannerFormProps {
  banner?: IBanner;
  onSubmit: (banner: IBanner) => void;
}

function BannerForm({ banner, onSubmit }: BannerFormProps) {
  const [formData, setFormData] = useState<any>({
    title: banner?.title || "",
    imageUrl: banner?.imageUrl || "",
    link: banner?.link || "",
    isPublished: banner?.isPublished || false,
    type: banner?.type || "sub",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    console.log("name", name);
    if (name === "imageUrl" && files && files.length > 0) {
      setImage(files[0]);
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data update: ", formData);
    console.log("Image update", image);
    setLoadingUpload(true);
    const response = await createBanner(formData, image);
    setLoadingUpload(false);
    console.log("CHECK DONE: ", response);
    onSubmit(banner ? { ...formData, id: banner.id } : formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Nội dung</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL hình ảnh</Label>
        <Input
          type="file"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        {/* <Label htmlFor="link">Link</Label>
        <Input
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
        /> */}
      </div>
      <div className="flex items-center space-x-2">
        {/* <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, isPublished: checked }))
          }
        /> */}
        {/* <Label htmlFor="isPublished">Published</Label> */}
      </div>
      <Button type="submit">
        {loadingUpload ? (
          <Loader className="animate-spin" />
        ) : banner ? (
          "Update Banner"
        ) : (
          "Add Banner"
        )}
      </Button>
    </form>
  );
}

export default BannerPage;
