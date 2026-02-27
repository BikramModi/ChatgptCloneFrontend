// src/components/ReviewCard.jsx
import React from "react";
import { Star, User, BadgeCheck } from "lucide-react";

const ReviewCard = ({ review }) => {
  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="bg-gray-300 rounded-2xl border border-gray-100 shadow-sm 
    hover:scale-[1.02]
    hover:shadow-lg transition-all duration-200 p-6 space-y-4">

      {/* Header */}
      <div className="flex items-start gap-4">

        {/* Avatar */}
        {review.user?.avatar ? (
          <img
            src={review.user.avatar}
            alt={review.user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
            <User className="text-indigo-600" size={22} />
          </div>
        )}

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-900">
              {review.user?.name || "Anonymous"}
            </p>

            {/* Verified badge (optional) */}
            <span className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
              <BadgeCheck size={14} />
              Verified
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-0.5">
            {formattedDate}
          </p>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-1 bg-linear-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm">
          <Star size={14} className="fill-yellow-500 text-yellow-500" />
          {review.rating}
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={18}
            className={
              i <= review.rating
                ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">
          {review.rating} / 5
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      {/* Comment */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {review.comment}
      </p>

    </div>
  );
};

export default ReviewCard;
