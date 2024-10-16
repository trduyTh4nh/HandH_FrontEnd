import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import RegisterPersonal from "./registerPersonal.widget";
import { useState } from "react";
import RegisterAddress from "./registerAddress.widget";

function PopupRegister({ handleChange, switchToLogin }: any) {
  const [registerData, setRegisterData] = useState({})
  const steps = [
    (<RegisterPersonal defaultValue={registerData} onSubmit={(data) => {
      finishStep(data, false)
    }}/>),
  ]
  const [currentStep, setCurrentStep] = useState(0)
  function finishStep(data, back){
    setRegisterData({
      ...registerData,
      ...data
    })
    console.log({
      ...registerData,
      ...data
    })
    if(back && currentStep != 0){
      setCurrentStep(currentStep - 1)
      return;
    }
    if(currentStep != steps.length - 1){
      setCurrentStep(currentStep + 1)
    } else {
      // Call API to register
    }
  }
  return (
    <div className="flex gap-4 w-full">
      <div className="flex-1">
        <img
          src="src/assets/image/imglogin.jpg"
          alt="login"
          className="w-full rounded-2xl object-cover h-full"
        />
      </div>
      <div className="flex flex-col items-center w-1/2 justify-center gap-4">
        <img src="src/assets/image/logo_header.svg" />
        <h2 style={{ fontWeight: "bold" }}>Đăng ký</h2>
        {
          steps[currentStep]
        }
        <div className="bottom-popup-login">
          <h4>Đã có tài khoản?</h4>
          <h4
            onClick={switchToLogin}
            className="text-color-secondnary"
            id="text-register"
          >
            Đăng nhập
          </h4>
        </div>
      </div>
    </div>
  );
}

export default PopupRegister;
