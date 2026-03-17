import { BiTrash } from "react-icons/bi";
import { CiCircleChevUp, CiCircleChevDown } from "react-icons/ci";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state || []);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    // ✅ Validation
    if (!address || !phone) {
      toast.error("Please fill all required details");
      return;
    }

    try {
      const items = cart.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
      }));

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address,
          customerName: name === "" ? null : name,
          phone,
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Order placed successfully");
      navigate("/orders"); // redirect after order
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex justify-center pt-6 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-36 -right-36 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -left-36 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      {/* MAIN GRID */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 z-10">
        {/* LEFT → CUSTOMER DETAILS */}
        <div className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl p-6 shadow-lg flex flex-col gap-6 h-fit">
          <h2 className="text-xl font-bold text-secondary">Customer Details</h2>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[45px] border border-secondary/40 rounded-lg px-3"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary">Contact Number *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-[45px] border border-secondary/40 rounded-lg px-3"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary">Shipping Address *</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-[120px] border border-secondary/40 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* RIGHT → ORDER DETAILS */}
        <div className="flex flex-col gap-5 sticky top-6 h-fit">
          {/* CART ITEMS */}
          <div className="flex flex-col gap-4">
            {cart.length === 0 && (
              <p className="text-center text-secondary/60">
                Your cart is empty
              </p>
            )}

            {cart.map((item, index) => (
              <div
                key={index}
                className="relative rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl flex items-center gap-4 p-4 shadow-md"
              >
                {/* REMOVE */}
                <button
                  className="absolute top-2 right-2 text-accent text-xl hover:text-red-500"
                  onClick={() => {
                    const newCart = cart.filter((_, i) => i !== index);
                    setCart(newCart);
                  }}
                >
                  <BiTrash />
                </button>

                {/* IMAGE */}
                <img
                  className="h-24 w-24 object-cover rounded-lg"
                  src={item.images}
                />

                {/* INFO */}
                <div className="flex-1">
                  <h1 className="font-semibold text-secondary">{item.name}</h1>
                  <p className="text-sm text-secondary/60">{item.productID}</p>
                </div>

                {/* QUANTITY */}
                <div className="flex flex-col items-center">
                  <CiCircleChevUp
                    className="text-2xl cursor-pointer hover:text-accent"
                    onClick={() => {
                      const newCart = [...cart];
                      newCart[index].quantity += 1;
                      setCart(newCart);
                    }}
                  />
                  <span className="text-xl font-semibold">{item.quantity}</span>
                  <CiCircleChevDown
                    className="text-2xl cursor-pointer hover:text-accent"
                    onClick={() => {
                      const newCart = [...cart];
                      if (newCart[index].quantity > 1) {
                        newCart[index].quantity -= 1;
                      }
                      setCart(newCart);
                    }}
                  />
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <span className="text-accent font-bold">
                    LKR {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* PAYMENT METHODS – MODERN STYLE */}
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 flex flex-col gap-5 shadow-xl">
            <h2 className="text-xl font-bold text-secondary">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Stripe */}
              <label className="flex flex-col items-center justify-center gap-2 p-4 border rounded-2xl cursor-pointer transition-all hover:scale-105 hover:border-accent hover:shadow-lg relative group">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  className="absolute opacity-0 peer"
                />
                <img src="stripe.svg" alt="Stripe" className="h-10" />
                <span className="text-secondary font-medium">Stripe</span>

                {/* Checkmark animation */}
                <span className="absolute top-2 right-2 w-5 h-5 border-2 border-accent rounded-full hidden peer-checked:flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </label>

              {/* PayPal */}
              <label className="flex flex-col items-center justify-center gap-2 p-4 border rounded-2xl cursor-pointer transition-all hover:scale-105 hover:border-accent hover:shadow-lg relative group">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  className="absolute opacity-0 peer"
                />
                <img src="paypal.svg" alt="PayPal" className="h-10" />
                <span className="text-secondary font-medium">PayPal</span>

                <span className="absolute top-2 right-2 w-5 h-5 border-2 border-accent rounded-full hidden peer-checked:flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </label>

              {/* Bank Card */}
              <label className="flex flex-col items-center justify-center gap-2 p-4 border rounded-2xl cursor-pointer transition-all hover:scale-105 hover:border-accent hover:shadow-lg relative group">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  className="absolute opacity-0 peer"
                />

                {/* Card logos */}
                <div className="flex items-center gap-2">
                  <img
                    src="vecteezy_visa-vector-logo_64484.svg"
                    alt="Visa"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="Mastercard"
                    className="h-6"
                  />
                </div>

                <span className="text-secondary font-medium mt-1">
                  Credit/Debit Card
                </span>

                {/* Checkmark */}
                <span className="absolute top-2 right-2 w-5 h-5 border-2 border-accent rounded-full hidden peer-checked:flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </label>

              {/* Cash on Delivery */}
              <label className="flex flex-col items-center justify-center gap-2 p-4 border rounded-2xl cursor-pointer transition-all hover:scale-105 hover:border-accent hover:shadow-lg relative group">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  className="absolute opacity-0 peer"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7.5M17 13l1.5 7.5M9 21h6"
                  />
                </svg>
                <span className="text-secondary font-medium mt-1">
                  Cash on Delivery
                </span>
                <span className="absolute top-2 right-2 w-5 h-5 border-2 border-accent rounded-full hidden peer-checked:flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </label>
            </div>
          </div>

          {/* TOTAL + ORDER */}
          <div className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl p-5 flex flex-col gap-4 shadow-lg">
            <div className="text-right">
              <span className="text-xl font-bold text-accent">
                Total: LKR {getTotal().toFixed(2)}
              </span>
            </div>

            <button
              className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/85 transition"
              onClick={purchaseCart}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
