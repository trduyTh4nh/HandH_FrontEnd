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
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState(0);
  const { user } = useUser();
  const cart = useCart();

  return (
    <div className="flex flex-col h-full w-full md:flex-row">
      {/* Danh sách sản phẩm */}
      <div className="flex flex-col flex-1 overflow-y-auto max-h-[70vh] px-4 py-4">
        <h3 className="text-xl font-bold mb-4">Danh sách sản phẩm</h3>
        {cart.paymentProducts.map((item, index) => (
          <CartItemPayment
            key={index}
            {...item}
            colorPicked={item.color}
            sizePicked={item.size}
          />
        ))}
      </div>

      <hr className="hidden md:block border-black border-[1px]" />

      <div className="flex flex-col w-full md:w-1/3 px-4 py-4 gap-4">
        <h3 className="text-lg font-bold">Tổng tiền</h3>
        <h2 className="font-bold text-2xl md:text-3xl">
          {convertMoney(
            cart.paymentProducts.reduce(
              (acc, cur) => (cur.isPicked ? acc + cur.priceCartDetail : acc),
              0
            )
          )}
        </h2>
        <p>
          {cart.paymentProducts.reduce((acc, cur) => acc + cur.quantity, 0)} sản phẩm
        </p>

        {/* Thông tin cá nhân */}
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
          />
        )}
        <Button onClick={() => navigate("/cart")} variant={"secondary"} className="transition-all">
          Huỷ
        </Button>
      </div>
    </div>
  );
}


