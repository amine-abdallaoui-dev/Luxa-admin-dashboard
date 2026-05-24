import React, { useEffect, useState } from 'react';
import { LuWallet, LuCheck, LuX, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { PulseLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import api from '../api/api';

const statusColor = {
  pending:  { bg:"rgba(234,179,8,.12)",  text:"#eab308", border:"rgba(234,179,8,.25)"  },
  approved: { bg:"rgba(34,197,94,.12)",  text:"#22c55e", border:"rgba(34,197,94,.25)"  },
  rejected: { bg:"rgba(239,68,68,.12)",  text:"#ef4444", border:"rgba(239,68,68,.25)"  },
};

const card = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "16px",
};

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` },
  withCredentials: true,
});

function AdminPaymentRequests() {
  const [requests, setRequests] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loader, setLoader] = useState(false);
  const [actionLoader, setActionLoader] = useState(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const fetchRequests = async () => {
    setLoader(true);
    try {
      const params = { page, perPage };
      if (statusFilter) params.status = statusFilter;
      const { data } = await api.get('/admin/payment-requests', { params, ...getAuthHeaders() });
      setRequests(data.requests || []);
      setTotalItems(data.totalItems || 0);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to load payment requests');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => { fetchRequests(); }, [page, statusFilter]);

  const handleApprove = async (requestId) => {
    setActionLoader(requestId + '_approve');
    try {
      const { data } = await api.post('/admin/payment-approve', { requestId, adminNote }, getAuthHeaders());
      toast.success(data.message || 'Payment approved');
      fetchRequests();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Approval failed');
    } finally {
      setActionLoader(null);
    }
  };

  const handleReject = async (requestId) => {
    setActionLoader(requestId + '_reject');
    try {
      const { data } = await api.post('/admin/payment-reject', { requestId, adminNote }, getAuthHeaders());
      toast.success(data.message || 'Request rejected');
      fetchRequests();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Rejection failed');
    } finally {
      setActionLoader(null);
    }
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>
          <LuWallet className="text-white text-base" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">Payment Requests</h1>
          <p className="text-slate-400 text-xs">Review and approve seller withdrawal requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <label className="text-slate-400 text-sm whitespace-nowrap">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="text-sm px-3 py-2 rounded-lg outline-none flex-1"
            style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)", color:"#d1d5db" }}
          >
            <option value="">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={adminNote}
            onChange={e => setAdminNote(e.target.value)}
            placeholder="Admin note (optional, added on approve/reject)..."
            className="w-full px-3 py-2 text-sm rounded-lg outline-none"
            style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)", color:"#d1d5db" }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={card}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr style={{ background:"rgba(16,185,129,.06)", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                {['#','Seller','Email','Amount','Status','Date','Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr><td colSpan={7} className="text-center py-14">
                  <PulseLoader color="#10b981" size={8} />
                </td></tr>
              ) : requests.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-14 text-slate-500">No payment requests found</td></tr>
              ) : requests.map((req, idx) => {
                const c = statusColor[req.status] || statusColor.pending;
                const isPending = req.status === 'pending';
                const approvingThis = actionLoader === req._id + '_approve';
                const rejectingThis = actionLoader === req._id + '_reject';
                return (
                  <tr key={req._id}
                    style={{ borderBottom:"1px solid rgba(255,255,255,.04)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td className="px-5 py-4 text-slate-500 text-sm">{(page - 1) * perPage + idx + 1}</td>
                    <td className="px-5 py-4">
                      <p className="text-white text-sm font-medium">{req.sellerId?.name || '—'}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-slate-400 text-xs">{req.sellerId?.email || '—'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white font-bold text-sm">${req.amount}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize"
                        style={{ background:c.bg, color:c.text, border:`1px solid ${c.border}` }}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-slate-400 text-xs">{new Date(req.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(req._id)}
                            disabled={!!actionLoader}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                            style={{ background:"rgba(34,197,94,.15)", border:"1px solid rgba(34,197,94,.3)", color:"#22c55e" }}
                          >
                            {approvingThis ? <PulseLoader color="#22c55e" size={4} /> : <><LuCheck className="text-xs" /> Approve</>}
                          </button>
                          <button
                            onClick={() => handleReject(req._id)}
                            disabled={!!actionLoader}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                            style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", color:"#ef4444" }}
                          >
                            {rejectingThis ? <PulseLoader color="#ef4444" size={4} /> : <><LuX className="text-xs" /> Reject</>}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">{req.adminNote || 'Processed'}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderTop:"1px solid rgba(255,255,255,.06)" }}>
          <span className="text-slate-500 text-sm">{totalItems} request(s)</span>
          <div className="flex gap-2">
            <button disabled={page===1} onClick={() => setPage(p=>p-1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:page===1?"#4b5563":"#10b981" }}>
              <LuChevronLeft />
            </button>
            {[...Array(totalPages)].map((_,i) => (
              <button key={i} onClick={() => setPage(i+1)}
                className="w-8 h-8 rounded-lg text-sm font-medium"
                style={{ background:page===i+1?"linear-gradient(135deg,#10b981,#059669)":"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:page===i+1?"#fff":"#9ca3af" }}>
                {i+1}
              </button>
            ))}
            <button disabled={page>=totalPages} onClick={() => setPage(p=>p+1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:page>=totalPages?"#4b5563":"#10b981" }}>
              <LuChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPaymentRequests;
