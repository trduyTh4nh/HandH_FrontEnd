import { IUser } from "@/types/user.type";
import React from "react";
import {
  IColorProductVariation,
  IProduct,
  ISizeProductVarication,
} from "@/types/product.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  EyeOff,
  MoreHorizontalIcon,
  Pencil,
  Plus,
  Trash2,
  Unlock,
  Upload,
  Lock,
  Search,
  DollarSign,
  CreditCard,
  TrendingUp,
  PieChartIcon,
  Download,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "recharts";
const mockData = {
  revenueSources: [
    { source: "Product Sales", amount: 500000 },
    { source: "Subscriptions", amount: 200000 },
    { source: "Services", amount: 150000 },
    { source: "Affiliate", amount: 50000 },
  ],
  transactions: [
    {
      id: "1",
      date: "2023-06-01",
      amount: 1500,
      type: "Sale",
      status: "Completed",
    },
    {
      id: "2",
      date: "2023-06-02",
      amount: 2000,
      type: "Subscription",
      status: "Completed",
    },
    {
      id: "3",
      date: "2023-06-03",
      amount: 1000,
      type: "Service",
      status: "Pending",
    },
    {
      id: "4",
      date: "2023-06-04",
      amount: 3000,
      type: "Sale",
      status: "Completed",
    },
    {
      id: "5",
      date: "2023-06-05",
      amount: 500,
      type: "Affiliate",
      status: "Completed",
    },
  ],
  revenueOverTime: {
    weekly: [
      { name: "Week 1", value: 20000 },
      { name: "Week 2", value: 25000 },
      { name: "Week 3", value: 22000 },
      { name: "Week 4", value: 30000 },
    ],
    monthly: [
      { name: "Jan", value: 80000 },
      { name: "Feb", value: 85000 },
      { name: "Mar", value: 90000 },
      { name: "Apr", value: 88000 },
      { name: "May", value: 95000 },
      { name: "Jun", value: 100000 },
    ],
    yearly: [
      { name: "2019", value: 800000 },
      { name: "2020", value: 900000 },
      { name: "2021", value: 1000000 },
      { name: "2022", value: 1100000 },
      { name: "2023", value: 1200000 },
    ],
  },
  expenseCategories: [
    { category: "Salaries", amount: 300000 },
    { category: "Marketing", amount: 100000 },
    { category: "Operations", amount: 150000 },
    { category: "Technology", amount: 80000 },
    { category: "Other", amount: 70000 },
  ],
  profitMargins: [
    { name: "Q1", grossMargin: 0.35, netMargin: 0.15 },
    { name: "Q2", grossMargin: 0.38, netMargin: 0.17 },
    { name: "Q3", grossMargin: 0.4, netMargin: 0.18 },
    { name: "Q4", grossMargin: 0.42, netMargin: 0.2 },
  ],
};

const FinancetPage: React.FC = () => {
  const [revenueTimePeriod, setRevenueTimePeriod] = React.useState("monthly");
  const handleExportReport = () => {
    console.log("Exporting financial report...");
  };
  return (
    <div className="container w-full  p-8 space-y-6">
      <h1 className="text-3xl font-bold">Quản lý tài chính</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng doanh thu
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">900,000,000 vnđ</div>
            <p className="text-xs text-muted-foreground">
              +20.1% kể từ tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giao dịch</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">
              +15% kể từ tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tỷ lệ tăng trưởng
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% kể từ quý trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tỷ xuất lợi nhuận
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% kể từ quý trước
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nguồn doanh thu</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PieChart data={mockData.revenueSources} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Doanh thu theo thời gian</CardTitle>
            <Select
              value={revenueTimePeriod}
              onValueChange={setRevenueTimePeriod}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Hàng tuần</SelectItem>
                <SelectItem value="monthly">Hàng tháng</SelectItem>
                <SelectItem value="yearly">Hàng năm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <LineChart
            data={
              mockData.revenueOverTime[
                revenueTimePeriod as keyof typeof mockData.revenueOverTime
              ]
            }
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loại doanh thu</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart data={mockData.expenseCategories} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỷ xuất lợi nhuận</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart data={mockData.profitMargins} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Xuất báo cáo tài chính</CardTitle>
          <CardDescription>Tạo và tải xuống báo cáo tài chính.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">
                  Dữ liệu báo cáo hàng tháng
                </SelectItem>
                <SelectItem value="quarterly">
                  Dữ liệu báo cáo hàng quý
                </SelectItem>
                <SelectItem value="yearly">Dữ liệu báo cáo hàng năm</SelectItem>
              </SelectContent>
            </Select>
            <Input type="month" className="w-[180px]" />
            <Button onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" />
              Xuất báo cáo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancetPage;
