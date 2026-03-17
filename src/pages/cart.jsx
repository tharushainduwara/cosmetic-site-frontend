import { BiTrash } from "react-icons/bi";
import { addToCart, getTotal, loadCart, clearCart } from "../utils/cart";
import { CiCircleChevUp, CiCircleChevDown } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  // Optional: listen for cart changes from checkout page
  useEffect(() => {
    setCart(loadCart());
  }, []);

  // Function to clear cart manually
  const emptyCart = () => {
    clearCart();       // remove from localStorage
    setCart([]);       // update state
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex flex-col pt-6 items-center relative overflow-hidden px-4">
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-36 -right-36 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -left-36 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="w-full max-w-3xl flex flex-col gap-5">

        {cart.length === 0 && (
          <p className="text-center text-secondary/60 text-xl mt-10">
            Your cart is empty
          </p>
        )}

        {/* Cart Items */}
        {cart.map((item, index) => (
          <div key={index} className="relative w-full rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-4 p-4 shadow-md">
            <button
              className="absolute top-2 right-2 text-accent text-2xl rounded-full hover:bg-accent hover:text-white p-1 font-bold transition z-10"
              onClick={() => {
                addToCart(item, -item.quantity);
                setCart(loadCart());
              }}
            >
              <BiTrash />
            </button>

            <img className="h-28 sm:h-32 w-full sm:w-28 object-cover rounded-lg" src={item.images} />

            <div className="flex-1 flex flex-col gap-1 sm:gap-2">
              <h1 className="font-semibold text-lg text-secondary leading-tight">{item.name}</h1>
              <span className="text-sm text-secondary/60">{item.productID}</span>
            </div>

            <div className="flex sm:flex-col items-center gap-2 sm:gap-0">
              <CiCircleChevUp
                className="text-3xl cursor-pointer text-secondary/70 hover:text-accent transition"
                onClick={() => {
                  addToCart(item, 1);
                  setCart(loadCart());
                }}
              />
              <span className="font-semibold text-2xl sm:text-3xl text-secondary">{item.quantity}</span>
              <CiCircleChevDown
                className="text-3xl cursor-pointer text-secondary/70 hover:text-accent transition"
                onClick={() => {
                  addToCart(item, -1);
                  setCart(loadCart());
                }}
              />
            </div>

            <div className="flex flex-col items-end gap-1 sm:gap-2 mt-2 sm:mt-0">
              {item.labelPrice > item.price && (
                <span className="text-secondary/60 line-through text-sm sm:text-base">
                  LKR {item.labelPrice.toFixed(2)}
                </span>
              )}
              <span className="text-accent font-bold text-lg sm:text-2xl">
                LKR {item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {/* Checkout Section */}
        {cart.length > 0 && (
          <div className="w-full rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl flex flex-col flex-col-reverse sm:flex-row justify-between items-center gap-4 p-4 shadow-md">
            <Link
              state={cart}
              to="/checkout"
              className="w-full sm:w-auto bg-accent text-white px-6 py-3 rounded-xl font-semibold tracking-wide text-center shadow-md hover:bg-accent/85 transition"
              onClick={emptyCart} // clear cart after checkout click
            >
              Proceed to Checkout
            </Link>

            <div className="text-right">
              <span className="font-bold text-accent text-lg sm:text-2xl">
                Total: LKR {getTotal().toFixed(2)}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}