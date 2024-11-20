import { GetAllOrderOfUser } from "@/apis/cart/cart-repo";
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from 'react';

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
  const [expandedOrderIndex, setExpandedOrderIndex] = useState<number | null>(null); // Track which order is expanded

  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user || '{}');
  const userId = parsedUser._id;
  console.log(userId);

  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await GetAllOrderOfUser(userId);
      const updatedOrders = response.metadata.map(order => ({
        ...order,
        itemsCount: calculateItemsCount(order.products),
      }));
      setOrders(updatedOrders);
      console.log(updatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculateItemsCount = (products: Product[]) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };

  return (
    <div>
      {orders.map((order, index) => (
        <div key={index} className="border rounded-lg mb-4 p-4 shadow-sm w-full">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Đơn hàng {order.createdAt}</h2>
              <p className="text-sm text-gray-500">Mã đơn hàng: {order._id}</p>
              <p className="text-sm">Phương thức thanh toán: {order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{order.totalPrice} đồng</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{order.itemsCount} sản phẩm</p>
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
              {expandedOrderIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
            </button>
          </div>

          {expandedOrderIndex === index && (
            <div className="mt-4">
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center border-t py-2">
                  <img className="w-16 h-28 bg-gray-300 rounded-lg" src={product.product_thumb} alt="" />
                  <div className="ml-4">
                    <p className="font-semibold">{product.product_name}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-black rounded-full px-2 py-1 text-sm text-white">
                        {product.size ? product.size.size : ""}
                      </span>
                      <div
                        className="flex bg-gray-200 rounded-full px-2 py-1 text-sm items-center font-bold gap-2">
                        <div
                          style={{ backgroundColor: product.color ? product.color.color : "" }}
                          className="w-4 h-4 rounded-lg"
                        ></div>
                        <span>{product.color ? product.color.color : ""}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">x{product.quantity}</div>
                  <div className="ml-auto font-bold text-xl">{product.product_price} đồng</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllHis;
