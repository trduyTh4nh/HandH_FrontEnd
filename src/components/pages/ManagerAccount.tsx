import React from "react";
import "../../styles/managerAccount.css";
import { NavLink, Outlet } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import avt from "../../assets/image/rectangle.png";
import { CircleUser, Heart, ReceiptText } from "lucide-react";
const navLinks = [
  {
    path: "account",
    icon: <CircleUser />,
    display: "Tài khoản",
  },
  {
    path: "paymentHistory",
    icon: <ReceiptText />,
    display: "Lịch sử mua hàng",
  },
  {
    path: "favoriteProduct",
    icon: <Heart />,
    display: "Sản phẩm yêu thích",
  },
];
export const ManagerAccount: React.FC = () => {
  return (
    <>
      <div className="fixed h-full top-0 pt-[11.2rem] pb-8 pl-20 pr-8 box-border">
        <div className="bg-primary-light h-full w-96 rounded-2xl border border-gray-100 p-4 heght-div1 box-border">
          <div className="flex items-center p-2 gap-4 mb-2">
            <img src={avt} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="text-lg font-bold">Tiêu Trí Quang</h3>
              <p className="text-sm text-gray-500">Khách hàng</p>
            </div>
          </div>
          <ul className="flex flex-col gap-2 text-color-primary">
            {navLinks.map((item, index) => (
              <li className="nav__item w-full" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    `${
                      navClass.isActive ? "bg-background border border-gray-100" : ""
                    } flex items-center gap-4 border border-transparent w-full box-border no-underline transition-all rounded-full p-3`
                  }
                >
                  <i>{item.icon}</i>
                  <p>{item.display}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-grow flex-1 mx-20">
        <div className="w-96 p-48"></div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};
