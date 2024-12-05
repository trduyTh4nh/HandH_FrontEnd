import { getAllOrderAdmin } from "@/apis/order/order-repo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { IOrder } from "@/types/order.type";
import { AxiosError } from "axios";
import { Eye, Search, XCircle } from "lucide-react";
import React, { useEffect } from "react";

const OrderPage: React.FC = () => {
  const [orders, setOrders] = React.useState<IOrder[]>(null);
  const [loading, setLoading] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<IOrder | null>(null);

  const [searchTerm, setSearchTerm] = React.useState("");

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

  const handleCancelOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: "cancelled" } : order
      )
    );
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: "cancelled" });
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
    orders.filter(
      (order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
          {filteredOrders ? (
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
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(order.orderDate).toLocaleDateString("VI-vn", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{order.orderStatus}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
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
                            <DialogContent className="max-w-3xl">
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
                                        value={selectedOrder.orderDate.toString()}
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
                                          (product) => (
                                            <TableRow key={product.id}>
                                              <TableCell>
                                                {product.product_name}
                                              </TableCell>
                                              <TableCell>
                                                ${0}
                                              </TableCell>
                                              <TableCell>
                                                {product.quantity}
                                              </TableCell>
                                              <TableCell>
                                                $
                                                {(
                                                  product.price *
                                                  product.quantity
                                                ).toFixed(2)}
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
                                        value={`$${selectedOrder.totalPrice.toFixed(
                                          2
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
                                        value={`$${(
                                          selectedOrder.totalPrice +
                                          selectedOrder.shippingCost +
                                          selectedOrder.taxAmount -
                                          selectedOrder.discount
                                        ).toFixed(2)}`}
                                        readOnly
                                      />
                                    </div>
                                    <div>
                                      <Label>Trạng thái đơn hàng</Label>
                                      <Select
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
                                          <SelectItem value="processing">
                                            Đang xử lý
                                          </SelectItem>
                                          <SelectItem value="shipped">
                                            Đã giao
                                          </SelectItem>
                                          <SelectItem value="delivered">
                                            Đã vận chuyển
                                          </SelectItem>
                                          <SelectItem value="completed">
                                            Đã hàng thành
                                          </SelectItem>
                                          <SelectItem value="cancelled">
                                            Đã hủy
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
                              order.orderStatus === "cancelled" ||
                              order.orderStatus === "completed"
                            }
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <h2>Không có đơn hàng nào</h2>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderPage;
