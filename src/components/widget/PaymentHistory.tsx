import React from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const PaymentHistory: React.FC = () => {
  return (
    <div className=" p-5 h-full HistoryDetail">
      <div className="text-3xl font-normal">
        <h2 className="font-black font-sans">Lịch sử mua hàng</h2>
      </div>
      <nav>
        <ul className="flex flex-wrap gap-5">
          <li className="relative py-4">
            <NavLink
              to="./allHis"
              className={({ isActive }) =>
                `rounded-xl p-2 hover:text-black text-black hover:font-semibold 
                ${isActive ? 'bg-[#FFECC4]' : 'bg-slate-100 hover:bg-[#FFECC4]'
                }`
              }
            >
              Tất cả
            </NavLink>
          </li>
          <li className="relative py-4">
            <NavLink
              to="./preparingOrder"
              className={({ isActive }) =>
                `rounded-xl p-2 hover:text-black text-black hover:font-semibold 
                ${isActive ? 'bg-[#FFECC4]' : 'bg-slate-100 hover:bg-[#FFECC4]'
                }`
              }
            >
              Đang được chuẩn bị
            </NavLink>
          </li>
          <li className="relative py-4">
            <NavLink
              to="./waitingForPayment"
              className={({ isActive }) =>
                `rounded-xl p-2 hover:text-black text-black hover:font-semibold 
                ${isActive ? 'bg-[#FFECC4]' : 'bg-slate-100 hover:bg-[#FFECC4]'
                }`
              }
            >
              Chờ thanh toán
            </NavLink>
          </li>
          <li className="relative py-4">
            <NavLink
              to="./delivering"
              className={({ isActive }) =>
                `rounded-xl p-2 hover:text-black text-black hover:font-semibold 
                ${isActive ? 'bg-[#FFECC4]' : 'bg-slate-100 hover:bg-[#FFECC4]'
                }`
              }
            >
              Đang vận chuyển
            </NavLink>
          </li>
          <li className="relative py-4">
            <NavLink
              to="./delivered"
              className={({ isActive }) =>
                `rounded-xl p-2 hover:text-black text-black hover:font-semibold 
                ${isActive ? 'bg-[#FFECC4]' : 'bg-slate-100 hover:bg-[#FFECC4]'
                }`
              }
            >
              Đã giao
            </NavLink>
          </li>
          <li className="relative py-4">
            <NavLink
              to="./received"
              className={({ isActive }) =>
                `rounded-xl p-2 hover:text-black text-black hover:font-semibold 
                ${isActive ? 'bg-[#FFECC4]' : 'bg-slate-100 hover:bg-[#FFECC4]'
                }`
              }
            >
              Đã nhận hàng
            </NavLink>
          </li>
          <li className="relative py-4">
            <NavLink
              to="./canceled"
              className={({ isActive }) =>
                `rounded-xl p-2 hover:text-black text-black hover:font-semibold 
                ${isActive ? 'bg-[#FFECC4]' : 'bg-slate-100 hover:bg-[#FFECC4]'
                }`
              }
            >
              Đã hủy
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
