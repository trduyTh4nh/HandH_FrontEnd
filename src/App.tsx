import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/NavBar";
import {Helmet} from "react-helmet";
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
import { useEffect, useState } from "react";
import ErrorView from "./components/widget/Error.widget";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import PopupComponent from "./components/widget/popUpComponent";
import { getLoggedInUser, UnauthenticatedError } from "./apis/user/user-repo";
import { AxiosError } from "axios";
const AdminRoute: React.FC = () => {
  const user = localStorage.getItem("user");
  const [isUserValid, setUserValid] = useState(false);
  const [login, setLogin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  async function checkUser() {
    setCheckingAuth(true);
    try {
      const res = await getLoggedInUser();
      const user = res;
      console.log(user);
      setUserValid(user.role[0] == "3107");
      setCheckingAuth(false);
    } catch (e) {
      console.log(e);
      setUserValid(false);
      setCheckingAuth(false);
    }
    setCheckingAuth(false);
  }
  useEffect(() => {
    checkUser();
  }, [loginStatus]);
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
            <Route path="/ordersManage" element={<OrderPage />} />
            <Route path="/customersManage" element={<CustomerPage />} />
            <Route path="/financeManage" element={<FinancePage />} />
            <Route path="/bannerManage" element={<BannerPage />} />
            <Route path="/categoryManage" element={<CategoryPage />} />
          </Routes>
        ) : (
          <ErrorView
            className="h-screen"
            title={
              !checkingAuth
                ? "Bạn không có quyền truy cập vào trang này"
                : "Đang kiểm tra quyền của bạn..."
            }
            message={
              !checkingAuth
                ? "Vui lòng đăng nhập với tư cách là quản trị viên để có thể truy cập."
                : "Đợi chút nhé, chúng tôi đang kiểm tra quyền hạn của bạn..."
            }
            icon={!checkingAuth ? "notallowed" : "loading"}
          >
            {!checkingAuth ? (
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
    <div className="flex-grow flex mt-[5rem] md:mt-[10.2rem]">
      <Navbar />
      <Toaster />
      <Routes>
        {/* {navbar} */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/management" element={<Management />} />
        <Route path="/managerAccount" element={<ManagerAccount />}>
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
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PurchaseLayout />}>
          <Route path="/payment/" element={<PurchaseReview />} />
          <Route path="/payment/choose" element={<PurchaseChoose />} />
          <Route path="/payment/process" element={<PurchaseChoose />} />
          <Route path="/payment/status" element={<PurchaseChoose />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Routes>
          {/* Routes cho người dùng */}
          <Route path="/*" element={<UserRoute />} /> {/* Routes cho admin */}
          <Route path="/admin/*" element={<AdminRoute />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
