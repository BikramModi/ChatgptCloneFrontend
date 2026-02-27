import { useParams } from "react-router-dom";
import ReviewCreationCard from "../common/ReviewCreationCard";

const ReviewCreationCardList = () => {
  const { id: productId } = useParams(); // route: /product/:id

  return (
    <div className="bg-indigo-300 py-4 border-t-amber-300 border-2">
      <ReviewCreationCard productId={productId} />
    </div>
  );
};

export default ReviewCreationCardList;
