import React, {useEffect, useMemo, useState} from "react";

import {LuChevronLeft, LuChevronRight, LuSearch, LuTag, LuTrash2, LuX} from "react-icons/lu";
import {IoImagesSharp} from "react-icons/io5";
import {PulseLoader} from "react-spinners";
import {useDispatch, useSelector} from "react-redux";
import {FaPlusSquare} from "react-icons/fa";
import { clearMessage} from "../store/Reducers/categoryReducer.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {add_brand, get_all_brands, get_brands} from "../store/Reducers/listingReducer.js";


const card = { background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "16px" };

const inputStyle = { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "12px", color: "#f3f4f6", outline: "none", width: "100%", padding: "10px 14px", fontSize: "14px" };

function Brands() {
    const { userInfo } = useSelector(s => s.auth);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [image, setImage] = useState("");
    const [imageState, setImageState] = useState("");
    const [brand, setBrand] = useState({ name: "", image: "" });
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 8;
    const dispatch = useDispatch();

    useEffect(() => { if (userInfo === "") navigate("/"); }, [userInfo, navigate])
    useEffect(()=>{
        dispatch(get_all_brands())
    },[])
    const { loader, errorMessage, successMessage, brands } = useSelector(s => s.listing)
    useEffect(() => {

        if (errorMessage) { toast.error(errorMessage); dispatch(clearMessage()); }
        if (successMessage) {
            toast.success(successMessage); dispatch(clearMessage());
            setBrand({ name: "", image: "" }); setImage(""); setShow(false);
            dispatch(get_all_brands())
        }
    }, [errorMessage, successMessage, dispatch]);

    const filtered = useMemo(() =>
            (brands || []).filter(c => c.name?.toLowerCase().includes(search.toLowerCase()))
        , [search, brands]);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const handleImage = (e) => {
        const f = e.target.files[0];
        if (f) { setImage(URL.createObjectURL(f)); }
        setImageState(e.target.files[0])
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!brand.name ) { toast.error("Name and image are required"); return; }
        const formData = new FormData()
        formData.append("name",brand.name);
        formData.append("image",imageState);
        dispatch(add_brand(formData));
        console.log(imageState)
    };
    const handleDelete = (id) => {
        if (window.confirm("Delete this category?")) dispatch(deleteCategory({ id }));
    };



    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
                        <LuTag className="text-white text-base" />
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold">Brands</h1>
                        <p className="text-gray-500 text-xs">Manage product brands</p>
                    </div>
                </div>
                <button onClick={() => setShow(!show)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all"
                        style={{ background: "linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
                    {show ? <><LuX /> Close</> : <><FaPlusSquare /> Add Brand</>}
                </button>
            </div>

            <div className="flex gap-5">
                {/* Table */}
                <div className={`transition-all duration-300 ${show ? 'w-full lg:w-2/3' : 'w-full'}`} style={card}>
                    {/* Search toolbar */}
                    <div className="flex items-center justify-between gap-3 p-5" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                        <span className="text-gray-400 text-sm">{filtered.length} categor{filtered.length === 1 ? 'y' : 'ies'}</span>
                        <div className="relative">
                            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                                   placeholder="Search categories..." className="pl-9 pr-4 py-2 text-sm rounded-lg outline-none w-52"
                                   style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: "#d1d5db" }} />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr style={{ background: "rgba(79,142,247,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                                {['#', 'Image', 'Name', 'Actions'].map(h => (
                                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3.5">{h}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-12 text-gray-500">No brand found</td></tr>
                            ) : paginated.map((brand, idx) => (
                                <tr key={brand._id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(79,142,247,.04)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                    <td className="px-5 py-4 text-gray-500 text-sm">{(page - 1) * perPage + idx + 1}</td>
                                    <td className="px-5 py-4">
                                        <img src={brand.image} alt={brand.name} className="w-12 h-12 rounded-xl object-cover"
                                             style={{ border: "1px solid rgba(255,255,255,.08)" }} />
                                    </td>
                                    <td className="px-5 py-4"><span className="text-white font-medium text-sm">{brand.name}</span></td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => handleDelete(brand._id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 transition-all"
                                                style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)" }}>
                                            <LuTrash2 /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
                        <span className="text-gray-500 text-sm">{filtered.length} total</span>
                        <div className="flex gap-2">
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: page === 1 ? "#4b5563" : "#4f8ef7" }}><LuChevronLeft /></button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button key={i} onClick={() => setPage(i + 1)} className="w-8 h-8 rounded-lg text-sm font-medium"
                                        style={{ background: page === i + 1 ? "linear-gradient(135deg,#4f8ef7,#7c3aed)" : "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: page === i + 1 ? "#fff" : "#9ca3af" }}>{i + 1}</button>
                            ))}
                            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: page >= totalPages ? "#4b5563" : "#4f8ef7" }}><LuChevronRight /></button>
                        </div>
                    </div>
                </div>

                {/* Add Panel */}
                {show && (
                    <div className="hidden lg:block w-1/3 rounded-2xl p-5 flex-shrink-0" style={card}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-white font-semibold">Add Brand</h3>
                            <button onClick={() => setShow(false)} className="text-gray-500 hover:text-red-400 transition"><LuX /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Category Name</label>
                                <input value={brand.name} onChange={e => setBrand(p => ({ ...p, name: e.target.value }))}
                                       placeholder="e.g. Electronics" style={inputStyle}
                                       onFocus={e => e.target.style.borderColor = "rgba(79,142,247,.5)"}
                                       onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"} />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Category Image</label>
                                <label htmlFor="catFile" className="flex flex-col items-center justify-center w-full aspect-square rounded-xl cursor-pointer transition-all overflow-hidden"
                                       style={{ border: "2px dashed rgba(79,142,247,.3)", background: "rgba(79,142,247,.04)" }}
                                       onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(79,142,247,.6)"; e.currentTarget.style.background = "rgba(79,142,247,.08)"; }}
                                       onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(79,142,247,.3)"; e.currentTarget.style.background = "rgba(79,142,247,.04)"; }}>
                                    {image
                                        ? <img src={image} alt="preview" className="w-full h-full object-cover" />
                                        : <><IoImagesSharp className="text-3xl text-blue-400 mb-2" /><span className="text-blue-400 text-sm font-medium">Click to upload</span></>
                                    }
                                </label>
                                <input onChange={handleImage} type="file" className="hidden" id="catFile" accept="image/*" />
                            </div>
                            <button type="submit" disabled={loader}
                                    className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                                    style={{ background: loader ? "rgba(79,142,247,.4)" : "linear-gradient(135deg,#4f8ef7,#7c3aed)", cursor: loader ? "not-allowed" : "pointer" }}>
                                {loader ? <PulseLoader size={6} color="#fff" /> : "Save Category"}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Mobile: Full-screen panel */}
            {show && (
                <div className="lg:hidden fixed inset-0 z-50 flex items-end" onClick={() => setShow(false)}>
                    <div className="w-full rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto" style={{ background: "#0d1b2a", border: "1px solid rgba(255,255,255,.1)" }} onClick={e => e.stopPropagation()}>
                        <h3 className="text-white font-semibold mb-4">Add Category</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input value={brand.name} onChange={e => setBrand(p => ({ ...p, name: e.target.value }))} placeholder="Category Name" style={inputStyle} />
                            <label htmlFor="catFileMob" className="flex flex-col items-center justify-center w-full h-32 rounded-xl cursor-pointer"
                                   style={{ border: "2px dashed rgba(79,142,247,.3)", background: "rgba(79,142,247,.04)" }}>
                                {image ? <img src={image} alt="" className="h-full object-contain" /> : <><IoImagesSharp className="text-2xl text-blue-400" /><span className="text-blue-400 text-sm mt-1">Upload Image</span></>}
                            </label>
                            <input onChange={handleImage} type="file" className="hidden" id="catFileMob" accept="image/*" />
                            <button type="submit" disabled={loader} className="w-full py-3 rounded-xl text-white font-semibold"
                                    style={{ background: "linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
                                {loader ? <PulseLoader size={6} color="#fff" /> : "Save Category"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>

  );
}

export default Brands;
