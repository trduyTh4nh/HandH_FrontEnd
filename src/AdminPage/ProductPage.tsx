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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  EyeOff,
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

const ProductPage: React.FC = () => {
  const [product, setProduct] = React.useState([]);
  // useEffect(() => {
  //   const api = new API();
  //   const fetchProduct = async () => {
  //     try {
  //       const response: any = await api.get("product");
  //       setProduct(response.metadata);
  //       console.log(response.metadata);
  //     } catch (error) {
  //       console.error("Lỗi khi lấy sản phẩm:", error);
  //     }
  //   };

  //   fetchProduct();
  // }, []);

  const [products, setProducts] = React.useState<IProduct[]>([
    {
      product_name: "Classic T-Shirt",
      product_thumb: "/images/classic-tshirt.jpg",
      product_description: "A comfortable, classic fit t-shirt.",
      product_price: 19.99,
      product_slug: "classic-tshirt",
      product_rating: 4.5,
      isDraft: false,
      isPublished: true,
      product_category: "Tops",
      product_color: [
        { color_code: "#000000", color_price: 0, color_isPicked: true },
        { color_code: "#FFFFFF", color_price: 0, color_isPicked: false },
      ],
      product_size: [
        { size_name: "S", size_price: 0, size_isPicked: true },
        { size_name: "M", size_price: 0, size_isPicked: true },
        { size_name: "L", size_price: 2, size_isPicked: true },
      ],
    },
    {
      product_name: "Slim Fit Jeans",
      product_thumb: "/images/slim-fit-jeans.jpg",
      product_description: "Modern slim fit jeans for a stylish look.",
      product_price: 49.99,
      product_slug: "slim-fit-jeans",
      product_rating: 4.2,
      isDraft: true,
      isPublished: false,
      product_category: "Bottoms",
      product_color: [
        { color_code: "#000080", color_price: 0, color_isPicked: true },
        { color_code: "#1E90FF", color_price: 2, color_isPicked: true },
      ],
      product_size: [
        { size_name: "30", size_price: 0, size_isPicked: true },
        { size_name: "32", size_price: 0, size_isPicked: true },
        { size_name: "34", size_price: 2, size_isPicked: true },
      ],
    },
  ]);

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

  const handleRemove = (productSlug: string) => {
    setProducts(products.filter((p) => p.product_slug !== productSlug));
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(product.product_slug!)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Xóa
                      </Button>
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
        </CardContent>
      </Card>

      {editingProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Chỉnh sửa</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductPage;
