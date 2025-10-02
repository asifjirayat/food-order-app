const Checkout = () => {
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
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-700 rounded-xl">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="font-semibold">Order Summary</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
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
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="w-24 text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
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

        {/* Checkout form - static */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-700 rounded-xl">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="font-semibold">Contact & Delivery</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-sm text-gray-300"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="John Doe"
                  disabled
                  formNoValidate
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="johndoe@example.com"
                  disabled
                  formNoValidate
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm text-gray-300"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="1234567890"
                  disabled
                  formNoValidate
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-1 text-sm text-gray-300"
                ></label>
                <textarea
                  id="address"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Flat, Street, City"
                  rows="3"
                  disabled
                  formNoValidate
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="font-semibold">Payment</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Card Number
                </label>
                <input
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="•••• •••• •••• ••••"
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-300">
                    Expiry
                  </label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                    placeholder="MM/YY"
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm text-gray-300">
                    CVC
                  </label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                    placeholder="123"
                    disabled
                  />
                </div>
              </div>
              <button
                className="w-full py-3 rounded bg-orange-500 text-white font-semibold opacity-70 cursor-not-allowed"
                title="Static version - disabled"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Static success placeholder */}
          <div className="text-sm text-gray-400">
            Note: This is the static version. Interactivity (form submission,
            validation, saving order) will be added next.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
