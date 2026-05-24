import React from "react";
import AdminListingTable from "../ui/components/AdminListingTable";
import { get_customers } from "../store/Reducers/listingReducer";
import { LuUsers } from "react-icons/lu";

function Customers() {
  return (
    <AdminListingTable
      pageTitle="Customers"
      pageIcon={LuUsers}
      dataKey="customers"
      fetchThunk={get_customers}
      columns={[
        { header:"Name",   render: row => <span className="text-white font-medium text-sm">{row.name||'—'}</span> },
        { header:"Email",  render: row => <span className="text-gray-400 text-sm">{row.email||'—'}</span> },
        { header:"Phone",  render: row => <span className="text-gray-300 text-sm">{row.phone||'—'}</span> },
        { header:"Orders", render: row => <span className="text-blue-400 font-semibold text-sm">{row.ordersCount||0}</span> },
        { header:"Status", render: row => {
          const active = row.status === 'active';
          return (
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize"
              style={{ background:active?"rgba(34,197,94,.12)":"rgba(239,68,68,.12)", color:active?"#22c55e":"#ef4444", border:`1px solid ${active?"rgba(34,197,94,.25)":"rgba(239,68,68,.25)"}` }}>
              {row.status||'active'}
            </span>
          );
        }},
      ]}
    />
  );
}

export default Customers;
