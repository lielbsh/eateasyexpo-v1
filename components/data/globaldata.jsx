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
    changes:[['ADD',{title:'Homemade Vanilla Pudding',photolink:'https://www.allrecipes.com/thmb/Jb5RxxSsfbgxhUqGgdXr__0lXFY=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20586-homemade-vanilla-pudding-DDMFS-4x3-b69285facb244125bed3db6ad4cf2d9f.jpg',link:'https://www.allrecipes.com/recipe/20586/homemade-vanilla-pudding/',recipe:''}]]

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
        changes:[]
    
      });
  };

  return (
    <DataContext.Provider value={{ user, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};
