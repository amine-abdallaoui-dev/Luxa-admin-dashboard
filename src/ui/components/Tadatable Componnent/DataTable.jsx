import React, { useEffect, useMemo, useState } from "react";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";


// npm install lucide-react


const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  // Sort
  const sortedData = useMemo(() => {
    const data = [...filteredData];

    data.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    return data;
  }, [filteredData, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Sort Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Users DataTable
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Modern React DataTable with Search, Sort & Pagination
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[320px]">
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-black transition"
            />

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { label: "Name", field: "name" },
                  { label: "Image", field: "image" },
                  { label: "Actions", field: "actions" },
                ].map((item) => (
                  <th
                    key={item.field}
                    onClick={() => handleSort(item.field)}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      {item.label}

                      {sortField === item.field ? (
                        sortOrder === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {cat.name}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cat.image}
                          alt=""
                          className="w-11 h-11 rounded-full object-cover"
                        />

                        <div>
                          <button className="font-semibold text-green-600">
                            <MdDeleteForever className="text-white"/>
                          </button>

                          <button className="text-sm text-gray-500">
                            
                          </button>
                        </div>
                      </div>
                    </td>

              
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-t">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold">
              {currentData.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {sortedData.length}
            </span>{" "}
            users
          </p>

          {/* Pagination */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="px-4 py-2 rounded-xl border disabled:opacity-40 hover:bg-gray-100 transition"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-xl transition ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="px-4 py-2 rounded-xl border disabled:opacity-40 hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;