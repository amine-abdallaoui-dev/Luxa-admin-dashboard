import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { LuUsers, LuPackage, LuShoppingCart, LuDollarSign, LuUserCheck } from 'react-icons/lu';
import { get_dashboard_stats } from '../store/Reducers/listingReducer';

const card = { background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:"16px" };
const gradients = {
  blue:   "linear-gradient(135deg,rgba(79,142,247,.15),rgba(79,142,247,.03))",
  green:  "linear-gradient(135deg,rgba(34,197,94,.15),rgba(34,197,94,.03))",
  purple: "linear-gradient(135deg,rgba(168,85,247,.15),rgba(168,85,247,.03))",
  amber:  "linear-gradient(135deg,rgba(245,158,11,.15),rgba(245,158,11,.03))",
};
const iconColors = { blue:"#4f8ef7", green:"#22c55e", purple:"#a855f7", amber:"#f59e0b" };

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="p-5 rounded-2xl relative overflow-hidden" style={card}>
      <div className="absolute inset-0" style={{ background: gradients[color] }} />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
          style={{ background:`${iconColors[color]}22` }}>
          <Icon className="text-lg" style={{ color: iconColors[color] }} />
        </div>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">{label}</p>
        <h2 className="text-white text-2xl font-bold mt-1">{value ?? '—'}</h2>
      </div>
    </div>
  );
}

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(s => s.auth);
  const { stats } = useSelector(s => s.listing);

  useEffect(() => { if (userInfo === '') navigate('/'); }, [userInfo, navigate]);
  useEffect(() => { if (userInfo) dispatch(get_dashboard_stats()); }, [userInfo, dispatch]);

  const chartData = stats?.chartData || {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    orders: [], revenue: [], sellers: [], products: [],
  };

  const areaOptions = {
    chart: { background:'transparent', toolbar:{ show:false }, fontFamily:'Inter, sans-serif' },
    colors: ['#4f8ef7','#22c55e','#a855f7'],
    stroke: { curve:'smooth', width:3 },
    fill: { type:'gradient', gradient:{ opacityFrom:0.2, opacityTo:0.02 } },
    dataLabels: { enabled:false },
    grid: { borderColor:'rgba(255,255,255,0.06)', strokeDashArray:4 },
    xaxis: { categories: chartData.labels, labels:{ style:{ colors:'#6b7280', fontSize:'11px' } }, axisBorder:{ show:false }, axisTicks:{ show:false } },
    yaxis: { labels:{ style:{ colors:'#6b7280' } } },
    legend: { labels:{ colors:'#9ca3af' } },
    tooltip: { theme:'dark' },
  };
  const areaSeries = [
    { name:'Orders', data: chartData.orders },
    { name:'Sellers', data: chartData.sellers },
    { name:'Products', data: chartData.products },
  ];

  const barOptions = {
    chart: { background:'transparent', toolbar:{ show:false }, fontFamily:'Inter, sans-serif' },
    colors: ['#4f8ef7'],
    plotOptions: { bar:{ borderRadius:6, columnWidth:'45%' } },
    dataLabels: { enabled:false },
    grid: { borderColor:'rgba(255,255,255,0.06)', strokeDashArray:4 },
    xaxis: { categories: chartData.labels, labels:{ style:{ colors:'#6b7280', fontSize:'11px' } }, axisBorder:{ show:false }, axisTicks:{ show:false } },
    yaxis: { labels:{ style:{ colors:'#6b7280' } } },
    tooltip: { theme:'dark' },
  };
  const barSeries = [{ name:'Revenue ($)', data: chartData.revenue }];

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Platform-wide overview and analytics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon={LuDollarSign}  label="Gross Revenue"    value={stats?.totalRevenue  !== undefined ? `$${Number(stats.totalRevenue).toFixed(2)}`  : '—'} color="green"  />
        <StatCard icon={LuDollarSign}  label="Total Paid Out"   value={stats?.totalPaidOut  !== undefined ? `$${Number(stats.totalPaidOut).toFixed(2)}`  : '—'} color="amber"  />
        <StatCard icon={LuDollarSign}  label="Net Revenue"      value={stats?.netRevenue    !== undefined ? `$${Number(stats.netRevenue).toFixed(2)}`    : '—'} color="blue"   />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={LuShoppingCart} label="Total Orders"   value={stats?.totalOrders}   color="blue"   />
        <StatCard icon={LuPackage}      label="Total Products" value={stats?.totalProducts}  color="purple" />
        <StatCard icon={LuUserCheck}    label="Total Sellers"  value={stats?.totalSellers}   color="amber"  />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-5 rounded-2xl" style={card}>
          <h3 className="text-white font-semibold mb-1">Platform Analytics</h3>
          <p className="text-gray-500 text-xs mb-4">Monthly orders, sellers and products</p>
          <Chart options={areaOptions} series={areaSeries} type="area" height={260} />
        </div>
        <div className="p-5 rounded-2xl" style={card}>
          <h3 className="text-white font-semibold mb-1">Monthly Revenue</h3>
          <p className="text-gray-500 text-xs mb-4">Revenue breakdown by month</p>
          <Chart options={barOptions} series={barSeries} type="bar" height={260} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
