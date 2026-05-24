import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { LuUserCheck, LuPencil, LuTrash2, LuX } from "react-icons/lu";
import AdminListingTable from "../ui/components/AdminListingTable";
import { get_sellers, add_seller, edit_seller, delete_seller } from "../store/Reducers/listingReducer";
import { FaPlusSquare } from "react-icons/fa";

const field = { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", color: "#f3f4f6", padding: "9px 12px", outline: "none", width: "100%", fontSize: "14px" };
const focus = (e) => e.target.style.borderColor = "rgba(79,142,247,.5)";
const blur = (e) => e.target.style.borderColor = "rgba(255,255,255,.1)";

const blank = { name: "", email: "", shopName: "", country: "", city: "", phone: "", password: "", status: "inActive", shopStatus: "close" };

function Sellers() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [seller, setSeller] = useState(blank);

  const openAdd = () => { setIsEditMode(false); setSeller(blank); setShowModal(true); };
  const openEdit = (row) => { setIsEditMode(true); setSeller({ ...row, password: "" }); setShowModal(true); };
  const set = (k) => (e) => setSeller(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const data = { ...seller }; if (!data.password) delete data.password;
        const res = await dispatch(edit_seller({ id: seller._id, sellerData: data })).unwrap();
        toast.success(res.message || "Seller updated");
      } else {
        if (!seller.password) return toast.error("Password is required");
        const res = await dispatch(add_seller(seller)).unwrap();
        toast.success(res.message || "Seller created");
      }
      setShowModal(false);
      dispatch(get_sellers({ page: 1, perPage: 10, search: "" }));
    } catch (err) { toast.error(err.error || "Something went wrong"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this seller?")) return;
    try {
      const res = await dispatch(delete_seller(id)).unwrap();
      toast.success(res.message || "Deleted");
      dispatch(get_sellers({ page: 1, perPage: 10, search: "" }));
    } catch (err) { toast.error(err.error || "Failed to delete"); }
  };

  const statusBadge = (val, green, red) => {
    const ok = val === green;
    return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize"
      style={{ background: ok ? "rgba(34,197,94,.12)" : "rgba(239,68,68,.12)", color: ok ? "#22c55e" : "#ef4444", border: `1px solid ${ok ? "rgba(34,197,94,.25)" : "rgba(239,68,68,.25)"}` }}>{val}</span>;
  };

  return (
    <>
      <AdminListingTable
        pageTitle="Sellers"
        pageIcon={LuUserCheck}
        dataKey="sellers"
        fetchThunk={get_sellers}
        columns={[
          { header: "Name", render: row => <span className="text-white font-medium text-sm">{row.name}</span> },
          { header: "Shop", render: row => <span className="text-gray-300 text-sm">{row.shopName}</span> },
          { header: "Email", render: row => <span className="text-gray-400 text-xs">{row.email}</span> },
          { header: "Phone", render: row => <span className="text-gray-400 text-xs">{row.phone}</span> },
          { header: "Status", render: row => statusBadge(row.status, 'active', 'inActive') },
          { header: "Shop Status", render: row => statusBadge(row.shopStatus, 'open', 'close') },
          {
            header: "Actions", render: row => (
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(row)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-blue-400"
                  style={{ background: "rgba(79,142,247,.12)", border: "1px solid rgba(79,142,247,.25)" }}>
                  <LuPencil className="text-xs" /> Edit
                </button>
                <button onClick={() => handleDelete(row._id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-400"
                  style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)" }}>
                  <LuTrash2 className="text-xs" /> Delete
                </button>
              </div>
            )
          },
        ]}
        actionButton={
          <button onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
            <FaPlusSquare /> Add Seller
          </button>
        }
      />

      {/* Dark Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden" style={{ background: "linear-gradient(180deg,#0d1b2a,#112240)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 25px 80px rgba(0,0,0,0.6)" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
                  <LuUserCheck className="text-white text-sm" />
                </div>
                <h2 className="text-white font-bold">{isEditMode ? "Edit Seller" : "Add Seller"}</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 transition"
                style={{ background: "rgba(255,255,255,.05)" }}><LuX /></button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Seller Name" },
                  { label: "Email", key: "email", type: "email", placeholder: "email@example.com" },
                  { label: "Shop Name", key: "shopName", type: "text", placeholder: "My Shop" },
                  { label: "Phone", key: "phone", type: "text", placeholder: "+1 234 567 8900" },
                  { label: "Country", key: "country", type: "text", placeholder: "Country" },
                  { label: "City", key: "city", type: "text", placeholder: "City" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">{f.label}</label>
                    <input type={f.type} value={seller[f.key]} onChange={set(f.key)} onFocus={focus} onBlur={blur}
                      style={field} placeholder={f.placeholder} required />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Password {isEditMode && <span className="text-gray-600 normal-case tracking-normal font-normal">(leave empty to keep)</span>}
                  </label>
                  <input type="password" value={seller.password} onChange={set('password')} onFocus={focus} onBlur={blur}
                    style={field} placeholder="Password" required={!isEditMode} />
                </div>
                {isEditMode && (
                  <>
                    <div>
                      <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Account Status</label>
                      <select value={seller.status} onChange={set('status')} onFocus={focus} onBlur={blur} style={field}>
                        <option value="active">Active</option>
                        <option value="inActive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Shop Status</label>
                      <select value={seller.shopStatus} onChange={set('shopStatus')} onFocus={focus} onBlur={blur} style={field}>
                        <option value="open">Open</option>
                        <option value="close">Closed</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-xl text-gray-400 text-sm font-medium transition"
                  style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)" }}>Cancel</button>
                <button type="submit"
                  className="px-6 py-2 rounded-xl text-white text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
                  {isEditMode ? "Save Changes" : "Create Seller"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Sellers;
