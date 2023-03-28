import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map(item => {
            if (item.id === productToAdd.id) {
                item.quantity++;
            }

            return item;
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(item => {
        return item.id === cartItemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
    });
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    // isCartOpen: false,
    // setIsCartOpen: () => {},
    // cartItems: [],
    // addItemToCart: () => {},
    // cartCount: 0,
    // removeItemFromCart: () => {},
    // clearItemFromCart: () => {},
    // cartTotal: 0,
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return ({
                ...state,
                ...action.payload
            });
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return ({
                ...state,
                isCartOpen: payload
            });
        default:
            throw new Error(`Error ${type}`);
    }
}

export const CartProvider = ({ children }) => {
    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((quantityAccumulator, nextItem) => quantityAccumulator + nextItem.quantity, 0);

        const newTotalPrice = newCartItems.reduce((quantityAccumulator, nextItem) => quantityAccumulator + nextItem.quantity * nextItem.price, 0);

        dispatch( createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newTotalPrice, cartCount: newCartCount}));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemToCart,
        clearItemFromCart,
        cartTotal
    };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};