import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import backgroundImage from "../../assets/images/background5.png";
import Header from "../../components/custom/Header";
import DeleteButton from "../../components/custom/deleteButton";
import LibraryCard from "../../components/custom/LibraryCard";
import { router } from "expo-router";
import RecipeModal from "../../components/custom/RecipeModal";
import { extractRecipe } from "../../scripts/puppeteer/extractRecipe";

const Recipes = () => {
  const items = [
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
    {
      href: "https://www.allrecipes.com/recipe/8386501/french-vanilla-cake-with-french-vanilla-buttercream-frosting/",
      photosrc:
        "https://www.allrecipes.com/thmb/xl51p5XkbQkw_PVAVuOQspiNBoU=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1651435756DSC_1944202-2000-a66db12f740f4fdf892bc435102403d3.jpg",
      title: "French Vanilla Cake with French Vanilla Buttercream Frosting",
    },
  ];
  const [displayRecipe, setDisplayRecipe] = useState(false);
  const [openRecipe, setOpenRecipe] = useState();

  const [recipeData, setRecipeData] = useState();
  const handelState = async (recipeUrl) => {
    console.log("URL:", recipeUrl);
    let recipe = await extractRecipe({ recipeURL: recipeUrl });
    setRecipeData(recipe);
  };

  // Function to toggle search mode
  const togglehRecipeMode = () => {
    setDisplayRecipe(!displayRecipe);
  };

  return (
    <SafeAreaView className="h-full" edges={["top", "left", "right"]}>
      <RecipeModal
        _state={displayRecipe}
        _toggleRecipeMode={togglehRecipeMode}
        _recipe={openRecipe}
        _recipeData={recipeData}
      />

      <Header color={"#fff5dc"} />

      <View
        className="items-center "
        style={{ backgroundColor: "rgba(255, 254, 252,0)" }}
      >
        <Text className="text-3xl font-psemibold color-offwhite ">
          Recipes Library
        </Text>
        <Text className="text-1xl font-psemibold color-white ">
          Your collection of favorite recipes
        </Text>
      </View>

      <ScrollView>
        <View className="flex-row flex-wrap">
          {items.map((item) => (
            <View className="w-1/2 p-3 h-[220px]" key={item.title}>
              <LibraryCard
                inputText="bg-background-beige"
                item={item}
                handelPress={() => {
                  setOpenRecipe(item);
                  setDisplayRecipe(true);
                  handelState(item.href);
                }}
              />
              <DeleteButton
                handlePress={() => router.push("/sign-up")}
                activeOpacity={0.7}
                contaniorstyles="absolute w-[19%] h-[13%] top-[10%] right-[8%]"
                size={25}
                color="#F1684B"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        className="absolute h-[full] w-[full] top-[0px] left-0 "
        style={{ backgroundColor: "rgba(58, 86, 44,0.7)", zIndex: -2 }}
      >
        <Image
          source={backgroundImage}
          className=" h-[full] w-[full] top-[0px] left-0"
          style={{ opacity: 1, zIndex: -1, tintColor: "#3A562C" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Recipes;
