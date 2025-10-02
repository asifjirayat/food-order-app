import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";

const CartContext = createContext(null);

const initialState = { items: [] };

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.payload.id);

      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback(
    (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    []
  );

  const removeItem = useCallback(
    (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
    []
  );

  const updateQuantity = useCallback(
    (id, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const count = useMemo(
    () => state.items.reduce((acc, item) => acc + item.quantity, 0),
    [state.items]
  );

  const total = useMemo(
    () =>
      state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      count,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [state.items, count, total, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
