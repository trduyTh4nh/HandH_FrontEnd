import { useCart } from "@/providers/CartContext";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

export default function PurchaseFinish() {
  const navigate = useNavigate();
  const { orderId, finishOrder } = useCart();

  return (
    <div className="w-full h-full px-4 md:w-1/2 md:self-center md:h-auto">
      <div className="flex flex-col items-center text-center py-6">
        <img
          className="w-20 h-20 md:w-24 md:h-24"
          src="\src\assets\image\check_circle.svg"
          alt="Logo"
        />
        <h1 className="text-2xl md:text-4xl py-4 font-semibold">Đặt hàng thành công!</h1>
        <p className="text-sm md:text-base px-6 md:px-12 text-gray-600">
          Chúng tôi sẽ gọi điện và xác nhận đơn hàng của bạn sớm nhất có thể! Vui lòng chờ nhé.
        </p>
        <p className="py-2 text-sm md:text-base text-gray-500">
          Mã đơn hàng: <span className="font-medium text-black">{orderId}</span>
        </p>
        <div className="flex flex-col gap-4 w-full mt-6">
          <Button
            onClick={() => { navigate("/shop"); finishOrder() }}
            className="transition-all w-full font-bold"
          >
            Tiếp tục mua hàng
          </Button>
        </div>
      </div>
    </div>
  );
}