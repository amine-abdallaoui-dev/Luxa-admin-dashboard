import React from "react";
import AdminListingTable from "../ui/components/AdminListingTable";
import { get_reviews } from "../store/Reducers/listingReducer";
import { LuStar } from "react-icons/lu";

const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(s => (
      <LuStar key={s} className="text-xs" style={{ color: s <= rating ? "#f59e0b" : "#374151", fill: s <= rating ? "#f59e0b" : "none" }} />
    ))}
    <span className="text-gray-400 text-xs ml-1">({rating})</span>
  </div>
);

const sColors = { approved:{bg:"rgba(34,197,94,.12)",text:"#22c55e",border:"rgba(34,197,94,.25)"}, pending:{bg:"rgba(234,179,8,.12)",text:"#eab308",border:"rgba(234,179,8,.25)"}, rejected:{bg:"rgba(239,68,68,.12)",text:"#ef4444",border:"rgba(239,68,68,.25)"} };

function Reviews() {
  return (
    <AdminListingTable
      pageTitle="Reviews"
      pageIcon={LuStar}
      dataKey="reviews"
      fetchThunk={get_reviews}
      columns={[
        { header:"Customer", render: row => <span className="text-white text-sm font-medium">{row.customerName||'—'}</span> },
        { header:"Product", render: row => <span className="text-gray-300 text-sm">{row.productTitle||'—'}</span> },
        { header:"Rating", render: row => <Stars rating={row.rating||0} /> },
        { header:"Comment", render: row => <span className="text-gray-400 text-sm truncate max-w-[200px] block">{row.comment||'—'}</span> },
        { header:"Status", render: row => {
          const c = sColors[row.status] || sColors.pending;
          return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize" style={{ background:c.bg, color:c.text, border:`1px solid ${c.border}` }}>{row.status||'pending'}</span>;
        }},
      ]}
    />
  );
}

export default Reviews;
