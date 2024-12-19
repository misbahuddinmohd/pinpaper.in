// // src/context/OrdersContext.js
// import React, { createContext, useContext, useState, useCallback } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext';
// import Api from '../Api';

// const OrdersContext = createContext();

// export const useOrders = () => useContext(OrdersContext);

// export const OrdersProvider = ({ children }) => {
//   const { isLoggedIn, userID } = useAuth();
//   const [ordersItems, setOrdersItems] = useState([]);
//   console.log('Orderstitems: ', ordersItems);
//   // const totalPrice = cartItems ? cartItems.reduce((total, item) => total + item.articleAmount || 0, 0) : 0;

//   const fetchOrdersItems = useCallback(async () => {
//     if (!isLoggedIn) return;
//     try {
//       // const response = await axios.get(`${process.env.REACT_APP_HOSTURL}/api/v1/cart/getCartItems?userID=7993924730`);
//       const response = await Api.get(`${process.env.REACT_APP_BASEURL}/api/v1/orders/getOrders`);
//       console.log(response.data);
//       let ordersData = response.data.data;
//       // cartData = cartData.map((item) => {
//       //   return {
//       //     ...item,
//       //     files: item.filesDetails || [], // Copy filesDetails and add tp 'files' property
//       //   };
//       // });
//       console.log('ordersData: ', ordersData);
//       setOrdersItems(ordersData);
//     } catch (error) {
//       console.error('Failed to fetch orders items:', error);
//     }
//   }, []);

//   return (
//     <OrdersContext.Provider value={{ ordersItems, setOrdersItems, fetchOrdersItems }}>
//       {children}
//     </OrdersContext.Provider>
//   );
// };





import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Api from '../Api';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
  const { isLoggedIn, loading: authLoading  } = useAuth();
  const [ordersItems, setOrdersItems] = useState([]);

  const fetchOrdersItems = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const response = await Api.get(`${process.env.REACT_APP_BASEURL}/api/v1/orders/getOrders`);
      console.log('Fetched orders data:', response.data);
      setOrdersItems(response.data.data);
    } catch (error) {
      console.error('Failed to fetch orders items:', error);
      // Optionally, add user-facing error handling here
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      fetchOrdersItems();
    } else {
      setOrdersItems([]); // Clear orders when logged out
    }
  }, [authLoading, isLoggedIn, fetchOrdersItems]);

  return (
    <OrdersContext.Provider value={{ ordersItems, setOrdersItems, fetchOrdersItems }}>
      {children}
    </OrdersContext.Provider>
  );
};
