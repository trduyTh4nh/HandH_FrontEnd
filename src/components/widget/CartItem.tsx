import React from "react";
import { ICartDetail } from "../../types/cart.type";
import { Add, Remove } from "@mui/icons-material";

const CartItem: React.FC<ICartDetail> = (props) => {
    const { product, quantity, colorPicked, sizePicked } = props;
    
    return (
        <div className="cart-item border-b py-4 -z-10">
            <div className="cart-item_wrap flex flex-col md:flex-row items-center justify-between px-2 gap-4 md:gap-0 -z-10">
                <div className="cart-item_wrap-left flex items-center gap-4 w-full">
                    <div className="cart-item_wrap-image py-4 ">
                        <img src={product.product_thumb} className=" md:w-40 " alt="" />
                    </div>
                    <div className="wrap-mid-cart-info flex w-full flex-col">
                        <div className="cart-item_wrap-infomation">
                            <div className="info-name">
                                <h3 className="text-lg font-bold">{product.product_name}</h3>
                            </div>
                            <div className="info-cate py-2  ">
                                <p>{product.product_category}</p>
                            </div>
                        </div>
                        <div className="cart-item_wrap_variant flex items-center gap-4">
                            <div className="variant-size bg-black text-white w-[70px] px-4 py-1 rounded-full text-center">{sizePicked}</div>
                                <div className="bg-[#E8E8E8] flex flex-row items-center py-2 px-5 rounded-3xl ">
                                    <div className="variant-color w-4 h-4  rounded-full" style={{ backgroundColor: colorPicked }}></div>
                                    <p className="font-bold ml-2">Xanh dương</p>
                                </div>
                        </div>
                    </div>
                </div>

                <div className="cart-item_wrap-right flex flex-col md:flex-row gap-4 items-center">
                    <div className="cart-item_price flex gap-1 items-center ">
                        <p className="text-xl md:text-[24px] font-bold">{(product.product_price * quantity)}</p>
                        <span className="text-xl md:text-[24px] font-bold">đồng</span>
                    </div>
                    <div className="cart-item_fluctuation flex gap-1 items-center rounded-full px-4 py-3 bg-[#E8E8E8] ">
                        <button className="hover:cursor-pointer"><Remove /></button>
                        {/* <input type="text" className="hover:cursor-pointer w-10 text-center text-[#50d71e]" value={quantity} readOnly /> */}
                        <p className="w-12 text-center">{quantity}</p>
                        <button className="hover:cursor-pointer"><Add /></button>
                    </div>
                    <div className="cart-item-deletebtn">
                        <button className="rounded-full bg-[#E8E8E8] py-2 px-8 font-bold">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;