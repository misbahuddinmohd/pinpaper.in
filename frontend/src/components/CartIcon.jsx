// src/components/CartIcon.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  return (
    <div className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </div>
  );
};

export default CartIcon;
