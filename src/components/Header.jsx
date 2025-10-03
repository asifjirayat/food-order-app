import { memo } from "react";

const Header = memo(({ title, cartCount, onCartClick }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-orange-500">{title}</h1>
        <button
          onClick={onCartClick}
          aria-label="Open cart"
          className="relative bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors cursor-pointer"
        >
          Cart{" "}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
});

export default Header;
