import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const API = import.meta.env.VITE_BACKEND_URL || "https://cosmetic-site-backend-1.onrender.com";

function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24"
          fill={s <= rating ? "#A33A3A" : "none"}
          stroke={s <= rating ? "#A33A3A" : "#ccc"} strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

const STATUS_CONFIG = {
  pending:  { label: "Pending",  bg: "#FEF3C7", color: "#92400E" },
  approved: { label: "Approved", bg: "#D1FAE5", color: "#065F46" },
  rejected: { label: "Rejected", bg: "#FEE2E2", color: "#991B1B" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  async function fetchReviews() {
    setLoading(true);
    try {
      const query = filter !== "all" ? `?status=${filter}` : "";
      const res = await fetch(`${API}/api/reviews${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    setActionLoading(id + status);
    try {
      const res = await fetch(`${API}/api/reviews/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchReviews();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Action failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function deleteReview(id) {
    if (!confirm("Delete this review permanently?")) return;
    setActionLoading(id + "delete");
    try {
      const res = await fetch(`${API}/api/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setActionLoading(null);
    }
  }

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  }

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  const TABS = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold text-[#222222]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Customer Reviews
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage and moderate product reviews</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: counts.all, color: "#222222" },
          { label: "Pending", value: counts.pending, color: "#D97706" },
          { label: "Approved", value: counts.approved, color: "#059669" },
          { label: "Rejected", value: counts.rejected, color: "#DC2626" },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <p className="text-xs text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-semibold" style={{ color: card.color }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              filter === tab.key
                ? { background: "#A33A3A", color: "#fff" }
                : { background: "transparent", color: "#555" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews Table / Cards */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500">No {filter !== "all" ? filter : ""} reviews found</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-5 py-3 text-left font-medium text-gray-500">Customer</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500">Product</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500">Rating</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500">Comment</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500">Date</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                          style={{ background: "#A33A3A" }}
                        >
                          {review.userName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-[#222222]">{review.userName}</p>
                          <p className="text-xs text-gray-400">{review.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                        {review.productID}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StarDisplay rating={review.rating} />
                      <span className="text-xs text-gray-400 mt-0.5 block">{review.rating}/5</span>
                    </td>
                    <td className="px-5 py-4 max-w-[200px]">
                      <p className="text-gray-700 text-xs leading-relaxed line-clamp-2">
                        {review.comment}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={review.status} />
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {timeAgo(review.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        {review.status !== "approved" && (
                          <button
                            onClick={() => updateStatus(review._id, "approved")}
                            disabled={!!actionLoading}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-white"
                            style={{ background: "#059669" }}
                            title="Approve"
                          >
                            ✓
                          </button>
                        )}
                        {review.status !== "rejected" && (
                          <button
                            onClick={() => updateStatus(review._id, "rejected")}
                            disabled={!!actionLoading}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-white"
                            style={{ background: "#D97706" }}
                            title="Reject"
                          >
                            ✕
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(review._id)}
                          disabled={!!actionLoading}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-white"
                          style={{ background: "#DC2626" }}
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ background: "#A33A3A" }}
                    >
                      {review.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[#222222]">{review.userName}</p>
                      <p className="text-xs text-gray-400">{review.userEmail}</p>
                    </div>
                  </div>
                  <StatusBadge status={review.status} />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{review.productID}</span>
                  <span>{timeAgo(review.createdAt)}</span>
                </div>

                <StarDisplay rating={review.rating} />
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">{review.comment}</p>

                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  {review.status !== "approved" && (
                    <button
                      onClick={() => updateStatus(review._id, "approved")}
                      disabled={!!actionLoading}
                      className="flex-1 py-2 rounded-lg text-xs font-medium text-white"
                      style={{ background: "#059669" }}
                    >
                      ✓ Approve
                    </button>
                  )}
                  {review.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(review._id, "rejected")}
                      disabled={!!actionLoading}
                      className="flex-1 py-2 rounded-lg text-xs font-medium text-white"
                      style={{ background: "#D97706" }}
                    >
                      ✕ Reject
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review._id)}
                    disabled={!!actionLoading}
                    className="flex-1 py-2 rounded-lg text-xs font-medium text-white"
                    style={{ background: "#DC2626" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
