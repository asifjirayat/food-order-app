const OrderSuccess = ({ onBackToMenu }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-12 space-y-6">
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Success message */}
      <h2 className="text-3xl font-bold text-green-500">
        Order Placed Successfully
      </h2>
      <p className="text-gray-400">
        Thank you for your order. Your delicious food is being prepared and will
        be delivered soon.
      </p>

      {/* Order details */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-left">
        <h3 className="font-semibold mb-2">What's Next?</h3>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>Your order has been confirmed</li>
          <li>Estimated delivery time: 30-40 minutes</li>
          <li>You'll receive updates via email</li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 justify-center pt-4">
        <button
          onClick={onBackToMenu}
          className="px-6 py-3 rounded bg-orange-500 hover:bg-orange-400 transition-colors text-white font-stretch-semi-condensed cursor-pointer"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
