import React from 'react'
import '../../styles/managerAccount.css'
import { NavLink, Outlet } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import avt from '../../assets/image/rectangle.png';
const navLinks = [
  {
    path: "account",
    icon: <AccountCircleIcon />,
    display: "Tài khoản",
  },
  {
    path: "paymentHistory",
    icon: <ReceiptLongIcon />,
    display: "Lịch sử mua hàng",
  },
  {
    path: "favoriteProduct",
    icon: <FavoriteBorderIcon />,
    display: "Sản phẩm yêu thích",
  },
];
export const ManagerAccount: React.FC = () => {
  return (
    <div className='flex flex-grow flex-1 mx-20'>
      <div className='bg-[#FFF7E6] rounded-lg shadow-lg p-6 heght-div1 mt-7'>
        <div className="flex items-center gap-4 mb-8">
          <img
            src={avt}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-lg font-bold">Tiêu Trí Quang</h3>
            <p className="text-sm text-gray-500">Khách hàng</p>
          </div>
        </div>
        <ul className='nav__list text-color-primary'>
          {navLinks.map((item, index) => (
            <li className='ml-2 mr-8 nav__item' key={index}>
              <NavLink
                to={item.path}
                className={navClass =>
                  navClass.isActive ? "nav__active nav__link" : "nav__link"
                }
              >
                <span>
                  <i className='icon-sidebar'>{item.icon}</i>
                </span>
                <p>{item.display}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
       <Outlet />
      </div>
    </div>
  )
}
