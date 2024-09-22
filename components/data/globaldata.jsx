import React, { createContext, useContext, useState ,useEffect } from 'react';

const DataContext = createContext();

// Custom hook to use the DataContext
export const useDataGuard = () => useContext(DataContext);

// Provider component to wrap around your app
export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({
    recipes:[],
    groceries:[],
    cart:[],
    username:'',
    email:'',

  });
  useEffect(() => {
    console.log(user,'userupdated')

    return () => {
      // Cleanup code (optional)
    };
  }, [user]);
  const updateData = (dataname,newdata) => {
    setUser((prev) => ({
      ...prev,
      [dataname]: newdata, // Dynamically update the access state for the specific page
    }));
  };

  const resetData = () => {
    setUser({
        recipes:[],
        groceries:[],
        cart:[],
        username:'',
        email:'',
    
      });
  };

  return (
    <DataContext.Provider value={{ user, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};
