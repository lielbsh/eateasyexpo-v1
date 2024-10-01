import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "../../constants";

const RecipeModal = ({ _state, _toggleRecipeMode, _recipe, _recipeData }) => {
  // Example
  // const myRecipeData = {
  //   title: 'Three Cheese Lasagna',
  //   photosrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_L_h3waPOw1ELBb8fbAD0hBT-umrayla5JA&s',
  //   ingredients: [
  //     { amount: '3', unit: 'cups', name: 'Cheese' },
  //     { amount: '2', unit: 'slices', name: 'Lasagna sheets' }
  //   ],
  //   directions: [
  //     'Make the meat sauce.',
  //     'Layer the lasagna sheets.',
  //     'Let the lasagna rest before serving.'
  //   ],
  //   nutritionLabel: ['Calories', 'Fat', 'Carbs', 'Protein'],
  //   nutritionValue: ['300 kcal', '20g', '40g', '15g']
  // };

  return (
    <>
      {_recipeData && (
        <Modal visible={_state} animationType="slide">
          <View className="flex-1 p-4 bg-background-beige">
            <TouchableOpacity
              onPress={_toggleRecipeMode}
              style={{ marginBottom: 20 }}
            >
              <Image
                source={icons.back}
                className="w-10 h-10 mt-[8%] ml-[2%]"
                tintColor={"gray"}
              />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {/* Title and Image */}
              <Text className="text-4xl font-bold text-red text-center">
                {_recipeData.title}
              </Text>
              <Image
                source={images.line}
                className="w-full h-5"
                resizeMode="contain"
                tintColor={"gray"}
              />
              <Image
                source={{ uri: _recipe.photosrc }}
                className="w-full h-60 mt-4 rounded-lg"
                resizeMode="cover"
              />

              {/* Ingredients */}
              <View className="p-4 mt-6 bg-white rounded-lg shadow-md border border-gray-200">
                <Text className="text-2xl font-semibold text-red">
                  Ingredients
                </Text>
                {_recipeData.ingredients.map((ingredient, index) => (
                  <Text key={index} className="text-lg mt-2 text-gray-700">
                    {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                  </Text>
                ))}
              </View>

              {/* Directions */}
              <View className="p-4 mt-6 bg-white rounded-lg shadow-md border border-gray-200 ">
                <Text className="text-2xl font-semibold text-red">
                  Directions
                </Text>
                {_recipeData.directions.map((direction, index) => (
                  <View className="flex-row items-start my-1" key={index}>
                    <View className="bg-red w-8 h-8 flex items-center justify-center rounded-full shadow-lg mr-3">
                      <Text className="text-lg text-white font-bold">{`${
                        index + 1
                      }`}</Text>
                    </View>
                    <Text className="text-lg text-gray-700 flex-shrink">{`${direction}`}</Text>
                  </View>
                ))}
              </View>

              {/* Nutrition Facts */}
              <View className="p-4 mt-6 bg-white rounded-lg shadow-md border border-gray-200">
                <Text className="text-2xl font-semibold text-red">
                  Nutrition Facts
                </Text>
                <View className="flex-row justify-between mt-3">
                  {_recipeData.nutritionLabel.map((label, index) => (
                    <View key={index} className="flex-1 items-center">
                      <Text className="text-lg font-semibold">{label}</Text>
                      <Text className="text-lg text-gray-600">
                        {_recipeData.nutritionValue[index]}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      )}
    </>
  );
};

export default RecipeModal;
