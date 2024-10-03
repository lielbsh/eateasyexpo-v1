import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Adjust based on the icon library you're using
import { useDataGuard } from "../data/globaldata.jsx";

const HeartButton = ({ _recipe, _size, _floating }) => {
  const { user, updateData } = useDataGuard();

  // Determine if the recipe is saved based on global data
  const isLiked = user.recipes.some((item) => item.title === _recipe.title);

  const toggleLike = async () => {
    if (!isLiked) {
      // Add recipe to saved recipes
      const updatedRecipes = [...user.recipes, _recipe];
      await updateData("recipes", updatedRecipes);
      updateData("changes",[...user.changes,['ADD',_recipe]])
      console.log("saved:", _recipe.title);
    } else {
      // Remove recipe from saved recipes
      const updatedRecipes = user.recipes.filter(
        (item) => item.title !== _recipe.title
      );
      await updateData("recipes", updatedRecipes);
      console.log("removed:", _recipe.title);
    }
    console.log("all saved recipies:", user.recipes);
  };

  return (
    <TouchableOpacity
      onPress={toggleLike}
      className={`p-1 rounded-full ${
        _floating
          ? "p-2 bg-red shadow-md"
          : "absolute bg-white top-2 right-2 shadow-md"
      }`}
    >
      <Icon
        name={isLiked ? "heart" : "heart-outline"}
        size={_size} // Size of the heart icon
        color={
          isLiked && _floating
            ? "#ffadad"
            : isLiked && !_floating
            ? "#F1684B"
            : "#ccc"
        }
      />
    </TouchableOpacity>
  );
};

export default HeartButton;

// className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
