import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import RecipeModal from "../recipesComponent/RecipeModal";
import SearchRecipeModal from "../recipesComponent/SearchRecipeModal";

const Suggestions = () => {
  const suggestions = [
    {
      id: 1,
      name: "Italian",
      image: require("../../assets/icons/italianfood.png"),
    },
    {
      id: 2,
      name: "Chinese",
      image: require("../../assets/icons/cheinesefood.png"),
    },
    {
      id: 3,
      name: "Mexican",
      image: require("../../assets/icons/mexicanfood.png"),
    },
    {
      id: 4,
      name: "Japanese",
      image: require("../../assets/icons/japanesefood.png"),
    },
    {
      id: 5,
      name: "Indian",
      image: require("../../assets/icons/indianfood.png"),
    },
    {
      id: 6,
      name: "Greek",
      image: require("../../assets/icons/greekfood.png"),
    },
  ];
  const [searchMode, setSearchMode] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  //   Function to open search modal
  const pressHandler = (_item) => {
    setSuggestion(_item);
    setSearchMode(true);
    console.log("Selected Suggestion:", _item.name);
  };

  // Helper function to render suggestions
  const renderSuggestions = () => {
    return suggestions.map((item) => (
      <TouchableOpacity
        key={item.id}
        className="w-[70px] bg-background-offwhitesheer rounded-[10px] items-center"
        onPress={() => pressHandler(item)}
      >
        <Text className="text-[15px] font-semibold color-shadow mt-[10px] max-w-[190px] max-h-[30px]">
          {item.name}
        </Text>
        <Image
          source={item.image}
          className="w-[25px] h-[25px] rounded-[10px] mt-[3px]"
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View className="h-[65px]">
      <SearchRecipeModal
        _searchMode={searchMode}
        _toggleSearchMode={() => {
          setSearchMode(!searchMode);
        }}
        _title={suggestion?.name}
        _query={suggestion?.name}
        _autoSearch={true}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="h-[200px] space-x-[5px]"
      >
        {renderSuggestions()}
      </ScrollView>
    </View>
  );
};

export default Suggestions;
