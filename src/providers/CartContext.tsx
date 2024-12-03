import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  getAllCartOfUser,
  addProductIntoCart,
  removeProductInCart,
  decreaseQuantityCartDetail,
  createCartUser,
  increaseQuantityCartDetail,
} from "@/apis/cart/cart-repo";
import { IUserAddress } from "@/types/user.type";
import { createOrderFromCart } from "@/apis/order/order-repo";
import { AxiosError } from "axios";
import { set } from "date-fns";

interface CartContextType {
  cart: any;
  paymentProducts: any[];
  setCart: React.Dispatch<React.SetStateAction<any>>;
  getCart: (useId: string) => Promise<void>;
  addProduct: (
    idCart: string,
    idProduct: string,
    sizeProduct: string,
    colorProduct: string,
    userId: string
  ) => Promise<void>;
  removeProduct: (idCart: string, idCartDetail: string) => Promise<void>;
  decreaseQuantity: (idCart: string, idCartDetail: string) => Promise<void>;
  increaseQuantity: (idCart: string, idCartDetail: string) => Promise<void>;
  createPendingOrder: (idUser: string, address: IUserAddress) => Promise<any>;
  proceedToPayment: () => void;
  finishOrder: () => void;
  orderId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [paymentProducts, setPaymentProducts] = useState<any[]>([]);
  const [orderId, setOrderId] = useState<string>("");
  const [cart, setCart] = useState<any>({});
  const getCart = async (userId: string) => {
    try {
      const response = await getAllCartOfUser(userId);
      setCart({
        ...(response.metadata.cart || { items: [] }),
        cart_products: response.metadata.cart.cart_products.map((e) => ({
          ...e,
          isPicked: false,
        })),
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart({ items: [] });
    }
  };

  const addProduct = async (
    idCart: string,
    idProduct: string,
    size: string,
    color: string,
    userId: string
  ) => {
    try {
      await addProductIntoCart(idCart, idProduct, size, color);
      await getCart(userId);
      console.log("add product to cart successfully");
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const removeProduct = async (idCart: string, idCartDetail: string) => {
    try {
      await removeProductInCart(idCart, idCartDetail);
      console.log("remove product successfully!");
      // await getCart(idCart);
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const decreaseQuantity = async (idCart: string, idCartDetail: string) => {
    try {
      await decreaseQuantityCartDetail(idCart, idCartDetail);
      console.log("decrease product in cart successfully!");
      // await getCart(idCart);
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const increaseQuantity = async (idCart: string, idCartDetail: string) => {
    try {
      await increaseQuantityCartDetail(idCart, idCartDetail);
      console.log("increase product in cart successfully!");
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };
  const createPendingOrder = async (idUser: string, address: IUserAddress) => {
    if (orderId) {
      return;
    }
    const products = cart.cart_products
      .filter((e) => e.isPicked)
      .map((e) => e._id);
    console.log(products);
    const res = await createOrderFromCart(products, cart._id, idUser, address);
    console.log(res);
    //@ts-ignore
    setOrderId(res.metadata._id);
    //TODO: clear cart
    if (res instanceof AxiosError) {
      console.log("Failed to create order:", res);
      return res;
    }
    setCart({
      ...cart,
      cart_products: cart.cart_products.filter((e) => !e.isPicked),
    });
    return res;
  };
  const finishOrder = () => {
    setPaymentProducts([])
    setOrderId(null)
  }
  const proceedToPayment = () => {
    const products = cart.cart_products.filter((e) => e.isPicked);
    setPaymentProducts(products);
    setOrderId(null);
  };
  return (
    <CartContext.Provider
      value={{
        proceedToPayment,
        paymentProducts,
        cart,
        getCart,
        addProduct,
        removeProduct,
        decreaseQuantity,
        setCart,
        increaseQuantity,
        createPendingOrder,
        orderId,
        finishOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
