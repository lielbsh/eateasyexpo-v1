import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDataGuard } from '../data/globaldata.jsx';
import { icons } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

const IngredientOption = ({ IngredientOptions, ingredient, index, selectedIngredients }) => {
    const { user, updateData, resetData } = useDataGuard();
    const [selectedIngredientOption, setSelectedIngredientOption] = useState(IngredientOptions[0]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selected, setSelected]=useState(true)
    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

    const handleSelect = (item) => {
        setSelectedIngredientOption(item);
        setDropdownVisible(false);
    };
    let IsCart = false 
    let IsGroceries=false
    let Notindatabase=false
    if (IngredientOptions.length==0){
        Notindatabase=true
    }else{
        IsCart = user.cart.some((ingredient) => ingredient === selectedIngredientOption.id);
        IsGroceries = user.groceries.some((ingredient) => ingredient === selectedIngredientOption.id);
    }
    if (!IsCart && !IsGroceries&& !Notindatabase){
       
        if (selected){
            selectedIngredients.current[index]=selectedIngredientOption.id
        
        }else{
            selectedIngredients.current[index]=undefined  
        }
        console.log(selectedIngredients)
    }

    return (
        <>
            {!Notindatabase&& (
            <View className="flex-row  mt-4 ">
                {/* Ingredient Display with Fixed Size */}
                <View className="flex-row w-[50%] items-center">
                    <TouchableOpacity
                        onPress={ ()=>{setSelected(!selected)}}
                    >
                        
                        <Ionicons
                        name={IsCart ? "remove-circle" : IsGroceries? "remove-circle" : selected?"checkmark-circle": "add-circle-outline"}
                        size={30}
                        color={IsCart ? "gray" : IsGroceries? "gray" :"rgba(0, 128, 0, 1)"}
                        />
                    </TouchableOpacity>
                    
                    <View className="w-[60%] h-[100%]">
                        <Text className="mr-2 text-[15px]">{ingredient.name}</Text>
                    </View>
                    <View className="justify-center item-center">
                        <Ionicons
                    name={IsGroceries ? "home": IsCart?"cart" : "cart"}
                    size={IsCart ? 30 : IsGroceries? 26 :26}
                    color={IsGroceries ? "rgba(0, 128, 0, 0.6)" : IsCart?"rgba(0, 128, 0, 0.6)": "rgba(255, 204, 0, 1)"}
                    />
                    </View>
                </View>
                {/* Dropdown Button */}
                <TouchableOpacity 
                    onPress={toggleDropdown} 
                    className="p-2 border border-grey rounded-lg flex-row items-center w-[50%] bg-background-offwhite"
                >
                    <Text className="flex-1 text-[16px]">{selectedIngredientOption.hitname}</Text>
                    {/* Triangle Indicator */}
                    <View style={{ 
                        width: 0, 
                        height: 0, 
                        borderLeftWidth: 5, 
                        borderRightWidth: 5, 
                        borderBottomWidth: 10, 
                        borderLeftColor: 'transparent', 
                        borderRightColor: 'transparent', 
                        transform: dropdownVisible ? [{ rotate: '180deg' }] : [{ rotate: '90deg' }] // Rotate right when closed
                    }} />
                </TouchableOpacity>
            </View>)}

            {/* Dropdown List */}

            {!Notindatabase&& dropdownVisible && (
                <FlatList
                     scrollEnabled={false}
                    data={IngredientOptions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const isCart = user.cart.some((ingredient) => ingredient === item.id);
                        const isGroceries = user.groceries.some((ingredient) => ingredient === item.id);
                        return (
                            <TouchableOpacity 
                                onPress={() => {
                                        handleSelect(item);
                                }} 
                                className="p-2"
                                
                            >
                                <Text className="text-[16px]">{item.hitname}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    className="h-[100%] border border-grey border-t-0 rounded-lg w-[48%] ml-[51%] bg-background-offwhite"
                />
            )}
            {Notindatabase&& (
            <View className="flex-row  mt-4 ">
                {/* Ingredient Display with Fixed Size */}
                <View className="flex-row w-[50%] items-center">
                    <TouchableOpacity
                        onPress={ ()=>{setSelected(!selected)}}
                    >
                        
                        <Ionicons
                        name={"close-circle"}
                        size={30}
                        color={"gray"}
                        />
                    </TouchableOpacity>
                    
                    <View className="w-[60%] h-[100%]">
                        <Text className="mr-2 text-[15px]">{ingredient.name}</Text>
                    </View>
                    <View className="justify-center item-center">
                        <Ionicons
                    name={ "close"}
                    size={32}
                    color={"red"}
                    />
                    </View>
                </View>
                {/* Dropdown Button */}
                <View
                     
                    className="p-2 border border-grey rounded-lg flex-row items-center w-[50%] bg-background-offwhite"
                >
                    <Text className="flex-1 text-[16px]">Not In Database</Text>
                    
                </View>
            </View>)}
            
        </>

    );
};

export default IngredientOption;
