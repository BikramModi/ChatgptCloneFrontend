import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [hideBadge, setHideBadge] = useState(false);

    // 🔁 Always load cart from backend
    const fetchCart = async () => {
        try {
            const res = await api.get("/cartItems/getCartItems");

            // 🔥 IMPORTANT: adapt this if your backend returns { cart: [...] }
            setCartItems(res.data.data || []);
        } catch (err) {
            console.error("Fetch cart failed", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // 🛒 Add to cart
    const addToCart = async (productId, quantity = 1) => {
        const res = await api.post("/cartItems", {
            product: productId,
            quantity,
        });

        // 🔥 IMPORTANT: update global state
        setCartItems(res.data.cart);

        return res.data;
    };


    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount: cartItems.length,
                addToCart,
                hideBadge,
                setHideBadge,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
