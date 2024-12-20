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
import { register } from "@/apis/user/user-repo";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import errorIndexes from "@/utils/errorKey";

function PopupRegister({ handleChange, switchToLogin }: any) {
  const [registerData, setRegisterData] = useState({})
  const [loading, setLoading] = useState(false)
  const steps = [
    (<RegisterPersonal loading={loading} defaultValue={registerData} onSubmit={(data) => {
      finishStep(data, false)
    }}/>),
  ]
  const {toast} = useToast()
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
      setLoading(true)
      register(data).then(e => {
        if(e instanceof AxiosError){
          setLoading(false)
          toast({title: "Đăng ký thất bại", description: errorIndexes[e.response.data.message] || "Lỗi bất định, vui lòng thử lại"})
          return
        }
        setLoading(false)
        toast({title: "Chào mừng bạn!", description: "Bạn đã đăng ký thành viên thành công!"})
        handleChange()
      })
    }
  }
  return (
    <div className="flex gap-4 w-full">
      <div className="flex-1 md:block hidden">
        <img
          src="/imglogin.jpg"
          alt="login"
          className="w-full rounded-2xl object-cover h-full"
        />
      </div>
      <div className="flex flex-col items-center w-full md:w-1/2 justify-center gap-4">
        <img src="/logo_header.svg" />
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
