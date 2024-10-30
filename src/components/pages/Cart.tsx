import React from "react";
import '../../styles/cart.css';
import { cartSample } from "../../types/cart.type";
import CartItem from "../widget/CartItem";

const CartPage: React.FC = () => {
    return (
        <div className="cart-page w-full py-4">
            <div className="cart-page_wrap w-full px-4 md:px-20"> {/* Add padding for smaller screens */}
                <div className="cart-title flex flex-col gap-0 w-full h-20">
                    <div className="cart-title_fixed fixed bg-white w-full py-3 top-40"> {/* Thêm z-index */}
                        <h1 style={{fontSize:56}}>Giỏ hàng</h1>
                        <p>{cartSample.cart_count} sản phẩm</p>
                    </div>

                </div>

                <div className="cart-body flex flex-col-reverse md:flex-row w-full gap-2 pt-20"> {/* Stack on small screens, row on larger */}
                    <div className="cart-body_left w-full mt-6">
                    <div className=" h-px bg-[#E8E8E8]"></div>
                        {
                            cartSample.cart_products.map((cartDetail) => (
                                <CartItem
                                    product={cartDetail.product}
                                    quantity={cartDetail.quantity}
                                    colorPicked={cartDetail.colorPicked}
                                    sizePicked={cartDetail.sizePicked}
                                />
                            ))
                        }
                    </div>
                    {/* <div className="divider-cart"></div> */}
                     <div className="w-px h-screen bg-black"></div>
                    {/* <div className="divider hidden md:block mx-4"></div> Hide divider on mobile */}
                    <div className="cart-body_right w-full md:w-1/3 mt-6 md:mt-0 p-5"> {/* Adjust width on larger screens */}
                        <div className="cart-body_right_wrap md:fixed flex flex-col gap-2">
                             <div className="policy-payment flex gap-2 w-full md:w-[100%] items-center"> {/* Adjust width for mobile */}
                                <input type="checkbox" className="custom-checkbox -z-10" name="" id="" />
                                <p className="underline">Chọn tất cả sản phẩm</p>
                            </div>
                            <h2 className="text-2xl font-bold">Tổng tiền</h2>
                            <h1 className="text-4xl font-bold">14.074.068 đồng</h1>
                            <p>Đã chọn 6 sản phấm</p>
                           
                            <div className="btn-payment w-full flex justify-center ">
                                <button className="rounded-3xl w-full md:w-[99%] bg-[#FFEFCD]  py-2 font-bold">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;