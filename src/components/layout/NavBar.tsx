import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/styles.css";

import React, { useEffect } from "react";
import HeaderComponentSearch from "../widget/headerComponentSearch";
// import {
//     Menu,Badge
// } from "@mui/icons-material";
import { Menu, Close } from "@mui/icons-material";
import { animated, useTransition } from "react-spring";
import { ICategory, sampleCategories } from "../../types/category";
import boxCategory from "../widget/boxCategory.widget";
import PopupComponent from "../widget/popUpComponent";
import PopupRegister from "../widget/popUpRegister";
import PopupAdmin from "../widget/popUpAdmin";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronRight,
  Heart,
  Loader,
  LogOut,
  ReceiptText,
  Shield,
  User,
  UserCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/apis/user/user-repo";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { UserContext } from "../contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { duration } from "@mui/material";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showCate, setShowCate] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const transitions = useTransition(showCate, {
    from: { y: -16, opacity: 0, backgroundColor: "rgba(0, 0, 0, 0)" },
    enter: { y: 0, opacity: 1, backgroundColor: "rgba(0, 0, 0, 0.55)" },
    leave: { y: -16, opacity: 0, backgroundColor: "rgba(0, 0, 0, 0)" },
    config: {
      tension: 120,
      friction: 14,
    },
  });

  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const { user, setUser, isLoading } = React.useContext(UserContext);
  const [task, setTask] = React.useState({
    message: null,
    shown: false,
  });
  const { toast } = useToast();
  useEffect(() => {
    if (isLoading) {
      setTask({
        message: "Đang tải...",
        shown: true,
      });
    } else {
      setTask({
        message: "Đang tải...",
        shown: false,
      });
    }
  }, [isLoading]);
  function handleChange(isLogin: boolean) {
    if (isLogin) {
      const lsUser = localStorage.getItem("user");
      const user = JSON.parse(lsUser as string);
      setUser(user);
    }
    setLogin(false);
  }
  async function logOut() {
    setTask({
      message: "Đang đăng xuất...",
      shown: true,
    });
    const res = await logout();
    if (res instanceof AxiosError) {
      console.log(res);
      //@ts-ignore
      if (res.response.data.message != "invalid signature") {
        console.log(res);
        toast({
          title: `Lỗi ${res.code}`,
          description: `Lỗi hệ thống: ${res.message}`,
        });
        setTask({
          message: "Đang đăng xuất...",
          shown: false,
        });
        return;
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
    setTask({
      message: "Đang đăng xuất...",
      shown: false,
    });
  }
  function handleChangeRe() {
    setRegister(false);
  }
  function handleChangeAd() {
    setAdmin(false);
  }

  function handleChangeMess() {
    setMessage(false);
  }

  function switchToRegister() {
    setLogin(false);
    setRegister(true);
  }

  function switchToLogin() {
    setLogin(true);
    setRegister(false);
  }

  // </div>

  return (
    <nav
      id="nav-main"
      className=" bg-white fixed w-full top-0 z-30 rounded-b-3xl shadow-md"
    >
      <div className="flex mx-auto px-10 md:px-20 py-4 justify-between items-center">
        <div className="flex justify-start gap-4 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Button variant="ghost" className="block md:hidden bg-transparent">
              <Menu></Menu>
            </Button>
            <NavLink to="/">
              <img
                className="w-auto h-12"
                src="\src\assets\image\logo_header.svg"
                alt="Logo"
              />
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <NavLink
                to="/"
                className="text-title-nav hover:underline  hover:text-black hover:bg-gray-100 transition-all duration-800 px-3 py-2 rounded-md font-medium"
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/shop"
                className="text-title-nav hover:underline hover:text-black hover:bg-gray-100 transition-all duration-800 px-3 py-2 rounded-md font-medium"
              >
                Cửa Hàng
              </NavLink>
              <NavLink
                to="/blog"
                className="text-title-nav hover:underline hover:text-black hover:bg-gray-100 transition-all duration-800 px-3 py-2 rounded-md font-medium"
              >
                Hoạt động
              </NavLink>
            </div>
          </div>
        </div>
        <HeaderComponentSearch></HeaderComponentSearch>
      </div>
      <div className="hidden md:flex px-0 py-0 pb-3  items-center flex-col ">
        {/* <HeaderBottom></HeaderBottom> */}
        <div className="flex items-center justify-between w-full px-20 pb-4 rounded-b-2xl">
          {!showCate ? (
            <div className="pl-4 flex gap-2 items-center bg-button-primary hover:opacity-40 duration-200 ease-linear rounded-xl">
              <div
                onClick={() => {
                  setShowCate(!showCate);
                }}
                className="flex gap-2 items-center"
              >
                <Menu className="text-black "></Menu>
                <input
                  onClick={() => {
                    setShowCate(!showCate);
                  }}
                  className="text-black pr-4 pt-4 pb-4 hover:cursor-pointer"
                  type="button"
                  value="Danh mục sản phẩm"
                />
              </div>
            </div>
          ) : (
            <div className="pl-4 flex gap-2 items-center bg-primary-grey hover:opacity-40 duration-200 ease-linear rounded-xl">
              <div
                onClick={() => {
                  setShowCate(!showCate);
                }}
                className="flex gap-2 items-center"
              >
                <Close className="text-black "></Close>
                <input
                  onClick={() => {
                    setShowCate(!showCate);
                  }}
                  className="text-black pr-4 pt-4 pb-4 hover:cursor-pointer"
                  type="button"
                  value="Đóng"
                />
              </div>
            </div>
          )}

          <div className="flex gap-6">
            {task.shown ? (
              <div className="flex gap-2 items-center">
                <Loader className="animate-spin" />
                <p>{task.message}</p>
              </div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="gap-4 cursor-pointer text-title-nav hover:underline hover:text-black hover:bg-gray-100 transition-all duration-800 px-3 py-2 rounded-md font-medium flex justify-center items-center">
                    Xin chào, {user.name}!
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar}></AvatarImage>
                      <AvatarFallback><UserCircle width={16} height={16}/></AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Tuỳ chọn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => {
                        navigate("/ManagerAccount");
                      }}
                    >
                      <User className="w-4 h-4" />
                      <p className="flex-1">Hồ sơ</p>
                      <ChevronRight className="w-4 h-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => {
                        navigate("/ManagerAccount/favoriteProduct");
                      }}
                    >
                      <Heart className="w-4 h-4" />
                      <p className="flex-1">Sản phẩm yêu thích</p>
                      <ChevronRight className="w-4 h-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => {
                        navigate("/ManagerAccount/paymentHistory");
                      }}
                    >
                      <ReceiptText className="w-4 h-4" />
                      <p className="flex-1">Lịch sử mua hàng</p>
                      <ChevronRight className="w-4 h-4" />
                    </DropdownMenuItem>
                    {user.role == '3107' ? (
                      <DropdownMenuItem
                        className="flex gap-2"
                        onClick={() => {
                          navigate("/admin");
                        }}
                      >
                        <Shield className="w-4 h-4" />
                        <p className="flex-1">Quản lý</p>
                        <ChevronRight className="w-4 h-4" />
                      </DropdownMenuItem>
                    ) : null}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => {
                        setShowLogoutConfirm(true);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      <p className="flex-1">Đăng xuất</p>
                      <ChevronRight className="w-4 h-4" />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <Dialog
              open={showLogoutConfirm}
              onOpenChange={(o) => {
                setShowLogoutConfirm(o);
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Đăng xuất</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <p>Bạn có muốn đăng xuất khỏi tài khoản này?</p>
                </DialogDescription>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="secondary">Huỷ</Button>
                  </DialogClose>
                  <DialogClose>
                    <Button onClick={logOut}>Đồng ý</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {!user && !task.shown ? (
              <>
                <div>
                  <Dialog
                    open={login}
                    onOpenChange={(o) => {
                      setLogin(o);
                    }}
                  >
                    <DialogTrigger asChild>
                      <input
                        className="font-bold underline  hover:text-black hover:bg-gray-100 transition-all duration-800 ease-linear hover:cursor-pointer px-4 py-3 rounded-2xl"
                        type="button"
                        value="Đăng nhập"
                      />
                    </DialogTrigger>
                    <DialogContent className="min-w-[45%]">
                      <PopupComponent
                        handleChange={(e) => {
                          handleChange(e);
                          window.location.reload();
                        }}
                        switchToRegister={switchToRegister}
                      ></PopupComponent>
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <Dialog
                    open={register}
                    onOpenChange={(o) => {
                      setRegister(o);
                    }}
                  >
                    <DialogTrigger>
                      <input
                        onClick={() => setRegister(!register)}
                        className="font-bold underline  hover:text-black hover:bg-gray-100 transition-all duration-800 ease-linear hover:cursor-pointer px-4 py-3 rounded-2xl"
                        type="button"
                        value="Đăng kí"
                      />
                    </DialogTrigger>
                    <DialogContent className="min-w-[45%]">
                      <PopupRegister
                        handleChange={handleChangeRe}
                        switchToLogin={switchToLogin}
                      ></PopupRegister>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {admin && <PopupAdmin handleChangeAd={handleChangeAd}></PopupAdmin>}

      {transitions(
        (style, isOpen) =>
          isOpen && (
            <animated.div
              style={{ backgroundColor: style.backgroundColor }}
              className="w-screen h-screen fixed bg-opacity-40 mt-[0px] z-0"
            >
              {transitions((style1, isOpen) => (
                <animated.div style={{ y: style.y, opacity: style.opacity }}>
                  <div className="bg-white absolute left-20 mt-4 w-80 p-4 rounded-3xl">
                    {sampleCategories.map((category: ICategory, index) => (
                      <div key={index}>{boxCategory(category)}</div>
                    ))}
                  </div>
                </animated.div>
              ))}
            </animated.div>
          )
      )}
    </nav>
  );
};

export default Navbar;
