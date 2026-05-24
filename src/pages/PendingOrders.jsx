import React, { useState } from "react";
import AdminListingTable from "../ui/components/AdminListingTable";
import { get_orders } from "../store/Reducers/orderReducer";
import OrderModal from "../ui/components/OrderModal";
import { LuClock, LuEye } from "react-icons/lu";

const pColors = { paid:{bg:"rgba(34,197,94,.12)",text:"#22c55e",border:"rgba(34,197,94,.25)"}, unpaid:{bg:"rgba(239,68,68,.12)",text:"#ef4444",border:"rgba(239,68,68,.25)"}, pending:{bg:"rgba(234,179,8,.12)",text:"#eab308",border:"rgba(234,179,8,.25)"} };

function PendingOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AdminListingTable
        pageTitle="Pending Orders"
        pageIcon={LuClock}
        dataKey="orders"
        stateKey="order"
        fetchThunk={get_orders}
        fetchParams={{ deliveryStatus: "pending" }}
        columns={[
          { header:"Order ID", render: row => <span className="text-blue-400 font-mono text-sm">#{String(row.orderId||row._id).slice(-6).toUpperCase()}</span> },
          { header:"Customer", render: row => <span className="text-white text-sm">{row.customerName||'—'}</span> },
          { header:"Total", render: row => <span className="text-white font-semibold text-sm">${row.totalPrice||0}</span> },
          { header:"Payment", render: row => {
            const c = pColors[row.paymentStatus] || pColors.pending;
            return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize" style={{ background:c.bg, color:c.text, border:`1px solid ${c.border}` }}>{row.paymentStatus||'pending'}</span>;
          }},
          { header:"Date", render: row => <span className="text-gray-400 text-xs">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—'}</span> },
          { header:"", render: row => (
            <button onClick={() => { setSelectedOrder(row); setShowModal(true); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 transition-all"
              style={{ background:"rgba(234,179,8,.12)", border:"1px solid rgba(234,179,8,.25)" }}>
              <LuEye /> View
            </button>
          )},
        ]}
      />
      <OrderModal show={showModal} onClose={() => setShowModal(false)} order={selectedOrder} />
    </>
  );
}

export default PendingOrders;
