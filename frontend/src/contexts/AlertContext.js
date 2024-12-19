// // src/contexts/AlertContext.js

// import React, { createContext, useContext, useState } from 'react';

// // Create the context and custom hook
// const AlertContext = createContext();

// export const useAlert = () => useContext(AlertContext);

// export const AlertProvider = ({ children }) => {
//   const [alert, setAlert] = useState({ visible: false, message: '', type: '', duration});

//   const showAlert = (message, type = 'error') => {
//     setAlert({ visible: true, message, type });
    
//     // Automatically hide the alert after a few seconds
//     setTimeout(() => {
//       setAlert({ visible: false, message: '', type: '' });
//     }, alert.duration || 3000); // 3 seconds, adjust as needed
//   };

//   return (
//     <AlertContext.Provider value={{ alert, showAlert }}>
//       {children}
//     </AlertContext.Provider>
//   );
// };




import React, { createContext, useContext, useState, useRef } from 'react';

// Create the context and custom hook
const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
  const timeoutRef = useRef(null);

  const validTypes = ['error', 'success', 'info', 'warning'];

  const showAlert = (message, type = 'error', duration = 3000) => {
    // Validate the alert type
    if (!validTypes.includes(type)) {
      console.error(`Invalid alert type: ${type}. Defaulting to 'error'.`);
      type = 'error';
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set alert state
    setAlert({ visible: true, message, type });

    // Set a new timeout with the specified or default duration
    timeoutRef.current = setTimeout(() => {
      setAlert({ visible: false, message: '', type: '' });
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
