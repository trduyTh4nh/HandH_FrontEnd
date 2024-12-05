import React from "react";
import { ICartDetail } from "../../types/cart.type";
import { Add, Remove } from "@mui/icons-material";
import { convertHextoColorName, convertMoneyP2 } from "@/utils";

const CartItemPayMent: React.FC<ICartDetail> = (props) => {
    const { product, quantity, colorPicked, sizePicked, priceCartDetail }: any = props;

    return (
        <div className="cart-item border-b py-4">
            <div className="cart-item_wrap flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4 w-full">
                    <div className="cart-item_wrap-image py- ">
                        {/* <img src={product.product_thumb as string} className=" md:w-40 " alt="" /> */}
                        <img src={product.thumb_product} className=" md:w-40 rounded-xl" alt="" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base font-bold md:text-lg">{product.name_product}</h3>
                        <p className="text-sm md:text-base text-gray-500">{product.product_category}</p>
                        <div className="flex gap-2 mt-2">
                            <div className="variant-size bg-black text-white px-4 py-1 rounded-full text-center text-sm">
                                {sizePicked.size}
                            </div>
                            <div className="flex items-center bg-gray-200 px-4 py-1 rounded-full">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: colorPicked.color }}
                                />
                                <p className="ml-2 text-sm font-bold">
                                    {convertHextoColorName(colorPicked.color)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm md:text-base">x{quantity}</p>
                    <p className="text-base md:text-xl font-bold">
                        {convertMoneyP2(priceCartDetail * quantity)}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default CartItemPayMent;