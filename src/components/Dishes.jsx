import { useEffect, useState } from "react";
import Dish from "./Dish.jsx";
import { fetchDishes } from "../utils/api.js";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDishes();
        setDishes(data);
      } catch (error) {
        setError("Failed to load dishes. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDishes();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 animate-pulse"
          >
            <div className="w-full h-48 bg-gray-800"></div>
            <div className="p-6 space-y-3">
              <div className="h-6 bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-8 bg-gray-800 rounded w-20"></div>
                <div className="h-10 bg-gray-800 rounded w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (dishes.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>No dishes available at the moment.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.data.map((dish) => (
        <Dish dish={dish} key={dish.id} />
      ))}
    </div>
  );
};

export default Dishes;
