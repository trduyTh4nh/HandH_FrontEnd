import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { cartSample } from "@/types/cart.type";
import { Link } from "react-router-dom";
import GuestPurchaseForm from "@/components/widget/guestPurchaseForm.widget";
import { useToast } from "@/hooks/use-toast";
import CartItemPayment from "@/components/widget/CartItemPayment";
import CircleIcon from '@mui/icons-material/Circle';

export default function PurchaseReview() {
  const {toast} = useToast();
  //DEBUG
  const [formMode, setFormMode] = useState(0);
  return (
    <div className="flex h-full">
      <div className="flex justify-center items-center w-2/3 flex-1 overflow-y-auto max-h-[80vh]">
        <div className="w-full mt-6">
                    <div className=" h-px bg-[#E8E8E8]"></div>
                        {
                            cartSample.cart_products.map((cartDetail) => (
                                <CartItemPayment
                                    
                                    product={cartDetail.product}
                                    quantity={cartDetail.quantity}
                                    colorPicked={cartDetail.colorPicked}
                                    sizePicked={cartDetail.sizePicked}
                                />
                            ))
                        }
                    </div>

      </div>
      <hr className="h-full border-black border-[1px]"></hr>
      <div className="flex flex-col w-1/3 px-8 gap-2 py-4">
        <h3 className="text-2xl font-bold">Tổng tiền</h3>
        <h2 className="font-bold text-4xl">1.291.291 đồng</h2>
        <div className="flex flex-row items-center">
          <p>6 sản phẩm</p>
          <CircleIcon style={{ color: "black", fontSize: 6, margin: "0 5px" }} />
          <p>Đã bao gồm thuế</p>
        </div>
        <GuestPurchaseForm onSubmit={(e) => {
          toast({title: "Thông tin cá nhân", description: JSON.stringify(e)});
        }}></GuestPurchaseForm>
        <Button variant={"secondary"} className="transition-all">
          Huỷ
        </Button>
      </div>
    </div>
  );
}
