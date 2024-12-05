import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/NavBar";
import { Helmet } from "react-helmet";
import SideBar from "./components/layout/SideBar"; // Chỉ sử dụng cho Admin
import Dashboard from "./AdminPage/Dashboard";
import ProductPage from "./AdminPage/ProductPage";
import OrderPage from "./AdminPage/OrderPage";
import CustomerPage from "./AdminPage/CustomerPage";
import FinancePage from "./AdminPage/FinancePage"; // Đã sửa lỗi chính tả
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import PurchaseOrder from "./components/pages/Blog";
import Management from "./components/pages/Management";
import { Account } from "./components/widget/Account";
import { ManagerAccount } from "./components/pages/ManagerAccount";
import { PaymentHistory } from "./components/widget/PaymentHistory";
import { FavoriteProduct } from "./components/widget/FavoriteProduct";
import AllHis from "./components/cpn_history/AllHis";
import PreparingOrder from "./components/cpn_history/PreparingOrder";
import WaitingForPayment from "./components/cpn_history/WaitingForPayment";
import Delivering from "./components/cpn_history/Delivering";
import Delivered from "./components/cpn_history/Delivered";
import Received from "./components/cpn_history/Received";
import Canceled from "./components/cpn_history/Canceled";
import PurchaseFailed from "./components/pages/purchase/PurchaseFailed";
import Product from "./components/pages/Product";
import CartPage from "./components/pages/Cart";
import PurchaseLayout from "./components/pages/purchase/PurchaseLayout";
import PurchaseReview from "./components/pages/purchase/PurchaseReview";
import PurchaseChoose from "./components/pages/purchase/PurchaseChoose";
import { Toaster } from "./components/ui/toaster";
import BannerPage from "./AdminPage/BannerPage";
import CategoryPage from "./AdminPage/CategoryPage";
import Test from "./components/pages/Test";
import Blog from "./components/pages/Blog";
import { useContext, useEffect, useState } from "react";
import ErrorView from "./components/widget/Error.widget";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import PopupComponent from "./components/widget/popUpComponent";
import { getLoggedInUser, UnauthenticatedError } from "./apis/user/user-repo";
import { AxiosError } from "axios";
import AboutUs from "./components/pages/AboutUs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "./components/contexts/UserContext";
import { IUser } from "./types/user.type";
import PurchaseProcess from "./components/pages/purchase/PurchaseProcess";
import PurchaseFinish from "./components/pages/purchase/PurchaseFinish";
import { Provider } from "react-redux";
import { CartProvider } from "./providers/CartContext";

import TermsAndConditions from "@/components/pages/TermsAndConditions";
import BlogPage from "./AdminPage/BlogPage";
import { useTransition, animated } from "react-spring";
import SelectionButton from "./components/widget/selectionButton.widget";
import { AccountBalanceOutlined } from "@mui/icons-material";
import LogoutPage from "./AdminPage/LogoutPage";
import ShopCate from "./components/pages/ShopCate";
import ShopBanner from "./components/pages/ShopBanner";
const queryClient = new QueryClient();
const AdminRoute: React.FC = () => {
  const [isUserValid, setUserValid] = useState(false);
  const [login, setLogin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);
  const { user, setUser, isLoading } = useContext(UserContext);
  async function checkUser() {
    setUserValid(user && user.role[0] == "3107");
    setCheckingAuth(false);
  }
  useEffect(() => {
    checkUser();
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Kênh quản lý cửa hàng - Hồng Đức Store</title>
      </Helmet>
      <div className="wrap-route flex">
        {isUserValid ? <SideBar userStatus={loginStatus} /> : null}
        <Toaster />
        {isUserValid ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/productsManage" element={<ProductPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/ordersManage" element={<OrderPage />} />
            <Route path="/customersManage" element={<CustomerPage />} />
            <Route path="/financeManage" element={<FinancePage />} />
            <Route path="/bannerManage" element={<BannerPage />} />
            <Route path="/categoryManage" element={<CategoryPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        ) : (
          <ErrorView
            className="h-screen"
            title={
              !isLoading
                ? "Bạn không có quyền truy cập vào trang này"
                : "Đang kiểm tra quyền của bạn..."
            }
            message={
              !isLoading
                ? "Vui lòng đăng nhập với tư cách là quản trị viên để có thể truy cập."
                : "Đợi chút nhé, chúng tôi đang kiểm tra quyền hạn của bạn..."
            }
            icon={!isLoading ? "notallowed" : "loading"}
          >
            {!isLoading ? (
              <div className="flex gap-2">
                <Link to={"/"}>
                  <Button>Quay lại</Button>
                </Link>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="secondary">Đăng nhập</Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[45%]">
                    <PopupComponent
                      handleChange={(e) => {
                        window.location.reload();
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ) : null}
          </ErrorView>
        )}
      </div>
    </>
  );
};

const UserRoute: React.FC = () => {
  return (
    <div className="flex-grow flex mt-[4.625rem] md:mt-[10.2rem]">
      <div
        className="fixed h-24 w-24 bottom-4 right-4 z-50 p-4 cursor-pointer group"
        onClick={() => (window.location.href = "https://zalo.me/0909893395")}
      >
        <img
          src="/src/assets/image/icon_zalo.png"
          className="w-full h-full object-cover transition-transform duration-200 transform group-hover:scale-110"
          alt="Zalo Icon"
        />
        <div className="absolute  text-black bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Tư vấn
        </div>
      </div>
      <Navbar />
      <Toaster />
      <Routes>
        {/* {navbar} */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/event/:id" element={<ShopBanner />} />
        <Route path="/shopcate" element={<ShopCate />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/management" element={<Management />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/user" element={<ManagerAccount />}>
          <Route index element={<Account />} />
          <Route path="account" element={<Account />} />
          <Route path="paymentHistory" element={<PaymentHistory />}>
            <Route index element={<AllHis />} />
            <Route path="allHis" element={<AllHis />} />
            <Route path="preparingOrder" element={<PreparingOrder />} />
            <Route path="waitingForPayment" element={<WaitingForPayment />} />
            <Route path="delivering" element={<Delivering />} />
            <Route path="delivered" element={<Delivered />} />
            <Route path="received" element={<Received />} />
            <Route path="canceled" element={<Canceled />} />
          </Route>
          <Route path="favoriteProduct" element={<FavoriteProduct />} />
        </Route>
        <Route path="/termAndConditions" element={<TermsAndConditions />} />

        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PurchaseLayout />}>
          <Route path="/payment/" element={<PurchaseReview />} />
          <Route path="/payment/choose" element={<PurchaseChoose />} />
          <Route path="/payment/process" element={<PurchaseProcess />} />
          <Route path="/payment/status" element={<PurchaseFinish />} />
          <Route path="/payment/failed" element={<PurchaseFailed />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};
const App = () => {
  const [user, setUser] = useState<IUser>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showGrayComponent, setShowGrayComponent] = useState(false);
  const transitions = useTransition(showTooltip, {
    from: { opacity: 0, transform: "translateY(10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(10px)" },
    config: { tension: 170, friction: 20 },
  });
  // Transition cho Component màu xám khi click
  // const grayComponentTransitions = useTransition(showGrayComponent, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  //   config: { tension: 170, friction: 20 },
  // });
  async function getUser() {
    try {
      setLoading(true);
      const user = await getLoggedInUser();
      setUser(user);
    } catch (e) {
      if (e instanceof AxiosError) {
        setLoading(false);
        return;
      }
      if (e instanceof UnauthenticatedError) {
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    }
    setLoading(false);
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
          isLoading: loading,
        }}
      >
        <CartProvider> 
          <Router>
            <div className="flex flex-col min-h-screen w-full">
              <Routes>
                <Route path="/*" element={<UserRoute />} />
                <Route path="/admin/*" element={<AdminRoute />} />{" "}
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
