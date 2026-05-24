import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {FaUserEdit} from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import SearchDataTable from "../seller/components/SearchDataTable.jsx";
import {getAllSellers} from "../../store/reducers/SellersReducer.js";
import Pagination from "./components/Pagination.jsx";


const Sellers = () => {
    const path = useSelector(state => state.info.imagesPath);
    const {sellersInfo,sellersCount} = useSelector(state=>state.sellers)
    const [page, setPage] = useState(1);
    const [parPage, setParPage] = useState(5);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSellers({page,parPage,searchValue}))
    },[dispatch,page,parPage,searchValue])

    return (
        <div className="w-full  md:ml-5 bg-white rounded-md md:overflow-hidden overflow-auto h-auto">
            <div className="items-center flex md:px-[25px] w-full h-[80px]">
                <SearchDataTable setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className="w-[95%] mx-5 bg-[#edf5f5] p-5 mt-[30px] h-auto  mb-[20px]">
                <table className="w-full overflow-x-scroll sm:overflow-x-scroll  md:overflow-x-scroll lg:overflow-x-hidden">
                    <tr className="text-[13px] lg:text-sm font-medium border-b border-gray-600">
                        <td className="w-[3%] text-gray-900 py-4">Id</td>
                        <td className="w-[5%] text-gray-900">Image</td>
                        <td className="w-[8%] text-gray-900">Name</td>
                        <td className="w-[12%] lg:w-[8%] text-gray-900">Shop </td>
                        <td className="w-[12%] text-gray-900">Email</td>
                        <td className="w-[8%] text-gray-900">Status</td>
                        <td className="w-[8%] text-gray-900">Country</td>
                        <td className="w-[10%] text-gray-900">Action</td>
                    </tr>
                    {
                        sellersInfo.map((seller, index) => {
                            return (
                                <tr className="text-[13px] lg:text-sm font-[400] w-full hover:bg-white">
                                    <td className="lg:w-[6%] text-gray-900 py-4">{`${index + 1}`}</td>
                                    <td className="lg:w-[8%] text-gray-900">
                                        <img className="w-[50px] h-[50px] my-2" src={`${path}/seller.png`} alt="seller image"/>
                                    </td>
                                    <td className="lg:w-[8%] text-gray-900">{seller.name}</td>
                                    <td className="lg:w-[8%] text-gray-900">{seller.shopInfo.shopName}</td>
                                    <td className="lg:w-[12%] text-gray-900">{seller.email}</td>
                                    <td className="lg:w-[8%] text-gray-900">{seller.status}</td>
                                    <td className="lg:w-[8%] text-gray-900">{seller.shopInfo.division}</td>
                                    <td className="lg:w-[10%] text-gray-900">
                                        <Link className="px-2 py-2 w-[35px] h-[35px] rounded-md bg-blue-600 hover:shadow-blue-400 text-white  flex items-center justify-center"><FaRegEye  /></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div className="w-[95%] flex justify-end mr-10 gap-1 items-center mb-3 text-[13px] lg:text-sm">
               <Pagination pageNumber={page} setPageNumber={setPage}  perPage={parPage} totalItems={sellersCount} showItem={Math.ceil(sellersCount / parPage)}/>
            </div>
        </div>
    );
};

export default Sellers;