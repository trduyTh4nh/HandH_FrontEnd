import { useEffect, useState } from "react";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Outlet, useLocation } from "react-router-dom";
import StepNumber from "@/components/widget/stepNumber.widget";
import { useCart } from "@/providers/CartContext";
import {Helmet} from "react-helmet"
export default function PurchaseLayout() {
  const location = useLocation();
  const [steps, setSteps] = useState([
    {
      step: 1,
      title: "Kiểm tra đơn hàng",
      isFinished: false,
      guide:
        "Hãy xem lại các sản phẩm mà bạn đã chọn mua, nếu mọi thứ đều ổn thì vui lòng điền thông tin cá nhân vào thanh bên và ấn “Tiếp theo”.",
      path: "/payment",
    },
    {
      step: 2,
      title: "Thanh toán",
      isFinished: false,
      path: "/payment/process",
    },
    {
      step: 3,
      title: "Trạng thái đặt hàng",
      isFinished: false,
      path: "/payment/status",
    },
  ]);
  const { state } = useLocation();
  const { paymentProducts, orderId } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    if (orderId) {
      setSteps(
        steps.map((e, i) => {
          if (i == 0) {
            return { ...e, isFinished: true };
          }
          return e;
        })
      );
    }
  }, [orderId]);
  return (
    <>
      <Helmet>
        <title>Thanh toán {orderId ? `- ${orderId}` : ""}</title>
      </Helmet>
      <div className="w-full flex flex-col gap-4 min-h-full">
        <div className="bg-gray-100 w-full flex items-center justify-center px-20">
          {steps.map((e, i) => (
            <StepNumber
              disabled={
                !steps[i - 1 < 0 ? 0 : i - 1].isFinished || currentStep != i
              }
              key={i}
              {...e}
              isCurrentStep={e.path == location.pathname}
              onClick={(selected) => {
                setCurrentStep(i);
              }}
            ></StepNumber>
          ))}
        </div>
        <div className="px-20 flex-1 flex flex-col">
          <p>{steps[currentStep].guide}</p>
          <Outlet />
        </div>
      </div>
    </>
  );
}
