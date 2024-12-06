import React, { useEffect } from "react";
import "../../styles/cart.css";
// import { cartSame } from "../../types/cart.type";
import CartItem from "../widget/CartItem";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { getAllCartOfUser } from "@/apis/cart/cart-repo";
import { Loader, Package, Store } from "lucide-react";
import { convertMoney } from "@/utils";
import { useCart } from "@/providers/CartContext";
import { Button } from "../ui/button";
import Footer from "../widget/footer";
import { Skeleton } from "../ui/skeleton";
import ErrorView from "../widget/Error.widget";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
const CartPage: React.FC = () => {
  const { cart, getCart, setCart, proceedToPayment } = useCart();
  const { user, isLoading } = useUser();
  const {toast} = useToast()
  const [isLoadingOrder, setIsLoadingOrder] = React.useState(false);
  const createPurchaseOrder = async () => {
    setIsLoadingOrder(true);
    const res = proceedToPayment()
    setIsLoadingOrder(false);
    navigate(`/payment`)
  };
  useEffect(() => {
    if (user) {
      getCart(user._id);
    }
  }, [user]);
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Giỏ hàng - Áo dài hồng đức</title>
      </Helmet>
      <div className="cart-page w-full py-4 flex-grow max-md:pb-[220px]">
        <div className="cart-page_wrap flex flex-col w-full px-4 lg:px-20 min-h-full">
          <div className="flex flex-col gap-0 w-full">
            <div className="z-10 bg-white w-full py-3 top-40 flex gap-2 items-center">
              <h2 className="font-bold text-3xl">Giỏ hàng</h2>
              <p>•</p>
              <p>
                {cart.cart_products
                  ? cart.cart_products.reduce(
                      (acc, cur) => acc + cur.quantity,
                      0
                    )
                  : 0}{" "}
                sản phẩm
              </p>
            </div>
          </div>
          <div className="cart-body h-full flex flex-col-reverse lg:flex-row w-full lg:gap-8 flex-grow">
            <div className="cart-body_left w-full mt-6">
              <div className=" h-px bg-[#E8E8E8]"></div>
              {!user && !isLoading ? (
                <ErrorView
                  message="Bạn cần đăng nhập để xem giỏ hàng của mình, hãy đăng nhập hoặc đăng ký tài khoản để tiếp tục!"
                  icon="notallowed"
                  className="py-4"
                  mini
                  title="Bạn chưa đăng nhập!"
                />
              ) : null}
              {cart.cart_products && cart.cart_products.length == 0 ? (
                <ErrorView
                  message="Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng, hãy bắt đầu mua sắm và thêm sản phẩm vào giỏ hàng để thanh toán nhé!"
                  icon="notfound"
                  className="py-4"
                  mini
                  title="Không có sản phẩm trong giỏ hàng."
                />
              ) : null}
              {cart.cart_products
                ? cart.cart_products.map((cartDetail, index) => {
                    return (
                      <CartItem
                        isChecked={cartDetail.isPicked}
                        onCheckChange={(isChecked) => {
                          setCart({
                            ...cart,
                            cart_products: cart.cart_products.map((e, i) =>
                              i === index ? { ...e, isPicked: isChecked } : e
                            ),
                          });
                        }}
                        key={index}
                        priceCartDetail={cartDetail.priceCartDetail}
                        product={cartDetail.product}
                        quantity={cartDetail.quantity}
                        colorPicked={cartDetail.color}
                        sizePicked={cartDetail.size}
                        idCart={cart._id}
                        idCartDetail={cartDetail._id}
                      />
                    );
                  })
                : !user && isLoading
                ? [...Array(5)].map((e, i) => (
                    <div className="cart-item border-b py-4 -z-10">
                      <div className="cart-item_wrap flex flex-col md:flex-row items-center justify-between px-2 gap-4 md:gap-0 -z-10">
                        <Skeleton className="w-6 h-6 mr-4" />
                        <div className="cart-item_wrap-left flex items-center gap-4 w-full">
                          <div className="cart-item_wrap-image py-4">
                            <Skeleton className="md:w-40 h-[128px]" />
                          </div>
                          <div className="wrap-mid-cart-info flex w-full flex-col">
                            <div className="cart-item_wrap-infomation">
                              <div className="info-name">
                                <Skeleton className="h-6 w-32" />
                              </div>
                              <div className="info-cate py-2">
                                <Skeleton className="h-4 w-24" />
                              </div>
                            </div>
                            <div className="cart-item_wrap_variant flex items-center gap-4">
                              <Skeleton className="h-8 w-[70px] rounded-full" />
                              <div className="bg-[#E8E8E8] flex flex-row items-center py-2 px-5 rounded-3xl">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="h-4 w-16 ml-2" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="cart-item_wrap-right flex flex-col md:flex-row gap-4 items-center">
                          <div className="cart-item_price flex gap-1 items-center">
                            <Skeleton className="h-6 w-24" />
                          </div>
                          <div className="cart-item_fluctuation flex justify-between items-center rounded-full px-4 py-2 bg-[#E8E8E8]">
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-6 w-12 text-center" />
                            <Skeleton className="h-6 w-6" />
                          </div>
                          <div className="cart-item-deletebtn">
                            <Skeleton className="h-8 w-24 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="w-px bg-black"></div>
            <div className="cart-body_right max-sm:h-0 w-full relative lg:w-1/3">
              <div className="cart-body_right_wrap fixed w-full max-sm:bottom-0 max-md:left-0 max-md:p-4 max-sm:bg-background/95 backdrop-blur-lg lg:w-1/3 flex flex-col gap-2 lg:pr-20">
                <div className="policy-payment flex gap-2 w-full lg:w-[100%] items-center">
                  <Checkbox
                    checked={
                      cart.cart_products &&
                      cart.cart_products.length != 0 &&
                      cart.cart_products &&
                      cart.cart_products.every((product) => product.isPicked)
                    }
                    disabled={
                      !cart.cart_products || cart.cart_products.length == 0
                    }
                    onCheckedChange={(checked) => {
                      setCart({
                        ...cart,
                        cart_products: cart.cart_products.map((e) => ({
                          ...e,
                          isPicked: checked,
                        })),
                      });
                    }}
                    id="check-all"
                  />
                  <label htmlFor="check-all" className="underline">
                    Chọn tất cả sản phẩm
                  </label>
                </div>
                <h2 className="text-2xl font-bold">Tổng tiền</h2>
                <h1 className="text-4xl font-bold">
                  {cart.cart_products
                    ? convertMoney(
                        cart.cart_products.reduce(
                          (acc, cur) =>
                            cur.isPicked ? acc + cur.priceCartDetail : acc,
                          0
                        )
                      )
                    : "Đang tải..."}
                </h1>
                <p>
                  Đã chọn{" "}
                  {cart.cart_products
                    ? cart.cart_products.filter((e) => e.isPicked).length
                    : 0}{" "}
                  sản phẩm
                </p>
                <div className="btn-payment w-full flex justify-center ">
                  <Button
                    onClick={() => {
                      createPurchaseOrder()
                    }}
                    disabled={
                      !cart ||
                      !cart.cart_products ||
                      cart.cart_products.every((e) => !e.isPicked) ||
                      isLoadingOrder
                    }
                    className="w-full"
                  >
                    {
                      isLoadingOrder ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader className="animate-spin" />
                          <span>Đang xử lý...</span>
                        </div>
                      ) : (
                        "Thanh toán"
                      ) 
                    }
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
