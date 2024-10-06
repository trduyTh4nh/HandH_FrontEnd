import { useState } from "react";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Outlet, useLocation } from "react-router-dom";
import StepNumber from "@/components/widget/stepNumber.widget";

export default function PurchaseLayout() {
  const location = useLocation();
  const [steps, setSteps] = useState([
    {
      step: 1,
      title: "Điền thông tin cá nhân",
      isFinished: false,
      guide:
        "Hãy xem lại các sản phẩm mà bạn đã chọn mua, nếu mọi thứ đều ổn thì vui lòng điền thông tin cá nhân vào thanh bên và ấn “Tiếp theo”.",
      path: "/payment",
    },
    {
      step: 2,
      title: "Chọn phương thức thanh toán",
      isFinished: false,
      guide:
        "Vui lòng chọn 1 trong những phương thức thanh toán dưới đây. Đối với thanh toán bằng tiền mặt thì vui lòng chọn “Thanh toán khi nhận hàng”",
      path: "/payment/choose",
    },
    {
      step: 3,
      title: "Xem lại đơn hàng",
      isFinished: false,
      path: "/payment/process",
    },
    {
      step: 4,
      title: "Xử lý thanh toán",
      isFinished: false,
      path: "/payment/process",
    },
    {
      step: 5,
      title: "Đặt hàng thành công",
      isFinished: false,
      path: "/payment/status",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="w-full flex flex-col gap-4 min-h-full">
      <div className="bg-gray-100 w-full flex items-center justify-center px-20">
        {steps.map((e, i) => (
          <StepNumber disabled={!steps[i-1 < 0 ? 0 : i-1].isFinished && currentStep != i} key={i}
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
        <p>{location.pathname}</p>
        <Outlet />
      </div>
    </div>
  );
}
