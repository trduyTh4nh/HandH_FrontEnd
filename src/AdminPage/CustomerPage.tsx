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
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
const mockUsers: IUser[] = [
  {
    _id: "1",
    email: "john@example.com",
    password: "hashed_password",
    name: "John Doe",
    birthDay: "1990-01-01",
    phone: "123-456-7890",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40",
    userAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      country: "USA",
      zipcode: "12345",
    },
  },
  {
    _id: "2",
    email: "jane@example.com",
    password: "hashed_password",
    name: "Jane Smith",
    birthDay: "1992-05-15",
    phone: "987-654-3210",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40",
    userAddress: {
      street: "456 Elm St",
      city: "Other City",
      state: "NY",
      country: "USA",
      zipcode: "67890",
    },
  },
  // Add more mock users as needed
];

const mockActivityHistory = [
  { id: "1", userId: "1", action: "Login", timestamp: "2023-06-01 10:30:00" },
  {
    id: "2",
    userId: "1",
    action: "Purchase",
    timestamp: "2023-06-02 14:45:00",
  },
  { id: "3", userId: "2", action: "Login", timestamp: "2023-06-03 09:15:00" },
  {
    id: "4",
    userId: "2",
    action: "Update Profile",
    timestamp: "2023-06-04 11:20:00",
  },
];

const CustomerPage: React.FC = () => {
  const [users, setUsers] = React.useState<IUser[]>(mockUsers);
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleLockUnlock = (userId: string) => {
    setUsers(
      users.map((user) =>
        user._id === userId
          ? { ...user, role: user.role === "locked" ? "customer" : "locked" }
          : user
      )
    );
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container p-8 w-full h-screen space-y-4">
      <h1 className="text-3xl font-bold">Quản lý khách hàng</h1>

      <div className="flex  items-center gap-4">
        <Search className="w-4 h-4 text-gray-500" />
        <Input
          placeholder="Tìm kiếm khách hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Điện thoại</TableHead>
                <TableHead>Quyền</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem chi tiết
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Thông tin khách hàng chi tiết
                            </DialogTitle>
                          </DialogHeader>
                          {selectedUser && (
                            <Tabs defaultValue="details">
                              <TabsList>
                                <TabsTrigger value="details">
                                  Chi tiết
                                </TabsTrigger>
                                <TabsTrigger value="activity">
                                  Lịch sử hoạt động
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="details">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Tên</Label>
                                    <Input value={selectedUser.name} readOnly />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                      value={selectedUser.email}
                                      readOnly
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Điện thoại</Label>
                                    <Input
                                      value={selectedUser.phone}
                                      readOnly
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Ngày sinh</Label>
                                    <Input
                                      value={selectedUser.birthDay || "N/A"}
                                      readOnly
                                    />
                                  </div>
                                  <div className="space-y-2 col-span-2">
                                    <Label>Địa chỉ</Label>
                                    <Input
                                      value={`${
                                        selectedUser.userAddress?.street || ""
                                      }, ${
                                        selectedUser.userAddress?.city || ""
                                      }, ${
                                        selectedUser.userAddress?.state || ""
                                      }, ${
                                        selectedUser.userAddress?.country || ""
                                      } ${
                                        selectedUser.userAddress?.zipcode || ""
                                      }`}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="activity">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Hành động</TableHead>
                                      <TableHead>Thời gian</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {mockActivityHistory
                                      .filter(
                                        (activity) =>
                                          activity.userId === selectedUser._id
                                      )
                                      .map((activity) => (
                                        <TableRow key={activity.id}>
                                          <TableCell>
                                            {activity.action}
                                          </TableCell>
                                          <TableCell>
                                            {activity.timestamp}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLockUnlock(user._id!)}
                      >
                        {user.role === "locked" ? (
                          <>
                            <Unlock className="h-4 w-4 mr-1" />
                            Bỏ chặn
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-1" />
                            CHặn
                          </>
                        )}
                      </Button>
                      <Select
                        value={user.role}
                        onValueChange={(value) =>
                          handleRoleChange(user._id!, value)
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Khách hàng</SelectItem>
                          <SelectItem value="admin">Quản trị viên</SelectItem>
                          <SelectItem value="manager">Quản lý</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPage;
