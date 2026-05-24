import React from "react";

const SearchDataTable = ({
  perPage,
  setPerPage,
  searchValue,
  setSearchValue,
  perPageOptions = [5, 10, 25],
}) => {
  return (
    <div className="items-center flex w-full h-[80px]">
      <div className="hidden md:flex justify-between w-full">
        <div className="flex items-center justify-between w-full px-5 my-5">
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="w-[60px] bg-white text-gray-500 text-sm border border-gray-300 rounded-md px-2 py-2 focus:bg-gray-100 focus:border-gray-300 focus:outline-none"
          >
            {perPageOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <div className="flex items-center w-[250px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-white text-gray-500 text-sm border border-gray-300 rounded-md px-2 py-2 focus:bg-gray-100 focus:border-gray-300 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDataTable;
