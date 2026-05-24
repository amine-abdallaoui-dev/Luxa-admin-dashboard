import React from 'react';
import  {Link} from 'react-router-dom';

import Pagination from "./components/Pagination.jsx";

const AdminOrders = () => {
    return (
        <div className="w-full  md:ml-5 bg-white rounded-md md:overflow-hidden overflow-auto h-auto">
            <div className="items-center flex md:px-[25px] w-full h-[80px]">
                <form className=" hidden md:flex  justify-between w-full">
                    <select className=" md:px-3 py-2 bg-[#edf5f5] outline-none border-[#edf5f5] ">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                    </select>
                    <input className="md:w-[15%] md:px-3 md:py-2 bg-[#edf5f5] outline-none border-[#edf5f5]"  type="text" placeholder="Search ..."/>
                </form>
            </div>
            <div className="w-full mx-5 bg-[#edf5f5] p-5 mt-[30px] h-auto md:overflow-hidden overflow-auto mb-[20px]">
                <table className="w-full overflow-x-scroll sm:overflow-x-scroll  md:overflow-x-scroll lg:overflow-x-hidden">
                    <tr className="text-[13px] lg:text-sm font-medium border-b border-gray-600">
                        <td className="w-[20%] text-gray-900 py-4">Order Id</td>
                        <td className="w-[20%] text-gray-900">Price</td>
                        <td className="w-[20%] text-gray-900">Payment Status</td>
                        <td className="w-[20%] text-gray-900">Status</td>
                        <td className="w-[20%] text-gray-900">Action</td>
                    </tr>
                    {
                        [1,2,3,4,5].map((item, index) => {
                            return (
                                <tr className="text-[13px] lg:text-sm font-[400] w-full hover:bg-white">
                                    <td className="w-[20%] text-gray-900 py-4">#757656</td>
                                    <td className="w-[20%] text-gray-900">$140</td>
                                    <td className="w-[20%] text-gray-900">Pending</td>
                                    <td className="w-[20%] text-gray-900">Pending</td>
                                    <td className="w-[20%] text-gray-900"><Link to="">View order</Link></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <Paginition/>
        </div>
    );
};

export default AdminOrders;