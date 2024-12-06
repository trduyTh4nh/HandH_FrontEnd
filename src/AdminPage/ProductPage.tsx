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
  Book,
  BookDashed,
  Circle,
  CircleDashed,
  CircleX,
  Eye,
  EyeOff,
  File,
  FilePen,
  FilePenLine,
  Filter,
  Image,
  Info,
  Loader,
  Loader2,
  MoreHorizontalIcon,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  TextSearch,
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
  addColorsToProduct,
  addImageToProduct,
  changeVisibility,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Progress } from "@/components/ui/progress";
type UploadProcess = {
  message: string;
  isRunning: boolean;
  progress?: number;
};
const ProductPage: React.FC = () => {
  const { toast } = useToast();
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AxiosError>(null);
  const [isEditing, setEditing] = React.useState(false);
  const [curProduct, setCurProduct] = React.useState<IProduct | null>();
  const [productReadOnly, setProductReadOnly] = React.useState(false);
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

  const handleRemove = async (productSlug: string, index: number) => {
    setProcess({
      message: "Đang xoá sản phẩm",
      isRunning: true,
    });
    const data = await deleteProduct(productSlug);
    if (data instanceof AxiosError) {
      console.log(data);
      setError(data);
      setProcess({
        message: "Đang xoá sản phẩm",
        isRunning: false,
      });
      return;
    }
    toast({
      title: "Xoá sản phẩm thành công",
      description: `Bạn đã xoá sản phẩm ${productSlug} thành công.`,
    });
    setProcess({
      message: "Đang xoá sản phẩm",
      isRunning: false,
    });
    setProducts(products.filter((p) => p._id !== productSlug));
  };

  const handleToggleVisibility = async (
    id: string,
    action: { key: "isDraft" | "isPublished" }
  ) => {
    let res;
    setProcess({
      message: "Đang thay đổi trạng thái hiển thị sản phẩm",
      isRunning: true,
    });
    if (action.key === "isDraft") {
      if (!products.find((p) => p._id === id)?.isDraft) {
        res = await changeVisibility("draftProduct", id);
      } else {
        res = await changeVisibility("unDaftProduct", id);
      }
    } else {
      if (!products.find((p) => p._id === id)?.isPublished) {
        res = await changeVisibility("publicProduct", id);
      } else {
        res = await changeVisibility("unPublicProduct", id);
      }
    }
    if (res instanceof AxiosError) {
      setProcess({
        ...process,
        isRunning: false,
      });
      return;
    }
    setProcess({
      ...process,
      isRunning: false,
    });
    setProducts(
      products.map((p) => {
        if (p._id === id) {
          return { ...p, [action.key]: !p[action.key] };
        }
        return p;
      })
    );
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
  const [process, setProcess] = useState<UploadProcess>({
    message: "Không có quá trình nào",
    isRunning: false,
  });
  async function uploadProduct(data: IProduct) {
    const { product_thumb, product_images, product_colors, ...rest } = data;
    try {
      setProcess({
        message: "Đang đăng tải sản phẩm...",
        isRunning: true,
        progress: 5,
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
          progress: 5,
        });
        return;
      }
      id = res.metadata._id;
      setProcess({
        message: "Đang đăng tải hình ảnh của sản phẩm...",
        isRunning: true,
        progress: 25,
      });
      const res2 = await updateImageToProduct(id, product_thumb as File);
      if (res2 instanceof AxiosError) {
        setError(res2);
        setProcess({
          message: "Đang đăng tải hình ảnh của sản phẩm...",
          isRunning: false,
          progress: 25,
        });
        return;
      }
      if (product_images.length > 0) {
        setProcess({
          message: "Đang đăng tải hình ảnh của sản phẩm...",
          isRunning: true,
          progress: 50,
        });
        const res3 = await addImageToProduct(
          id,
          product_images as File[],
          (n) => {
            setProcess({
              message: "Đang đăng tải hình ảnh của sản phẩm...",
              isRunning: true,
              progress: process.progress + n / 50,
            });
          }
        );
        if (res3 instanceof AxiosError) {
          setError(res3);
          setProcess({
            message: "Đang đăng tải hình ảnh của sản phẩm...",
            isRunning: false,
            progress: 50,
          });
          return;
        }
      }
      setProcess({
        message: "Đang đăng tải hình ảnh của sản phẩm...",
        isRunning: true,
        progress: 75,
      });
      const res4 = await addColorsToProduct(
        id,
        product_colors as IColorProductVariation[],
        (progress) => {
          setProcess({
            message: "Đang đăng tải hình ảnh của sản phẩm...",
            isRunning: true,
            progress: process.progress + progress / 75,
          });
        }
      );
      if (res4 instanceof AxiosError) {
        setError(res4);
        setProcess({
          message: "Đang đăng tải hình ảnh của sản phẩm...",
          isRunning: false,
          progress: 0,
        });
        return;
      }
      setProcess({
        message: "Đang đăng tải hình ảnh của sản phẩm...",
        isRunning: false,
        progress: 0,
      });
    } catch (e) {
      console.error(e);
      setProcess({
        message: "Không có quá trình nào",
        isRunning: false,
      });
      return;
    }
    setIsAddProductOpen(false);
    setProducts([
      ...products,
      {
        ...rest,
        product_thumb: URL.createObjectURL(product_thumb as File),
      },
    ]);
    toast({
      title: "Đăng tải sản phẩm thành công",
      description: `Bạn đã đăng tải sản phẩm ${rest.product_name} thành công!`,
    });
    setProcess({
      message: "Không có quá trình nào",
      isRunning: false,
    });
  }
  return (
    <div className="space-y-6 w-full p-8 h-screen">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Danh sách sản phẩm
          </h2>
          <div className="flex gap-2 items-center">
            <Search width={16} height={16} />
            <Input placeholder="Tìm kiếm sản phẩm" />
          </div>
          <Button className="flex gap-2" variant="secondary">
            <Filter width={16} height={16} />
          </Button>
        </div>

        <Dialog open={process.isRunning}>
          <DialogContent className="max-w-max">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Loader className="animate-spin" />
              <p className="text-lg">{process.message}</p>
              {process.progress && (
                <div className="flex gap-2 items-center w-full">
                  <Progress className="flex-1" value={process.progress} />
                  <p>{process.progress}%</p>
                </div>
              )}
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
              {error && error.response &&
              error.response.data &&
              //@ts-ignore
              errorIndexes[error.response.data.message] == null ? (
                <CircleX />
              ) : null}
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
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => {
            setProduct(null)
            fetch()
          }}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
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
                {products.map((product, index) => (
                  <TableRow key={product.product_slug}>
                    <TableCell>
                      {!product.product_thumb || product.product_thumb == "" ? (
                        <Image width={80} height={80} />
                      ) : (
                        <img
                          className="w-20 h-20 rounded-md object-contain"
                          src={product.product_thumb}
                          alt=""
                        />
                      )}
                    </TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{convertMoney(product.product_price)}</TableCell>
                    <TableCell>{product.product_category}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="w-full">
                            <div className="flex items-center gap-2 w-full">
                              <div className="flex items-center gap-2 flex-1">
                                <Badge variant="secondary">
                                  {product.isDraft ? "Bản nháp" : "Bản chính"}
                                </Badge>
                                <Badge variant="secondary">
                                  {product.isPublished
                                    ? "Hiển thị"
                                    : "Không hiển thị"}
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
                    <TableCell>
                      <div className="flex space-x-2">
                        {/* New button  */}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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
                                  onClick={() => handleRemove(product._id!, index)}
                                >
                                  Xóa
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="outline" size="sm">
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              disabled={product.isDraft}
                              className="flex gap-2"
                              onClick={() => {
                                handleToggleVisibility(product._id, {
                                  key: "isPublished",
                                });
                              }}
                            >
                              {product.isPublished ? (
                                <EyeOff width={16} height={16}></EyeOff>
                              ) : (
                                <Eye width={16} height={16}></Eye>
                              )}
                              <p>
                                {product.isPublished
                                  ? "Ẩn sản phẩm"
                                  : "Hiển thị sản phẩm"}
                              </p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                handleToggleVisibility(product._id, {
                                  key: "isDraft",
                                });
                              }}
                              className="flex gap-2"
                            >
                              {product.isDraft ? (
                                <File width={16} height={16}></File>
                              ) : (
                                <FilePen width={16} height={16}></FilePen>
                              )}
                              <p>
                                {product.isDraft
                                  ? "Chuyển thành bản chính"
                                  : "Chuyển thành nháp"}
                              </p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex gap-2"
                              onClick={() => {
                                setEditing(true);
                                setEditingProduct(product);
                                setProductReadOnly(true);
                              }}
                            >
                              <TextSearch width={16} height={16}></TextSearch>
                              <p>Xem chi tiết</p>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
            if (productReadOnly && !o) {
              setProductReadOnly(false);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Chỉnh sửa</DialogTitle>
          </DialogHeader>
          <DialogContent className="min-w-[75%] max-h-full overflow-auto">
            {isEditing && editingProduct ? (
              <ProductUploadForm
                onSubmit={(e) => {}}
                defaultValue={editingProduct}
                readOnly={productReadOnly}
              />
            ) : (
              <h1>tại thằng quang</h1>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductPage;
