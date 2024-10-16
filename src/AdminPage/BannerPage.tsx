import { useState } from "react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
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

const BannerPage: React.FC = () => {
  const [banners, setBanners] = useState<IBanner[]>(initialBanners);
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Omit là tạo banner không cần tạo id vì id được random cái này làm cứng nên trước mắt là vậy sau này, sẽ dùng id của mongo
  const handleAddBanner = (newBanner: Omit<IBanner, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setBanners([...banners, { ...newBanner, id }]);
    setIsAddDialogOpen(false);
  };

  const handleEditBanner = (updatedBanner: IBanner) => {
    setBanners(
      banners.map((banner) =>
        banner.id === updatedBanner.id ? updatedBanner : banner
      )
    );
    setEditingBanner(null);
  };

  const handleDeleteBanner = (id: string) => {
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  const handleTogglePublish = (id: string) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id
          ? { ...banner, isPublished: !banner.isPublished }
          : banner
      )
    );
  };

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
              {banners
                .filter((banner) => banner.type === "main")
                .map((banner) => (
                  <div key={banner.id} className="space-y-4">
                    <p>Xem trước banner</p>
                    <HomeBanner image={banner.imageUrl} title={banner.title} description={banner.title} link={banner.link} button="Mua ngay"/>
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
                              <Pencil className="h-4 w-4 mr-1"/>
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
                          onClick={() => handleTogglePublish(banner.id)}
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
                ))}
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
                  {banners
                    .filter((banner) => banner.type === "sub")
                    .map((banner) => (
                      <TableRow key={banner.id}>
                        <TableCell>
                          <img
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="w-20 h-auto"
                          />
                        </TableCell>
                        <TableCell>{banner.title}</TableCell>
                        <TableCell>{banner.link}</TableCell>
                        <TableCell>
                          {banner.isPublished ? "Published" : "Unpublished"}
                        </TableCell>
                        <TableCell>
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
                              onClick={() => handleDeleteBanner(banner.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTogglePublish(banner.id)}
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
                        </TableCell>
                      </TableRow>
                    ))}
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
  onSubmit: (banner: IBanner | Omit<IBanner, "id">) => void;
}

function BannerForm({ banner, onSubmit }: BannerFormProps) {
  const [formData, setFormData] = useState<Omit<IBanner, "id">>({
    title: banner?.title || "",
    imageUrl: banner?.imageUrl || "",
    link: banner?.link || "",
    isPublished: banner?.isPublished || false,
    type: banner?.type || "sub",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="link">Link</Label>
        <Input
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, isPublished: checked }))
          }
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>
      <Button type="submit">{banner ? "Update Banner" : "Add Banner"}</Button>
    </form>
  );
}

export default BannerPage;
