import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Admin_login, clearMessage, get_admin } from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LuMail, LuLock, LuLayoutDashboard } from "react-icons/lu";

export default function AdminLogin() {
  const { loader, successMessage, errorMessage } = useSelector(s => s.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({ email:"", password:"" });

  const handleSubmit = (e) => { e.preventDefault(); dispatch(Admin_login(state)); };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage); dispatch(clearMessage());
      dispatch(get_admin()); navigate("/admin/dashboard");
    }
    if (errorMessage) { toast.error(errorMessage); dispatch(clearMessage()); }
  }, [successMessage, errorMessage]);

  const inputStyle = { background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"12px", color:"#f3f4f6", padding:"12px 14px 12px 42px", outline:"none", width:"100%", fontSize:"14px", transition:"border-color .2s" };
  const focus = (e) => { e.target.style.borderColor = "rgba(79,142,247,.5)"; e.target.style.background = "rgba(79,142,247,.08)"; };
  const blur  = (e) => { e.target.style.borderColor = "rgba(255,255,255,.1)"; e.target.style.background = "rgba(255,255,255,.06)"; };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden" style={{ background:"#0f1117" }}>
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background:"radial-gradient(circle,#4f8ef7,transparent)" }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background:"radial-gradient(circle,#7c3aed,transparent)" }} />

      <div className="w-full max-w-[420px] mx-4 relative z-10">
        {/* Card */}
        <div className="rounded-2xl p-8" style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.09)", backdropFilter:"blur(20px)", boxShadow:"0 25px 60px rgba(0,0,0,0.5)" }}>
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background:"linear-gradient(135deg,#4f8ef7,#7c3aed)", boxShadow:"0 8px 32px rgba(79,142,247,0.35)" }}>
              <LuLayoutDashboard className="text-white text-2xl" />
            </div>
            <h1 className="text-white text-2xl font-bold">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Email Address</label>
              <div className="relative">
                <LuMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="email" id="email" placeholder="admin@example.com"
                  value={state.email} onChange={e => setState(p => ({ ...p, email:e.target.value }))}
                  style={inputStyle} onFocus={focus} onBlur={blur} required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Password</label>
              <div className="relative">
                <LuLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="password" id="password" placeholder="••••••••"
                  value={state.password} onChange={e => setState(p => ({ ...p, password:e.target.value }))}
                  style={inputStyle} onFocus={focus} onBlur={blur} required
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loader}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center mt-2"
              style={{ background:loader?"rgba(79,142,247,.4)":"linear-gradient(135deg,#4f8ef7,#7c3aed)", cursor:loader?"not-allowed":"pointer", boxShadow:loader?"none":"0 8px 24px rgba(79,142,247,0.3)", marginTop:"24px" }}>
              {loader ? <PulseLoader size={8} color="#fff" /> : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-5">
          Admin access only • All activity is monitored
        </p>
      </div>
    </div>
  );
}
