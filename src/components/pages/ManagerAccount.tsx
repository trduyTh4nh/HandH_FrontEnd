import React, { useContext } from "react";
import "../../styles/managerAccount.css";
import { NavLink, Outlet } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import avt from "../../assets/image/rectangle.png";
import { CircleUser, Heart, History, LogOut, ReceiptText } from "lucide-react";
import { UserContext } from "../contexts/UserContext";
import { Skeleton } from "../ui/skeleton";
import ErrorView from "../widget/Error.widget";
import { Button } from "../ui/button";
const navLinks = [
  {
    path: "account",
    icon: <CircleUser />,
    display: "Tài khoản",
  },
  {
    path: "favoriteProduct",
    icon: <Heart />,
    display: "Sản phẩm yêu thích",
  },
  {
    path: "paymentHistory",
    icon: <History />,
    display: "Lịch sử mua hàng",
  },
  {
    path: "pendingOrder",
    icon: <ReceiptText />,
    display: "Đơn hàng đang chờ",
  },
];
export const ManagerAccount: React.FC = () => {
  const { user, setUser, isLoading } = useContext(UserContext);
  return (
    <>
      {!isLoading && !user ? (
        
          <ErrorView
            title="Bạn chưa đăng nhập"
            message="Vui lòng đăng nhập để quản lý tài khoản cá nhân và đơn hàng."
            icon="notallowed">
              <b>Bạn muốn kiểm tra tình trạng đơn hàng?</b>
              <Button>Kiểm tra tình trạng đơn hàng</Button>
            </ErrorView>
        
      ) : (
        <>
          <div className="fixed h-full top-0 pt-[11.2rem] pb-8 pl-20 pr-8 box-border">
            <div className="bg-primary-light h-full w-96 rounded-2xl border border-gray-100 p-4 heght-div1 box-border">
              <div className="flex items-center p-2 gap-4 mb-2 w-full">
                {isLoading || !user ? (
                  <>
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="w-24 h-6" />
                      <Skeleton className="w-16 h-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={user.avatar as string}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="w-full">
                      <h3 className="text-lg font-bold text-ellipsis w-full break-all line-clamp-2 hover:line-clamp-none">{user.name}</h3>
                      <p className="text-sm text-gray-500">
                        {user.role == "3107" ? "Quản trị viên" : "Khách hàng"}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <ul className="flex flex-col gap-2 text-color-primary flex-1">
                {navLinks.map((item, index) => (
                  <li className="nav__item w-full" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        `${
                          navClass.isActive
                            ? "bg-background border border-gray-100"
                            : ""
                        } flex items-center gap-4 border border-transparent w-full box-border no-underline transition-all rounded-full p-3`
                      }
                    >
                      <i>{item.icon}</i>
                      <p>{item.display}</p>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <button className="flex items-center gap-4 border border-transparent w-full box-border no-underline transition-all rounded-full p-3">
                <LogOut />
                <p>Đăng xuất</p>
              </button>
            </div>
          </div>
          <div className="flex flex-grow flex-1 mx-20">
            <div className="w-96 p-48"></div>
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
};
