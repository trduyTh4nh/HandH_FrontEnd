import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import React, { useState } from 'react';


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

const AllHis: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // const [orders, setOrders] = useState<OrderItemProps[]>([]);

  // const fetchOrders = async () => {
      // api
  // };

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     fetchOrders();
  //   }
  // }, [startDate, endDate]);


  const orders: OrderItemProps[] = [
    {
      date: "01/11/2024",
      code: "DH001",
      amount: "500,000",
      itemsCount: 2,
      status: "Đã giao",
      paymentMethod: "Thẻ tín dụng",
      productList: [
        { name: "Áo phông", size: "L", color: "Đen", quantity: 1, price: "200,000" },
        { name: "Quần jeans", size: "M", color: "Xanh", quantity: 1, price: "300,000" }
      ]
    },
    {
      date: "05/11/2024",
      code: "DH002",
      amount: "300,000",
      itemsCount: 1,
      status: "Đang xử lý",
      paymentMethod: "Ví điện tử",
      productList: [
        { name: "Áo sơ mi", size: "M", color: "Trắng", quantity: 1, price: "300,000" }
      ]
    },
    {
      date: "10/11/2024",
      code: "DH003",
      amount: "450,000",
      itemsCount: 3,
      status: "Đang giao",
      paymentMethod: "Thanh toán khi nhận hàng",
      productList: [
        { name: "Giày thể thao", size: "42", color: "Đỏ", quantity: 1, price: "250,000" },
        { name: "Mũ lưỡi trai", size: "Free", color: "Đen", quantity: 1, price: "100,000" },
        { name: "Vớ", size: "Free", color: "Trắng", quantity: 1, price: "100,000" }
      ]
    },
    {
      date: "15/11/2024",
      code: "DH004",
      amount: "600,000",
      itemsCount: 2,
      status: "Đã hủy",
      paymentMethod: "Thẻ tín dụng",
      productList: [
        { name: "Áo khoác", size: "XL", color: "Xám", quantity: 1, price: "400,000" },
        { name: "Khăn choàng", size: "Free", color: "Đỏ", quantity: 1, price: "200,000" }
      ]
    }
  ];
  

  // Hàm để chuyển đổi chuỗi ngày thành đối tượng Date
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  // Lọc đơn hàng theo khoảng thời gian
  const filteredOrders = orders.filter((order) => {
    const orderDate = parseDate(order.date);

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return orderDate >= start && orderDate <= end;
    }
    return true; // Nếu chưa chọn ngày bắt đầu và ngày kết thúc thì hiển thị tất cả
  });

  return (
    <div>
      {/* Phần chọn ngày */}
      <div className="filter-section mb-4 flex gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Ngày bắt đầu"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Ngày kết thúc"
        />
      </div>

      {/* Hiển thị danh sách đơn hàng đã lọc */}
      {filteredOrders.map((order, index) => (
        <HistoryDetail key={index} {...order} />
      ))}

      {/* map list lịch sử mua hàng */}
      {/* {orders.map((order, index) => (
        <HistoryDetail key={index} {...order} />
      ))} */}
    </div>
  );
};

export default AllHis;




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

    <div>
     
      <div className="border rounded-lg mb-4 p-4 shadow-sm w-full">
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
    </div>
  );
};