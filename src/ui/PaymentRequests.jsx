import React from 'react';
import {Link} from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";

const Paymentrequests = () => {
    return (
        <div className="w-full  md:ml-5 bg-white rounded-md md:overflow-hidden overflow-auto h-auto">
            <div className="w-[95%] mx-5 bg-[#edf5f5] p-5 mt-[30px] h-auto  mb-[20px]">
                <table className="w-full overflow-x-scroll sm:overflow-x-scroll overflow-y-scroll  md:overflow-x-scroll lg:overflow-x-hidden">
                    <tr className="text-[13px] lg:text-sm font-medium border-b border-gray-600">
                        <td className="w-[3%] text-gray-900 py-4">Number</td>
                        <td className="w-[5%] text-gray-900">Amount</td>
                        <td className="w-[8%] text-gray-900">Status</td>
                        <td className="w-[12%] lg:w-[8%] text-gray-900">Date </td>
                        <td className="w-[10%] text-gray-900">Action</td>
                    </tr>
                    {
                        [1,2,3,4,5,6,7,8,9,10].map((item, index) => {
                            return (
                                <tr className="text-[13px] lg:text-sm font-[400] w-full hover:bg-white">
                                    <td className="lg:w-[6%] text-gray-900 py-4">{`${index + 1}`}</td>
                                    <td className="lg:w-[8%] text-gray-900">
                                        $120
                                    </td>
                                    <td className="lg:w-[8%] text-gray-900">Pending</td>
                                    <td className="lg:w-[8%] text-gray-900">{new Date().toDateString("D-M-Y")}</td>
                                    <td className="lg:w-[10%] text-gray-900">
                                        <Link className="px-2 py-2 w-[80px] rounded-md bg-green-600 hover:shadow-green-300-400 text-white  flex items-center justify-center">
                                            <span><GiConfirmed  /></span>
                                            <span className="pl-1 text-white font-medium">Confirm</span>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    );
};

export default Paymentrequests;