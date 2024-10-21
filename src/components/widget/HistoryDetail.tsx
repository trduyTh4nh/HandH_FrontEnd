import React, { useState } from 'react';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";

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

const HistoryDetail: React.FC<OrderItemProps> = ({
  date,
  code,
  amount,
  itemsCount,
  status,
  paymentMethod,
  productList
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border rounded-lg mb-4 p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Đơn hàng {date}</h2>
          <p className="text-sm text-gray-500">Mã đơn hàng: {code}</p>
          <p className="text-sm">Phương thức thanh toán: {paymentMethod}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{amount} đồng</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{itemsCount} sản phẩm</p>
        </div>
        <div>
          <p className="bg-[#FFECC4] text-black rounded-full px-4 py-1 text-sm">
            {status}
          </p>
        </div>
        <div>
          <button className="bg-gray-200 text-black rounded-full px-4 py-1 text-sm">
            Hủy đơn hàng
          </button>
        </div>
        <button onClick={toggleExpand}>
          {isExpanded ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4">
          {productList.map((product, index) => (
            <div key={index} className="flex items-center border-t py-2">
              <div className="w-16 h-28 bg-gray-300 rounded-lg"></div>
              <div className="ml-4">
                <p className="font-semibold">{product.name}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-black rounded-full px-2 py-1 text-sm text-white">{product.size}</span>
                  <div className="flex bg-gray-200 rounded-full px-2 py-1 text-sm items-center font-bold gap-2">
                    <div className="w-4 h-4 bg-[#FFECC4] rounded-lg"></div>
                    <span className="">{product.color}</span>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                x{product.quantity}
              </div>
              <div className="ml-auto font-bold text-xl">
                {product.price} đồng
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default HistoryDetail;