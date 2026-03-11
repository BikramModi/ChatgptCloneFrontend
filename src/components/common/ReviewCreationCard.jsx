// src/components/ReviewCreationCard.jsx
import { useState } from "react";
import { Star, MessageSquareText, Send } from "lucide-react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const ReviewCreationCard = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/reviews/createReview", {
        productId,
        rating,
        comment,
      });

      setRating(5);
      setHoverRating(0);
      setComment("");

      if (onReviewAdded) onReviewAdded(res.data);

      toast.success("Review added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-300 rounded-2xl shadow-lg border
    hover:scale-[1.02]
    hover:shadow-xl transition-all duration-200
    border-gray-100 p-7 space-y-6 max-w-xl mx-auto">

      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900">
          Write a Review
        </h3>
        <p className="text-sm text-gray-500">
          Share your experience with this product
        </p>
      </div>

      {/* Rating */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Your Rating</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer transition-all duration-150 ${
                (hoverRating || rating) >= star
                  ? "fill-yellow-400 text-yellow-400 scale-110"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
          <span className="ml-3 text-gray-600 font-semibold">
            {rating} / 5
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Your Review</p>
        <div className="relative">
          <MessageSquareText
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <textarea
            rows="4"
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell others what you liked or disliked..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={submitHandler}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold
        cursor-pointer
        hover:from-indigo-700 hover:to-blue-700 transition disabled:opacity-60"
      >
        <Send size={18} />
        {loading ? "Submitting..." : "Submit Review"}
      </button>

    </div>
  );
};

export default ReviewCreationCard;
