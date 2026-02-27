import { Link } from "react-router-dom";
import CategoryCreationCard from "./CategoryCreationCard";

const CategoryCreationList = () => {
  return (
    <div className=" h-screen bg-gray-600 mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-6">
       

        <Link
          to="/seller/category"
          className="text-blue-600 hover:underline cursor-pointer"
        >
          ← Back to Categories
        </Link>
      </div>

      <CategoryCreationCard />

    </div>
  );
};

export default CategoryCreationList;
