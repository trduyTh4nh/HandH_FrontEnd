import React from "react";
import { ICartDetail } from "../../types/cart.type";

import { Checkbox } from "../ui/checkbox";
import { convertHextoColorName, convertMoney } from "@/utils";
import { useCart } from "@/providers/CartContext";
import debounce from "lodash.debounce";
import { Minus, Plus } from "lucide-react";

interface ICartItemProps extends ICartDetail {
  isChecked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}
const CartItem: React.FC<ICartItemProps> = (props) => {
  const {
    isChecked,
    product,
    quantity,
    colorPicked,
    sizePicked,
    priceCartDetail,
    idCart,
    idCartDetail,
    onCheckChange,
  } = props;
  const {
    cart,
    getCart,
    removeProduct,
    setCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteProductInCart = async () => {
    setIsDeleting(true);

    try {
      await removeProduct(idCart, idCartDetail);
      setIsDeleting(false);
      setCart((prev) => ({
        ...prev,
        cart_products: prev.cart_products.filter(
          (item) => item._id !== idCartDetail
        ),
      }));
    } catch (error) {
      console.error("Failed to remove product:", error);
      setIsDeleting(false);
      // Khôi phục lại sản phẩm nếu API gọi thất bại
    }
  };

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const decreaseQuantityCartProduct = debounce(async () => {
    setCart((prev) => ({
      ...prev,
      cart_products: prev.cart_products.map((item) =>
        item._id === idCartDetail
          ? {
              ...item,
              quantity: item.quantity - 1,
              priceCartDetail:
                item.priceCartDetail -
                (item.product.price_product +
                  item.color.priceColor +
                  item.size.priceSize),
            }
          : item
      ),
    }));

    try {
      await decreaseQuantity(idCart, idCartDetail);
    } catch (error) {
      setCart((prev) => ({
        ...prev,
        cart_products: prev.cart_products.map((item) =>
          item._id === idCartDetail
            ? {
                ...item,
                quantity: item.quantity + 1,
                priceCartDetail:
                  item.priceCartDetail +
                  (item.product.price_product +
                    item.color.priceColor +
                    item.size.priceSize),
              }
            : item
        ),
      }));
    }
  }, 450);

  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  const increaseQuantityCartProduct = debounce(async () => {
    setCart((prev) => ({
      ...prev,
      cart_products: prev.cart_products.map((item) =>
        item._id === idCartDetail
          ? {
              ...item,
              quantity: item.quantity + 1,
              priceCartDetail:
                item.priceCartDetail +
                (item.product.price_product +
                  item.color.priceColor +
                  item.size.priceSize),
            }
          : item
      ),
    }));

    try {
      await increaseQuantity(idCart, idCartDetail);
    } catch (error) {
      console.log(error);
      setCart((prev) => ({
        ...prev,
        cart_products: prev.cart_products.map((item) => {
          item._id === idCartDetail
            ? {
                ...item,
                quantity: item.quantity - 1,
                priceCartDetail:
                  item.priceCartDetail -
                  (item.product.price_product +
                    item.color.priceColor +
                    item.size.priceSize),
              }
            : item;
        }),
      }));
    }
  }, 450);

  return (
    <div className={`${isDeleting ? "blur-[1px] opacity-50 scale-95" : ""} cart-item border-b py-4 -z-10 transition-all`}>
      <div className="cart-item_wrap flex flex-col md:flex-row items-center justify-between px-2 gap-4 md:gap-0 -z-10">
        <Checkbox
          checked={isChecked}
          className="w-6 h-6 mr-4"
          onCheckedChange={onCheckChange}
        ></Checkbox>
        <div className="cart-item_wrap-left flex items-center gap-4 w-full">
          <div className="cart-item_wrap-image py-4 ">
            <img
              src={product.thumb_product as string}
              className=" md:w-40 "
              alt=""
            />
          </div>
          <div className="wrap-mid-cart-info flex w-full flex-col">
            <div className="cart-item_wrap-infomation">
              <div className="info-name">
                <h3 className="text-lg font-bold">{product.name_product}</h3>
              </div>
              <div className="info-cate py-2  ">
                <p>{product.category_product}</p>
              </div>
            </div>
            <div className="cart-item_wrap_variant flex items-center gap-4">
              <div className="variant-size bg-black text-white w-[70px] px-4 py-1 rounded-full text-center">
                {sizePicked.size}
              </div>
              <div className="bg-[#E8E8E8] flex flex-row items-center py-2 px-5 rounded-3xl ">
                <div
                  className="variant-color w-4 h-4  rounded-full"
                  style={{ backgroundColor: colorPicked.color }}
                ></div>
                <p className="font-bold ml-2">
                  {convertHextoColorName(colorPicked.color)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-item_wrap-right flex flex-col md:flex-row gap-4 items-center">
          <div className="cart-item_price flex gap-1 items-center ">
            <p className="text-xl md:text-[24px] font-bold">
              {convertMoney(priceCartDetail)}
            </p>
          </div>
          <div className="cart-item_fluctuation flex justify-between items-center rounded-full px-4 py-2 bg-[#E8E8E8] ">
            <button
              disabled={quantity === 1 || isDeleting}
              onClick={decreaseQuantityCartProduct}
              className="hover:cursor-pointer"
            >
              <Minus
                width={16}
                height={16}
                className={
                  quantity === 1
                    ? "text-gray-500/45 transition-all cursor-not-allowed"
                    : "transition-all"
                }
              />
            </button>
            <p className="w-12 text-center">{quantity}</p>
            <button
              disabled={isDeleting}
              onClick={increaseQuantityCartProduct}
              className="hover:cursor-pointer"
            >
              <Plus width={16} height={16} />
            </button>
          </div>
          <div className="cart-item-deletebtn">
            <button
              disabled={isDeleting}
              onClick={deleteProductInCart}
              className="rounded-full bg-[#E8E8E8] py-2 px-8 font-bold"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
