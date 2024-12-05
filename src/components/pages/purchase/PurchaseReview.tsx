import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import GuestPurchaseForm from "@/components/widget/guestPurchaseForm.widget";
import { useToast } from "@/hooks/use-toast";
import CartItemPayment from "@/components/widget/CartItemPayment";
import CircleIcon from "@mui/icons-material/Circle";
import { useCart } from "@/providers/CartContext";
import CartItem from "@/components/widget/CartItem";
import { convertMoney } from "@/utils";
import useUser from "@/hooks/user-user";
import CustomerInformationPayment from "@/components/widget/customerInformation.widget";

export default function PurchaseReview() {
  const { toast } = useToast();
  const navigate = useNavigate()
  //DEBUG
  const [formMode, setFormMode] = useState(0);
  const { user } = useUser();
  const cart = useCart();
  return (
    <div className="flex h-full">
      <div className="flex justify-center w-2/3 flex-1 overflow-y-auto max-h-[80vh]">
        <div className="w-full mt-6">
          {cart.paymentProducts.map((item, index) => (
            <CartItemPayment
              key={index}
              {...item}
              colorPicked={item.color}
              sizePicked={item.size}
            />
          ))}
        </div>
      </div>
      <hr className="h-full border-black border-[1px]"></hr>
      <div className="flex flex-col w-1/3 px-8 gap-2 py-4">
        <h3 className="text-2xl font-bold">Tổng tiền</h3>
        <h2 className="font-bold text-4xl">
          {convertMoney(
            cart.paymentProducts.reduce(
              (acc, cur) => (cur.isPicked ? acc + cur.priceCartDetail : acc),
              0
            )
          )}
        </h2>
        <div className="flex flex-row items-center">
          <p>
            {cart.paymentProducts.reduce((acc, cur) => acc + cur.quantity, 0)}{" "}
            sản phẩm
          </p>
        </div>
        {user ? (
          <CustomerInformationPayment />
        ) : (
          <GuestPurchaseForm
            onSubmit={(e) => {
              toast({
                title: "Thông tin cá nhân",
                description: JSON.stringify(e),
              });
            }}
          ></GuestPurchaseForm>
        )}
        <Button onClick={() => navigate("/cart")} variant={"secondary"} className="transition-all">
          Huỷ
        </Button>
      </div>
    </div>
  );
}
