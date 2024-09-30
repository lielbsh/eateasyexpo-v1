import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AutoScrollBanner from "../../components/AutoScrollBanner";
import CustomSearchBar from "../../components/custom/CustomSearchBar";
import Header from "../../components/custom/Header";
import SearchRecipeModal from "../../components/custom/SearchRecipeModal";
import RecipeModal from "../../components/custom/RecipeModal";
import SavedRecipesBanner from "../../components/custom/SavedRecipesBanner";
import Suggestions from "../../components/custom/Suggestions";

const Home = () => {
  const username = "Assaf";
  const [searchMode, setSearchMode] = useState(false);
  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
  };

  const savedItems = [
    {
      href: "https://www.allrecipes.com/recipe/231616/vegan-basic-vanilla-cake/",
      photosrc:
        "https://www.allrecipes.com/thmb/ZyUS-Li_2K5gprFbu04cjhn5doc=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1029279-fb5de87e8bd44a44be03e09816a75972.jpg",
      title: "Vegan Basic Vanilla Cake",
    },
    {
      href: "https://www.allrecipes.com/recipe/277883/homemade-vanilla-cake/",
      photosrc:
        "https://www.allrecipes.com/thmb/pw7RlGO-yCIPQJem_9zwEpp7G7I=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7656824-db36f7e92ae042f7bcae6b71b859fbd6.jpg",
      title: "Homemade Vanilla Cake",
    },
    {
      href: "https://www.allrecipes.com/recipe/277000/easy-vanilla-cake/",
      photosrc:
        "https://www.allrecipes.com/thmb/-DJuyYp-QXAz1Z33oNWnP1b3mkU=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9224625_EasyVanillaCake4x3-bf9a73c9f6024e9286d96e8f0b59d35d.jpg",
      title: "Easy Vanilla Cake",
    },
  ];

  return (
    <SafeAreaView
      className="bg-background-beige flex-1"
      edges={["top", "left", "right"]}
    >
      {/* Header Section */}
      <Header color={"#F1684B"} />

      <ScrollView>
        <View className="flex-1 px-4">
          <Text className="text-3xl font-psemibold color-green mb-[10px]">
            Hi {username}!
          </Text>

          {/* Search Bar & Modal*/}
          <CustomSearchBar
            title={"What Will We Be Cooking Today?"}
            handelPress={toggleSearchMode}
          />
          <SearchRecipeModal
            _title={"What Will We Be Cooking Today?"}
            _query={""}
            _searchMode={searchMode}
            _toggleSearchMode={toggleSearchMode}
            _autoSearch={false}
          />

          {/* Horizontal Scroll Section for Suggestions */}
          <Suggestions />

          {/* Auto Scroll Banner */}
          <AutoScrollBanner />

          {/* Saved Recipes Section */}
          <SavedRecipesBanner _savedItems={savedItems} />
        </View>
      </ScrollView>
      <Image
        source={require("../../assets/images/background3.png")}
        className="absolute w-[700px] h-[550px] top-[-200px] left-[230px]"
        style={{ opacity: 0.7, zIndex: -1 }}
      />
      <Image
        source={require("../../assets/images/background3.png")}
        className="absolute w-[700px] h-[550px] top-[340px] left-[-550px]"
        style={{ opacity: 0.7, zIndex: -1 }}
      />
    </SafeAreaView>
  );
};

export default Home;
