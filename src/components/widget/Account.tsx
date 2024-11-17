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
  updateAvatarUser,
} from "@/apis/user/user-repo";
import { userInfo } from "os";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EditProfileForm, { UserSchema } from "./editProfileForm";
import { IUser } from "@/types/user.type";
import axios, { AxiosError } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { Cake, CircleUser, Loader, Mail, MapPin, Phone } from "lucide-react";
import { UserContext } from "../contexts/UserContext";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";
import { profile } from "console";
import { formatBytes } from "@/utils";
import API from "@/apis/api";
import { Skeleton } from "../ui/skeleton";

export const Account: React.FC = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [process, setProcess] = useState<{
    loading: boolean;
    where?: "password" | "profile" | "avatar";
    error: AxiosError | null;
  }>({
    loading: false,
    where: null,
    error: null,
  });
  const [profilePic, setProfilePic] = useState<{
    file: File | null;
    isOpen: boolean;
  } | null>({
    file: null,
    isOpen: false,
  });
  async function onSaveProfile(data: UserSchema) {
    setProcess({
      loading: true,
      where: "profile",
      error: null,
    });
    const updatedUser: IUser = {
      ...data,
      _id: user._id,
      email: user.email,
      avatar: user.avatar,
      birthDay: data.birthDay ? data.birthDay.toLocaleDateString() : null,
      userAddress: {
        street: data.street,
        city: data.ward + ", " + data.city,
        state: data.state,
        country: data.country,
        apartmentNumber: data.apartmentNumber,
      },
    };
    const res = await changeInformation(updatedUser);
    if (res instanceof AxiosError) {
      console.error(res);
      setProcess({
        loading: false,
        where: "profile",
        error: res,
      });
      setOpenEditProfileDialog(false);
      return;
    }
    setProcess({
      loading: false,
      where: "profile",
      error: null,
    });
    setOpenEditProfileDialog(false);
    setUser({
      ...updatedUser,
      avatar:
        updatedUser.avatar instanceof File
          ? URL.createObjectURL(updatedUser.avatar)
          : (updatedUser.avatar as string),
    });
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

  const handleSaveProfile = async () => {
    setProcess({
      loading: true,
      where: "avatar",
      error: null,
    });
    const res = await updateAvatarUser(profilePic.file, user._id);
    setUser({
      ...user,
      // @ts-ignore
      avatar: res.metadata.avatar,
      // @ts-ignore
      role: user.role,
    });
    console.log(res);
    if (res instanceof AxiosError) {
      console.error(res);
      setProcess({
        loading: true,
        where: "avatar",
        error: res,
      });
      return;
    }
    setProcess({
      loading: false,
      where: "avatar",
      error: null,
    });
    setProfilePic({
      file: null,
      isOpen: false,
    });
  };

  return (
    <div className="flex justify-center items-center mt-4 px-8">
      <div className="bg-white border border-gray-100 rounded-2xl w-full p-8">
        {user ? (
          <div className="flex flex-col items-center gap-4">
            <Avatar className="bg-primary-light w-24 h-24">
              <AvatarImage
                src={user ? (user.avatar as string) : null}
              ></AvatarImage>
              <AvatarFallback className="text-2xl font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-picker"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Thay đổi ảnh đại diện
            </label>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="avatar-picker"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setProfilePic({
                    file: e.target.files[0],
                    isOpen: true,
                  });
                }
              }}
            />
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
                  {user.birthDay
                    ? new Date(user.birthDay as string).toLocaleDateString()
                    : "Không có ngày sinh"}
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
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="w-24 h-24 rounded-full"/>
            <Skeleton className="w-[11.04125rem] h-9 rounded-full"></Skeleton>
            <hr className=" border-b-gray-100 w-full" />
            <Skeleton className="w-56 h-9"/>
            <div className="w-full flex gap-2 items-center">
              <Skeleton className="w-8 h-8"/>
              <Skeleton className="w-36 h-9"/>
              <Skeleton className="w-36 h-9 ml-auto"/>
            </div>
            <div className="w-full flex gap-2 items-center">
              <Skeleton className="w-8 h-8"/>
              <Skeleton className="w-48 h-9"/>
              <Skeleton className="w-40 h-9 ml-auto"/>
            </div>
            <div className="w-full flex gap-2 items-center">
              <Skeleton className="w-8 h-8"/>
              <Skeleton className="w-28 h-9"/>
              <Skeleton className="w-44 h-9 ml-auto"/>
            </div>
            <div className="w-full flex gap-2 items-center">
              <Skeleton className="w-8 h-8"/>
              <Skeleton className="w-36 h-9"/>
              <Skeleton className="w-36 h-9 ml-auto"/>
            </div>
            <div className="w-full flex gap-2 items-center">
              <Skeleton className="w-8 h-8"/>
              <Skeleton className="w-36 h-9"/>
              <Skeleton className="w-36 h-9 ml-auto"/>
            </div>
          </div>
        )}
        
        {/* change pass */}

        <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Đổi mật khẩu</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Mật khẩu hiện tại"
                className=""
                required
              />
              <Input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mật khẩu mới"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
                required
              />
              <Input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu mới"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
                required
              />
              <Button
                onClick={handleChangePassword}
                type="submit"
                className="w-full bg-gradient-to-r from-[#FFF7E6] to-[#ffecc4] text-black py-3 rounded-lg hover:bg-gradient-to-l hover:from-[#FFF7E6] hover:to-[#ffecc4] transition duration-300"
              >
                Xác nhận
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* edit hồ sơ */}

        <Dialog
          open={openEditProfileDialog}
          onOpenChange={(e) => {
            setOpenEditProfileDialog(e);
          }}
        >
          <DialogContent className="min-w-[50%]">
            <DialogHeader className="hidden">
              <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            </DialogHeader>
            <EditProfileForm
              loading={process.loading && process.where == "profile"}
              onSubmit={onSaveProfile}
              defaultValues={{
                user: user ? { ...user, avatar: file, birthDay: user && user.birthDay ? new Date(user.birthDay) : null, street: user.userAddress ? user.userAddress.street : "", ward: user.userAddress ? user.userAddress.city.split(", ")[0] : "", city: user.userAddress ? user.userAddress.city.split(", ")[1] : "", state: user.userAddress.state, country: user.userAddress.country, apartmentNumber: user.userAddress.apartmentNumber } : null,
                profilePicture: user ? (user.avatar as string) : null,
              }}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={profilePic.isOpen}
          onOpenChange={(e) => {
            setProfilePic({
              ...profilePic,
              isOpen: e,
            });
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xem trước ảnh đại diện</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2 items-center justify-center">
              <AspectRatio ratio={1} className="w-full">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={
                      profilePic.file
                        ? URL.createObjectURL(profilePic.file)
                        : null
                    }
                  ></AvatarImage>
                  <AvatarFallback className="text-8xl font-bold">
                    {user
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "?"}
                  </AvatarFallback>
                </Avatar>
              </AspectRatio>
              <p>{profilePic.file ? profilePic.file.name : "N/A"}</p>
              <p>
                {profilePic.file ? formatBytes(profilePic.file.size) : "N/A"}
              </p>
            </div>
            <DialogFooter className="flex gap-2 w-full">
              <DialogClose className="flex-1">
                <Button variant="secondary" className="w-full">
                  Huỷ
                </Button>
              </DialogClose>
              <Button className="flex-1" onClick={handleSaveProfile}>
                {process.where == "avatar" && process.loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Lưu"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
