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

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate success
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
    message: "Order placed successfully",
  };
};
