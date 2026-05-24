import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";

const card = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "16px",
};

const AdminListingTable = ({
  pageTitle,
  columns,
  fetchThunk,
  dataKey,
  stateKey = "listing",
  fetchParams = {},
  actionButton,
  pageIcon: PageIcon,
}) => {
  const { userInfo } = useSelector(s => s.auth);
  const tableState = useSelector(s => s[stateKey]);
  const rows = tableState[dataKey] || [];
  const { totalItems, loader } = tableState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(10);
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  useEffect(() => { if (userInfo === "") navigate("/"); }, [userInfo, navigate]);
  useEffect(() => {
    dispatch(fetchThunk({ page: currentPage, perPage, search: searchValue, ...fetchParams }));
  }, [dispatch, fetchThunk, currentPage, perPage, searchValue, JSON.stringify(fetchParams)]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {PageIcon && (
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background:"linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
              <PageIcon className="text-white text-base" />
            </div>
          )}
          <div>
            <h1 className="text-white text-xl font-bold">{pageTitle}</h1>
          </div>
        </div>
        {actionButton && <div>{actionButton}</div>}
      </div>

      <div style={card}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5"
          style={{ borderBottom:"1px solid rgba(255,255,255,.06)" }}>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Show</span>
            <select
              value={perPage}
              onChange={e => { setPerPage(+e.target.value); setCurrentPage(1); }}
              className="text-sm px-2 py-1.5 rounded-lg outline-none"
              style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)", color:"#d1d5db" }}
            >
              {[5,10,25,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span className="text-gray-400 text-sm">entries</span>
          </div>
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              value={searchValue}
              onChange={e => { setSearchValue(e.target.value); setCurrentPage(1); }}
              placeholder={`Search ${pageTitle.toLowerCase()}...`}
              className="pl-9 pr-4 py-2 text-sm rounded-lg outline-none w-52"
              style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)", color:"#d1d5db" }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background:"rgba(79,142,247,.06)", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                {columns.map(col => (
                  <th key={col.header} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3.5">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr><td colSpan={columns.length} className="text-center py-14">
                  <PulseLoader color="#4f8ef7" size={8} />
                </td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={columns.length} className="text-center py-14 text-gray-500">
                  No records found
                </td></tr>
              ) : rows.map((row, idx) => (
                <tr key={row._id || idx}
                  style={{ borderBottom:"1px solid rgba(255,255,255,.04)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(79,142,247,.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {columns.map(col => (
                    <td key={col.header} className="px-5 py-4">
                      {col.render
                        ? col.render(row)
                        : <span className="text-gray-300 text-sm">{col.key ? row[col.key] : ''}</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderTop:"1px solid rgba(255,255,255,.06)" }}>
          <span className="text-gray-500 text-sm">
            {totalItems > 0 ? `${(currentPage-1)*perPage+1}–${Math.min(currentPage*perPage, totalItems)} of ${totalItems}` : 'No results'}
          </span>
          <div className="flex gap-2">
            <button disabled={currentPage===1} onClick={() => setCurrentPage(p=>p-1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:currentPage===1?"#4b5563":"#4f8ef7", cursor:currentPage===1?"not-allowed":"pointer" }}>
              <LuChevronLeft />
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const p = i + 1;
              return (
                <button key={p} onClick={() => setCurrentPage(p)}
                  className="w-8 h-8 rounded-lg text-sm font-medium"
                  style={{ background:currentPage===p?"linear-gradient(135deg,#4f8ef7,#7c3aed)":"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:currentPage===p?"#fff":"#9ca3af" }}>
                  {p}
                </button>
              );
            })}
            <button disabled={currentPage>=totalPages} onClick={() => setCurrentPage(p=>p+1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:currentPage>=totalPages?"#4b5563":"#4f8ef7", cursor:currentPage>=totalPages?"not-allowed":"pointer" }}>
              <LuChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListingTable;
