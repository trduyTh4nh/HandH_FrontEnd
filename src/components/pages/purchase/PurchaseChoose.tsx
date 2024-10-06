import { Button } from "@/components/ui/button";
import SelectionButton from "@/components/widget/selectionButton.widget";
import { AccountBalance, AccountBalanceOutlined, Payments, PaymentsOutlined } from "@mui/icons-material";

export default function PurchaseChoose() {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex flex-col gap-2 w-1/2">
        <div>
          <h3 className="font-bold">Tổng tiền</h3>
          <h2 className="font-bold">12.421.413 đồng</h2>
          <p>0 sản phẩm</p>
        </div>
        <b>Phương thức thanh toán</b>
        <SelectionButton onClick={() => {}}>
            <>
                <img src="/momo_square_pinkbg.svg" alt="Momo" className="w-8 h-8" />
                <b>MoMo E-Wallet</b>
            </>
        </SelectionButton>
        <SelectionButton onClick={() => {}}>
            <>
                <div className="w-8 h-8 flex justify-center items-center">
                    <AccountBalanceOutlined className="text-2xl"/>
                </div>
                <b>Chuyển khoản</b>
            </>
        </SelectionButton>
        <SelectionButton onClick={() => {}}>
            <>
                <div className="w-8 h-8 flex justify-center items-center">
                    <PaymentsOutlined/>
                </div>
                <b>Tiền mặt</b>
            </>
        </SelectionButton>
        <Button variant={'link'} className="text-black hover:scale-100 self-start font-bold">Hướng dẫn thanh toán</Button>
        <div className="flex gap-4">
            <Button className="flex-1">Thanh toán</Button>
            <Button variant={'secondary'} className="flex-1">Quay về</Button>
            <Button variant={'secondary'} className="flex-1">Huỷ</Button>
        </div>
      </div>
    </div>
  );
}
