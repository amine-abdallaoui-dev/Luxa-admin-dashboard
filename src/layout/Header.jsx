import React from 'react';
import { useSelector } from 'react-redux';
import { LuSearch, LuBell, LuMenu } from 'react-icons/lu';

export default function Header({ setShowsideBar, showSideBar }) {
  const { userInfo } = useSelector(state => state.auth);
  const initials = userInfo?.name
    ? userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <div className="w-full h-[70px] fixed top-0 left-0 z-30 flex items-center px-6"
      style={{
        background: "rgba(15,17,23,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
      {/* Mobile menu */}
      <button
        className="lg:hidden mr-4 p-2 rounded-lg text-gray-400 hover:text-white transition"
        style={{ background:"rgba(255,255,255,0.05)" }}
        onClick={() => setShowsideBar(!showSideBar)}
      >
        <LuMenu className="text-xl" />
      </button>

      {/* Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl outline-none transition-all"
            style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", color:"#d1d5db" }}
            onFocus={e => e.target.style.borderColor = "rgba(79,142,247,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {/* Notification bell */}
        <button className="relative p-2 rounded-xl text-gray-400 hover:text-white transition"
          style={{ background:"rgba(255,255,255,0.05)" }}>
          <LuBell className="text-lg" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Admin info */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right">
            <p className="text-white text-sm font-semibold leading-none">{userInfo?.name || 'Admin'}</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color:"#4f8ef7" }}>Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
            style={{ background:"linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
            {initials}
          </div>
        </div>
      </div>
    </div>
  );
}
