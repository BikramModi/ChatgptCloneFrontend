import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddReviewCard from "./AddReviewCard";
import useApi from "../hooks/useApi";

const AddReviewList = () => {
  const { id } = useParams();

  const { data, loading, error } = useApi(
    `/reviews/${id}/getallReviews`,
    {},
    [id],
    "reviews"
  );

  const [reviews, setReviews] = useState([]);

  // ✅ Sync API data to state
  useEffect(() => {
    if (Array.isArray(data)) {
      setReviews(data);
    } else if (Array.isArray(data?.data)) {
      setReviews(data.data);
    }
  }, [data]);

  const removeFromUI = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));
  };

  if (loading) return <div className="text-center font-bold text-xl py-10">Loading reviews...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (reviews.length === 0) {
    return (
      <p className="text-center font-bold text-xl py-10">
        No reviews yet... ⭐⭐⭐
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex justify-center">Customer Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <AddReviewCard
            key={review._id}
            review={review}
            onDelete={removeFromUI}
          />
        ))}
      </div>
    </div>
  );
};

export default AddReviewList;
