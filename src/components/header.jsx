import { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-accent text-white">
      <div className="w-full h-[80px] flex items-center justify-between px-4 sm:px-[40px] relative">
        {/* Logo */}
        <img
          src="/logo.png"
          className="h-full w-[150px] hidden lg:flex object-cover"
        />
        <div className="w-full lg:hidden flex justify-center items-center relative">
          <MdMenu
            className="absolute left-0 text-3xl"
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <img src="/logo.png" className="h-full w-[150px] object-cover" />
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] text-secondary z-100">
            <div className="w-[300px] bg-primary h-full flex flex-col font-semibold text-accent">
              <div className="w-full h-[80px] lg:hidden bg-accent flex justify-center items-center relative">
                <MdMenu
                  className="absolute left-2 text-3xl text-white"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
                <img
                  src="/logo.png"
                  className="h-full w-[150px] object-cover"
                />
              </div>

              <a href="/" className="p-4 border-b border-secondary/10">
                Home
              </a>
              <a href="/products" className="p-4 border-b border-secondary/10">
                Products
              </a>
              <a href="/about" className="p-4 border-b border-secondary/10">
                About
              </a>
              <a href="/contact" className="p-4 border-b border-secondary/10">
                Contact
              </a>
              <a href="/cart" className="p-4 border-b border-secondary/10">
                Cart
              </a>
                <div className="lg:hidden left-4 flex w-[300px] absolute bottom-[20px] items-center gap-4">
                  <UserData />
                </div>
            </div>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden lg:flex h-full items-center absolute gap-[50px] left-[250px] text-lg">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="h-full hidden lg:flex lg:right-[80px] absolute justify-center items-center ">
          <UserData />
        </div>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="hidden lg:flex text-3xl flex absolute right-5 h-full justify-center items-center"
        >
          <BsCart3 />
        </Link>
      </div>
    </header>
  );
}
