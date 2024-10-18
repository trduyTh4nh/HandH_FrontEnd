import React, { useEffect } from "react";
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
  Loader,
  Loader2,
  MoreHorizontalIcon,
  Pencil,
  Plus,
  Trash2,
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
import { deleteProduct, getProduct } from "@/apis/products/product-repo";
import { AxiosError } from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import errorIndexes from "@/utils/errorKey";

const ProductPage: React.FC = () => {
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
    const data = await deleteProduct(productSlug);
    if (data instanceof AxiosError) {
      console.log(data);
      setError(data);
      return;
    }
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({
          ...prev,
          product_thumb: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
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

  return (
    <div className="space-y-6 w-full p-8 h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Danh sách sản phẩm
        </h2>

        <Dialog
          open={error != null}
          onOpenChange={(o) => {
            setError(null);
          }}
        >
          <DialogContent className="bg-red-50 border-red-400">
            <DialogTitle className="flex gap-4 items-center text-red-400">
              <CircleX />
              Lỗi {error ? error.status || "bất định" : "🙂"}
            </DialogTitle>
            <DialogDescription>
              {error
                ? //@ts-ignore
                  errorIndexes[error.response.data.message] ||
                  "Lỗi bất định hoặc lỗi do máy chủ, vui lòng thử lại sau."
                : ""}
            </DialogDescription>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="0">
                <AccordionTrigger>Xem chi tiết</AccordionTrigger>
                <AccordionContent>
                  <p>Stack trace</p>
                  <p>
                    {error
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
          <DialogContent className="sm:max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            <div className="flex gap-8 px-4">
              <div className="grid gap-4 py-4 max-h-[70vh]   flex-1 w-32 overflow-x-auto">
                <div className="grid grid-cols-1 items-center">
                  <Label htmlFor="new-product-name" className="text-left">
                    Tên
                  </Label>
                  <Input
                    className="w-full"
                    id="new-product-name"
                    name="product_name"
                    value={newProduct.product_name}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
                <div className="grid grid-cols-1 items-center">
                  <Label
                    htmlFor="new-product-description"
                    className="text-left"
                  >
                    Mô tả
                  </Label>
                  <Textarea
                    id="new-product-description"
                    name="product_description"
                    value={newProduct.product_description}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
                <div className="grid grid-cols-1 items-center ">
                  <Label htmlFor="new-product-price" className="text-left">
                    Giá
                  </Label>
                  <Input
                    id="new-product-price"
                    name="product_price"
                    type="number"
                    value={newProduct.product_price}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
                <div className="grid grid-cols-1 items-center ">
                  <Label htmlFor="new-product-category" className="text-left">
                    Loại
                  </Label>
                  <Input
                    id="new-product-category"
                    name="product_category"
                    value={newProduct.product_category}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
              </div>
              {/*  */}
              <div className="grid gap-4 py-4 max-h-[70vh]  flex-initial w-80 overflow-y-auto">
                {" "}
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="new-product-rating" className="text-left">
                    Đánh giá
                  </Label>
                  <Input
                    id="new-product-rating"
                    name="product_rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={newProduct.product_rating}
                    onChange={(e) => handleInputChange(e, true)}
                  />
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
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label
                      htmlFor="new-product-image"
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md">
                        <Upload className="h-4 w-4" />
                        Đăng tải hình ảnh
                      </div>
                    </Label>
                    {newProduct.product_thumb && (
                      <img
                        src={newProduct.product_thumb}
                        alt="Product"
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label className="text-left">Màu</Label>
                  <div>
                    {newProduct.product_color?.map((color, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input
                          type="color"
                          value={color.color_code}
                          onChange={(e) =>
                            handleColorChange(
                              index,
                              "color_code",
                              e.target.value
                            )
                          }
                        />
                        <Input
                          type="number"
                          value={color.color_price}
                          onChange={(e) =>
                            handleColorChange(
                              index,
                              "color_price",
                              parseFloat(e.target.value)
                            )
                          }
                          placeholder="Price"
                        />
                        <Switch
                          checked={color.color_isPicked}
                          onCheckedChange={(checked) =>
                            handleColorChange(index, "color_isPicked", checked)
                          }
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={handleAddColor}
                      variant="outline"
                      size="sm"
                    >
                      Thêm màu
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label className="text-left">Kích cỡ</Label>
                  <div>
                    {newProduct.product_size?.map((size, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input
                          value={size.size_name}
                          onChange={(e) =>
                            handleSizeChange(index, "size_name", e.target.value)
                          }
                          placeholder="Size"
                        />
                        <Input
                          type="number"
                          value={size.size_price}
                          onChange={(e) =>
                            handleSizeChange(
                              index,
                              "size_price",
                              parseFloat(e.target.value)
                            )
                          }
                          placeholder="Price"
                        />
                        <Switch
                          checked={size.size_isPicked}
                          onCheckedChange={(checked) =>
                            handleSizeChange(index, "size_isPicked", checked)
                          }
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={handleAddSize}
                      variant="outline"
                      size="sm"
                    >
                      Thêm kích cỡ
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="new-product-draft" className="text-left">
                    Draft
                  </Label>
                  <Switch
                    id="new-product-draft"
                    checked={newProduct.isDraft}
                    onCheckedChange={(checked) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        isDraft: checked,
                        isPublished: !checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddProduct}>Thêm sản phẩm</Button>
            </div>
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
                      {product.isPublished ? "Published" : "Draft"}
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
                      src={editingProduct.product_thumb}
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
