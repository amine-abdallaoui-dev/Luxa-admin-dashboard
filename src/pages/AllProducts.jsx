import React, { useState } from "react";
import AdminListingTable from "../ui/components/AdminListingTable";
import { useDispatch } from "react-redux";
import { LuPackage, LuPencil, LuTrash2 } from "react-icons/lu";
import { get_products, delete_product } from "../store/Reducers/productReducer";
import EditProductModal from "../ui/components/EditProductModal";

const sColors = { active:{bg:"rgba(34,197,94,.12)",text:"#22c55e",border:"rgba(34,197,94,.25)"}, inactive:{bg:"rgba(239,68,68,.12)",text:"#ef4444",border:"rgba(239,68,68,.25)"}, pending:{bg:"rgba(234,179,8,.12)",text:"#eab308",border:"rgba(234,179,8,.25)"} };

function AllProducts() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <AdminListingTable
        pageTitle="All Products"
        pageIcon={LuPackage}
        dataKey="products"
        stateKey="product"
        fetchThunk={get_products}
        columns={[
          { header:"#", render: row => <span className="text-gray-500 text-xs font-mono">{String(row._id).slice(-6)}</span> },
          { header:"Image", render: row => (
            <img src={row.images?.[0]} alt="" className="w-12 h-12 rounded-xl object-cover"
              style={{ border:"1px solid rgba(255,255,255,.08)" }} />
          )},
          { header:"Name", render: row => <span className="text-white text-sm font-medium">{row.title}</span> },
          { header:"Price", render: row => <span className="text-blue-400 font-semibold text-sm">${row.price}</span> },
          { header:"Stock", render: row => <span className="text-gray-300 text-sm">{row.stock}</span> },
          { header:"Status", render: row => {
            const c = sColors[row.status] || sColors.pending;
            return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize" style={{ background:c.bg, color:c.text, border:`1px solid ${c.border}` }}>{row.status||'pending'}</span>;
          }},
          { header:"Actions", render: row => (
            <div className="flex items-center gap-2">
              <button onClick={() => { setSelectedProduct(row); setShowEditModal(true); }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-blue-400 transition"
                style={{ background:"rgba(79,142,247,.12)", border:"1px solid rgba(79,142,247,.25)" }}>
                <LuPencil className="text-xs" /> Edit
              </button>
              <button onClick={() => window.confirm("Delete this product?") && dispatch(delete_product(row._id))}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-400 transition"
                style={{ background:"rgba(239,68,68,.12)", border:"1px solid rgba(239,68,68,.25)" }}>
                <LuTrash2 className="text-xs" /> Delete
              </button>
            </div>
          )},
        ]}
      />
      <EditProductModal show={showEditModal} onClose={() => setShowEditModal(false)} product={selectedProduct} />
    </>
  );
}

export default AllProducts;
