// // src/context/CartContext.js
// import React, { createContext, useContext, useState, useCallback } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext';
// import Api from '../Api';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const { isLoggedIn, authLoading } = useAuth();
//   const [cartItems, setCartItems] = useState([]);
//   console.log('cartitems: ', cartItems);

//   const totalPrice = cartItems ? cartItems.reduce((total, item) => total + item.articleAmount || 0, 0) : 0;

//   const fetchCartItems = useCallback(async () => {
//     console.log('in cart context  api', isLoggedIn);
//     // if (!isLoggedIn) return;
//     try {
//       // const response = await axios.get(`${process.env.REACT_APP_HOSTURL}/api/v1/cart/getCartItems?userID=7993924730`);
//       const response = await Api.get('/api/v1/cart/getCartItems');
//       console.log(response.data);
//       let cartData = response.data.data;
//       cartData = cartData.map((item) => {
//         return {
//           ...item,
//           files: item.filesDetails || [], // Copy filesDetails and add tp 'files' property
//         };
//       });
//       console.log('cartData: ', cartData);
//       setCartItems(cartData);
//     } catch (error) {
//       console.error('Failed to fetch cart items:', error);
//     }
//   }, []);

//   const removeItemFromCart = async (itemId) => {
//     try {
//       // handle response fpr delete 
//       await axios.delete(`${process.env.REACT_APP_BASEURL}/api/v1/cart/deleteCartItem?userID=7993924730&articleID=${itemId}`);

//       setCartItems((prevItems) => prevItems.filter((item) => item.articleID !== itemId));
//     } catch (error) {
//       console.error('Failed to remove item from cart:', error);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, setCartItems, totalPrice, fetchCartItems, removeItemFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };





// src/context/CartContext.js
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Api from '../Api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isLoggedIn, authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false); // Tracks cart API loading state

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.articleAmount || 0),
    0
  );

  // Fetch cart items from the API
  const fetchCartItems = useCallback(async () => {
    if (!isLoggedIn) {
      setCartItems([]); // Clear cart if the user is not logged in
      return;
    }
    setLoading(true);
    try {
      const response = await Api.get(`/api/v1/cart/getCartItems`);
      const cartData = response.data.data.map((item) => ({
        ...item,
        files: item.filesDetails || [], // Add `files` property
      }));
      console.log('retrieved cart data: ', cartData);
      setCartItems(cartData);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Remove an item from the cart
  const removeItemFromCart = useCallback(
    async (itemId) => {

      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (!confirmDelete) return;

      try {
        // await axios.delete(
        //   `${process.env.REACT_APP_BASEURL}/api/v1/cart/deleteCartItem?articleID=${itemId}`
        // );
        await Api.delete(
          `/api/v1/cart/deleteCartItem?articleID=${itemId}`
        );

        setCartItems((prevItems) =>
          prevItems.filter((item) => item.articleID !== itemId)
        );
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
      }
    },
    []
  );

  // Automatically fetch cart items when user logs in
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      fetchCartItems();
    }
  }, [authLoading, isLoggedIn, fetchCartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        totalPrice,
        fetchCartItems,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
