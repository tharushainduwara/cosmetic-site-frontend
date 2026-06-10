import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function StarDisplay({ rating, size = 18 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= rating ? "#A33A3A" : "none"}
          stroke={star <= rating ? "#A33A3A" : "#ccc"}
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function StarInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
          aria-label={`${star} star`}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={star <= (hovered || value) ? "#A33A3A" : "none"}
            stroke={star <= (hovered || value) ? "#A33A3A" : "#bbb"}
            strokeWidth="1.5"
            style={{ transition: "fill 0.15s, stroke 0.15s" }}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-4 text-right text-[#A33A3A] font-medium">{label}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#A33A3A" stroke="#A33A3A" strokeWidth="1.5">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: "#A33A3A", transition: "width 0.4s" }}
        />
      </div>
      <span className="w-6 text-xs text-gray-500">{count}</span>
    </div>
  );
}

export default function ProductReviews({ productID }) {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!productID) return;
    fetchReviews();
  }, [productID]);

  async function fetchReviews() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/reviews/product/${productID}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setAvgRating(data.avgRating || 0);
      setTotal(data.total || 0);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (comment.trim().length < 5) {
      toast.error("Comment must be at least 5 characters");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productID, rating, comment }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Review submitted! It will appear after approval.");
        setRating(0);
        setComment("");
        setShowForm(false);
      } else {
        toast.error(data.message || "Failed to submit");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  // breakdown counts
  const breakdown = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-10">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-[#222222] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
        Customer Reviews
      </h2>

      {/* Summary + Breakdown */}
      {total > 0 && (
        <div className="flex flex-col sm:flex-row gap-8 mb-10 p-6 rounded-2xl bg-[#FAF3E1]">
          {/* Average */}
          <div className="flex flex-col items-center justify-center min-w-[120px]">
            <span className="text-5xl font-bold text-[#A33A3A]">{avgRating.toFixed(1)}</span>
            <StarDisplay rating={Math.round(avgRating)} size={20} />
            <span className="text-sm text-gray-500 mt-1">{total} review{total !== 1 ? "s" : ""}</span>
          </div>
          {/* Bars */}
          <div className="flex-1 flex flex-col gap-2 justify-center">
            {breakdown.map(({ star, count }) => (
              <RatingBar key={star} label={star} count={count} total={total} />
            ))}
          </div>
        </div>
      )}

      {/* Write a Review */}
      <div className="mb-10">
        {!showForm ? (
          <button
            onClick={() => {
              if (!token) { toast.error("Please login to write a review"); return; }
              setShowForm(true);
            }}
            className="px-6 py-3 rounded-lg text-sm font-medium text-white"
            style={{ background: "#A33A3A" }}
          >
            Write a Review
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-xl"
          >
            <h3 className="text-lg font-semibold text-[#222222] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Write Your Review
            </h3>

            {/* Stars */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1 font-medium">Your Rating</label>
              <StarInput value={rating} onChange={setRating} />
            </div>

            {/* Comment */}
            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-1 font-medium">Comment</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
                style={{ "--tw-ring-color": "#A33A3A" }}
                rows={4}
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-white"
                style={{ background: submitting ? "#c97a7a" : "#A33A3A" }}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setRating(0); setComment(""); }}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Review List */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">⭐</div>
          <p className="text-gray-500 text-sm">No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                    style={{ background: "#A33A3A" }}
                  >
                    {review.userName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#222222]">{review.userName}</p>
                    <StarDisplay rating={review.rating} size={14} />
                  </div>
                </div>
                <span className="text-xs text-gray-400">{timeAgo(review.createdAt)}</span>
              </div>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
