import React, { useEffect, useState } from "react";
import API from "../apis/api";
import {
  IColorProductVariation,
  IProduct,
  ISizeProductVarication,
} from "@/types/product.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CircleX,
  Eye,
  EyeOff,
  Info,
  Loader,
  Loader2,
  MoreHorizontalIcon,
  Pencil,
  Plus,
  Trash2,
  TriangleAlert,
  Upload,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableBody } from "@mui/material";
import { Switch } from "@/components/ui/switch";
import { convertMoney } from "@/utils";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateImageToProduct,
} from "@/apis/products/product-repo";
import { Axios, AxiosError } from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import errorIndexes from "@/utils/errorKey";
import ProductUploadForm from "@/components/widget/productUploadForm";
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useToast } from "@/hooks/use-toast";

const ProductPage: React.FC = () => {
  const {toast} = useToast()
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AxiosError>(null);
  const [isEditing, setEditing] = React.useState(false);
  async function fetch() {
    setLoading(true);
    const data = await getProduct();
    if (data instanceof AxiosError) {
      console.log(data.message);
      setError(data);
    } else {
      console.log(data);
      setProducts(data.metadata);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetch();
  }, []);
  const [products, setProducts] = React.useState([]);
  const [editingProduct, setEditingProduct] = React.useState<IProduct | null>(
    null
  );
  const [newProduct, setNewProduct] = React.useState<IProduct>({
    product_name: "",
    product_thumb: "",
    product_description: "",
    product_price: 0,
    product_slug: "",
    product_rating: 0,
    isDraft: true,
    isPublished: false,
    product_category: "",
    product_color: [],
    product_size: [],
  });
  const [isAddProductOpen, setIsAddProductOpen] = React.useState(false);

  const handleEdit = (product: IProduct) => {
    setEditing(true);
    setEditingProduct({ ...product });
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.product_slug === editingProduct.product_slug ? editingProduct : p
        )
      );
      setEditingProduct(null);
    }
  };

  const handleRemove = async (productSlug: string) => {
    setProcess({
      message: "Đang xoá sản phẩm",
      isRunning: true
    })
    const data = await deleteProduct(productSlug);
    if (data instanceof AxiosError) {
      console.log(data);
      setError(data);
      setProcess({
        message: "Đang xoá sản phẩm",
        isRunning: false
      })
      return;
    }
    toast({title: "Xoá sản phẩm thành công", description: `Bạn đã xoá sản phẩm ${productSlug} thành công.`})
    setProcess({
      message: "Đang xoá sản phẩm",
      isRunning: false
    })
    setProducts(products.filter((p) => p._id !== productSlug));
  };

  const handleTogglePublish = (productSlug: string) => {
    setProducts(
      products.map((p) => {
        if (p.product_slug === productSlug) {
          return { ...p, isPublished: !p.isPublished, isDraft: p.isPublished };
        }
        return p;
      })
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isNewProduct: boolean = false
  ) => {
    const { name, value } = e.target;
    if (isNewProduct) {
      setNewProduct((prev) => ({
        ...prev,
        [name]:
          name === "product_price" || name === "product_rating"
            ? parseFloat(value)
            : value,
      }));
    } else if (editingProduct) {
      setEditingProduct((prev) => ({
        ...prev,
        [name]:
          name === "product_price" || name === "product_rating"
            ? parseFloat(value)
            : value,
      }));
    }
  };

  const handleAddProduct = () => {
    const productSlug =
      newProduct.product_name?.toLowerCase().replace(/ /g, "-") || "";
    const productToAdd = {
      ...newProduct,
      product_slug: productSlug,
    };
    setProducts((prev) => [...prev, productToAdd]);
    setNewProduct({
      product_name: "",
      product_thumb: "",
      product_description: "",
      product_price: 0,
      product_slug: "",
      product_rating: 0,
      isDraft: true,
      isPublished: false,
      product_category: "",
      product_color: [],
      product_size: [],
    });
    setIsAddProductOpen(false);
  };

  const handleColorChange = (
    index: number,
    field: keyof IColorProductVariation,
    value: string | number | boolean
  ) => {
    setNewProduct((prev) => ({
      ...prev,
      product_color:
        prev.product_color?.map((color, i) =>
          i === index ? { ...color, [field]: value } : color
        ) || [],
    }));
  };

  const handleSizeChange = (
    index: number,
    field: keyof ISizeProductVarication,
    value: string | number | boolean
  ) => {
    setNewProduct((prev) => ({
      ...prev,
      product_size:
        prev.product_size?.map((size, i) =>
          i === index ? { ...size, [field]: value } : size
        ) || [],
    }));
  };

  const handleAddColor = () => {
    setNewProduct((prev) => ({
      ...prev,
      product_color: [
        ...(prev.product_color || []),
        { color_code: "", color_price: 0, color_isPicked: false },
      ],
    }));
  };

  const handleAddSize = () => {
    setNewProduct((prev) => ({
      ...prev,
      product_size: [
        ...(prev.product_size || []),
        { size_name: "", size_price: 0, size_isPicked: false },
      ],
    }));
  };
  const handleImageUploadEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct((prev) => ({
          ...prev,
          product_thumb: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const [process, setProcess] = useState({
    message: "Không có quá trình nào",
    isRunning: false,
  });
  async function uploadProduct(data: IProduct) {
    const { product_thumb, ...rest } = data;
    try {
      setProcess({
        message: "Đang đăng tải sản phẩm...",
        isRunning: true,
      });
      let id = "";
      let res;
      console.log({ ...rest, product_thumb: "/sample_image.jpg" });
      res = await createProduct({
        ...rest,
        product_thumb: "/sample_image.jpg",
      });
      if (res instanceof AxiosError) {
        setError(res);
        setProcess({
          message: "Đang đăng tải sản phẩm...",
          isRunning: false,
        });
        return;
      }
      id = res.metadata._id;
      setProcess({
        message: "Đang đăng tải hình ảnh của sản phẩm...",
        isRunning: true,
      });
      const res2 = await updateImageToProduct(id, product_thumb as File);
      if (res2 instanceof AxiosError) {
        setError(res);
        setProcess({
          message: "Đang đăng tải hình ảnh của sản phẩm...",
          isRunning: false,
        });
        return;
      }
      setProcess({
        message: "Đang đăng tải hình ảnh của sản phẩm...",
        isRunning: false,
      });
    } catch (e) {
      console.error(e);
      setProcess({
        message: "Không có quá trình nào",
        isRunning: false,
      });
      return;
    }
    setIsAddProductOpen(false)
    setProducts([
      ...products,
      {
        ...rest,
        product_thumb: URL.createObjectURL(product_thumb as File)
      }
    ])
    toast({title: 'Đăng tải sản phẩm thành công', description: `Bạn đã đăng tải sản phẩm ${rest.product_name} thành công!`})
    setProcess({
      message: "Không có quá trình nào",
      isRunning: false,
    });
  }
  return (
    <div className="space-y-6 w-full p-8 h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Danh sách sản phẩm
        </h2>
        <Dialog open={process.isRunning}>
          <DialogContent className="max-w-max">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Loader className="animate-spin" />
              <p className="text-lg">{process.message}</p>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={error != null}
          onOpenChange={(o) => {
            setError(null);
          }}
        >
          <DialogContent
            className={`${
              error &&
              error.response &&
              //@ts-ignore
              errorIndexes[error.response.data.message] == null
                ? "border-red-400 bg-red-50"
                : ""
            }`}
          >
            <DialogTitle
              className={`flex gap-4 items-center ${
                error &&
                error.response &&
                //@ts-ignore
                errorIndexes[error.response.data.message] == null
                  ? "text-red-400"
                  : "text-primary"
              }}`}
            >
              {
                error &&
                error.response.data &&
                //@ts-ignore
                errorIndexes[error.response.data.message] == null ? (
                  <CircleX />
                ) : null
              }
              Lỗi
            </DialogTitle>
            <p className="font-bold">
              {error && error.response
                ? //@ts-ignore
                  errorIndexes[error.response.data.message] ||
                  "Lỗi bất định hoặc lỗi do máy chủ, vui lòng thử lại sau."
                : ""}
            </p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="0">
                <AccordionTrigger>Xem chi tiết</AccordionTrigger>
                <AccordionContent>
                  <p>Stack trace</p>
                  <p>
                    {error && error.response
                      ? //@ts-ignore
                        error.response.data.stack || "Không tìm thấy chi tiết"
                      : "Ai biết đâu, tự nhiên bật dialog này lên?"}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <DialogFooter>
              <DialogClose>
                <Button variant="destructive">OK</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[85%] max-h-full overflow-auto">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            <ProductUploadForm onSubmit={uploadProduct} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center w-full pt-4 gap-4">
              <Loader className="animate-spin" />
              <p>Đang tải...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.product_slug}>
                    <TableCell>
                      <img
                        className="w-20 h-20 rounded-md object-contain"
                        src={product.product_thumb}
                        alt=""
                      />
                    </TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{convertMoney(product.product_price)}</TableCell>
                    <TableCell>{product.product_category}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2">
                              {!product.isDraft ? "Đang hiển thị" : "Đã ẩn"}
                              <Info width={16} height={16} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-44 bg-background shadow-lg">
                            <b>Chế độ hiển thị</b>
                            <p>Đây là trạng thái hiển thị sản phẩm của bạn trên trang của khách hàng, với trạng thái "Hiển thị" là sản phẩm đang được hiển thị trên cửa hàng và khách hàng có thể mua, "Đã ẩn" là ngược lại.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Chỉnh sửa
                        </Button>
                        {/* New button  */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <MoreHorizontalIcon className="h-4 w-4 mr-1" />
                          Chi tiết
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Bạn có chắc chắn muốn xóa sản phẩm này không?
                              </DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              <p>
                                Hành động này không thể hoàn tác, nếu bạn muốn
                                ẩn sản phẩm, vui lòng chọn nút "Hiển thị"
                              </p>
                            </DialogDescription>
                            <DialogFooter>
                              <DialogClose>
                                <Button variant="secondary">Huỷ</Button>
                              </DialogClose>
                              <DialogClose>
                                <Button
                                  onClick={() => handleRemove(product._id!)}
                                >
                                  Xóa
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleTogglePublish(product.product_slug!)
                          }
                        >
                          {product.isPublished ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Không hiển thị
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Hiển thị
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {editingProduct && (
        <Dialog
          open={isEditing}
          onOpenChange={(o) => {
            setEditing(o);
          }}
        >
          <DialogHeader>
            <DialogTitle>Chỉnh sửa</DialogTitle>
          </DialogHeader>
          <DialogContent className="min-w-[75%]">
            <form className="space-y-4">
              <div>
                <Label htmlFor="product_name">Tên sản phẩm</Label>
                <Input
                  id="product_name"
                  name="product_name"
                  value={editingProduct.product_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="product_description">Mô tả sản phẩm</Label>
                <Textarea
                  id="product_description"
                  name="product_description"
                  value={editingProduct.product_description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="product_price">Giá sản phẩm</Label>
                <Input
                  id="product_price"
                  name="product_price"
                  type="number"
                  value={editingProduct.product_price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="product_category">Loại sản phẩm</Label>
                <Input
                  id="product_category"
                  name="product_category"
                  value={editingProduct.product_category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  checked={editingProduct.isPublished}
                  onCheckedChange={(checked) =>
                    setEditingProduct({
                      ...editingProduct,
                      isPublished: checked,
                      isDraft: !checked,
                    })
                  }
                />
                <Label htmlFor="isPublished">Published</Label>
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="new-product-image" className="text-left">
                  Hình ảnh
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="new-product-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadEdit}
                    className="hidden"
                  />
                  <Label htmlFor="new-product-image" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md">
                      <Upload className="h-4 w-4" />
                      Đăng tải hình ảnh
                    </div>
                  </Label>
                  {editingProduct.product_thumb && (
                    <img
                      src={editingProduct.product_thumb as string}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>
              </div>
              <Button onClick={handleSave}>Lưu sản phẩm</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductPage;
