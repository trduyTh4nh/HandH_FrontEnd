import { useCart } from "@/providers/CartContext";
import { Button } from "../../ui/button";
import { useNavigate, useNavigation } from "react-router-dom";

export default function PurchaseFinish() {
  const navigate = useNavigate();
  const { orderId, finishOrder } = useCart();
  return (
    <div className="w-1/2 self-center h-full content-center">
      <div className="flex flex-col text-center">
        <img
          className="w-auto h-24"
          src="\src\assets\image\check_circle.svg"
          alt="Logo"
        />
        <h1 className="text-4xl py-4">Đặt hàng thành công!</h1>
        <div className="w-full">
          <p className="px-36 w-full place-self-center text-center">
            Chúng tôi sẽ gọi điện và xác nhận đơn hàng của bạn sớm nhất có thể!
            Vui lòng chờ nhé.
          </p>
        </div>
        <p className="py-2 text-opacity-[0.55] text-black">
          Mã đơn hàng: {orderId}
        </p>
        <div className="flex px-7 flex-row w-full justify-evenly gap-x-4">
          
          <Button
            onClick={() => {navigate("/shop"); finishOrder()}}
            className="transition-all w-full font-bold"
          >
            Tiếp tục mua hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
