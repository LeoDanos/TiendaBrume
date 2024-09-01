import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const Provider = ({ children }) => {
    
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('cartItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const savedItems = localStorage.getItem('cartItems');
            setItems(savedItems ? JSON.parse(savedItems) : []);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    const reset = () => setItems([]);

    const addItem = (item) => {
        const alreadyExists = items.some((i) => i.id === item.id);

        if (alreadyExists) {
            const newItems = items.map((i) => {
                if (i.id === item.id) {
                    return { ...i, quantity: i.quantity + item.quantity };
                } else {
                    return i;
                }
            });
            setItems(newItems);
        } else {
            setItems((prev) => [...prev, item]);
        }
    };

    const removeItem = (id) => {
        const filter = items.filter(i => i.id !== id);
        setItems(filter);
    };

    const updateQuantity = (id, newQuantity) => {
        const updatedItems = items.map((item) => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setItems(updatedItems);
    };

    return (
        <CartContext.Provider value={{ addItem, items, removeItem, reset, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
