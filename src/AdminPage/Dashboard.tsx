import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSignIcon,
  MenuIcon,
  MoonIcon,
  PackageIcon,
  ShirtIcon,
  SunIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "framer-motion";

// export default function Dashboard() {

// }

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const revenueData = [
    { month: "Tháng 1", revenue: 5000 },
    { month: "Tháng 2", revenue: 7500 },
    { month: "Tháng 3", revenue: 10000 },
    { month: "Tháng 4", revenue: 8000 },
    { month: "Tháng 5", revenue: 12000 },
    { month: "Tháng 6", revenue: 15000 },
    { month: "Tháng 7", revenue: 1000 },
    { month: "Tháng 8", revenue: 13300 },
    { month: "Tháng 9", revenue: 1010 },
    { month: "Tháng 10", revenue: 2040 },
    { month: "Tháng 11", revenue: 20000 },
    { month: "Tháng 12", revenue: 18000 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div
      className={`flex h-screen w-screen  bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ${
        darkMode ? "dark" : ""
      }`}
    >
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden rounded-md"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="flex-1 max-w-md mx-4"></div>
          <Button
            className="rounded-md"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <SunIcon className="h-4 w-4 text-white" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 mb-6"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Tổng doanh thu",
                icon: DollarSignIcon,
                value: "$45,231.89",
                change: "+20.1%",
              },
              {
                title: "Sản phẩm",
                icon: ShirtIcon,
                value: "573",
                change: "+48 this week",
              },
              {
                title: "Đơn hàng",
                icon: PackageIcon,
                value: "2,350",
                change: "+180.1%",
              },
              {
                title: "Tài chính",
                icon: UsersIcon,
                value: "12,234",
                change: "+19%",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {item.title}
                  </CardTitle>
                  <item.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {item.value}
                  </div>
                  <p className="text-xs text-green-500">
                    {item.change} từ cuối tháng
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-white">
                Doanh thu theo thời gian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <svg width="100%" height="100%" viewBox="0 0 600 300">
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity="0.2"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M0 300 ${revenueData
                      .map(
                        (d, i) =>
                          `L${i * 100} ${300 - (d.revenue / maxRevenue) * 280}`
                      )
                      .join(" ")} V300 H0`}
                    fill="url(#gradient)"
                  />
                  <path
                    d={`M0 300 ${revenueData
                      .map(
                        (d, i) =>
                          `L${i * 100} ${300 - (d.revenue / maxRevenue) * 280}`
                      )
                      .join(" ")}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />
                  {revenueData.map((d, i) => (
                    <g
                      key={i}
                      transform={`translate(${i * 100}, ${
                        300 - (d.revenue / maxRevenue) * 280
                      })`}
                    >
                      <circle cx="0" cy="0" r="4" fill="#3b82f6" />
                      <text
                        x="0"
                        y="20"
                        textAnchor="middle"
                        fill="#6b7280"
                        fontSize="12"
                      >
                        {d.month}
                      </text>
                      <text
                        x="0"
                        y="-10"
                        textAnchor="middle"
                        fill="#3b82f6"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        ${d.revenue}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-white">
                Đơn đặt hàng gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Đơn hàng
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Tính trạng
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "#3210", status: "Delivered" },
                    { id: "#3209", status: "Pending" },
                    { id: "#3208", status: "Processing" },
                  ].map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-gray-800 dark:text-gray-200">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-200 text-green-800"
                              : order.status === "Pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-blue-200 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-white">
                Top sản phẩm bán chạy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Sản phẩm
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Loại sản phẩm
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Giá
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Doanh thu
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Summer Dress",
                      category: "Women",
                      price: "$59.99",
                      sales: 1234,
                    },
                    {
                      name: "Denim Jeans",
                      category: "Men",
                      price: "$79.99",
                      sales: 1100,
                    },
                    {
                      name: "Graphic Tee",
                      category: "Unisex",
                      price: "$24.99",
                      sales: 987,
                    },
                  ].map((product, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-gray-800 dark:text-gray-200">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {product.category}
                      </TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">
                        {product.price}
                      </TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">
                        {product.sales}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
