import React from "react";
import AdminListingTable from "../ui/components/AdminListingTable";
import { get_transactions } from "../store/Reducers/listingReducer";
import { LuDollarSign } from "react-icons/lu";

const sColors = { completed:{bg:"rgba(34,197,94,.12)",text:"#22c55e",border:"rgba(34,197,94,.25)"}, success:{bg:"rgba(34,197,94,.12)",text:"#22c55e",border:"rgba(34,197,94,.25)"}, pending:{bg:"rgba(234,179,8,.12)",text:"#eab308",border:"rgba(234,179,8,.25)"}, failed:{bg:"rgba(239,68,68,.12)",text:"#ef4444",border:"rgba(239,68,68,.25)"} };

function Transactions() {
  return (
    <AdminListingTable
      pageTitle="Transactions"
      pageIcon={LuDollarSign}
      dataKey="transactions"
      fetchThunk={get_transactions}
      columns={[
        { header:"Transaction ID", render: row => <span className="text-gray-400 font-mono text-xs">{row.transactionId||'—'}</span> },
        { header:"Order ID",       render: row => <span className="text-blue-400 font-mono text-xs">{row.orderId||'—'}</span> },
        { header:"Customer",       render: row => <span className="text-white text-sm">{row.customerName||'—'}</span> },
        { header:"Amount",         render: row => <span className="text-white font-bold text-sm">${row.amount||0}</span> },
        { header:"Method",         render: row => <span className="text-gray-300 text-sm capitalize">{row.method||'—'}</span> },
        { header:"Status",         render: row => {
          const c = sColors[row.status?.toLowerCase()] || sColors.pending;
          return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize" style={{ background:c.bg, color:c.text, border:`1px solid ${c.border}` }}>{row.status||'—'}</span>;
        }},
      ]}
    />
  );
}

export default Transactions;
