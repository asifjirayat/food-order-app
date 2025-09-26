import Dishes from "./components/Dishes.jsx";

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

        {/* Dishes */}
        <Dishes />
      </main>
    </div>
  );
};

export default App;
