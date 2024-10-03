import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import RecipeModal from "../recipesComponent/RecipeModal";
import { extractRecipe } from "../../scripts/puppeteer/extractRecipe";
import { useDataGuard } from "../data/globaldata.jsx";
import LoadingModalSpiral  from "../custom/LoadingModalSpiral.jsx"

const SavedRecipesBanner = () => {
  const { user } = useDataGuard();
  const [displayRecipe, setDisplayRecipe] = useState(false);
  const [openRecipe, setOpenRecipe] = useState();
  const [recipeData, setRecipeData] = useState();
  const [selectedRecipes, setSelectedRecipes] = useState([]); // Define as state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Randomly select up to three recipes when the component mounts
    if (user.recipes.length > 0) {
      const shuffledRecipes = [...user.recipes].sort(() => 0.5 - Math.random());
      setSelectedRecipes(shuffledRecipes.slice(0, 3));
    } else {
      setSelectedRecipes([]);
      console.log("no saved recipes!");
    }
  }, [user.recipes]);

  const pressHandler = async (result) => {
    setLoading(true)
    const recipe = await extractRecipe({ recipeURL: result.href });
    
    setRecipeData(recipe);
    setOpenRecipe(result);
    setDisplayRecipe(true);
    setLoading(false)
  };

  const renderSavedRecipes = () => {
    return selectedRecipes.map((item, index) => (
      <View key={index} className="w-[202px] rounded-[10px] items-center">
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-[200px] rounded-[9px] items-center justify-center"
          onPress={() => pressHandler(item)}
        >
          <View style={{ width: 195, height: 145, marginTop: 5 }}>
            <Image
              source={{ uri: item.photosrc }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
              // Placeholder can be added here
            />
          </View>
          <View className="absolute bottom-[0px] w-[195px] bg-black/50 py-2 px-4 rounded-b-lg items-center">
            <Text className="text-[15px] font-bold text-white shadow-md">
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View
      className="flex-1 mt-[30px] mb-[25px] rounded-[10px] p-[5px] pl-[15px]"
      style={{
        backgroundColor: "rgba(255, 254, 252,0.7)",
        minHeight: selectedRecipes.length > 0 ? 200 : undefined, // Only set a minHeight if there are recipes
      }}
    >
      {displayRecipe && (
        <RecipeModal
          _state={displayRecipe}
          _toggleRecipeMode={() => setDisplayRecipe(!displayRecipe)}
          _recipe={openRecipe}
          _recipeData={recipeData}
        />
      )}
      <Text className="text-[20px] font-bold color-shadow mb-[15px] mt-[3px]">
        Remake your favorite dishes
      </Text>
      {selectedRecipes.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-[1px]"
        >
          {renderSavedRecipes()}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-[15px] text-center text-gray-500 mb-[5px]">
            Looks like you haven't saved any recipes yet!
          </Text>
          <Text className="text-[14px] text-center text-gray-400">
            Start adding your favorites. 🌟
          </Text>
        </View>
      )}
      <LoadingModalSpiral  _visible={loading} _opacity={0.5}/>
    </View>
  );
};

export default SavedRecipesBanner;
