import React, { useState, useEffect } from "react";
import { LuX, LuPackage, LuUser, LuMapPin } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { update_order_status } from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";

const pMap = { paid:{bg:"rgba(34,197,94,.12)",text:"#22c55e",border:"rgba(34,197,94,.25)"}, unpaid:{bg:"rgba(239,68,68,.12)",text:"#ef4444",border:"rgba(239,68,68,.25)"}, pending:{bg:"rgba(234,179,8,.12)",text:"#eab308",border:"rgba(234,179,8,.25)"}, failed:{bg:"rgba(239,68,68,.12)",text:"#ef4444",border:"rgba(239,68,68,.25)"} };
const dMap = { delivered:{bg:"rgba(34,197,94,.12)",text:"#22c55e",border:"rgba(34,197,94,.25)"}, processing:{bg:"rgba(79,142,247,.12)",text:"#4f8ef7",border:"rgba(79,142,247,.25)"}, shipped:{bg:"rgba(168,85,247,.12)",text:"#a855f7",border:"rgba(168,85,247,.25)"}, pending:{bg:"rgba(234,179,8,.12)",text:"#eab308",border:"rgba(234,179,8,.25)"}, cancelled:{bg:"rgba(239,68,68,.12)",text:"#ef4444",border:"rgba(239,68,68,.25)"} };

const sel = { background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"10px", color:"#f3f4f6", padding:"8px 12px", outline:"none", width:"100%", fontSize:"14px" };

const OrderModal = ({ show, onClose, order }) => {
  const dispatch = useDispatch();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    if (order) { setDeliveryStatus(order.deliveryStatus||""); setPaymentStatus(order.paymentStatus||""); }
  }, [order]);

  const handleUpdate = () => {
    if (!order) return;
    dispatch(update_order_status({ orderId: order._id, info: { deliveryStatus, paymentStatus } }))
      .then(res => { if (!res.error) toast.success("Order updated"); });
  };

  if (!show || !order) return null;

  const pc = pMap[paymentStatus] || pMap.pending;
  const dc = dMap[deliveryStatus] || dMap.pending;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)" }}>
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{ background:"linear-gradient(180deg,#0d1b2a,#112240)", border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 25px 80px rgba(0,0,0,0.6)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom:"1px solid rgba(255,255,255,.07)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
              <LuPackage className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Order Details</h2>
              <p className="text-gray-500 text-xs font-mono">#{order.orderId}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 transition"
            style={{ background:"rgba(255,255,255,.05)" }}><LuX /></button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Customer & Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.06)" }}>
              <div className="flex items-center gap-2 mb-3">
                <LuUser className="text-blue-400 text-sm" />
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Customer</span>
              </div>
              <p className="text-white font-medium text-sm">{order.customerName}</p>
              <p className="text-gray-400 text-xs mt-1">{order.customerEmail}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.06)" }}>
              <div className="flex items-center gap-2 mb-3">
                <LuMapPin className="text-purple-400 text-sm" />
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Shipping</span>
              </div>
              <p className="text-white font-medium text-sm">{order.shippingAddress||'—'}</p>
              <p className="text-gray-400 text-xs mt-1">{order.shippingCity}</p>
              <p className="text-gray-400 text-xs">{order.shippingPhone}</p>
            </div>
          </div>

          {/* Status controls */}
          <div className="p-4 rounded-xl" style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.06)" }}>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">Update Status</p>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-gray-500 text-xs mb-1.5">Payment Status</label>
                <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} style={sel}>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-500 text-xs mb-1.5">Delivery Status</label>
                <select value={deliveryStatus} onChange={e => setDeliveryStatus(e.target.value)} style={sel}>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={handleUpdate}
                  className="w-full md:w-auto px-5 py-2 rounded-xl text-white text-sm font-semibold transition"
                  style={{ background:"linear-gradient(135deg,#4f8ef7,#7c3aed)", whiteSpace:"nowrap" }}>
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">Ordered Items</p>
            <div className="rounded-xl overflow-hidden" style={{ border:"1px solid rgba(255,255,255,.06)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background:"rgba(79,142,247,.06)", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                    {['Product','Price','Qty','Total'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order.products?.map((item, i) => (
                    <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                      <td className="px-4 py-3 text-white text-sm">{item.title}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">${item.price}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{item.qty}</td>
                      <td className="px-4 py-3 text-white font-semibold text-sm">${(item.price*item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop:"1px solid rgba(255,255,255,.07)" }}>
          <p className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
          <div className="text-right">
            <p className="text-gray-500 text-xs">Total</p>
            <p className="text-white font-black text-xl">${order.totalPrice?.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
