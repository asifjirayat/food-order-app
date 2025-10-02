import Header from "./components/Header.jsx";
import Dishes from "./components/Dishes.jsx";
import Checkout from "./components/Checkout.jsx";
import CartModal from "./components/CartModal.jsx";

const App = () => {
  const showCart = false;
  const showCheckout = false;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {!showCheckout && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold mb-8">Our Menu</h2>
          {/* Dishes */}
          <Dishes />
        </main>
      )}

      {showCheckout && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Checkout />
        </main>
      )}

      {showCart && <CartModal />}
    </div>
  );
};

export default App;
