import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="px-20 py-4 bg-primary flex flex-col gap-2">
      <div className="w-full flex justify-between">
        <img src="/logo_header.svg" className="h-12" />
        <div className="flex gap-6">
          <a>
            <img src="/facebook_logo.png" className="w-6 h-6 object-cover" />
          </a>
          <a>
            <img src="/tiktok_logo.png" className="w-6 h-6 object-contain" />
          </a>
        </div>
      </div>
      <b>Đ/C: K20 Cư Xá Vĩnh Hội, Phường 6, Quận 4, TP. Hồ Chí Minh</b>
      <b>
        Liên hệ:{" "}
        <span>
          <a
            href="https://zaloapp.com/qr/p/1utkheobwdyv8"
            className="text-black"
          >
            0981734937
          </a>
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
        <b>© 2024 - H&H Boutique</b>
      </div>
    </div>
  );
}

export default Footer;
