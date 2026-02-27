import { Link } from "react-router-dom";

const SellerCategoryCard = ({ _id, name, onDelete }) => {
  return (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm mx-5">

      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {name}
        </h3>
      </div>

      <div className="flex gap-3">
         <Link
          to={`/view-product/${_id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Products
        </Link>

        <Link
          to={`/update/category/${_id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Update
        </Link>

        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={() => onDelete(_id)}
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default SellerCategoryCard;
