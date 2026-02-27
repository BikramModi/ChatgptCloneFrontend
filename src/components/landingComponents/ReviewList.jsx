// src/pages/ReviewList.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Star, MessageSquare } from "lucide-react";

import ReviewCard from "../common/ReviewCard";
import useApi from "../../hooks/useApi";

const ReviewList = () => {
  const { id } = useParams(); // product id

  const { data, loading, error } = useApi(
    `/reviews/${id}/getallReviews`,
    {},
    [id],
    "reviews"
  );

  const reviews = Array.isArray(data) ? data : data?.data || [];

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : 0;

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Loading customer reviews...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load reviews
      </div>
    );

  return (
    <div className="space-y-8 mx-6 py-4">

      {/* ⭐ Reviews Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b pb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          <p className="text-gray-500 text-sm">
            What customers say about this product
          </p>
        </div>

        <div className="flex items-center gap-4
        hover:scale-105 transition
        bg-indigo-50 px-6 py-4 rounded-xl">
          <div className="text-4xl font-bold text-indigo-600">
            {avgRating}
          </div>

          <div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i <= Math.round(avgRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Based on {reviews.length} reviews
            </p>
          </div>
        </div>
      </div>

      {/* 📨 Empty State */}
      {reviews.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No reviews yet</p>
          <p className="text-sm">Be the first to review this product ⭐</p>
        </div>
      )}

      {/* 🧱 Review Grid */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ReviewList;
