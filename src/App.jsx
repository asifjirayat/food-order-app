import Header from "./components/Header.jsx";
import Dishes from "./components/Dishes.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

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
