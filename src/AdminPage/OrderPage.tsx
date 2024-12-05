import { getAllOrderAdmin, updateOrderStatus } from "@/apis/order/order-repo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { IOrder, orderStatus, orderStatusClass } from "@/types/order.type";
import { convertMoney } from "@/utils";
import { AxiosError } from "axios";
import { Check, Eye, Loader, Search, XCircle } from "lucide-react";
import React, { useEffect } from "react";

const OrderPage: React.FC = () => {
  const [orders, setOrders] = React.useState<IOrder[]>(null);
  const [loading, setLoading] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<IOrder | null>(null);

  const [searchTerm, setSearchTerm] = React.useState("");
  const changeStatusOrder = async (status: string, id: string) => {
    const res = await updateOrderStatus(id, status);
    if (res instanceof AxiosError) {
      return;
    }
    if (res) {
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, orderStatus: status } : order
        )
      );
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, orderStatus: status });
      }
    }
  };
  const handleViewOrder = (order: IOrder) => {
    setSelectedOrder(order);
  };
  const getOrders = async () => {
    setLoading(true);
    const res = await getAllOrderAdmin();
    if (res instanceof AxiosError) {
      setLoading(false);
      return;
    }
    if (res) {
      setLoading(false);
      //@ts-ignore
      setOrders(res.metadata);
    }
    setLoading(false);
  };
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    const res = await updateOrderStatus(orderId, "failed");
    if (res instanceof AxiosError) {
      return;
    }
    if (res) {
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "failed" } : order
        )
      );
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: "failed" });
      }
    }
  };

  const handleUpdateNotes = (orderId: string, notes: string) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, notes } : order
      )
    );
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({ ...selectedOrder, notes });
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  const filteredOrders =
    orders &&
    orders
      .filter(
        (order) =>
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userId.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const statusOrder = ["pending", "packing", "completed", "failed"];
        return (
          statusOrder.indexOf(a.orderStatus) -
          statusOrder.indexOf(b.orderStatus)
        );
      });

  return (
    <div className="space-y-6 w-full h-screen p-8">
      <h2 className="font-bold">Quản lý đơn hàng</h2>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              disabled={!filteredOrders}
              placeholder="Tìm kiếm đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          {!loading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Mã khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Ngày đặt đơn</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders &&
                  filteredOrders.map(
                    (order) =>
                      order && (
                        <TableRow key={order._id}>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>{order.userId}</TableCell>
                          <TableCell>
                            $
                            {convertMoney(
                              order.products.reduce(
                                (acc, product) =>
                                  product ? acc + product.priceAtPurchase : 0,
                                0
                              )
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(order.orderDate).toLocaleDateString(
                              "VI-vn",
                              {
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`shadow-none ${
                                orderStatusClass[order.orderStatus]
                              }`}
                            >
                              {orderStatus[order.orderStatus]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <Button variant="outline" size="sm">
                                    Chuyển trạng thái
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      changeStatusOrder("pending", order._id);
                                    }}
                                  >
                                    Đang Chờ
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      changeStatusOrder("packing", order._id);
                                    }}
                                  >
                                    Đang xử lý
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      changeStatusOrder("completed", order._id);
                                    }}
                                  >
                                    Đã hoàn thành
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewOrder(order)}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Xem chi tiết
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl max-h-screen overflow-auto">
                                  <DialogHeader>
                                    <DialogTitle>Đơn hàng chi tiết</DialogTitle>
                                  </DialogHeader>
                                  {selectedOrder && (
                                    <div className="grid gap-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Mã đơn hàng</Label>
                                          <Input
                                            value={selectedOrder._id}
                                            readOnly
                                          />
                                        </div>
                                        <div>
                                          <Label>Mã khách hàng</Label>
                                          <Input
                                            value={selectedOrder.userId}
                                            readOnly
                                          />
                                        </div>
                                        <div>
                                          <Label>Ngày đặt hàng</Label>
                                          <Input
                                            value={new Date(
                                              selectedOrder.orderDate
                                            ).toLocaleDateString("VI-vn", {
                                              hour: "numeric",
                                              minute: "numeric",
                                            })}
                                            readOnly
                                          />
                                        </div>
                                        <div>
                                          <Label>Phương thức thanh toán</Label>
                                          <Input
                                            value={selectedOrder.paymentMethod}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Địa chỉ giao hàng</Label>
                                        <Textarea
                                          value={`${selectedOrder.shippingAddress.street}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state}, ${selectedOrder.shippingAddress.country} ${selectedOrder.shippingAddress.zipcode}`}
                                          readOnly
                                        />
                                      </div>
                                      <div>
                                        <Label>Sản phẩm</Label>
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead>Tên</TableHead>
                                              <TableHead>Giá</TableHead>
                                              <TableHead>Số lượng</TableHead>
                                              <TableHead>Tổng tiền</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            {selectedOrder.products.map(
                                              (product) =>
                                                product && (
                                                  <TableRow key={product._id}>
                                                    <TableCell>
                                                      {product.product_name ||
                                                        "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                      {convertMoney(
                                                        product.priceAtPurchase /
                                                          product.quantity
                                                      )}
                                                    </TableCell>
                                                    <TableCell>
                                                      {product.quantity}
                                                    </TableCell>
                                                    <TableCell>
                                                      {convertMoney(
                                                        product.priceAtPurchase
                                                      )}
                                                    </TableCell>
                                                  </TableRow>
                                                )
                                            )}
                                          </TableBody>
                                        </Table>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Tổng</Label>
                                          <Input
                                            value={`$${convertMoney(
                                              selectedOrder.products.reduce(
                                                (acc, product) =>
                                                  product
                                                    ? acc +
                                                      product.priceAtPurchase
                                                    : 0,
                                                0
                                              )
                                            )}`}
                                            readOnly
                                          />
                                        </div>
                                        <div>
                                          <Label>Phí giao hàng</Label>
                                          <Input
                                            value={`$${selectedOrder.shippingCost.toFixed(
                                              2
                                            )}`}
                                            readOnly
                                          />
                                        </div>
                                        <div>
                                          <Label>Thuế</Label>
                                          <Input
                                            value={`$${selectedOrder.taxAmount.toFixed(
                                              2
                                            )}`}
                                            readOnly
                                          />
                                        </div>
                                        <div>
                                          <Label>Giảm giá</Label>
                                          <Input
                                            value={`$${selectedOrder.discount.toFixed(
                                              2
                                            )}`}
                                            readOnly
                                          />
                                        </div>
                                        <div>
                                          <Label>Tổng tiền</Label>
                                          <Input
                                            value={`$${convertMoney(
                                              selectedOrder.totalPrice +
                                                selectedOrder.shippingCost +
                                                selectedOrder.taxAmount -
                                                selectedOrder.discount
                                            )}`}
                                            readOnly
                                          />
                                        </div>
                                        <div>
                                          <Label>Trạng thái đơn hàng</Label>
                                          <Select
                                            disabled
                                            value={selectedOrder.orderStatus}
                                            onValueChange={(value) =>
                                              handleUpdateStatus(
                                                selectedOrder._id,
                                                value
                                              )
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="pending">
                                                Chờ
                                              </SelectItem>
                                              <SelectItem value="packing">
                                                Đang xử lý
                                              </SelectItem>
                                              <SelectItem value="failed">
                                                Đã huỷ
                                              </SelectItem>
                                              <SelectItem value="completed">
                                                Đã hàng thành
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Ghi chú</Label>
                                        <Textarea
                                          value={selectedOrder.notes}
                                          onChange={(e) =>
                                            handleUpdateNotes(
                                              selectedOrder._id,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelOrder(order._id)}
                                disabled={
                                  order.orderStatus === "failed" ||
                                  order.orderStatus === "completed"
                                }
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Huỷ
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          ) : !filteredOrders ? (
            <h2>Không có đơn hàng nào</h2>
          ) : (
            <div className="flex gap-2 items-center">
              <Loader className="animate-spin" />
              <span>Đang tải...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderPage;
