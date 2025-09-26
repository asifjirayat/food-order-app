import dishes from "../temp-dishes.js";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-orange-500">🍔 QuickBite</h1>
          <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors cursopo">
            Cart (0)
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-8">Our Menu</h2>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-colors"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{dish.name}</h3>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                    {dish.category}
                  </span>
                </div>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {dish.description}
                </p>
                {dish.preparationTime && (
                  <p className="text-xs text-gray-500 mb-3">
                    ⏱️ {dish.preparationTime}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-500">
                    ${dish.price}
                  </span>
                  <button
                    className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!dish.available}
                  >
                    {dish.available ? "Add to cart" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
