import { useContext, useEffect, useState } from "react";
import Chip from "../widget/chip";
import ImagesProduct from "../widget/imagesProduct";
import ColorChip from "../widget/colorChip";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Add, RemoveOutlined } from "@mui/icons-material";
import ImageViewer from "../widget/imageViewer";
import Footer from "../widget/footer";
import { ImageModelContext } from "../../providers/Providers";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { addToWishlish, getProductById } from "@/apis/products/product-repo";
import { IColorProductVariation, IProduct } from "@/types/product.type";
import { AxiosError } from "axios";
import ErrorView from "../widget/Error.widget";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import SkeletonLoadingProduct from "../widget/skeletonLoadingProduct";
import Recommendations from "../widget/recommendations";
import { useToast } from "@/hooks/use-toast";
import { UserContext } from "../contexts/UserContext";
import { useCart } from "@/providers/CartContext";
export default function Product() {
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<AxiosError>(null);
  const [productImages, setProductImages] = useState([]);
  const [price, setPrice] = useState<number>(0);
  async function getProduct() {
    console.log(id);
    const response = await getProductById(decodeURI(id));
    if (response instanceof AxiosError) {
      console.log(response);
      setError(response);
      return;
    }
    //@ts-ignore
    setProduct(response.metadata);
    //@ts-ignore
    setCateId(response.metadata.product_category);
  }
  async function addFavorite() {
    const res = await addToWishlish(id);
    if (res instanceof AxiosError) {
      console.log(res);
      return;
    }
    toast({
      title: "Đã thêm sản phẩm vào mục yêu thích.",
      description: `Đã thêm sản phẩm ${product.product_name} vào mục yêu thích. Vui lòng truy cập 'Hồ Sơ > Mục Yêu Thích' để xem.`,
    });
    return res;
  }
  useEffect(() => {
    setProduct(null);
    getProduct();
  }, [id]);
  const [product, setProduct] = useState<IProduct>(null);
  const [cateId, setCateId] = useState<string>(null);
  useEffect(() => {
    if (product) {
      if (colors.length == 0) {
        const selectedPrice = product.product_colors.find(
          (e) => e.color_isPicked
        );
        setPrice(product.product_price + selectedPrice.color_price);
        setColors(
          product.product_colors.map((e) => {
            return {
              image: e.image_product_col,
              tooltip: e.color_name,
              color: e.color_code,
              enabled: e.color_isPicked,
              price: e.color_price,
            };
          })
        );
      }
      if (sizes.length == 0) {
        if (product.product_sizes.length > 0) {
          const selectedSize = product.product_sizes.find(
            (e) => e.size_isPicked
          );
          setPrice((prev) => prev + selectedSize.size_price);
          setSizes(
            product.product_sizes.map((e) => {
              return {
                name: e.size_name,
                enabled: e.size_isPicked,
                price: e.size_price,
              };
            })
          );
        }
        console.log(product.product_category);
      }
    }
  }, [product]);
  useEffect(() => {
    if (product) {
      setColors([]);
      setSizes([]);
    }
  }, [id]);
  useEffect(() => {
    if (product) {
      const half = Math.ceil(product.product_images.length / 2);
      setProductImages([
        product.product_images.slice(0, half),
        product.product_images.slice(half),
      ]);
    }
  }, [product]);
  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  useEffect(() => {}, [quantity]);
  function changeSelected(element: any, array: Array<any>, value: boolean) {
    return array.map((e) => {
      if (e == element) {
        return {
          ...element,
          enabled: value,
        };
      }
      return {
        ...e,
        enabled: false,
      };
    });
  }

  const { cart, addProduct, getCart } = useCart();
  const [loadingCart, setLoadingCart] = useState(false);
  const addProductToCart = async (proId: string) => {
    setLoadingCart(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      await getCart(currentUser._id);
      await addProduct(
        cart._id,
        proId,
        sizes.length != 0 ? sizes.find((e) => e.enabled).name : null,
        colors.length != 0 ? colors.find((e) => e.enabled).color : null,
        currentUser._id
      );
      toast({
        title: "Thêm vào giỏ hàng thành công",
        description: `Sản phẩm ${product.product_name} đã được thêm vào giỏ hàng thành công!`,
      });
    } catch (error) {
      console.error(error);
      alert("Thêm sản phẩm thất bại.");
    } finally {
      setLoadingCart(false);
    }
  };

  return error ? (
    <ErrorView
      title={`Sản phẩm không hợp lệ`}
      message={`Sản phẩm với mã ${id} không tồn tại, đã bị ẩn hoặc đã bị xóa`}
      icon="error"
    >
      <div className="flex flex-col gap-4 w-full items-center">
        <Link to={"/shop"}>
          <Button>Quay lại cửa hàng</Button>
        </Link>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="0">
            <AccordionTrigger>Chi tiết</AccordionTrigger>
            <AccordionContent>
              <b>
                Mã lỗi: {error.status} - {error.code}
              </b>
              <p>
                {
                  //@ts-ignore
                  error.response.data.message
                }
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ErrorView>
  ) : !product ? (
    <SkeletonLoadingProduct />
  ) : (
    <div className={`pt-4 transition-all w-full`}>
      <div className="product_main flex flex-1 gap-8 px-48 pb-10 justify-stretch relative box-border">
        <div className="w-1/2">
          <ImagesProduct
            imgList={[
              {
                img: product.product_thumb as string,
              },
            ]}
          />
        </div>
        <div className="flex flex-col gap-4 sticky top-[11.5rem] self-start w-1/2">
          <div>
            <h1>{product.product_name}</h1>
            <h2 className="text-3xl font-light">
              {price.toLocaleString()} đồng
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {sizes.length > 0 && (
              <>
                <h3 className="text-2xl font-light">Kích cỡ</h3>
                <div className="flex gap-4 w-full">
                  {sizes.map((e) => (
                    <Chip
                      enabled={e.enabled}
                      onClick={(enabled) => {
                        setSizes(() => changeSelected(e, sizes, enabled));
                        const selectedPrice = colors.find((e) => e.enabled);
                        setPrice(
                          (prev) =>
                            (product.product_price +
                              selectedPrice.price +
                              e.price) *
                            quantity
                        );
                      }}
                    >
                      {e.name}
                    </Chip>
                  ))}
                </div>
              </>
            )}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-light">Màu sắc</h2>
              <div className="flex gap-4 w-full">
                {colors.map((e) => (
                  <ColorChip
                    image={e.image}
                    active={e.enabled}
                    color={e.color}
                    onClick={(selected) => {
                      const selectedSize = sizes.find((e) => e.enabled);
                      setColors(() => changeSelected(e, colors, selected));
                      setPrice(
                        (prev) =>
                          (product.product_price +
                            e.price +
                            selectedSize.price) *
                          quantity
                      );
                      setProduct({
                        ...product,
                        product_thumb: e.image,
                      });
                    }}
                    tooltip={e.tooltip}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                disabled={loadingCart}
                onClick={() => {
                  if(!user) {
                    toast({
                      title: "Vui lòng đăng nhập",
                      description: "Vui lòng đăng nhập để mua sản phẩm này."})
                    return;
                  }
                  addProductToCart(product._id)
                }}
                className="flex items-center gap-4"
              >
                <ShoppingCart width={18} height={18} />
                Thêm vào giỏ hàng
              </Button>
              <Button
                disabled={!user}
                variant="secondary"
                onClick={addFavorite}
              >
                <Heart width={16} height={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-48 flex flex-col gap-2 pb-4">
        <h2 className="font-light">Mô tả sản phẩm</h2>
        <p>{product.product_description}</p>
        <div className="grid grid-cols-2 gap-x-2">
          {productImages.map((e) => {
            return (
              <div className="flex flex-col gap-2">
                {e.map((img) => {
                  return <img src={img} className="h-auto w-full" />;
                })}
              </div>
            );
          })}
        </div>
        <h2 className="font-light">Sản phẩm tương tự</h2>
        <Recommendations cate={cateId} currentId={id} />
      </div>
      <Footer />
    </div>
  );
}
