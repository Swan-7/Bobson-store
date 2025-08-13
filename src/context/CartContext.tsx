import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Product, CartItem } from "../types";

type State = { items: CartItem[] };
type Action =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "INCREMENT_ITEM"; productId: string }
  | { type: "DECREMENT_ITEM"; productId: string }
  | { type: "CLEAR_CART" };

  const initalState: State = { items: [] };

  export function cartReducer(state: State, action: Action): State {
    switch (action.type) {

        case "ADD_ITEM": {
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.uuid === action.product.uuid
            );

            if (existingItemIndex >= 0) {
                return {
                items: state.items.map((item, index) =>
                    index === existingItemIndex
                    ? { ...item, quantity: item.quantity + action.quantity }
                    : item
                ),
                };
            }
            
            return {
                items: [
                ...state.items,
                { product: { ...action.product }, quantity: action.quantity },
                ],
            };
        }


        case "REMOVE_ITEM": {
            return { items: state.items.filter(item => item.product.uuid !== action.productId)}
        }
        case "INCREMENT_ITEM": {
            return {
                items: state.items.map(item => 
                    item.product.uuid === action.productId ? { ...item, quantity: item.quantity + 1 } : item)
            };
        }
        case "DECREMENT_ITEM": {
            return {
                items: state.items.map(item => item.product.uuid === action.productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item).filter(item => item.quantity > 0)
            };
        }
        case "CLEAR_CART": return { items: [] };
        default: return state;
    }
};

const CartStateContext = createContext<State | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initalState, (init) => {
        try {
            const raw = localStorage.getItem("cart");
            return raw ? JSON.parse(raw) : init;
        } catch (error) {
            console.warn("Failed to parse cart from localStorage:", error);
            return init;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(state));
        } catch (error) {
            console.warn("Failed to save cart to localStorage:", error);
        }
    }, [state]);

    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

export function useCartState(): State {
    const context = useContext(CartStateContext);
    if (!context) throw new Error("useCartState must be used within a CartProvider");
    return context;
}

export function useCartDispatch() {
    const context = useContext(CartDispatchContext);
    if (!context) throw new Error("useCartDispatch must be used within a CartProvider");
    return context;
}

export function useCart() {
    const state = useCartState();
    const dispatch = useCartDispatch();

    const add = (product: Product) => dispatch({ type: "ADD_ITEM", product, quantity: 1 });
    const remove = (productId: string) => dispatch({ type: "REMOVE_ITEM", productId });
    const increment = (productId: string) => dispatch({ type: "INCREMENT_ITEM", productId });
    const decrement = (productId: string) => dispatch({ type: "DECREMENT_ITEM", productId });
    const clear = () => dispatch({ type: "CLEAR_CART" });

    const total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return {
        items: state.items,
        add,
        remove,
        increment,
        decrement,
        clear,
        total,};
    }
