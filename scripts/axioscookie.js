import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For manual storage of cookies
//https://eateasyserver.onrender.com
// Create an Axios instance
const api = axios.create({
  baseURL: 'http://10.100.102.151:3000', // Your backend URL
  withCredentials: true
});

// Request Interceptor to manually add cookies
api.interceptors.request.use(
  async (config) => {
    // Retrieve the manually stored cookie
    
    console.log(config.headers,'hi')
    if (!config.headers['Cookie']) {
      // No cookie present in the request, so retrieve it from AsyncStorage
      let cookieString = await AsyncStorage.getItem('jwt'); // Use 'jwt' as your cookie key in AsyncStorage
      
      if (cookieString) {
        let token = cookieString.split(';')[0].split('=')[1];
        // If there's a cookie stored in AsyncStorage, add it to the request headers
        config.headers['Cookie'] = token; 
        console.log("JWT cookie added to request from AsyncStorage:", cookieString);
      } else {
        console.log("No JWT cookie found in AsyncStorage.");
      }
    } 
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// Response Interceptor to manually save cookies from the response
api.interceptors.response.use(
  async (response) => {
    
    
    if (response.headers['set-cookie']) {
      let jwtCookie = response.headers['set-cookie'][0]
      // Save the cookie to AsyncStorage for future use
      await AsyncStorage.setItem('jwt', jwtCookie);
      console.log('JWT cookie saved from response:', jwtCookie);
    }
    
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;  
