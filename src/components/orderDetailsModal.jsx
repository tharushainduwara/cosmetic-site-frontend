import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function OrderModal({
  isModalOpen,
  selectedOrder,
  closeModal,
  refresh,
}) {
  if (!isModalOpen || !selectedOrder) return null;

  const canCancel =
    selectedOrder.status !== "completed" &&
    selectedOrder.status !== "cancelled";

  function handleCancelOrder() {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/orders/cancel/${selectedOrder.orderID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Order cancelled successfully");
        closeModal();
        refresh();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to cancel order");
      });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-[720px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-secondary/60 hover:text-secondary text-lg font-bold"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold text-secondary">
              Order #{selectedOrder.orderID}
            </h2>
            <p className="text-xs text-secondary/60 mt-1">
              {new Date(selectedOrder.date).toLocaleDateString()}
            </p>
          </div>

          {/* STATUS BADGE */}
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-medium text-xs w-fit">
            {selectedOrder.status}
          </span>
        </div>

        {/* CUSTOMER INFO */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-secondary/60">Customer</p>
            <p className="font-semibold text-secondary">
              {selectedOrder.customerName}
            </p>
          </div>

          <div>
            <p className="text-xs text-secondary/60">Phone</p>
            <p className="text-secondary">{selectedOrder.phone}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-secondary/60">Address</p>
            <p className="text-secondary break-words">
              {selectedOrder.address}
            </p>
          </div>
        </div>

        {/* ITEMS */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-secondary mb-3">
            Ordered Items
          </h3>

          <div className="flex flex-col gap-3">
            {selectedOrder.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border border-secondary/10 rounded-lg p-3"
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

        {/* TOTAL */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-secondary font-semibold">
            Total ({selectedOrder.items.length} items)
          </span>
          <span className="text-lg font-bold text-accent">
            LKR {selectedOrder.total.toFixed(2)}
          </span>
        </div>

        {/* ACTION BUTTON */}
        <div className="mt-6 flex justify-end">
          {canCancel ? (
            <button
              onClick={handleCancelOrder}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel Order
            </button>
          ) : (
            <span className="text-sm text-secondary/60">
              This order cannot be cancelled
            </span>
          )}
        </div>
      </div>
    </div>
  );
}