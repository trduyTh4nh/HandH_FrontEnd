import { GetAllOrderOfUser } from "@/apis/cart/cart-repo";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ErrorView from "../widget/Error.widget";
import { Input } from "../ui/input";
import { getProduct } from "@/apis/products/product-repo";
import { AxiosError } from "axios";

interface Product {
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: string;
}

interface OrderItemProps {
  date: string;
  code: string;
  amount: string;
  itemsCount: number;
  status: string;
  paymentMethod: string;
  productList: Product[];
}

const AllHis = () => {
  const [expandedOrderIndex, setExpandedOrderIndex] = useState<number | null>(
    null
  ); // Track which order is expanded
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user || "{}");
  const userId = parsedUser._id;
  console.log(userId);
  async function getProducts() {
    const res = await getProduct();
    if (res instanceof AxiosError) {
      console.warn(res);
      return;
    }
    console.log(res.metadata)
    setProducts(res.metadata);
  }
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await GetAllOrderOfUser(userId);
      await getProducts();
      console.log(response);
      const updatedOrders = response.metadata.map((order) => ({
        ...order,
        itemsCount: calculateItemsCount(order.products),
      }));
      setOrders(updatedOrders);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const calculateItemsCount = (products: Product[]) => {
    console.log(products)
    return products.reduce((total, product) =>  {
      if(product)
        return total + product.quantity
    }, 0);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };
  const filterOrdersByDate = () => {
    if (!startDate || !endDate) return orders;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= start && orderDate <= end;
    });
  };

  const filteredOrders = filterOrdersByDate();
  return loading ? (
    <div>Loading...</div>
  ) : orders.length > 0 ? (
    <div>
      <div className="filter-section mb-4 flex gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1 bg-background"
          placeholder="Ngày bắt đầu"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1 bg-background"
          placeholder="Ngày kết thúc"
        />
      </div>
      {filteredOrders.map((order, index) => (
        <div
          key={index}
          className="border rounded-lg mb-4 p-4 shadow-sm w-full"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                Đơn hàng ngày {new Date(order.createdAt).toLocaleDateString()}
              </h2>
              <p className="text-sm text-gray-500">Mã đơn hàng: {order._id}</p>
              <p className="text-sm">
                Phương thức thanh toán: {order.paymentMethod}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">{order.totalPrice} đồng</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {order.itemsCount} sản phẩm
              </p>
            </div>
            <div>
              <p className="bg-[#FFECC4] text-black rounded-full px-4 py-1 text-sm">
                {order.orderStatus}
              </p>
            </div>
            <div>
              <button className="bg-gray-200 text-black rounded-full px-4 py-1 text-sm">
                Hủy đơn hàng
              </button>
            </div>
            <button onClick={() => toggleExpand(index)}>
              {expandedOrderIndex === index ? (
                <ArrowDropUpOutlined />
              ) : (
                <ArrowDropDownOutlined />
              )}
            </button>
          </div>

          {expandedOrderIndex === index && (
            <div className="mt-4">
              {order.products.map((product, index) => product && (
                <div key={index} className="flex items-center border-t py-2">
                  <img
                    className="w-16 h-28 bg-gray-300 rounded-lg object-cover"
                    src={product.product_thumb}
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{product.product_name}</p>
                    <div className="flex items-center gap-2">
                      {product.size && (
                        <span className="flex justify-center items-center bg-black rounded-full px-4 py-2 h-8 text-sm text-white">
                          {product.size ? product.size.size : "    "}
                        </span>
                      )}
                      {product.color && (
                        <div className="flex bg-gray-200 rounded-full px-4 py-2 h-8 text-sm items-center font-bold gap-2">
                          {product.color && (
                            <div
                              style={{
                                backgroundColor: product.color
                                  ? product.color.color
                                  : "",
                              }}
                              className="w-4 h-4 rounded-lg"
                            ></div>
                          )}
                          <span>
                            {product.color ? product.color.color : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-auto">x{product.quantity}</div>
                  <div className="ml-auto font-bold text-xl">
                    {product.priceAtPurchase} đồng
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <ErrorView
      title="Không có lịch sử mua hàng."
      message="Bạn không có đơn hàng nào đã thanh toán trước đó."
      icon="notfound"
      className="h-full"
    />
  );
};

export default AllHis;
