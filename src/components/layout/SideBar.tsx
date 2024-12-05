/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3Icon,
  Calendar,
  CopyIcon,
  DollarSignIcon,
  LogOutIcon,
  Megaphone,
  MegaphoneIcon,
  NotebookPen,
  ShirtIcon,
  ShoppingBagIcon,
  Store,
  UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import React from "react";
type SideBarProps = {
  userStatus?: boolean
}
const SideBar = (props: SideBarProps) => {
  const location = useLocation();

  const activeTab = location.pathname;
  const [sidebarOpen, setSideBarOpen] = React.useState(true);
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    const tmp = localStorage.getItem("user")
    if(tmp == null){
      setSideBarOpen(false)
    }
    setUser(JSON.parse(tmp))
  }, [props.userStatus])  
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-64 bg-white dark:bg-gray-800 p-6 shadow-md sticky"
        >
          <div className="wrap-side-nav fixed w-48 ">
            <div className="wrap-logo p-2">
              <img
                className="w-auto h-12"
                src="\src\assets\image\logo_header.svg"
                alt="Logo"
              />
            </div>
            <nav>
              {[
                {
                  name: "Sản phẩm",
                  path: "/admin/productsManage",
                  icon: ShirtIcon,
                },
                {
                  name: "Đơn hàng",
                  path: "/admin/ordersManage",
                  icon: ShoppingBagIcon,
                },
                {
                  name: "Khách hàng",
                  path: "/admin/customersManage",
                  icon: UsersIcon,
                },
                
                {
                  name: "Biển quảng cáo",
                  path: "/admin/bannerManage",
                  icon: MegaphoneIcon,
                },
                {
                  name: "Loại sản phẩm",
                  path: "/admin/categoryManage",
                  icon: CopyIcon,
                },
                {
                  name: "Bài đăng",
                  path: "/admin/blog",
                  icon: NotebookPen,
                },
                {
                  name: "Quay về trang chủ",
                  path: "/",
                  icon: Store,
                },
                {
                  name: "Đăng xuất",
                  path: "/admin/logout",
                  icon: LogOutIcon,
                },
                
              ].map((item) => (
                <Link to={item.path} key={item.name} className="w-full">
                  <Button
                    variant={activeTab === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start mb-2 text-gray-600 dark:text-gray-300"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}

            </nav>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
