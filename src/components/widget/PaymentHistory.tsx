import React from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const PaymentHistory: React.FC = () => {
  return (
    <div className=" p-5 h-full HistoryDetail space-y-4">
      <div className="text-3xl font-normal">
        <h2 className="font-black font-sans">Lịch sử mua hàng</h2>
      </div>
      {/* TODO: Lọc theo ngày */}
      <Outlet />
    </div>
  );
};
