import { useEffect, useState } from 'react';
import { IoImagesOutline } from "react-icons/io5";
import { LuX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from "react-spinners";
import toast from 'react-hot-toast';
import { add_product, clearMessage } from '../store/Reducers/productReducer';
import { getCategory } from '../store/Reducers/categoryReducer';
import { get_admin } from '../store/Reducers/authReducer';
import { FaPlusSquare } from "react-icons/fa";

const card = { background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:"16px" };
const field = { background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"12px", color:"#f3f4f6", padding:"11px 14px", outline:"none", width:"100%", fontSize:"14px", transition:"border-color .2s" };

const AddProduct = () => {
  const { loader, errorMessage, successMessage } = useSelector(s => s.product);
  const { userInfo } = useSelector(s => s.auth);
  const { categories } = useSelector(s => s.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blank = { title:"", brands:"", category:"", price:"", description:"", discount:"", stock:"", sellerId:"" };
  const [product, setProduct] = useState(blank);
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState([]);

  useEffect(() => { if (userInfo === "") navigate("/"); }, [userInfo]);
  useEffect(() => { dispatch(getCategory()); dispatch(get_admin()); }, []);
  useEffect(() => {
    if (errorMessage) { toast.error(errorMessage); dispatch(clearMessage()); }
    if (successMessage) { toast.success(successMessage); dispatch(clearMessage()); setProduct(blank); setImages([]); setShowImages([]); }
  }, [errorMessage, successMessage, dispatch]);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    files.map((file)=>{
      setImages([...images,file])
    })
    setImages(prev => [...prev, ...files]);
    setShowImages(prev => [...prev, ...files.map(f => ({ url: URL.createObjectURL(f) }))]);
  };
  const removeImage = (i) => { setShowImages(p => p.filter((_,x) => x!==i)); setImages(p => p.filter((_,x) => x!==i)); };
  const set = (k) => (e) => setProduct(p => ({ ...p, [k]: e.target.value }));
  const focus = (e) => { e.target.style.borderColor = "rgba(79,142,247,.5)"; };
  const blur  = (e) => { e.target.style.borderColor = "rgba(255,255,255,.1)"; };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("brands", product.brands);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("discount", product.discount);
    formData.append("stock", product.stock);
    formData.append("sellerId", userInfo?._id);
    if (images?.length > 0) {
      images.map((image)=>{
        formData.append("images", image);
      })
    }
    if (!product.title||!product.category||!product.price||!product.stock || !product.brands) {
      toast.error("Title, Category, Price and Stock and brand are required"); return;
    }
    dispatch(add_product(formData));
    console.log(formData)

  };

  console.log(images)
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#4f8ef7,#7c3aed)" }}>
          <FaPlusSquare className="text-white text-base" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">Add New Product</h1>
          <p className="text-gray-500 text-xs">Fill in the details below to list a new product</p>
        </div>
      </div>

      <div style={card}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Product Title <span className="text-red-400">*</span></label>
              <input value={product.title} onChange={set('title')} onFocus={focus} onBlur={blur} style={field} type="text" placeholder="e.g. Nike Air Max 2024" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Brand</label>
              <input value={product.brands} onChange={set('brands')} onFocus={focus} onBlur={blur} style={field} type="text" placeholder="e.g. Nike" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Category <span className="text-red-400">*</span></label>
              <select value={product.category} onChange={set('category')} onFocus={focus} onBlur={blur} style={field}>
                <option value="">Select category...</option>
                {categories.map((c,i) => <option key={i} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Stock Quantity <span className="text-red-400">*</span></label>
              <input value={product.stock} onChange={set('stock')} onFocus={focus} onBlur={blur} style={field} type="number" placeholder="0" min="0" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Price ($) <span className="text-red-400">*</span></label>
              <input value={product.price} onChange={set('price')} onFocus={focus} onBlur={blur} style={field} type="number" placeholder="0.00" min="0" step="0.01" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Discount (%)</label>
              <input value={product.discount} onChange={set('discount')} onFocus={focus} onBlur={blur} style={field} type="number" placeholder="0" min="0" max="100" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Description</label>
            <textarea value={product.description} onChange={set('description')} onFocus={focus} onBlur={blur}
              style={{ ...field, resize:"none" }} rows={4} placeholder="Detailed product description..." />
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">Product Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {showImages.map((img, i) => (
                <div key={i} className="group aspect-square relative rounded-xl overflow-hidden"
                  style={{ border:"1px solid rgba(255,255,255,.08)" }}>
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    style={{ background:"rgba(0,0,0,0.5)" }}>
                    <button type="button" onClick={() => removeImage(i)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                      style={{ background:"rgba(239,68,68,.8)" }}>
                      <LuX className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
              <label htmlFor="adminImages" className="aspect-square flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all"
                style={{ border:"2px dashed rgba(79,142,247,.3)", background:"rgba(79,142,247,.04)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(79,142,247,.6)"; e.currentTarget.style.background="rgba(79,142,247,.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(79,142,247,.3)"; e.currentTarget.style.background="rgba(79,142,247,.04)"; }}>
                <IoImagesOutline className="text-2xl text-blue-400 mb-1" />
                <span className="text-blue-400 text-xs font-medium">Upload</span>
              </label>
              <input onChange={handleImages} className="hidden" type="file" multiple id="adminImages" accept="image/*" />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end" style={{ borderTop:"1px solid rgba(255,255,255,.06)" }}>
            <button type="submit" disabled={loader}
              className="px-8 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center min-w-[180px]"
              style={{ background:loader?"rgba(79,142,247,.4)":"linear-gradient(135deg,#4f8ef7,#7c3aed)", cursor:loader?"not-allowed":"pointer" }}>
              {loader ? <PulseLoader size={8} color="#fff" /> : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;