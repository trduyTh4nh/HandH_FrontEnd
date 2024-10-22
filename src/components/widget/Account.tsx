import React from 'react';
import {
  BadgeOutlined, CallOutlined, AttachEmailOutlined, CakeOutlined, LocationOnOutlined
} from "@mui/icons-material";

export const Account: React.FC = () => {
  return (
    <div className="flex justify-center mt-7">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <div className="flex flex-col items-center">
          <img className="h-28 w-28 rounded-full object-cover mb-4" src="/src/assets/image/logo_header.png" alt="Profile" />
          <button className="text-sm">Thay đổi ảnh đại diện</button>
          <h1 className="text-2xl font-bold mt-4">Hồ sơ khách hàng</h1>
          <div className="mt-6 w-full">
            <div className="flex items-center gap-2 mb-4">
              <BadgeOutlined className="text-gray-600" />
              <p className="text-gray-600 font-bold">Họ tên:</p>
              <p className="ml-auto">Tiêu Trí Quang</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <CallOutlined className="text-gray-600" />
              <p className="text-gray-600 font-bold">Số điện thoại:</p>
              <p className="ml-auto">+84000 00 0000</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <AttachEmailOutlined className="text-gray-600" />
              <p className="text-gray-600 font-bold">Email:</p>
              <p className="ml-auto">quangrain2014@gmail.com</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <CakeOutlined className="text-gray-600" />
              <p className="text-gray-600 font-bold">Ngày sinh:</p>
              <p className="ml-auto">27/08/2003</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <LocationOnOutlined className="text-gray-600" />
              <p className="text-gray-600 font-bold">Địa chỉ:</p>
              <p className="ml-auto">00 Example Street, Phường 0, Quận 0, Tỉnh Example</p>
            </div>
          </div>
          <div className="flex w-full justify-between mt-6">
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200">Chỉnh sửa hồ sơ</button>
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200">Đổi mật khẩu</button>
          </div>
        </div>
      </div>
    </div>
  );
};
