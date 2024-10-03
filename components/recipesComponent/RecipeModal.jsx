import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState,useRef } from "react";
import { icons, images } from "../../constants";
import HeartButton from "../custom/HeartButton";
import RecipeIngredientsModal from "../custom/RecipeIngredientsModal"
import {grocerieslist} from "../../scripts/puppeteer/groceries"
import LoadingModalSpiral  from "../custom/LoadingModalSpiral"
const RecipeModal = ({ _state, _toggleRecipeMode, _recipe, _recipeData }) => {
  const [displayIngredient, setDisplayIngredient] = useState(false); 
  const [loading, setLoading] = useState(false);
  const grocerieslistValue=useRef(false)

  return (
    <>
      
      {_recipeData && (
        <Modal visible={_state} animationType="slide">
          <SafeAreaView
            className="flex-1 p-4 bg-background-beige"
            style={{ flex: 1, position: "relative" }}
          >
            
            {/* Heart button */}
            <View className="absolute top-[10%] right-[4%] z-10">
              <HeartButton _recipe={_recipe} _size={30} _floating={true} />
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {/* Return button */}
              <TouchableOpacity
                onPress={()=>{
                  grocerieslistValue.current=false
                  _toggleRecipeMode()
                  
                }}
                style={{ marginBottom: 30 }}
              >
                <Image
                  source={icons.back}
                  className="w-10 h-10 mt-[8%] ml-[2%]"
                  tintColor={"gray"}
                />
              </TouchableOpacity>

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
                <TouchableOpacity
                  onPress={async() => {
                    setLoading(true)
                    if (!grocerieslistValue.current){
                      grocerieslistValue.current=await grocerieslist(_recipeData.ingredients)
                      setLoading(false)
                      setDisplayIngredient(true)
                      
                    }else{
                      setLoading(false)
                      setDisplayIngredient(true)
                    }
                    
                    
                    
                  }}
                  style={{ marginBottom: 10, alignItems: "center" }}
                  activeOpacity={0.3} //opacity effect when pressed
                >
                  <View className="flex-row justify-center items-center w-full space-x-2 bg-gray-100 rounded-lg py-2 px-4 mt-[8]">
                    <Text className="text-gray-600 text-[16px] font-medium">
                      Add to Cart
                    </Text>
                    <Image
                      source={icons.cart}
                      className="w-8 h-8"
                      style={{ tintColor: "gray" }} // inline tintColor for better control
                    />
                  </View>
                </TouchableOpacity>
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
              <RecipeIngredientsModal visible={displayIngredient} onClose={()=>{
                  setDisplayIngredient(!displayIngredient)
              }}
              ingredients={_recipeData.ingredients.filter(ingredient=>ingredient.name!=="")}
              IngredientOptionslist={grocerieslistValue}
              />
        
        
            </ScrollView>
            {loading && (
            <>
              <LoadingModalSpiral  _visible={loading} _opacity={0.5}/>
            </>)} 
          </SafeAreaView>
          
        </Modal>
      )}
    </>
  );
};

export default RecipeModal;
