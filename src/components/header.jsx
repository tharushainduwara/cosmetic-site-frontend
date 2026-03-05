import { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-accent text-white">
      <div className="w-full h-[80px] flex items-center justify-between px-4 sm:px-[40px] relative">
        {/* Logo */}
        <img
          src="/logo.png"
          className="h-full w-[120px] sm:w-[160px] object-cover"
        />

        {/* Desktop Menu */}
        <div className="hidden sm:flex h-full items-center gap-[50px] pr-[60px] text-lg">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="text-3xl flex justify-center items-center sm:absolute right-5 h-full"
        >
          <BsCart3 />
        </Link>

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (outside header flex to prevent overlap) */}
      {isOpen && (
        <div className="sm:hidden w-full bg-accent flex flex-col items-center gap-5 py-4 z-50">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}