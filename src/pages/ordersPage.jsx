import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../components/header";
import Footer from "../components/footer";
import SubscribeForm from "../components/subscribeForm";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/api/orders/",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setOrders(res.data);
    } catch {
      toast.error("Failed to load orders");
    }
  }

  async function cancelOrder(orderID) {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/cancel/${orderID}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-primary relative overflow-hidden">

      {/* Premium Background Effects */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

      <Header />

      <div className="w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-secondary">My Orders</h1>

          {orders.length === 0 && (
            <p className="text-secondary/60">No orders found</p>
          )}

          {orders.map((order) => (
            <div
              key={order.orderID}
              className="w-full rounded-2xl border border-white/25 bg-white/50 backdrop-blur-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* LEFT: Customer Info */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-secondary/60">Order ID</p>
                  <p className="font-semibold text-secondary">
                    #{order.orderID}
                  </p>

                  <p className="text-sm text-secondary/60">Order Date</p>
                  <p className="text-secondary">
                    {new Date(order.date).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-secondary/60">Customer Name</p>
                  <p className="font-semibold text-secondary">
                    {order.customerName}
                  </p>

                  <p className="text-sm text-secondary/60">Phone</p>
                  <p className="text-secondary">{order.phone}</p>

                  <p className="text-sm text-secondary/60">Address</p>
                  <p className="break-words text-secondary">{order.address}</p>

                  <p className="text-sm text-secondary/60">Status</p>
                  <span
                    className={`px-3 py-1 w-fit rounded-full font-semibold text-xs ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* RIGHT: Order Items */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-secondary mb-2">
                    Items
                  </h3>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white/5 p-3 rounded-lg"
                    >
                      <img
                        src={item.image}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-secondary">
                          {item.name}
                        </p>
                        <p className="text-sm text-secondary/60">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-accent font-semibold">
                        LKR {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex justify-between border-t pt-3 font-semibold text-accent">
                    <span>Total ({order.items.length} items)</span>
                    <span>LKR {order.total.toFixed(2)}</span>
                  </div>

                  {/* Cancel Button */}
                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <button
                        onClick={() => cancelOrder(order.orderID)}
                        className="mt-4 w-full md:w-1/2 bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/70 transition"
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CTA SECTION */}
      <section className="py-20 px-6 border-t border-secondary/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-2">Stay in the Glow</h3>

            <p className="text-secondary/80">
              Subscribe to receive beauty tips, new collections, and exclusive
              offers.
            </p>
          </div>
          <SubscribeForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
