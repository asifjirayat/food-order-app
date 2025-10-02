import { useCart } from "../context/CartContext.jsx";

const CartModal = ({ onClose }) => {
  const { items, total, removeItem, updateQuantity } = useCart();

  const subTotal = total / 1.08;
  const taxes = total - subTotal;

  const onDecrement = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeItem(id);
    }
  };

  const onIncrement = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      {/* Modal panel */}
      <div className="relative w-full max-w-xl mx-4 bg-gray-900 border border-gray-700 rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            x
          </button>
        </div>

        {/* Items */}
        <div className="max-h-[50vh] overflow-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-400">Your cart is empty.</p>
          ) : (
            items.map((item) => (
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
                <div className="flex items-center gap-2">
                  <button
                    className="text-white bg-gray-700 hover:bg-gray-600 px-2 rounded"
                    onClick={() => onDecrement(item.id, item.quantity)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 rounded bg-gray-800 border border-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    className="text-white bg-gray-700 hover:bg-gray-600 px-2 rounded"
                    onClick={() => onIncrement(item.id, item.quantity)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <div className="w-20 text-right font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  x
                </button>
              </div>
            ))
          )}
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
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-400 transition-colors text-white"
            disabled={items.length === 0}
            title={items.length === 0 ? "Add items to your cart" : undefined}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
