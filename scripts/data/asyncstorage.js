import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Store Data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data saved successfully');
  } catch (e) {
    console.log('Error saving data', e);
  }
};

// 2. Retrieve Data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved value:', value);
      return value;
    }
  } catch (e) {
    console.log('Error retrieving data', e);
  }
};

// 3. Remove Data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed');
  } catch (e) {
    console.log('Error removing data', e);
  }
};

// 4. Store Object
export const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(key, jsonValue)
  } catch (e) {
    console.log('Error storing object', e);
  }
};

// 5. Retrieve Object
export const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error retrieving object', e);
  }
};

// 6. Clear All Data
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All data cleared');
  } catch (e) {
    console.log('Error clearing data', e);
  }
};



