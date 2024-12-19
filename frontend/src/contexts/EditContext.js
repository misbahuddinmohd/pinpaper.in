import React, { createContext, useContext, useState } from 'react';

const EditContext = createContext();

export const EditProvider = ({ children }) => {
  const [editItem, setEditItem] = useState(null);

  return (
    <EditContext.Provider value={{ editItem, setEditItem }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => {
    const context = useContext(EditContext);
    if (!context) {
      throw new Error('useEdit must be used within an EditProvider');
    }
    return context;
  };