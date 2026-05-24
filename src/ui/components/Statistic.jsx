import React from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiUserStarFill } from "react-icons/ri";
import { MdBorderColor } from "react-icons/md";

const Statistic = ({ stats }) => {
  const cards = [
    {
      value: `$${Number(stats?.revenue ?? 0).toFixed(2)}`,
      label: "Total Revenue",
      icon: <MdOutlineCurrencyExchange className="text-3xl text-emerald-500" />,
      bg: "bg-emerald-500/10",
      border: "border-emerald-100"
    },
    {
      value: stats?.totalProducts ?? 0,
      label: "Total Products",
      icon: <MdOutlineProductionQuantityLimits className="text-3xl text-blue-500" />,
      bg: "bg-blue-500/10",
      border: "border-blue-100"
    },
    {
      value: stats?.totalSellers ?? 0,
      label: "Total Sellers",
      icon: <RiUserStarFill className="text-3xl text-purple-500" />,
      bg: "bg-purple-500/10",
      border: "border-purple-100"
    },
    {
      value: stats?.totalOrders ?? 0,
      label: "Total Orders",
      icon: <MdBorderColor className="text-3xl text-orange-500" />,
      bg: "bg-orange-500/10",
      border: "border-orange-100"
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.label}
          className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-center z-10 relative">
            <div className="flex flex-col">
              <h4 className="text-gray-500 font-medium text-sm tracking-wide uppercase mb-1">{card.label}</h4>
              <h3 className="font-bold text-3xl text-slate-800">{card.value}</h3>
            </div>
            <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${card.bg} border ${card.border} group-hover:scale-110 transition-transform duration-300`}>
              {card.icon}
            </div>
          </div>
          
          {/* Decorative Background Blob */}
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${card.bg} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
        </div>
      ))}
    </>
  );
};

export default Statistic;
