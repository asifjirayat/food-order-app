const CartModal = () => {
  // Static placeholer items
  const items = [
    {
      id: 1,
      name: "Classic Burger",
      price: 12.99,
      quantity: 1,
      image: "/images/burger.jpg",
    },
    {
      id: 2,
      name: "Crispy Fries",
      price: 5.99,
      quantity: 2,
      image: "/images/fries.jpg",
    },
  ];

  const subTotal = 12.99 + 5.99 * 2;
  const taxes = Math.round(subTotal * 0.08 * 100) / 100;
  const total = Math.round((subTotal + taxes) * 100) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Modal panel */}
      <div className="relative w-full max-w-xl mx-4 bg-gray-900 border border-gray-700 rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            x
          </button>
        </div>

        {/* Items */}
        <div className="max-h-[50vh] overflow-auto px-6 py-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover border border-gray-700"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">Qty:</span>
                <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700">
                  {item.quantity}
                </span>
              </div>
              <div className="w-20 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="px-6 py-4 border-t border-gray-700 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Taxes (8%)</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex justify-between gap-3 border-t border-gray-700">
          <button className="px-4 py-2 rounded border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors">
            Continue Shopping
          </button>
          <button
            className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-400 transition-colors text-white"
            disabled
            title="Static version - disabled"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
