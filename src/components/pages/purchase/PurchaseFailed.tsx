
import { Button } from "../../ui/button";

export default function PuchaseFailed() {
    return <div className='w-2/3 self-center h-full content-center'>
        <div className="flex flex-col text-center">
            <img
                className="w-auto h-28"
                src="\src\assets\image\cancel.svg"
                alt="Logo"
            />
            <h1 className="text-4xl py-4">Thanh toán thất bại!</h1>
            <div className="py-2 w-full">
                <p className="px-36 w-3/4 place-self-center text-center">Đơn hàng của quý khách thanh toán không thành công</p>
                <p className="px-36 w-3/4 place-self-center text-center text-[#FA1D21]">Vui lòng thực hiện lại giao dịch hoặc liên hệ với cửa hàng để được hỗ trợ</p>

            </div>
            <div className='flex px-7 flex-row w-full justify-evenly gap-x-4'>
                <Button className="font-bold w-full " type="submit">Thanh toán lại</Button>
                    <Button variant={"secondary"} className="transition-all w-full font-bold ">
                        Quay về trang chủ
                    </Button>
            </div>

        </div>
    </div>
}