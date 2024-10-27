import React, { useState } from 'react';
import {
  BadgeOutlined, CallOutlined, AttachEmailOutlined, CakeOutlined, LocationOnOutlined
} from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { changeInformation, changePassword } from '@/apis/user/user-repo';

export const Account: React.FC = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [name, setName] = useState('Tiêu Trí Quang');
  const [phone, setPhone] = useState('0828907967');
  const [email, setEmail] = useState('quangrain2014@gmail.com');
  const [birthday, setBirthday] = useState('2003-08-27');
  const [address, setAddress] = useState('00 Example Street, Phường 0, Quận 0, Tỉnh Example');

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
      const user: any = JSON.parse(localStorage.getItem('user'))
      await changePassword({
        newPass: newPassword,
        confirmPass: confirmNewPassword,
        currentPass: currentPassword,
        email: user.email
      });
      alert("Mật khẩu đã được cập nhật")
    } catch (err) {
      console.error(err)
      alert(err);
    }
  };

  const handleSaveProfile = async(id) => {
    try {
      changeInformation(id);
    } catch (error) {
      
    }
    alert('Thông tin cá nhân đã được cập nhật!');
    handleCloseEditProfileDialog();
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <div className="flex flex-col items-center">
          <img className="h-32 w-32 rounded-full object-cover mb-4 border-4 border-[#ffecc4]" src="/src/assets/image/logo_header.png" alt="Profile" />
          <button className="text-blue-600 text-sm hover:underline mb-4">Thay đổi ảnh đại diện</button>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Hồ sơ khách hàng</h1>
          <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
              <BadgeOutlined className="text-black" />
              <p className="text-gray-700 font-semibold">Họ tên:</p>
              <p className="ml-auto text-gray-800 font-medium">{name}</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <BadgeOutlined className="text-black" />
              <p className="text-gray-700 font-semibold">Số điện thoại:</p>
              <p className="ml-auto text-gray-800 font-medium">{phone}</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <AttachEmailOutlined className="text-black" />
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="ml-auto text-gray-800 font-medium">{email}</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <CakeOutlined className="text-black" />
              <p className="text-gray-700 font-semibold">Ngày sinh:</p>
              <p className="ml-auto text-gray-800 font-medium">{birthday}</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <LocationOnOutlined className="text-black" />
              <p className="text-gray-700 font-semibold">Địa chỉ:</p>
              <p className="ml-auto text-gray-800 font-medium">{address}</p>
            </div>
          </div>
          <div className="flex w-full justify-between mt-6">
            <button onClick={handleOpenEditProfileDialog} className="bg-[#FFF7E6] text-black py-2 px-6 rounded-lg hover:bg-[#ffecc4] transition-colors duration-300">Chỉnh sửa hồ sơ</button>
            <button onClick={handleOpenPasswordDialog} className="bg-[#FFF7E6] text-black py-2 px-6 rounded-lg hover:bg-[#ffecc4] transition-colors duration-300">Đổi mật khẩu</button>
          </div>
        </div>
      </div>

      {/* change pass */}
      {openPasswordDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative transition-transform transform scale-100 duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Đổi mật khẩu</h2>
            <button onClick={handleClosePasswordDialog} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl">✕</button>
            <div className="space-y-4">
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Mật khẩu hiện tại"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
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
              <button onClick={handleChangePassword} type="submit" className="w-full bg-gradient-to-r from-[#FFF7E6] to-[#ffecc4] text-black py-3 rounded-lg hover:bg-gradient-to-l hover:from-[#FFF7E6] hover:to-[#ffecc4] transition duration-300">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
      {/* edit hồ sơ */}
      {openEditProfileDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative transition-transform transform scale-100 duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Chỉnh sửa hồ sơ</h2>
            <button onClick={handleCloseEditProfileDialog} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl">✕</button>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ tên"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
                required
              />
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
                required
              />
              <input
                type="date"
                name="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffecc4] transition duration-300"
                required
              />
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Địa chỉ"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFF7E6] transition duration-300"
                required
              />
              <button onClick={handleSaveProfile} type="submit" className="w-full bg-gradient-to-r from-[#FFF7E6] to-[#ffecc4] text-black py-3 rounded-lg hover:bg-gradient-to-l hover:from-[#FFF7E6] hover:to-[#ffecc4] transition duration-300">
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
