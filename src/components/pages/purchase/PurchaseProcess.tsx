import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "../../ui/button";
import { useCart } from "@/providers/CartContext";
import { convertMoney } from "@/utils";
import { generageQRCode } from "@/apis/order/order-repo";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorView from "@/components/widget/Error.widget";

export default function PurchaseProcess() {
  const [imgQR, setImgQR] = useState<string>("");
  const { orderId, paymentProducts } = useCart();
  const navigate = useNavigate();
  async function getQRCode() {
    if (!orderId) {
      return;
    }
    const res = await generageQRCode(
      orderId,
      paymentProducts.reduce(
        (acc, cur) => (cur.isPicked ? acc + cur.priceCartDetail : acc),
        0
      )
    );
    if (res instanceof Error) {
      console.error(res);
      return;
    }
    //@ts-ignore
    setImgQR(res.data.qrDataURL);
  }
  useEffect(() => {
    getQRCode();
  }, []);

  const cart = useCart();

  return orderId ? (
    <div className="w-full h-full p-4 md:w-2/3 md:self-center md:h-auto">
      <div className="flex flex-col md:flex-row gap-4 p-5">
        <div className="flex flex-col w-full md:w-7/12">
          <p className="text-sm text-gray-500">
            Bạn đang thanh toán bằng hình thức{" "}
            <span className="font-bold text-black">“Chuyển khoản”</span>, vui
            lòng quét mã QR ở dưới bằng{" "}
            <span className="font-bold text-black">
              ứng dụng ngân hàng hoặc MoMo
            </span>{" "}
            và chuyển khoản cho cửa hàng. Sau khi chuyển khoản,{" "}
            <span className="font-bold text-black">
              vui lòng ấn “Hoàn tất” để hoàn thành đơn hàng.
            </span>
          </p>
          <h2 className="font-bold py-2 text-lg md:text-xl">Tổng tiền</h2>
          <h2 className="font-bold text-2xl md:text-4xl">
            {convertMoney(
              cart.paymentProducts.reduce(
                (acc, cur) => (cur.isPicked ? acc + cur.priceCartDetail : acc),
                0
              )
            )}
          </h2>
          <p className="py-2">
            {paymentProducts.reduce((acc, cur) => acc + cur.quantity, 0)} sản
            phẩm
          </p>
          <p className="font-bold underline cursor-pointer text-sm md:text-base">
            Hướng dẫn thanh toán
          </p>
        </div>
        <div className="w-full md:w-5/12 flex justify-center">
          {imgQR ? (
            <img src={imgQR} alt="Mã QR" className="w-full max-w-xs md:max-w-sm" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full">
          <Button
            onClick={() => navigate("/payment/status")}
            className="font-bold w-full"
          >
            Hoàn thành
          </Button>
          <Button variant={"secondary"} onClick={() => navigate("/payment/status")} className="transition-all w-full">
            Tôi muốn thanh toán sau
          </Button>
        </div>
        <div onClick={() => navigate("/payment")} className="flex flex-col gap-2 md:flex-row md:gap-4 w-full">
          <Button
            variant={"secondary"}
            className="transition-all w-full"
            onClick={() => navigate("/")}
          >
            Quay lại
          </Button>
          <Button onClick={() => navigate("/cart")} variant={"secondary"} className="transition-all w-full">
            Huỷ
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <ErrorView
      title="Hành động không hợp lệ!"
      message="Vui lòng không tự ý vào trang thanh toán."
      icon="error"
    />
  );
}