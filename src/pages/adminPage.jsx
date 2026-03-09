import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BiBox } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader } from "../components/loader";
import AdminUsersPage from "./admin/usersPage";

export default function AdminPage() {
  const navigate = useNavigate();
  const[userLoaded, setUserLoaded] = useState(false)
  
  useEffect(
    ()=>{
      const token = localStorage.getItem("token");
      if(token == null){
        toast.error("Please login to access admin panel");
        navigate("/login")
        return;
      }
      axios.get(import.meta.env.VITE_API_URL + "/api/users/me",{
        headers: {
          Authorization: `Bearer ${token}`,
        },   
      }).then((res)=>{
        if(res.data.role !== "admin"){
          toast.error("You are not authorized to access admin panel")
          navigate("/")
          return;
        }
        setUserLoaded(true)
      }).catch(()=>{
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        navigate("/login")
      })
    },[]
  )
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-full w-full bg-primary flex flex-col sm:flex-row p-2 text-secondary">
      {/* Hamburger button for mobile */}
      <div className="sm:hidden flex flex-row items-center w-full h-[60px] rounded-2xl bg-accent sm:px-4 mb-4">
        <img src="/logo.png" alt="Beauty Shop" className="h-[60px] sm:h-[90px] object-cover" />
        <span className="text-white text-xl ml-2 sm:ml-4 whitespace-nowrap ">Admin Panel</span>
        <button className="flex absolute right-5" onClick={() => setSidebarOpen(true)}>
          <GiHamburgerMenu className="text-2xl text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-primary z-50 transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 sm:w-[350px] flex flex-col items-center gap-[20px] sm:items-center
        `}
      >
        {/* Close button for mobile */}
        <button
          className="sm:hidden self-end m-2 text-accent text-2xl"
          onClick={() => setSidebarOpen(false)}
        >
          <AiOutlineClose />
        </button>

        {/* Logo */}
        <div className="flex flex-row items-center w-[90%] h-[75px] rounded-2xl bg-accent px-2 sm:px-4 mb-4">
          <img src="/logo.png" alt="Beauty Shop" className="h-[60px] sm:h-[90px] object-cover" />
          <span className="text-white text-xl ml-2 sm:ml-4 whitespace-nowrap">Admin Panel</span>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col gap-2 w-full px-2 sm:px-0">
          <Link to="/admin" className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-accent/20">
            <IoBarChartOutline className="text-xl" />
            Dashboard
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-accent/20">
            <MdOutlineShoppingCartCheckout className="text-xl" />
            Orders
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-accent/20">
            <BiBox className="text-xl" />
            Products
          </Link>
          <Link to="/admin/users" className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-accent/20">
            <HiOutlineUsers className="text-xl" />
            Users
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className="sm:w-[calc(100%-350px)] w-full h-full sm:h-full border-[3px] border-accent rounded-[20px] overflow-hidden mt-2 sm:mt-0">
        <div className="w-full max-w-full h-full max-h-full overflow-y-scroll">
          {userLoaded?<Routes path="/">
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<AdminOrdersPage/>} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/update-product" element={<UpdateProductPage />} />
             <Route path="/users" element={<AdminUsersPage />} />
          </Routes>:<Loader/>}
        </div>
      </div>
    </div>
  );
}