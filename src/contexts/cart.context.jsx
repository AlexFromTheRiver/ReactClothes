import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((quantityAccumulator, nextItem) => quantityAccumulator + nextItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((quantityAccumulator, nextItem) => quantityAccumulator + nextItem.quantity * nextItem.price, 0);
        setCartTotal(newTotalPrice);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

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