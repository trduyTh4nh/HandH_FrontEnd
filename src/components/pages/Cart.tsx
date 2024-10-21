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
                        <h1>Giỏ hàng</h1>
                        <p>{cartSample.cart_count} sản phẩm</p>
                    </div>

                </div>

                <div className="cart-body flex flex-col-reverse md:flex-row w-full gap-2"> {/* Stack on small screens, row on larger */}
                    <div className="cart-body_left w-full mt-6">
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
                    <div className="divider hidden md:block mx-4"></div> {/* Hide divider on mobile */}
                    <div className="cart-body_right w-full md:w-1/3 mt-6 md:mt-0"> {/* Adjust width on larger screens */}
                        <div className="cart-body_right_wrap md:fixed flex flex-col gap-2">
                            <h2>Tổng tiền</h2>
                            <h1>14.074.068 đồng</h1>
                            <div className="policy-payment flex gap-2 w-full md:w-[75%] items-center"> {/* Adjust width for mobile */}
                                <input type="checkbox" className="custom-checkbox -z-10" name="" id="" />
                                <p>Trước khi hàng mua tôi muốn chắc chắn ràng bạn đồng ý với <a href="">điều khoản</a> mà chúng tôi đã đưa ra</p>
                            </div>
                            <div className="btn-payment w-full flex justify-center">
                                <button className="rounded-3xl w-full md:w-[99%] bg-[#FFEFCD] -z-10">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;