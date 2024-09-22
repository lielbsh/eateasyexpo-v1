import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

// Custom hook to use the NavigationContext
export const useNavigationGuard = () => useContext(NavigationContext);

// Provider component to wrap around your app
export const NavigationProviderGaurd = ({ children }) => {
  const [access, setAccess] = useState({
    canAccessVerify: false,
    canAccessNewPassword: false,
    canAccessOtherPages: false,
  });

  const allowAccess = (page) => {
    setAccess((prev) => ({
      ...prev,
      [page]: true, // Dynamically update the access state for the specific page
    }));
  };

  const resetAccess = () => {
    setAccess({
      canAccessVerify: false,
      canAccessNewPassword: false,
      canAccessOtherPages: false,
    });
  };

  return (
    <NavigationContext.Provider value={{ access, allowAccess, resetAccess }}>
      {children}
    </NavigationContext.Provider>
  );
};
