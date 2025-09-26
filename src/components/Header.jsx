import { memo } from "react";

const Header = memo(() => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-orange-500">🍔 QuickBite</h1>
        <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors cursopo">
          Cart (0)
        </button>
      </div>
    </header>
  );
});

export default Header;
