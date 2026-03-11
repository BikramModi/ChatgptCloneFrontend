import { Link } from "react-router-dom";
import { Tag } from "lucide-react"; // Example icon from Lucide

const CategoriesCard = ({ id, name, description }) => {
  return (
    <Link
      to={`/category/${id}`}
      className="group bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform p-6 flex flex-col items-center text-center"
    >
      {/* Icon */}
      <div className="bg-blue-200 p-4 rounded-full mb-4 flex items-center justify-center">
        <Tag className="text-blue-700 w-6 h-6" />
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
};

export default CategoriesCard;
