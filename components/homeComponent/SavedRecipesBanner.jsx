import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import RecipeModal from "../recipesComponent/RecipeModal";
import { extractRecipe } from "../../scripts/puppeteer/extractRecipe";

const SavedRecipesBanner = ({ _savedItems }) => {
  const [displayRecipe, setDisplayRecipe] = useState(false); // state of the recipeModal
  const [openRecipe, setOpenRecipe] = useState();
  const [recipeData, setRecipeData] = useState();

  // Function to open saved recipes modal
  const pressHandeler = async (result) => {
    let recipe = await extractRecipe({ recipeURL: result.href });
    setRecipeData(recipe);
    setDisplayRecipe(true);
  };

  // Function to render saved recipes
  const renderSavedRecipes = () => {
    return _savedItems.map((item, index) => (
      <View key={index} className="w-[202px] rounded-[10px] items-center">
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-[200px] rounded-[9px] items-center justify-center"
          onPress={() => {
            pressHandeler(item);
            setOpenRecipe(item);
          }}
        >
          <View
            style={{
              width: 195,
              height: 145,
              marginTop: 5,
            }}
          >
            <Image
              source={{ uri: item.photosrc }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
            />
          </View>
          <View className="absolute bottom-[0px] w-[195px] bg-black/50 py-2 px-4 rounded-b-lg items-center">
            <Text className="text-[15px] font-bold text-white shadow-md">
              {item.title}
            </Text>
          </View>
          {/* <Text className="text-[20px] font-bold color-shadow my-[5px] max-w-[190px] max-h-[30px]">{item.name}</Text> */}
        </TouchableOpacity>
      </View>
    ));
  };
  return (
    <View
      className="h-[210px] mt-[30px] rounded-[10px] p-[5px] pl-[15px]"
      style={{ backgroundColor: "rgba(255, 254, 252,0.7)" }}
    >
      <RecipeModal
        _state={displayRecipe}
        _toggleRecipeMode={() => {
          setDisplayRecipe(!displayRecipe);
        }}
        _recipe={openRecipe}
        _recipeData={recipeData}
      />

      <Text className="text-[20px] font-bold color-shadow mb-[15px] mt-[3px]">
        Some of the dishes you saved
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="h-[200px] space-x-[0px]"
      >
        {renderSavedRecipes()}
      </ScrollView>
    </View>
  );
};

export default SavedRecipesBanner;
