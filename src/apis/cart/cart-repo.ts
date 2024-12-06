import { Axios, AxiosError, isAxiosError } from "axios";
import API from "../api";

const api = new API({ headerType: "json" });
const specialApi = new API({ headerType: "formdata" });

export async function getAllCartOfUser(idUser: string) {
  try {
    const response = await api.get(`cart/getCartUser/${idUser}`);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function addProductIntoCart(
  idCart: string,
  idProduct: string,
  sizeProduct: string,
  colorProduct: string
) {
  try {
    console.log("input data: ", {
      idCart: idCart,
      idProduct: idProduct,
      sizeProduct: sizeProduct,
      colorProduct: colorProduct,
    });

    const response = await api.patch(`cart/addProductToCart`, {
      idCart: idCart,
      idProduct: idProduct,
      sizeProduct: sizeProduct,
      colorProduct: colorProduct,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function removeProductInCart(
  idCart: string,
  idCartDetail: string
) {
  try {
    const response = await api.post(`cart/removeProductInCart`, {
      cart: idCart,
      cartDetail: idCartDetail,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function decreaseQuantityCartDetail(
  idCart: string,
  idCartDetail: string
) {
  try {
    console.log("input data: ", idCart, idCartDetail);

    const response = await api.put(`cart/decreaseQuantityProductIncart`, {
      cart: idCart,
      cartDetail: idCartDetail,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function increaseQuantityCartDetail(
  idCart: string,
  idCartDetail: string
) {
  try {
    const response = await api.put(`cart/increaseQuantityProductIncart`, {
      cart: idCart,
      cartDetail: idCartDetail,
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function createCartUser(idUser: string) {
  try {
    const response = await api.post(`cart/createCart`, {
      cart: {
        cart_user: idUser,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function createCart(idUser: string) {
  try {
    const res = await api.post("cart/createCart", {
      cart: {
        cart_user: idUser
      }
    })
  } catch (e) {
    if(e instanceof AxiosError) {
      console.warn(e);
      return e;
    }
    console.error(e);
  }
}
export async function GetAllOrderOfUser(idUser: string) {
  try {
    const response = await api.get(`order/getAllOrderOfUser/${idUser}`);
    return response; // Axios sẽ trả về response với kiểu xác định
  } catch (e) {
    if (e instanceof AxiosError) {
      console.warn(e);
      // Đảm bảo trả về response data từ lỗi
      return e.response?.data || e.message;
    }
    console.error(e);
    return null;
  }
}
export async function deleteMultipleItemsinCart(idCart: string, products: string[]) {
  try {
    const response = await api.post(`cart/deleteManyCartDetail`, {
      cart: idCart,
      cartDetails: products
    });
    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.warn(e);
      return e;
    }
    console.error(e);
    return null;
  }
}
export async function bulkRemoveProductIncart(idCart: string, products: string[]) {
  try {
    const payload = {
      cart: idCart,
      cartDetails: products
    }
  } catch {

  }
}
// const user = localStorage.getItem('user');
//   const parsedUser = JSON.parse(user);
//   const userId = parsedUser._id;
//   console.log(userId);

//   const fetchOrders = async () => {
//     try {
//       const response = await GetAllOrderOfUser(userId);  // Gọi API để lấy tất cả đơn hàng của người dùng
//       console.log(response);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//   };

