import React, { useContext, useEffect, useState } from "react";
import {
  BadgeOutlined,
  CallOutlined,
  AttachEmailOutlined,
  CakeOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import {
  changeInformation,
  changePassword,
  getLoggedInUser,
  UnauthenticatedError,
} from "@/apis/user/user-repo";
import { userInfo } from "os";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import EditProfileForm from "./editProfileForm";
import { IUser } from "@/types/user.type";
import axios, { AxiosError } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Cake, CircleUser, Mail, MapPin, Phone } from "lucide-react";
import { UserContext } from "../contexts/UserContext";

export const Account: React.FC = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  async function handleConvertUrlToFile() {
    if(!user.avatar) return;
    try {
      const response = await axios.get(user.avatar, { responseType: "blob" });
      const fileName = user.avatar.split("/").pop();
      const newFile = new File([response.data], fileName, {
        type: response.data.type,
      });
      setFile(newFile);
    } catch (error) {
      console.error("Error converting URL to file:", error);
    }
  }
  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  const handleOpenEditProfileDialog = () => {
    setOpenEditProfileDialog(true);
  };

  const handleCloseEditProfileDialog = () => {
    setOpenEditProfileDialog(false);
  };

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        return;
      }
      const user: any = JSON.parse(localStorage.getItem("user"));
      await changePassword({
        newPass: newPassword,
        confirmPass: confirmNewPassword,
        currentPass: currentPassword,
        email: user.email,
      });
      alert("Mật khẩu đã được cập nhật");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const handleSaveProfile = async () => {};

  return (
    <div className="flex justify-center items-center mt-4 px-8">
      <div className="bg-white border border-gray-100 rounded-2xl w-full p-8">
        {user ? (
          <div className="flex flex-col items-center gap-4  ">
            <Avatar className="bg-primary-light w-24 h-24">
              <AvatarImage src={user ? user.avatar : null}></AvatarImage>
              <AvatarFallback className="text-2xl font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="text-sm hover:underline">
              Thay đổi ảnh đại diện
            </Button>
            <hr className=" border-b-gray-100 w-full" />
            <h1 className="text-3xl font-bold text-gray-800">
              Hồ sơ khách hàng
            </h1>
            <div className="w-full">
              <div className="flex items-center gap-2 mb-4">
                <CircleUser className="text-black" />
                <p className="text-gray-700 font-semibold">Họ tên:</p>
                <p className="ml-auto text-gray-800 font-medium">{user.name}</p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="text-black" />
                <p className="text-gray-700 font-semibold">Số điện thoại:</p>
                <p className="ml-auto text-gray-800 font-medium">
                  {user.phone}
                </p>
              </div>
              {/* <div className="flex items-center gap-2 mb-4">
              <AttachEmailOutlined className="text-black" />
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="ml-auto text-gray-800 font-medium">{email}</p>
              </div> */}
              <div className="flex items-center gap-2 mb-4">
                <Mail className="text-black" />
                <p className="text-gray-700 font-semibold">Email:</p>
                <p className="ml-auto text-gray-800 font-medium">
                  {user.email}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Cake className="text-black" />
                <p className="text-gray-700 font-semibold">Ngày sinh:</p>
                <p className="ml-auto text-gray-800 font-medium">
                  {user.birthDay ? user.birthDay.toLocaleDateString() != "" && "Không có ngày sinh" : "Không có ngày sinh"}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-black" />
                <p className="text-gray-700 font-semibold">Địa chỉ:</p>
                <p className="ml-auto text-gray-800 font-medium">
                  {user.userAddress
                    ? `${user.userAddress.street}, ${user.userAddress.city}, ${user.userAddress.state}`
                    : "Không có địa chỉ"}
                </p>
              </div>

              <div className="flex w-full justify-between mt-6">
                <button
                  onClick={handleOpenEditProfileDialog}
                  className="bg-[#FFF7E6] text-black py-2 px-6 rounded-lg hover:bg-[#ffecc4] transition-colors duration-300"
                >
                  Chỉnh sửa hồ sơ
                </button>
                <button
                  onClick={handleOpenPasswordDialog}
                  className="bg-[#FFF7E6] text-black py-2 px-6 rounded-lg hover:bg-[#ffecc4] transition-colors duration-300"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>Đang tải...</div>
        )}

        {/* change pass */}
        {openPasswordDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative transition-transform transform scale-100 duration-300">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Đổi mật khẩu
              </h2>
              <button
                onClick={handleClosePasswordDialog}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>
              <div className="space-y-4">
                <input
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Mật khẩu hiện tại"
                  className=""
                  required
                />
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mật khẩu mới"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
                  required
                />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu mới"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
                  required
                />
                <button
                  onClick={handleChangePassword}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FFF7E6] to-[#ffecc4] text-black py-3 rounded-lg hover:bg-gradient-to-l hover:from-[#FFF7E6] hover:to-[#ffecc4] transition duration-300"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
        {/* edit hồ sơ */}

        <Dialog
          open={openEditProfileDialog}
          onOpenChange={(e) => {
            setOpenEditProfileDialog(e);
          }}
        >
          <DialogContent className="min-w-[50%]">
            
            <EditProfileForm user={{...user, avatar: file}} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
