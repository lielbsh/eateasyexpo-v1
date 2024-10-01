// convertToFood.js
import foodData from '../assets/data/Food.json'; // Import the food data from JSON

// Helper function to convert indexes into food list items
export const convertToFoodList = (indexes) => {
  return indexes.map(index => {
    const numIndex = parseInt(index, 10); // Convert index to a number
    return foodData.find(foodItem => foodItem.id === numIndex);
  });
}

// Helper function to convert food list items into indexes
export const convertToIndexes = (foodList) => {
  return foodList.map(foodItem => foodItem.id.toString());
};