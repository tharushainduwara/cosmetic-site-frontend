import { Link, Route, Routes } from "react-router-dom";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BiBox } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";



export default function AdminPage() {
  return (
    <div className="h-full w-full bg-primary flex p-2 text-secondary">
      <div className="w-[350px] h-full bg-primary flex flex-col items-center gap-[20px]">
        <div className="flex flex-row w-[90%] h-[75px] rounded-2xl bg-accent items-center mb-[20px]">
          <img src="/logo.png" alt="Beauty Shop" className="h-[90px]" />
          <span className="text-white text-xl ml-4">Admin Panel</span>
        </div>
        <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
          <IoBarChartOutline className="text-xl"/>
          Dashboard
        </Link>
        <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
          <MdOutlineShoppingCartCheckout className="text-xl" />
          Orders
        </Link>
        <Link to="/admin/products" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
          <BiBox className="text-xl" />
          Products
        </Link>
        <Link to="/admin/users" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
          <HiOutlineUsers className="text-xl" />
          Users
        </Link>
      </div>

      <div className="w-[calc(100%-350px)] h-full border-[3px] border-accent rounded-[20px] overflow-hidden">
        <div className="w-full max-w-full h-full max-h-full overflow-y-scroll">
          <Routes path="/">
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/products" element={<AdminProductPage/>} />
            <Route path="/orders" element={<h1>Orders</h1>} />
            <Route path="/add-product" element={<AddProductPage/>} />
            <Route path="/update-product" element={<UpdateProductPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
