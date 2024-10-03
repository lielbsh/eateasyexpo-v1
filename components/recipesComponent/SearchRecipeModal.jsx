import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants/index.js";
import HeartButton from "../custom/HeartButton.jsx";
import { searchScript } from "../../scripts/puppeteer/searchScript.js";
import { extractRecipe } from "../../scripts/puppeteer/extractRecipe.js";
import RecipeModal from "./RecipeModal.jsx";
import LoadingDots from "../custom/LoadingDots.jsx";
import { useDataGuard } from "../data/globaldata.jsx";
import LoadingModalSpiral from "../custom/LoadingModalSpiral.jsx";

const SearchRecipeModal = ({
  _searchMode,
  _toggleSearchMode,
  _title,
  _query,
  _autoSearch,
}) => {
  const { user, updateData, resetData } = useDataGuard();
  const [query, setQuery] = useState(_query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false); // Track recipe loading
  const [searchTriggered, setSearchTriggered] = useState(_autoSearch);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [displayRecipe, setDisplayRecipe] = useState(false); // state of the recipeModal
  const [openRecipe, setOpenRecipe] = useState();
  const [recipeData, setRecipeData] = useState();

  // Effect to handle search triggering
  useEffect(() => {
    if (searchTriggered && query) {
      const fetchData = async () => {
        setLoading(true);
        setSearchAttempted(true); // Mark that a search has been attempted
        try {
          const fetchedResults = await searchScript({ stringInput: query }); // Fetch search results
          setResults(fetchedResults);
        } catch (error) {
          console.error("Error fetching results: ", error);
        } finally {
          setLoading(false);
          setSearchTriggered(false); // Reset the flag after search
        }
      };

      fetchData();
    }
  }, [searchTriggered, query]);

  // Effect to reset state when modal opens
  useEffect(() => {
    if (_searchMode) {
      // Reset all relevant state variables
      setQuery(_query);
      setResults([]);
      setLoading(false);
      setSearchTriggered(_autoSearch);
      setSearchAttempted(false);
    }
  }, [_searchMode]);

  const handleSearch = () => {
    if (query) {
      setSearchTriggered(true);
    } // Set the flag to true to trigger the effect
  };

  const pressHandeler = async (result) => {
    setIsLoadingRecipe(true); // Show the loading spiral when fetching starts

    try {
      let recipe = await extractRecipe({ recipeURL: result.href });
      setRecipeData(recipe);
      setDisplayRecipe(true);
      setOpenRecipe(result); // Open the recipe modal
    } catch (error) {
      console.error("Error fetching recipe: ", error);
    } finally {
      setIsLoadingRecipe(false); // Hide the loading spiral once fetching is done
    }
  };

  const saveRecipeHandler = (item) => {
    let [liked, setLiked] = useState(user.recipes.includes(_recipe));
    if (!user.recipes.includes(item)) {
      // Add item to saved recipes if it's not already in the list
      updateData("recipes", [...user.recipes, item]);
      setLiked(true);
      console.log("saved:", item.title);
    } else {
      // Remove item from saved recipes if it's already in the list
      updateData(
        "recipes",
        user.recipes.filter((_recipe) => _recipe !== item)
      );
      setLiked(false);
      console.log("removed:", item.title);
    }
  };

  return (
    <Modal
      visible={_searchMode}
      transparent={true}
      animationType="fade"
      className="flex-1"
    >
      {/* Loading spiral modal */}
      <LoadingModalSpiral _visible={isLoadingRecipe} _opacity={0.6} />

      {/* Extract recipe modal */}
      <RecipeModal
        _state={displayRecipe}
        _toggleRecipeMode={() => {
          setDisplayRecipe(!displayRecipe);
        }}
        _recipe={openRecipe}
        _recipeData={recipeData}
      />

      <View className="flex-1 p-4 bg-background-offwhite opacity-95">
        {/* Return Button */}
        <TouchableOpacity onPress={_toggleSearchMode}>
          <Image
            source={icons.back}
            className="w-10 h-10 mt-[10%]"
            tintColor="grey"
          />
        </TouchableOpacity>

        {/* Search Bar */}
        <View className="my-4">
          <View className="flex-row items-center bg-background-shadow p-3 rounded-full shadow-sm opacity-[0.7]">
            <TextInput
              placeholder={_title}
              className="flex-1 color-offwhite text-bold"
              placeholderTextColor={"white"}
              maxLength={15}
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Image source={icons.search} className="w-6 h-6 mr-2" />
            </TouchableOpacity>
          </View>

          {/* Displaying Search Results */}
          {loading ? (
            <>
              <LoadingDots />
              <LoadingModalSpiral />
            </>
          ) : searchAttempted && results.length === 0 ? (
            <View className="items-center justify-center mt-[20%]">
              <Text className="color-gray-600 text-[18px] font-medium">
                No recipes found 😞
              </Text>
              <Text className="text-[16px] color-gray-600 mt-[20px]">
                Try adjusting your search criteria.
              </Text>
            </View>
          ) : (
            <ScrollView className="mt-[20]">
              {results.map((result, index) => (
                <View
                  key={index}
                  style={{ position: "relative", marginBottom: 20 }}
                >
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => {
                      pressHandeler(result);
                      setOpenRecipe(result);
                    }}
                  >
                    {/* Image & Heart Button*/}
                    <View style={{ position: "relative" }}>
                      <Image
                        source={{ uri: result.photosrc }}
                        className="w-36 h-24"
                        resizeMode="cover"
                      />
                      <HeartButton _recipe={result} _size={20} />
                    </View>
                    <Text className="font-bold text-[16px] ml-4 my-auto flex-shrink">
                      {result.title}
                    </Text>
                  </TouchableOpacity>

                  {/* Horizontal line */}
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "gray",
                      marginVertical: 10,
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SearchRecipeModal;
