import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const isItemInCart = cartItems.find(item => item.id === productToAdd.id);

    if (isItemInCart){
        return cartItems.map(item => {
            if (item.id === productToAdd.id){
                item.quantity++;
            }
            
            return item;
        });
    }

    return [ ...cartItems, { ...productToAdd, quantity: 1 } ];
}

export const CartContext = createContext({
    // isCartOpen: false,
    // setIsCartOpen: () => {},
    // cartItems: [],
    // addItemToCart: () => {},
    // cartCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((quantityAccumulator, nextItem) => quantityAccumulator + nextItem.quantity , 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};