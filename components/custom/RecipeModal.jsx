import { View, Text, Modal, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { icons } from '../../constants';


const RecipeModal = ({_state, _toggleRecipeMode, _recipe}) => {
  return (
    <Modal visible={_state} animationType="slide">
      <View className="flex-1 p-4 bg-background-beige">
        <TouchableOpacity onPress={_toggleRecipeMode}>
          <Image 
            source={icons.back} 
            className="w-10 h-10 mt-[10%] ml-[3%] " 
          />
        </TouchableOpacity>

        <ScrollView>
          {/* Title and Image */}
          <Text className="text-3xl font-semibold text-center mt-4">{_recipe.title}</Text>
          <Image 
            source={{ uri: _recipe.photosrc }} 
            className="w-full h-60 mt-4 rounded-lg"
            resizeMode="cover"
          />

          {/* Ingredients */}
          <Text className="text-xl font-semibold mt-4">Ingredients:</Text>
          {_recipe.ingredients.map((ingredient, index) => (
            <Text key={index} className="text-lg">
              {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
            </Text>
          ))}

          {/* Directions */}
          <Text className="text-xl font-semibold mt-4">Directions:</Text>
          {_recipe.directions.map((direction, index) => (
            <Text key={index} className="text-lg">
              {`${index + 1}. ${direction}`}
            </Text>
          ))}

          {/* Nutrition Facts */}
          <Text className="text-xl font-semibold mt-4">Nutrition Facts:</Text>
          <View className="flex-row justify-between">
            {_recipe.nutritionLabel.map((label, index) => (
              <View key={index} className="flex-1">
                <Text className="text-lg">{label}</Text>
                <Text className="text-lg">{_recipe.nutritionValue[index]}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default RecipeModal