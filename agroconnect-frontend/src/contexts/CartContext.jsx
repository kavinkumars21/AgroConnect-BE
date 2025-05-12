import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (crop, quantity) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.crop.id === crop.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.crop.id === crop.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { crop, quantity }];
      }
    });
  };

  const removeItem = (cropId) => {
    setItems(prevItems => prevItems.filter(item => item.crop.id !== cropId));
  };

  const updateQuantity = (cropId, quantity) => {
    if (quantity < 1) {
      removeItem(cropId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.crop.id === cropId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.crop.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalPrice,
      totalItems,
    }}>
      {children}
    </CartContext.Provider>
  );
};