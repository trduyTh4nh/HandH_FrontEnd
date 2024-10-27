import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="px-20 py-4 bg-primary-light flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <img src="/logo_header.svg" className="h-12" />
      </div>
      <div className="flex gap-32">
        <div className="flex flex-col gap-2">
          <b>Tài khoản</b>
          <a>Hồ sơ</a>
          <a>Sản phẩm yêu thích</a>
          <a>Lịch sử mua hàng</a>
          <a>Đăng xuất</a>
        </div>
        <div className="flex flex-col gap-2">
          <b>Đơn hàng</b>
          <Link to={"/"}>Tình trạng đơn hàng</Link>
          <Link to={"/"}>Tra cứu đơn hàng</Link>
          <Link to={"/"}>Giỏ hàng</Link>
        </div>
        <div className="flex flex-col gap-2">
          <b>Giới thiệu</b>
          <Link to={"/"}>Về Hồng Đức</Link>
          <Link to={"/"}>Hoạt động của cửa hàng</Link>
        </div>
      </div>
      <hr className="border-t border-t-black" />
      <b>
        Đ/C: K20 Cư Xá Vĩnh Hội, Phường 6, Quận 4, TP. Hồ Chí Minh{" - "}
        <span>

            Liên hệ:{" "}
            <span>
              <a
                href="https://zaloapp.com/qr/p/1utkheobwdyv8"
                className="text-black"
              >
                0981734937
              </a>
            </span>
        </span>
      </b>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <Link className="text-black" to="/privacy">
            CHÍNH SÁCH BẢO MẬT
          </Link>
          <Link className="text-black" to="/policy">
            ĐIỀU KHOẢN & ĐIỀU KIỆN
          </Link>
        </div>
        <b>© 2024 - Áo dài Hồng Đức</b>
      </div>
    </div>
  );
}

export default Footer;
