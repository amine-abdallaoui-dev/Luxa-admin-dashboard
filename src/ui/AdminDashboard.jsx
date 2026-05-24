import React from 'react';
import Statistic from "./components/Statistic.jsx";
import Chart from 'react-apexcharts'
import LatestChatBox from "./components/LatestChatBox.jsx";
import {Link} from "react-router-dom";
import { CiSliderHorizontal } from "react-icons/ci";

const AdminDashboard = () => {
    const state = {
        series : [
            {
                name : "Orders",
                data : [23,34,45,56,76,34,23,76,87,78,34,45]
            },
            {
                name : "Revenue",
                data : [67,39,45,56,90,56,23,56,87,78,67,78]
            },
            {
                name : "Sellers",
                data : [34,39,56,56,80,67,23,56,98,78,45,56]
            },
        ],
        options : {
            color : ['#181ee8','#181ee8'],
            plotOptions: {
                radius : 30
            },
            chart : {
                background : 'transparent',
                foreColor : '#d0d2d6'
            },
            dataLabels : {
                enabled : false
            },
            strock : {
                show : true,
                curve : ['smooth','straight','stepline'],
                lineCap : 'butt',
                colors : '#f0f0f0',
                width  : .5,
                dashArray : 0
            },
            xaxis : {
                categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            legend : {
                position : 'top'
            },
            responsive : [
                {
                    breakpoint : 565,
                    yaxis : {
                        categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                    },
                    options : {
                        plotOptions: {
                            bar : {
                                horizontal : true
                            }
                        },
                        chart : {
                            height : "550px"
                        }
                    }
                }
            ]
        }
    }

    return (
        <>
            <div className="w-full flex-wrap flex justify-center mt-[120px] md:mt-[10px]  items-center gap-2">
                <Statistic/>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className='rounded-2xl w-full md:w-[50%] h-[490px] mb-[50px] bg-white rounded-lg py-[30px] mt-[50px]'>
                    <Chart options={state.options} series={state.series} type='bar' height={350} />
                </div>
                <div className="w-full md:w-[50%] h-[490px] bg-white rounded-lg py-[30px] mt-[50px]">
                    <div className="flex justify-between ">
                        <h4 className="text-gray-900 font-[400] px-5">Latest Chat </h4>
                        <Link className="text-gray-900 px-5" to="">View All</Link>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        {
                            [1,2,3,4].map( item => {
                                return <LatestChatBox/>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="w-full bg-white py-5 h-[500px]">
                <div className="flex justify-between w-full px-8">
                    <h4 className="text-gray-900 font-medium">Recent Orders</h4>
                    <Link to=""><h5 className="text-gray-900 font-medium">View All</h5></Link>
                </div>
                <div className="w-full pt-8  h-[600px] mr-5  ">
                    <div className="w-full mx-5 bg-[#edf5f5] p-5 h-auto md:overflow-hidden overflow-auto mb-[20px]">
                        <table className="w-full overflow-x-scroll sm:overflow-x-scroll  md:overflow-x-scroll lg:overflow-x-hidden">
                            <tr className="text-[13px] lg:text-sm font-medium border-b border-gray-600">
                                <td className="w-[20%] text-gray-900 py-4">Order Id</td>
                                <td className="w-[20%] text-gray-900">Price</td>
                                <td className="w-[20%] text-gray-900">Payment Status</td>
                                <td className="w-[20%] text-gray-900">Order Status</td>
                                <td className="w-[20%] text-gray-900">Active</td>
                            </tr>
                            {
                                [1,2,3,4,5].map((item, index) => {
                                    return (
                                        <tr className="text-[13px] lg:text-sm font-[400] w-full hover:bg-white">
                                            <td className="w-[20%] text-gray-900 py-4">#757656</td>
                                            <td className="w-[20%] text-gray-900">$140</td>
                                            <td className="w-[20%] text-gray-900">Pending</td>
                                            <td className="w-[20%] text-gray-900">Pending</td>
                                            <td className="w-[20%] text-green-500"><Link to="">View order</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>
                <div className='w-full flex justify-between items-center h-[70px]'>
            
        </div>
        <div className='flex items-center'>
                <select className='w-[60px] bg-white text-gray-500 text-sm border border-gray-300 rounded-md px-2 py-2 focus:bg-gray-100 focus:border-gray-300 focus:outline-none '>
                    <option  value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                </select>
            </div>
            <div className='flex items-center w-[250px]'>
                <input  type="text" placeholder='Search...' className='w-full bg-white text-gray-500 text-sm border border-gray-300 rounded-md px-2 py-2 focus:bg-gray-100 focus:border-gray-300 focus:outline-none ' />
            </div>
        <div className='min-w-screen overflow-x-auto'>
            <table  className='min-w-screen  w-full  overflow-auto'>
                <thead className='min-w-screen w-full'>
                    <tr  className={`w-full grid grid-col-5 bg-[#161a1d] text-white  items-center  border-b border-[#161a1d]`}>
                        <td className='w-full flex items-center justify-start gap-1 text-white font-medium'>
                            <span><CiSliderHorizontal/></span>
                            <span>#Id</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
           <div className='mt-3'>
             <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} perPage={5} totalItems={10} showItem={Math.ceil(10 - 5)} />
           </div>
        </div>
            </div>
        </>
    );
};

export default AdminDashboard;