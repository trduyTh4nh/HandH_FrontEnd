import React, { useEffect } from "react";
import "../../styles/cart.css";
// import { cartSample } from "../../types/cart.type";
import CartItem from "../widget/CartItem";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { getAllCartOfUser } from "@/apis/cart/cart-repo";
import { Loader } from "lucide-react";
import { convertMoney } from "@/utils";
import { useCart } from "@/providers/CartContext";

const CartPage: React.FC = () => {
  const [cartMain, setCartMain] = React.useState<any>({});
  const { cart, getCart } = useCart();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    getCart(currentUser._id);
  }, []);

  useEffect(() => {
    setCartMain(cart);

    console.log("cartmain: ", cartMain);
  }, [cart]);

  return (
    <div className="cart-page w-full py-4">
      <div className="cart-page_wrap w-full px-4 md:px-20">
        {" "}
        <div className="cart-title flex flex-col gap-0 w-full h-20">
          <div className="cart-title_fixed fixed z-10 bg-white w-full py-3 top-40">
            {" "}
            <h1 style={{ fontSize: 56 }}>Giỏ hàng</h1>
            <p>{cartMain.cart_count} sản phẩm</p>
          </div>
        </div>
        <div className="cart-body flex flex-col-reverse md:flex-row w-full gap-2 pt-20">
          {" "}
          <div className="cart-body_left w-full mt-6">
            <div className=" h-px bg-[#E8E8E8]"></div>
            {cart.cart_products ? (
              cart.cart_products.map((cartDetail, index) => {
                return (
                  <CartItem
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
            ) : (
              <Loader className="animate-spin" />
            )}
          </div>
          <div className="w-px h-screen bg-black"></div>
          <div className="cart-body_right w-full md:w-1/3 mt-6 md:mt-0 p-5">
            {" "}
            <div className="cart-body_right_wrap md:fixed flex flex-col gap-2">
              <div className="policy-payment flex gap-2 w-full md:w-[100%] items-center">
                {" "}
                <Checkbox className="-z-10" name="" id="" />
                <p className="underline">Chọn tất cả sản phẩm</p>
              </div>
              <h2 className="text-2xl font-bold">Tổng tiền</h2>
              <h1 className="text-4xl font-bold"></h1>
              <p>Đã chọn 6 sản phấm</p>
              <div className="btn-payment w-full flex justify-center ">
                <button className="rounded-3xl w-full md:w-[99%] bg-[#FFEFCD]  py-2 font-bold">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
