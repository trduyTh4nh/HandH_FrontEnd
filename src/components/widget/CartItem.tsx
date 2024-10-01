import React from "react";
import { ICartDetail } from "../../types/cart.type";
import { Add, Remove } from "@mui/icons-material";



const CartItem: React.FC<ICartDetail> = (props) => {
    const { product, quantity, colorPicked, sizePicked } = props
    // function findCateName(listCate: ICategory[]): string {
    //     var findNameCate = ''
    //     if(listCate){
    //         const cate: ICategory = listCate.forEach((e) => e.)
    //     }
    // }
    return <div className="cart-item">
        <div className="cart-item_wrap flex  items-center justify-between px-2">

            <div className="cart-item_wrap-left flex items-center gap-2  w-full  ">
                <div className="cart-item_wrap-image">
                    <img src={product.product_thumb} className="w-40" alt="" />
                </div>
                <div className="wrap-mid-cart-info flex  w-full flex-col">
                    <div className="cart-item_wrap-infomation ">
                        <div className="info-name"><h3 className="text-lg font-bold">{product.product_name}</h3></div>
                        <div className="info-cate"><p>{product.product_category}</p></div>
                    </div>
                    <div className="cart-item_wrap_variant flex items-center gap-4">
                        <div className="variant-size bg-black text-white w-[70px] px-4 py-1 rounded-full ">{sizePicked}</div>
                        <div className="variant-color w-10 h-10 rounded-full" style={{
                            backgroundColor: colorPicked
                        }}></div>
                    </div>
                </div>
            </div>

            <div className="cart-item_wrap-right flex gap-3 items-center">
                <div className="cart-item_price flex gap-1 items-center"><p className="text-[30px] font-bold">{(product.product_price * quantity)}  </p> <span className="text-[30px] font-bold">đồng</span></div>
                <div className="cart-item_fluctuation flex gap-1 items-center  rounded-full px-4 py-2">
                    <button className="hover:cursor-pointer"><Add></Add></button>
                    <input type="text" className="hover:cursor-pointer w-10 bg-white text-center" value={quantity} ></input>
                    <button className="hover:cursor-pointer"><Remove></Remove></button>
                </div>
                <div className="cart-item-deletebtn">
                    <button className="rounded-full">Xóa</button>
                </div>
            </div>
        </div>
    </div>
}

export default CartItem