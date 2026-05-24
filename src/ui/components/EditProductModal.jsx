import React, { useState, useEffect } from "react";
import { LuX, LuPackage } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { update_product } from "../../store/Reducers/productReducer";
import { PulseLoader } from "react-spinners";

const field = { background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"10px", color:"#f3f4f6", padding:"9px 12px", outline:"none", width:"100%", fontSize:"14px" };
const focus = (e) => { e.target.style.borderColor = "rgba(79,142,247,.5)"; };
const blur  = (e) => { e.target.style.borderColor = "rgba(255,255,255,.1)"; };

const EditProductModal = ({ show, onClose, product }) => {
  const dispatch = useDispatch();
  const { loader } = useSelector(s => s.product);
  const { categories } = useSelector(s => s.category);

  const [form, setForm] = useState({ _id:"", title:"", brand:"", category:"", price:"", discount:"", stock:"", description:"" });
  useEffect(() => { if (product) setForm({ _id:product._id, title:product.title||"", brand:product.brand||"", category:product.category||"", price:product.price||"", discount:product.discount||"", stock:product.stock||"", description:product.description||"" }); }, [product]);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); dispatch(update_product(form)).then(res => { if (!res.error) onClose(); }); };

  if (!show || !product) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)" }}>
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{ background:"linear-gradient(180deg,#0d1b2a,#112240)", border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 25px 80px rgba(0,0,0,0.6)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom:"1px solid rgba(255,255,255,.07)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
              <LuPackage className="text-white text-sm" />
            </div>
            <h2 className="text-white font-bold">Edit Product</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 transition"
            style={{ background:"rgba(255,255,255,.05)" }}><LuX /></button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="edit-prod-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Title</label>
                <input name="title" value={form.title} onChange={set('title')} onFocus={focus} onBlur={blur} style={field} required />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Brand</label>
                <input name="brand" value={form.brand} onChange={set('brand')} onFocus={focus} onBlur={blur} style={field} />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Category</label>
                <select name="category" value={form.category} onChange={set('category')} onFocus={focus} onBlur={blur} style={field} required>
                  <option value="">Select category...</option>
                  {categories?.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Stock</label>
                <input type="number" name="stock" value={form.stock} onChange={set('stock')} onFocus={focus} onBlur={blur} style={field} required />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Price ($)</label>
                <input type="number" name="price" value={form.price} onChange={set('price')} onFocus={focus} onBlur={blur} style={field} required />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Discount (%)</label>
                <input type="number" name="discount" value={form.discount} onChange={set('discount')} onFocus={focus} onBlur={blur} style={field} />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Description</label>
              <textarea name="description" value={form.description} onChange={set('description')} onFocus={focus} onBlur={blur}
                style={{ ...field, resize:"none" }} rows={4} required />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 flex-shrink-0" style={{ borderTop:"1px solid rgba(255,255,255,.07)" }}>
          <button type="button" onClick={onClose}
            className="px-5 py-2 rounded-xl text-gray-400 text-sm font-medium"
            style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)" }}>
            Cancel
          </button>
          <button type="submit" form="edit-prod-form" disabled={loader}
            className="px-6 py-2 rounded-xl text-white text-sm font-semibold flex items-center justify-center min-w-[120px]"
            style={{ background:loader?"rgba(79,142,247,.4)":"linear-gradient(135deg,#4f8ef7,#7c3aed)", cursor:loader?"not-allowed":"pointer" }}>
            {loader ? <PulseLoader size={6} color="#fff" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
