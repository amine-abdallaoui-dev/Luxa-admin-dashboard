import React from 'react';
import {Link} from "react-router-dom";
import {FaArrowLeftLong, FaArrowRightLong, FaRegEye} from "react-icons/fa6";
import {useSelector} from "react-redux";
import { MdAirplanemodeInactive } from "react-icons/md";

const DeactiveSellers = () => {
    const path = useSelector(state => state.info.imagesPath);

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
            <div className="w-[95%] mx-5 bg-[#edf5f5] p-5 mt-[30px] h-auto  mb-[20px]">
                <table className="w-full overflow-x-scroll sm:overflow-x-scroll  md:overflow-x-scroll lg:overflow-x-hidden">
                    <tr className="text-[13px] lg:text-sm font-medium border-b border-gray-600">
                        <td className="w-[3%] text-gray-900 py-4">Id</td>
                        <td className="w-[5%] text-gray-900">Image</td>
                        <td className="w-[8%] text-gray-900">Name</td>
                        <td className="w-[12%] lg:w-[8%] text-gray-900">Shop </td>
                        <td className="w-[12%] lg:w-[8%] text-gray-900">Payment status </td>
                        <td className="w-[12%] text-gray-900">Email</td>
                        <td className="w-[8%] text-gray-900">Status</td>
                        <td className="w-[8%] text-gray-900">Country</td>
                        <td className="w-[10%] text-gray-900">Action</td>
                    </tr>
                    {
                        [1,2,3,4,5].map((item, index) => {
                            return (
                                <tr className="text-[13px] lg:text-sm font-[400] w-full hover:bg-white">
                                    <td className="lg:w-[6%] text-gray-900 py-4">{`${index + 1}`}</td>
                                    <td className="lg:w-[8%] text-gray-900">
                                        <img className="w-[50px] h-[50px] my-2" src={`${path}/seller.png`} alt="seller image"/>
                                    </td>
                                    <td className="lg:w-[8%] text-gray-900">Seller</td>
                                    <td className="lg:w-[8%] text-gray-900">Aga shop</td>
                                    <td className="w-[12%] lg:w-[8%] text-gray-900">Inactive</td>
                                    <td className="lg:w-[12%] text-gray-900">amine@gmail.com</td>
                                    <td className="lg:w-[8%] text-gray-900">Active</td>
                                    <td className="lg:w-[8%] text-gray-900">Maroc</td>
                                    <td className="lg:w-[10%] text-gray-900">
                                        <Link className="px-2 py-2 w-[80px]  rounded-md bg-red-600 hover:shadow-red-400 text-white  flex items-center justify-center"><MdAirplanemodeInactive  /><span className="pl-1">Deactive</span></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div className="w-[95%] flex justify-end mr-10 gap-1 items-center mb-3 text-[13px] lg:text-sm">
                <span className="py-3 px-3 rounded-md bg-[#069f96] text-white  font-medium hover:bg-green-400">
                    <FaArrowLeftLong/>
                </span>
                <span className="py-1 px-3 rounded-md bg-[#069f96] text-white font-medium hover:bg-green-400">1</span>
                {
                    [1,2,3,4,5].map((item,index) => {
                        return (
                            <span className="py-1 px-3 rounded-md bg-gray-400 text-white font-medium hover:bg-green-400">{item}</span>
                        )
                    })
                }
                <span className="py-3 px-3 rounded-md bg-[#069f96] text-white font-medium hover:bg-green-400">
                    <FaArrowRightLong/>
                </span>

            </div>
        </div>
    );
};

export default DeactiveSellers;