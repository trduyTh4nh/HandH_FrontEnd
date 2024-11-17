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

interface CartContextType {
  cart: any;
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<any>({});

  const getCart = async (userId: string) => {
    try {
      const response = await getAllCartOfUser(userId);
      setCart(response.metadata.cart || { items: [] });
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

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        addProduct,
        removeProduct,
        decreaseQuantity,
        setCart,
        increaseQuantity,
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
