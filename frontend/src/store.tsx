/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import type { Cart, CartItem } from "./types/Carts";

//This line declares a TypeScript type AppState, which represents the SHAPE OF THE APPLICATION STATE. It defines an object with a property mode of type string. The AppState type will be used to ensure that the state object always follows this structure.
type AppState = {
  mode: string;
  cart: Cart;
};

//This code defines a function called getInitialMode. It checks if the window object is available (to prevent errors during server-side rendering), and if so, it tries to get the "mode" value from the localStorage. If there's a stored mode, it returns that value; otherwise, it checks the preferred color scheme of the user's browser using window.matchMedia and returns "dark" if it matches, otherwise "light". This function is used to SET the initial value of the mode property in the state.
const getInitialMode = (): string => {
  if (typeof window !== "undefined") {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      return storedMode;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

//the initialState object is used as the starting state for the state management system in the application.
const initialState: AppState = {
  mode: getInitialMode(),
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : { location: {} },
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

//type: "SWITCH_MODE" This represents an action of type "SWITCH_MODE". When this action is dispatched, it indicates that the mode of the application should be switched. It does not require any additional data (payload) to be dispatched.
//type: "CART_ADD_ITEM"; payload: CartItem This represents an action of type "CART_ADD_ITEM". When this action is dispatched, it indicates that an item should be added to the shopping cart. It includes a payload property, which is of type CartItem, to carry the information of the item to be added.In TypeScript, the Action type is used to ensure that only valid actions can be dispatched, and it provides type safety for action creators and reducers. For example, when dispatching an action of type "SWITCH_MODE", it is guaranteed that there will be no payload, and when dispatching an action of type "CART_ADD_ITEM", it is required to provide a valid CartItem object as the payload.
type Action =
  | { type: "SWITCH_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItem };

// The main purpose of `useReducer` is to manage state based on actions. It takes two arguments" a reducer and an initial state.
// Reducer function: The reducer function takes two arguments, the current state and an action, and returns the new state based on the action. The action is an object that describes what kind of state change you want to make. The reducer function is responsible for updating the state based on the action's type.
//initial state: The initial state value is the starting point for your state. It defines what the state should look like before any actions are applied.
//The useReducer hook returns an array with two elements:
//1.The current state: This is the current value of your state.
//2. A "dispatch" function: The dispatch function is used to send actions to the reducer. When you call dispatch with an action, the reducer function is triggered, and it returns the new state based on the action.

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
    case "CART_ADD_ITEM":
      //This line extracts the payload property from the action object and assigns it to the variable newItem. The payload is expected to be an object representing the new item to be added to the cart.
      const newItem = action.payload;
      //This line checks if the newItem already exists in the shopping cart (state.cart.cartItems). It uses the find method to search for an item in the cart with the same _id as the newItem. If it finds a matching item, it assigns it to the variable existItem, otherwise, it remains undefined.
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      //This line is a conditional statement that updates the cartItems in the shopping cart based on whether the newItem already exists in the cart or not. If existItem is not undefined, it means the newItem exists in the cart, so it updates the cart item. If it doesn't exist, it adds the newItem to the cart.
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      //This line returns a new state object with the updated cartItems inside the cart property. It uses the spread operator (...) to create a shallow copy of the original state object and only modifies the cartItems property inside the cart.
      return { ...state, cart: { ...state.cart, cartItems } };
    default:
      return state;
  }
}

//The Store context is initialized with an object that has two properties:
//1.state: The state property is set to the initialState, which is the starting point for your application state.
//2.dispatch: The dispatch property is set to the defaultDispatch function we defined earlier. This means that if a component consumes the Store context and doesn't explicitly provide a dispatch value, it will use the defaultDispatch function by default.
const defaultDispatch: React.Dispatch<Action> = () => initialState;
const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

//In summary, the StoreProvider component sets up the application's state management using the useReducer hook. It then provides the state and dispatch function to all its child components using the Store.Provider. This allows the child components to access and update the state of the application.
//The dispatch function allows you to trigger actions such as "SWITCH_MODE" or "CART_ADD_ITEM", and the reducer function will take care of updating the state accordingly based on the action.
function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );
  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
