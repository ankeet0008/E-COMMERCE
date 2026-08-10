import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'generalstore_cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [coupon, setCoupon] = useState(null); // active coupon code string

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((productId, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === productId);
      if (existing) {
        return prev.map(i => i.id === productId ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { id: productId, qty }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== productId));
      return;
    }
    setItems(prev => prev.map(i => i.id === productId ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const applyCoupon = useCallback((code) => {
    const validCodes = ['DIS23', 'SAVE10', 'FLAT500'];
    const upperCode = code.toUpperCase();
    if (validCodes.includes(upperCode)) {
      setCoupon(upperCode);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const getCount = useCallback(() => {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }, [items]);

  // Comprehensive totals calculator
  const getCartTotals = useCallback((products) => {
    const subtotal = items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      if (!product) return sum;
      const price = product.sale ? product.salePrice : product.price;
      return sum + price * item.qty;
    }, 0);

    let discountAmount = 0;
    if (coupon === 'DIS23') {
      discountAmount = subtotal * 0.23;
    } else if (coupon === 'SAVE10') {
      discountAmount = subtotal * 0.10;
    } else if (coupon === 'FLAT500') {
      discountAmount = Math.min(500, subtotal);
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const gstAmount = discountedSubtotal * 0.18; // 18% GST
    const shipping = discountedSubtotal > 2000 ? 0 : 150; // Free delivery over ₹2000
    const grandTotal = discountedSubtotal + gstAmount + shipping;

    return {
      subtotal,
      discountAmount,
      gstAmount,
      shipping,
      grandTotal
    };
  }, [items, coupon]);

  return (
    <CartContext.Provider value={{
      items, coupon, addItem, removeItem, updateQty, clearCart, getCount,
      applyCoupon, removeCoupon, getCartTotals
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
