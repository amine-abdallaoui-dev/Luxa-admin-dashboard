import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard, LuWallet, LuPackage, LuShoppingCart, LuClock, LuStar, LuTag, LuDollarSign, LuUsers, LuUserCheck } from "react-icons/lu";
import { TbCategoryPlus } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { admin_logout } from '../store/Reducers/authReducer';
import { FaPlusSquare } from "react-icons/fa";

const navLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <LuLayoutDashboard /> },
  { name: "Categories", path: "/admin/category", icon: <TbCategoryPlus /> },
  { name: "All Orders", path: "/admin/orders", icon: <LuShoppingCart /> },
  { name: "Pending Orders", path: "/admin/pending-orders", icon: <LuClock /> },
  { name: "All Products", path: "/admin/all-products", icon: <LuPackage /> },
  { name: "Add Product", path: "/admin/add-product", icon: <FaPlusSquare /> },
  { name: "Reviews", path: "/admin/reviews", icon: <LuStar /> },
  { name: "Brands", path: "/admin/brands", icon: <LuTag /> },
  { name: "Transactions", path: "/admin/transactions", icon: <LuDollarSign /> },
  { name: "Customers", path: "/admin/customers", icon: <LuUsers /> },
  { name: "Sellers", path: "/admin/sellers", icon: <LuUserCheck /> },
  { name: "Payment Requests", path: "/admin/payment-requests", icon: <LuWallet /> },
];

export default function Sidebar({ showSideBar }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(s => s.auth);

  const handleLogout = async () => {
    await dispatch(admin_logout());
    navigate('/');
  };

  const initials = userInfo?.name
    ? userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <aside
      className={`${showSideBar ? 'left-0' : '-left-[280px]'} lg:left-0 transition-all duration-300 w-[260px] h-screen fixed top-0 z-50 flex flex-col`}
      style={{
        background: 'linear-gradient(180deg,#0d1b2a 0%,#112240 100%)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Logo */}
      <div className="h-[70px] flex items-center px-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
            <LuLayoutDashboard className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-none">Admin Panel</h1>
            <p className="text-xs mt-0.5" style={{ color: "#4f8ef7" }}>Management Console</p>
          </div>
        </div>
      </div>

      {/* Admin profile card */}
      <div className="mx-4 mt-4 mb-2 p-3 rounded-xl flex items-center gap-3 flex-shrink-0"
        style={{ background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.15)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
          {initials}
        </div>
        <div className="overflow-hidden">
          <p className="text-white text-sm font-semibold truncate">{userInfo?.name || 'Admin'}</p>
          <p className="text-xs truncate" style={{ color: "#4f8ef7" }}>Super Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-3">
        <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-2 mb-2 mt-2">Navigation</p>
        {navLinks.map((link, i) => {
          const isActive = pathname === link.path;
          return (
            <Link key={i} to={link.path}>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-200 group relative overflow-hidden"
                style={{
                  background: isActive ? "rgba(79,142,247,0.12)" : "transparent",
                  border: isActive ? "1px solid rgba(79,142,247,0.25)" : "1px solid transparent",
                }}>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4/5 rounded-r-full"
                    style={{ background: "linear-gradient(180deg,#4f8ef7,#7c3aed)" }} />
                )}
                <span className="text-base flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ color: isActive ? "#4f8ef7" : "#6b7280" }}>
                  {link.icon}
                </span>
                <span className="text-sm font-medium"
                  style={{ color: isActive ? "#e2e8f0" : "#9ca3af" }}>
                  {link.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button onClick={handleLogout} className="w-full">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 transition-all duration-200 group"
            style={{ border: "1px solid transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}>
            <MdLogout className="text-base group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
