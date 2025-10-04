import { useActionState } from "react";
import { submitOrder } from "../actions/submitOrder.js";
import { useCart } from "../context/CartContext.jsx";

const Checkout = ({ onSuccess, onCancel }) => {
  const { items, total, clearCart } = useCart();

  // Calculate subtotal and taxes
  const subTotal = total / 1.08 || 0;
  const taxes = total - subTotal;

  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    errors: {},
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    async (currentState, formData) => {
      // Pass cart items and total to submitOrder
      const stateWithCart = {
        ...currentState,
        items: items,
        total: total,
      };

      const result = await submitOrder(stateWithCart, formData);

      if (result.success) {
        clearCart();
        onSuccess();
      }

      return result;
    },
    initialState
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>
      <button
        onClick={onCancel}
        className="text-gray-400 hover:text-white mb-8 transition-colors"
      >
        ← Back to Menu
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-700 rounded-xl">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="font-semibold">Order Summary</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-400">Your cart is empty.</p>
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
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="w-24 text-right font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>
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
          </div>
        </div>

        {/* Checkout form */}
        <form action={formAction} className="space-y-6" noValidate>
          {/* Contact & Delivery Fields */}
          {[
            { label: "Full Name", id: "fullName", type: "text" },
            { label: "Email", id: "email", type: "email" },
            { label: "Phone", id: "phone", type: "tel" },
          ].map(({ label, id, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block mb-1 text-sm text-gray-300">
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                className={`w-full bg-gray-800 border rounded px-3 py-2 ${
                  state.errors[id]
                    ? "border-red-600 focus:border-red-600"
                    : "border-gray-700 focus:border-orange-500"
                }`}
                defaultValue={state[id]}
                aria-invalid={!!state.errors[id]}
                aria-describedby={`${id}-error`}
              />
              {state.errors[id] && (
                <p id={`${id}-error`} className="text-red-600 text-xs mt-1">
                  {state.errors[id]}
                </p>
              )}
            </div>
          ))}

          <div>
            <label
              htmlFor="address"
              className="block mb-1 text-sm text-gray-300"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              className={`w-full bg-gray-800 border rounded px-3 py-2 resize-none ${
                state.errors.address
                  ? "border-red-600 focus:border-red-600"
                  : "border-gray-700 focus:border-orange-500"
              }`}
              defaultValue={state.address}
              aria-invalid={!!state.errors.address}
              aria-describedby="address-error"
            ></textarea>
            {state.errors.address && (
              <p id="address-error" className="text-red-600 text-xs mt-1">
                {state.errors.address}
              </p>
            )}
          </div>

          {/* Payment Fields */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-300 mb-4">Payment</h3>
            <div>
              <label
                htmlFor="cardNumber"
                className="block mb-1 text-sm text-gray-300"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="•••• •••• •••• ••••"
                className={`w-full bg-gray-800 border rounded px-3 py-2 ${
                  state.errors.cardNumber
                    ? "border-red-600 focus:border-red-600"
                    : "border-gray-700 focus:border-orange-500"
                }`}
                defaultValue={state.cardNumber}
                aria-invalid={!!state.errors.cardNumber}
                aria-describedby="cardNumber-error"
              />
              {state.errors.cardNumber && (
                <p id="cardNumber-error" className="text-red-600 text-xs mt-1">
                  {state.errors.cardNumber}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="block mb-1 text-sm text-gray-300"
                >
                  Expiry
                </label>
                <input
                  id="expiry"
                  name="expiry"
                  type="text"
                  placeholder="MM/YY"
                  className={`w-full bg-gray-800 border rounded px-3 py-2 ${
                    state.errors.expiry
                      ? "border-red-600 focus:border-red-600"
                      : "border-gray-700 focus:border-orange-500"
                  }`}
                  defaultValue={state.expiry}
                  aria-invalid={!!state.errors.expiry}
                  aria-describedby="expiry-error"
                />
                {state.errors.expiry && (
                  <p id="expiry-error" className="text-red-600 text-xs mt-1">
                    {state.errors.expiry}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cvc"
                  className="block mb-1 text-sm text-gray-300"
                >
                  CVC
                </label>
                <input
                  id="cvc"
                  name="cvc"
                  type="text"
                  placeholder="123"
                  className={`w-full bg-gray-800 border rounded px-3 py-2 ${
                    state.errors.cvc
                      ? "border-red-600 focus:border-red-600"
                      : "border-gray-700 focus:border-orange-500"
                  }`}
                  defaultValue={state.cvc}
                  aria-invalid={!!state.errors.cvc}
                  aria-describedby="cvc-error"
                />
                {state.errors.cvc && (
                  <p id="cvc-error" className="text-red-600 text-xs mt-1">
                    {state.errors.cvc}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded font-semibold text-white cursor-pointer ${
              isPending
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-400"
            }`}
          >
            {isPending ? "Placing Order..." : "Place Order"}
          </button>

          {/* Success/Error Messages */}
          {state.success && (
            <p className="bg-green-50 border-green-500 rounded p-4 mt-4 text-green-500 text-center">
              {state.message}
            </p>
          )}
          {!state.success && Object.keys(state.errors).length > 0 && (
            <p className="bg-red-50 border border-red-600 rounded p-4 mt-4 text-red-600 text-center">
              Please fix the errors above.
            </p>
          )}
          {state.errors.submit && (
            <p className="bg-red-50 border border-red-600 rounded p-4 mt-4 text-red-600 text-center">
              {state.errors.submit}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;
