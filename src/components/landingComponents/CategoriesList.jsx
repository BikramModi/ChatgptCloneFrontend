import CategoriesCard from "../common/CategoriesCard";
import useApi from "../../hooks/useApi";

const CategoriesList = () => {
  const { data = [], loading, error } = useApi("/categories", {}, []);
  console.log(data);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading categories...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error.message}</div>;

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Shop by Category
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Explore products across different categories curated just for you
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data.map((cat) => (
            <CategoriesCard
              key={cat._id}
              id={cat._id}
              name={cat.name}
              description={cat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesList;
