import { useState, useCallback } from "react";
import { useCart } from "./context/CartContext.jsx";
import Header from "./components/Header.jsx";
import Dishes from "./components/Dishes.jsx";
import CartModal from "./components/CartModal.jsx";
import Checkout from "./components/Checkout.jsx";

const App = () => {
  const isShowCheckout = true;
  const { count } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const onCartClick = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header
        title="🍔 QuickBite"
        cartCount={count}
        onCartClick={onCartClick}
      />

      {isShowCheckout && <Checkout />}
      {!isShowCheckout && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold mb-8">Our Menu</h2>
          {/* Dishes */}
          <Dishes />
        </main>
      )}

      {isCartOpen && <CartModal onClose={closeCart} />}
    </div>
  );
};

export default App;
