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
    if(!orderId) {
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
    <div className="w-1/2 self-center h-full content-center">
      <div className="flex flex-row p-5">
        <div className="w-7/12 flex flex-col">
          <p className="text-opacity-[0.55] text-black">
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
          <h2 className="font-bold py-3">Tổng tiền</h2>
          <h2 className="font-bold text-4xl">
            {convertMoney(
              cart.paymentProducts.reduce(
                (acc, cur) => (cur.isPicked ? acc + cur.priceCartDetail : acc),
                0
              )
            )}
          </h2>
          <div className="flex flex-row items-center py-3">
            <p>
              {paymentProducts.reduce((acc, cur) => acc + cur.quantity, 0)} sản
              phẩm
            </p>
          </div>
          <p className="font-bold underline cursor-pointer">
            Hướng dẫn thanh toán
          </p>
        </div>
        <div className="w-2/5">
          {imgQR ? (
            <img src={imgQR} alt="Mã QR" />
          ) : (
            <div className="w-72 h-72 flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row w-full justify-between gap-x-4">
        <div className="flex gap-x-4 w-full">
          <Button onClick={() => navigate("/payment/status")} className="font-bold w-full" type="submit">
            Hoàn thành
          </Button>
          <Button onClick={() => navigate("/payment/status")} variant={"secondary"} className="transition-all w-full">
            Tôi muốn thanh toán sau
          </Button>
        </div>
        <div className="flex gap-x-4 w-full">
          <Button onClick={() => navigate("/payment")} variant={"secondary"} className="transition-all w-full">
            Quay lại
          </Button>
          <Button onClick={() => navigate("/cart")} variant={"secondary"} className="transition-all w-full">
            Huỷ
          </Button>
        </div>
      </div>
    </div>
  ) : <ErrorView title="Hành động không hợp lệ!" message="Vui lòng không tự ý vào trang thanh toán." icon="error" />;
}
