import React, { createContext, useContext, useState ,useEffect } from 'react';
import { storeObject, getObject,removeData } from '../../scripts/data/asyncstorage';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updaterecipescloud,updategroceriesandcartcloud} from "../../scripts/regesterScript/cloud"
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
    changes:[],
    action:'',
    login:'',
    updateoption:{name:'every week',
      value:604800000}
    

  });
  ///delete afterrrreegjfodfjeorejroejroejroejroejroejrorjeorjeorjeorjeorjeorjerojere
  useEffect(() => {
    //console.log(user,'userupdated')

    return () => {
      // Cleanup code (optional)
    };
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const savedUser = await getObject('userData');
      if (savedUser) {
        setUser(savedUser);
        updateData('login','loged In')
      }
      
    };
    const checkTokenExpiration = async () => {
      let cookieString = await AsyncStorage.getItem('jwt'); // Retrieve the token and expiration
      if (cookieString) {
        let expiration = new Date (cookieString.split('Expires=')[1].split(';')[0]).getTime();
        
        const now = Date.now();
  
        // Assuming expiration is in milliseconds, compare current time with expiration
        if (expiration && now < expiration) {
          console.log('Token is valid');
          // Continue with authenticated user flow
          fetchData()
          
        } else {
          console.log('Token expired');
          updateData('login','Not loged In')
        }
      } else {
        console.log('No token data found');
        updateData('login','Not loged In')
      }
    };
  
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        checkTokenExpiration(); // Check when the app becomes active
      }
    };
  
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    checkTokenExpiration();
    return () => {
      subscription.remove(); // Clean up event listener
    };
  }, []);
  
  
    // Save user data to AsyncStorage
    useEffect(() => {
      const saveData = async () => {
        await storeObject('userData', user);
        
         // Store the updated user data
      };
      const storedataoncloud= async()=>{
        let lastUpdateDate=await getObject('lastUpdate')
        const now=Date.now()
        if (now>(lastUpdateDate+user.updateoption.value)){
          await updaterecipescloud(user.changes)
          updateData('changes',[])
          await updategroceriesandcartcloud(user.groceries,user.cart)
          await storeObject('lastUpdate',now)
        }
      }
      if (user.username!=''){
        const updateDataFlow = async () => {
          await storedataoncloud();
          await saveData();
        };
    
        // Execute the async update flow
        updateDataFlow();
        
      }
      ; // Call the save function when user state changes
    }, [user]);
    

  const updateData = (dataname,newdata) => {
    setUser((prev) => ({
      ...prev,
      [dataname]: newdata, // Dynamically update the access state for the specific page
    }));
    
  };
  const updateCart = (newCart, newGroceries) => {
    setUser((prev) => ({
      ...prev,
      cart: newCart,
      groceries: newGroceries,
    }));
  };

  const resetData = () => {
    setUser({
      recipes:[],
      groceries:[],
      cart:[],
      username:'',
      email:'',
      changes:[],
      action:'',
      login:'Not loged In',
      updateoption:{name:'every week',
        value:604800000}
      
  
    
      });
  };

  return (
    <DataContext.Provider value={{ user, updateData, updateCart,resetData }}>
      {children}
    </DataContext.Provider>
  );
};



