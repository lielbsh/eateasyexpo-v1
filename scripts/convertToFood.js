// convertToFood.js
import foodData from '../assets/data/Food.json'; // Import the food data from JSON

// Helper function to convert indexes into food list items
export const convertToFoodList = (indexes) => {
  return indexes.map(index => {
    const numIndex = parseInt(index, 10); // Convert index to a number
    return foodData.find(foodItem => foodItem.id === numIndex);
  });
};


  // Example usage:
  const toBuyIndexes = ['1', '3', '5', '9', '10', '30', '34','59']; // These are the indices you get for "to buy" items
  const atHomeIndexes = ['2', '4', '7']; // These are the indices for "at home" items
  
  export const toBuyList = convertToFoodList(toBuyIndexes);
  export const atHomeList = convertToFoodList(atHomeIndexes);
