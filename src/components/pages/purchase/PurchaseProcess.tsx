import CircleIcon from '@mui/icons-material/Circle';
import { Button } from "../../ui/button";


export default function PurchaseProcess() {
    return <div className='w-1/2 self-center h-full content-center'>
        <div className="flex flex-row p-5">
            <div className="w-7/12 flex flex-col">
                <p className='text-opacity-[0.55] text-black'>Bạn đang thanh toán bằng hình thức <span className="font-bold text-black">“Chuyển khoản”</span>, vui lòng quét mã QR ở dưới bằng <span className='font-bold text-black'>ứng dụng ngân hàng hoặc MoMo</span> và chuyển khoản cho cửa hàng. Sau khi chuyển khoản, <span className='font-bold text-black'>vui lòng ấn “Hoàn tất” để hoàn thành đơn hàng.</span></p>
                <h2 className="font-bold py-3">Tổng tiền</h2>
                <h2 className="font-bold text-4xl">14.291.291 đồng</h2>
                <div className="flex flex-row items-center py-3">
                    <p>6 sản phẩm</p>
                    <CircleIcon style={{ color: "black", fontSize: 6, margin: "0 5px" }} />
                    <p>Đã bao gồm thuế</p>
                </div>
                <p className='font-bold underline cursor-pointer'>Hướng dẫn thanh toán</p>
               
            </div>
            <div className='w-2/5'>
                <img
                    src="\src\assets\image\business_logic.png"
                    alt="Mã QR"
                />
            </div>
           
        </div>
        <div className='flex flex-row w-full justify-between gap-x-4'>
                    <Button className="font-bold w-full" type="submit">Hoàn thành</Button>
                    <Button variant={"secondary"} className="transition-all w-full">
                        Quay lại
                    </Button>
                    <Button variant={"secondary"} className="transition-all w-full">
                        Huỷ
                    </Button>
                </div>   
    </div>
}