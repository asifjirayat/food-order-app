import { createOrder } from "../utils/api.js";

export const submitOrder = async (currentState, formData) => {
  const newState = {
    ...currentState,
    fullName: formData.get("fullName")?.trim() || "",
    email: formData.get("email")?.trim() || "",
    phone: formData.get("phone")?.trim() || "",
    address: formData.get("address")?.trim() || "",
    cardNumber: formData.get("cardNumber")?.trim() || "",
    expiry: formData.get("expiry")?.trim() || "",
    cvc: formData.get("cvc")?.trim() || "",
    errors: {},
    success: false,
    message: "",
  };

  const errors = {};

  // Validation
  if (!newState.fullName) errors.fullName = "Full name is required";
  if (!newState.email || !/\S+@\S+\.\S+/.test(newState.email))
    errors.email = "Valid email is required";
  if (!newState.phone) errors.phone = "Phone number is required";
  if (!newState.address) errors.address = "Delivery address is required";
  if (!newState.cardNumber) errors.cardNumber = "Card number is required";
  if (!newState.expiry) errors.expiry = "Expiry date is required";
  if (!newState.cvc) errors.cvc = "CVC is required";

  if (Object.keys(errors).length > 0) {
    newState.errors = errors;
    return newState;
  }

  // Prepare order data
  try {
    const orderData = {
      customerInfo: {
        fullName: newState.fullName,
        email: newState.email,
        phone: newState.phone,
        address: newState.address,
      },
      cartItems: currentState.items || [],
      totalAmount: currentState.total || 0,
      orderDate: new Date().toISOString(),
      payment: {
        cardNumber: newState.cardNumber,
        expiry: newState.expiry,
        cvc: newState.cvc,
      },
    };

    const response = await createOrder(orderData);

    return {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      errors: {},
      success: true,
      message: `Order placed successfully! Order ID: ${
        response.orderId || response.id
      }`,
    };
  } catch (error) {
    return {
      ...newState,
      errors: { submit: "Failed to place order. Please try again." },
      success: false,
    };
  }
};
