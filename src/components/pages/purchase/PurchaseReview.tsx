import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import GuestPurchaseForm from "@/components/widget/guestPurchaseForm.widget";
import { useToast } from "@/hooks/use-toast";
export default function PurchaseReview() {
  const {toast} = useToast();
  //DEBUG
  const [formMode, setFormMode] = useState(0);
  return (
    <div className="flex h-full">
      <div className="flex justify-center items-center w-2/3 flex-1">
        <h2>Đợi giỏ hàng của khứa thanh xong</h2>
      </div>
      <hr className="h-full border-black border-[1px]"></hr>
      <div className="flex flex-col w-1/3 px-8 gap-2 py-4">
        <h3>Tổng tiền</h3>
        <h2 className="font-bold">1.291.291 đồng</h2>
        <p>0 sản phẩm</p>
        <Select value="0">
          <SelectTrigger>
            <SelectValue placeholder="[DEBUG] Chế độ"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">[DEBUG ONLY] Chưa đăng nhập</SelectItem>
            <SelectItem value="1">
              [DEBUG ONLY] Đã đăng nhập nhưng chưa có địa chỉ
            </SelectItem>
            <SelectItem value="2">[DEBUG ONLY] Thông tin đầy đủ</SelectItem>
          </SelectContent>
        </Select>
        <GuestPurchaseForm onSubmit={(e) => {
          toast({title: "Thông tin khách hàng", description: JSON.stringify(e)});
        }}></GuestPurchaseForm>
        <Button variant={"secondary"} className="transition-all">
          Huỷ
        </Button>
      </div>
    </div>
  );
}
