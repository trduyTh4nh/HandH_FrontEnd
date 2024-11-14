
import { Button } from "../../ui/button";

export default function PurchaseFinish() {
    return <div className='w-2/3 self-center h-full content-center'>
        <div className="flex flex-col text-center">
            <img
                className="w-auto h-24"
                src="\src\assets\image\check_circle.svg"
                alt="Logo"
            />
            <h1 className="text-4xl py-4">Thanh toán thành công!</h1>
            <div className="w-full">
                <p className="px-36 w-3/4 place-self-center text-center">Một email đã được gửi cho bạn kèm với hoá đơn, vui lòng chờ chúng tôi chuẩn bị sản phẩm cho bạn và chúng tôi sẽ giao cho bạn sớm nhất có thể!</p>

            </div>
            <p className="py-2 text-opacity-[0.55] text-black">Mã đơn hàng: 69jang420sn</p>
            <div className='flex px-7 flex-row w-full justify-evenly gap-x-4'>
                <Button className="font-bold w-full " type="submit">Xem đơn hàng</Button>
                    <Button variant={"secondary"} className="transition-all w-full font-bold">
                        Tiếp tục mua hàng
                    </Button>
            </div>

        </div>
    </div>
}