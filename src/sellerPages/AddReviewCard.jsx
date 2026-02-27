// src/components/ReviewCard.jsx
import React from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

import { Trash2 } from "lucide-react";

const AddReviewCard = ({ review, onDelete }) => {

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/reviews/${review._id}/deleteReview/adminonly`);
            toast.success("Review deleted successfully");
            onDelete(review._id);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete review");
        }
    };

    return (
        <div className="bg-zinc-400 rounded-xl shadow p-4 space-y-3">
            {/* User */}
            <div className="flex items-center gap-3">
                <img
                    src={review.user.name}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold">{review.user.name}</p>
                    <p className="text-xs text-gray-500">{review.createdAt}</p>
                </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={
                            i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }
                    />
                ))}
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-700">{review.comment}</p>

            <button
                onClick={handleDelete}
                className="flex items-center bg-red-600 text-white py-2 px-2 rounded
                cursor-pointer  hover:bg-red-700 transition"
            >
                <Trash2 size={16} className="inline mr-2" />
                Delete Review
            </button>
        </div>
    );
};

export default AddReviewCard;
