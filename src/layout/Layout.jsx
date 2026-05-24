import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_admin } from '../store/Reducers/authReducer'

export default function Layout() {
  const [showSideBar, setShowsideBar] = useState(false)
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    if (token && userInfo === "") {
      dispatch(get_admin())
    }
  }, [token, userInfo, dispatch])

  if (!token) return <Navigate to="/" replace />

  if (userInfo === "") {
    return (
      <div className="w-screen h-screen flex justify-center items-center" style={{ background:"#0f1117" }}>
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor:"rgba(79,142,247,0.3)", borderTopColor:"#4f8ef7" }} />
      </div>
    )
  }

  return (
    <div className="relative w-full flex min-h-screen" style={{ background:"#0f1117" }}>
      <div>
        <Header showSideBar={showSideBar} setShowsideBar={setShowsideBar} />
        <Sidebar showSideBar={showSideBar} />
      </div>
      <div className="w-full ml-0 lg:ml-[260px] pt-[70px] overflow-x-hidden p-6">
        <Outlet />
      </div>
      {showSideBar && (
        <div onClick={() => setShowsideBar(false)} className="w-screen h-screen lg:hidden bg-black/60 z-10 fixed top-0 left-0" />
      )}
    </div>
  );
}

