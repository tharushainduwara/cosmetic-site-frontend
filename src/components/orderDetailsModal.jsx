import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function OrderModal({
  isModalOpen,
  selectedOrder,
  closeModal,
  refresh,
}) {
  const [status, setStatus] = useState(selectedOrder?.status);
  if (!isModalOpen || !selectedOrder) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-[720px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-secondary/60 hover:text-secondary text-lg font-bold"
        >
          ✕
        </button>

        {/* Order Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold text-secondary">
              Order #{selectedOrder.orderID}
            </h2>
            <p className="text-xs text-secondary/60 mt-1">
              {new Date(selectedOrder.date).toLocaleDateString()}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-primary/20 text-secondary/60 font-medium text-xs w-fit">
            {selectedOrder.status}
          </span>
        </div>

        {/* Customer Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-secondary/60">Customer</p>
            <p className="font-semibold text-secondary">
              {selectedOrder.customerName}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary/60">Email</p>
            <p className="text-secondary">{selectedOrder.email}</p>
          </div>
          <div>
            <p className="text-xs text-secondary/60">Phone</p>
            <p className="text-secondary">{selectedOrder.phone}</p>
          </div>
          <div>
            <p className="text-xs text-secondary/60">Address</p>
            <p className="text-secondary">{selectedOrder.address}</p>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-secondary mb-3">
            Ordered Items
          </h3>
          <div className="flex flex-col gap-3">
            {selectedOrder.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border border-secondary/10 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-md"
                />
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-semibold text-secondary">
                    {item.name}
                  </span>
                  <span className="text-xs text-secondary/60">
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className="text-sm font-semibold text-accent">
                  LKR {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Actions */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-secondary font-semibold">
            Total ({selectedOrder.items.length} items)
          </span>
          <span className="text-lg font-bold text-accent">
            LKR {selectedOrder.total.toFixed(2)}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4 flex-wrap">
          {/* Status Select */}
          <div>
            <label className="text-xs text-secondary/60 mb-1 block">
              Update Order Status
            </label>

            <select
              defaultValue={selectedOrder.status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[220px] px-3 py-2 text-sm rounded-lg
      border border-secondary/20 bg-white text-secondary
      focus:outline-none focus:ring-2 focus:ring-accent/40
      focus:border-accent transition"
            >
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Update Button */}         
            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                axios
                  .put(
                    `${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderID}`,
                    { status: status },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  )
                  .then(() => {
                    toast.success("Order status updated");
                    closeModal();
                    refresh();
                  })
                  .catch((err) => {
                    console.error(err);
                    toast.error("Failed to update order status");
                  });
              }}
              disabled={status == selectedOrder.status}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition shadow-sm"
            >
              Update
            </button>         
        </div>
      </div>
    </div>
  );
}
