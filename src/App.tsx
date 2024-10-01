import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar"; // Chỉ sử dụng cho Admin
import Dashboard from "./AdminPage/Dashboard";
import ProductPage from "./AdminPage/ProductPage";
import OrderPage from "./AdminPage/OrderPage";
import CustomerPage from "./AdminPage/CustomerPage";
import FinancePage from "./AdminPage/FinancePage"; // Đã sửa lỗi chính tả
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import PurchaseOrder from "./components/pages/PurchaseOrder";
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

const AdminRoute: React.FC = () => {
  return (
    <div className="wrap-route flex">
      <SideBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/productsManage" element={<ProductPage />} />
        <Route path="/ordersManage" element={<OrderPage />} />
        <Route path="/customersManage" element={<CustomerPage />} />
        <Route path="/financeManage" element={<FinancePage />} />
      </Routes>
    </div>
  );
};

const UserRoute: React.FC = () => {
  return (
    <div className="flex-grow flex mt-[10.2rem]">
      <Navbar />
      <Routes>
        {/* {navbar} */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/purchaseOrder" element={<PurchaseOrder />} />
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
        <Route path="/product/:id/:name" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
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
