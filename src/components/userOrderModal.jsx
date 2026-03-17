import React from "react";

export default function UserOrderModal({
  isModalOpen,
  selectedOrder,
  closeModal,
}) {
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
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-secondary/60 hover:text-secondary"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-secondary">
              Order #{selectedOrder.orderID}
            </h2>
            <p className="text-xs text-secondary/60">
              {new Date(selectedOrder.date).toLocaleDateString()}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
            {selectedOrder.status}
          </span>
        </div>

        {/* Customer Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-secondary/60">Name</p>
            <p className="font-semibold text-secondary">
              {selectedOrder.customerName}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary/60">Phone</p>
            <p>{selectedOrder.phone}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs text-secondary/60">Address</p>
            <p className="break-words">{selectedOrder.address}</p>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-3 mb-6">
          {selectedOrder.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border rounded-lg p-3"
            >
              <img
                src={item.image}
                className="w-14 h-14 object-cover rounded-md"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-secondary/60">
                  Qty: {item.quantity}
                </p>
              </div>

              <span className="text-accent font-semibold">
                LKR {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between border-t pt-4">
          <span>Total</span>
          <span className="font-bold text-accent">
            LKR {selectedOrder.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}