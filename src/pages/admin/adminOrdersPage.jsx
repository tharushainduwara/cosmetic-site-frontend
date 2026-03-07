import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderModal from "../../components/orderDetailsModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (token == null) {
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-full bg-primary/40 p-4 sm:p-6">
      <OrderModal
        isModalOpen={isModalOpen}
        selectedOrder={selectedOrder}
        closeModal={() => setIsModalOpen(false)}
        refresh={() => setIsLoading(true)}
      />

      {/* Page Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            Orders
          </h1>
          <p className="text-sm text-secondary/70">
            Manage your catalog: view, edit, and remove orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-secondary/10 bg-white/70 px-4 py-2 text-sm text-secondary shadow-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
            Total:{" "}
            <span className="ml-1 font-semibold text-secondary">
              {orders.length}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Product Cards */}
      <div className="sm:hidden flex flex-col gap-4 p-4">
        {orders.map((item) => {
          return (
            <div
              key={item.orderID}
              className="bg-white rounded-2xl border border-secondary/10 p-4 shadow-sm hover:bg-primary/70 transition-colors"
              onClick={() => {
                setSelectedOrder(item);
                setIsModalOpen(true);
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-secondary">
                    Order #{item.orderID}
                  </span>

                  <span className="text-xs text-secondary/60">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>

                <span className="text-xs bg-primary/20 text-secondary/50 px-3 py-1 rounded-full font-medium">
                  {item.status}
                </span>
              </div>

              {/* Customer Info */}
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-secondary">
                  {item.customerName}
                </span>

                <span className="text-secondary/70 text-xs">{item.email}</span>

                <span className="text-secondary/70 text-xs">{item.phone}</span>

                <span className="text-secondary/60 text-xs">
                  {item.address}
                </span>
              </div>

              {/* Order Info */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-secondary/10">
                <span className="text-xs text-secondary/70">
                  {item.items.length} items
                </span>

                <span className="text-sm font-bold text-accent">
                  {`LKR ${item.total.toFixed(2)}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-secondary/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Scroll wrapper */}
        <div className="hidden sm:block w-full overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-[900px] text-left">
              <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur">
                <tr className="text-xs uppercase tracking-wider text-secondary/70">
                  <th className="px-5 py-4 font-semibold">Order ID</th>
                  <th className="px-5 py-4 font-semibold">Number of Items</th>
                  <th className="px-5 py-4 font-semibold">Customer Name</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Address</th>
                  <th className="px-5 py-4 font-semibold">Total</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-secondary/10">
                {orders.map((item) => {
                  return (
                    <tr
                      key={item.orderID}
                      className="group hover:bg-primary/35 transition-colors"
                      onClick={() => {
                        setSelectedOrder(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full border border-secondary/10 bg-white px-3 py-1 text-sm text-secondary shadow-sm">
                          {item.orderID}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className=" text-secondary">
                          {item.items.length} items
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className=" text-secondary font-semibold">
                          {item.customerName}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-semibold text-secondary">
                          {item.email}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-secondary/80">{item.phone}</span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-secondary/80">
                          {item.address}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-secondary font-semibold">
                          {`LKR ${item.total.toFixed(2)}`}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full border border-secondary/10 bg-primary/40 px-3 py-1 text-sm text-secondary/80">
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-secondary/80">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {orders.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-12 text-center text-secondary/60"
                      colSpan={7}
                    >
                      No products to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
