
import React, { useState,useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDataGuard } from '../data/globaldata.jsx';
import { icons } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import IngredientOption from "../cartComponent/ingrediantoption.jsx"
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingModalSpiral  from "./LoadingModalSpiral.jsx"

const RecipeIngredientsModal = ({ visible, onClose,IngredientOptionslist,ingredients }) => {
    const [loading, setLoading] = useState(false);
    const { user, updateData, resetData } = useDataGuard();
    const selectedIngredients = useRef(Array(ingredients.length).fill(undefined))
    useEffect(() => {
      console.log(selectedIngredients)
    
      return () => {
        
      }
    }, [selectedIngredients])
    

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <SafeAreaView className="flex-1 p-4 bg-background-beige opacity-95">
                {/* Return Button */}
                <TouchableOpacity onPress={onClose} className="mt-[10%] mb-[12%]" >
                    <Image
                        source={icons.back}
                        className="w-10 h-10 mt-4"
                        tintColor="grey"
                    />
                    
                </TouchableOpacity>
                <View className=" absolute top-[7%] right-[5%] flex-row items-center"  >
                    <View className="flex-row items-center mr-[10%]">
                    <Text className="text-2xl font-pbold " style={{color:"black"}}> Add to Cart   </Text>
                    <Ionicons name="arrow-forward" size={30} color={"black"}/>
                    </View>
                    <TouchableOpacity onPress={async()=>{
                        setLoading(true)
                        let newlist=selectedIngredients.current.filter((ingredient) => ingredient !== undefined)
                        await updateData("cart", [...user.cart, ...newlist]);
                        setLoading(false)
                        onClose()
                    }}>
                    <View className="flex-row justify-center items-center bg-background-red px-[2%] py-[7%] rounded-full"style= {{backgroundColor:"rgba(255, 204, 0, 1)",
                    borderColor:"rgba(255, 204, 0, 1)",
                        borderRadius:'full'
                    }} >
                            
                            <Ionicons
                            name={"cart"}
                            size={45}
                            color={"rgb(240, 0, 0)"}            
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                className="flex-1"
                >
                    {(IngredientOptionslist.current)&&(ingredients.map((ingredient, index) => (
                        <IngredientOption 
                        key={index} 
                        IngredientOptions={IngredientOptionslist.current[index]} 
                        ingredient={ingredient}
                        index={index} 
                        selectedIngredients={selectedIngredients}
                        />
                    )))}
                </ScrollView>
                {loading && (
            <>
              <LoadingModalSpiral  _visible={loading} _opacity={0.5}/>
            </>)}
            </SafeAreaView>
        </Modal>
    );
};

export default RecipeIngredientsModal;



