import { useState, useCallback } from "react";
import { useCart } from "./context/CartContext.jsx";
import Header from "./components/Header.jsx";
import Dishes from "./components/Dishes.jsx";
import CartModal from "./components/CartModal.jsx";
import Checkout from "./components/Checkout.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";

const App = () => {
  const { count } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState("menu"); //menu,checkout,success

  const onCartClick = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const goToCheckout = useCallback(() => {
    setIsCartOpen(false);
    setCurrentView("checkout");
  }, []);

  const goToMenu = useCallback(() => {
    setCurrentView("menu");
  }, []);

  const goToSuccess = useCallback(() => {
    setCurrentView("success");
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header
        title="🍔 QuickBite"
        cartCount={count}
        onCartClick={onCartClick}
      />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Conditional rendering based on currentView */}
        {currentView === "menu" && (
          <>
            <h2 className="text-3xl font-bold mb-8">Our Menu</h2>
            <Dishes />
          </>
        )}

        {currentView === "checkout" && (
          <Checkout onSuccess={goToSuccess} onCancel={goToMenu} />
        )}

        {currentView === "success" && <OrderSuccess onBackToMenu={goToMenu} />}
      </main>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal onClose={closeCart} onProceedToCheckout={goToCheckout} />
      )}
    </div>
  );
};

export default App;
