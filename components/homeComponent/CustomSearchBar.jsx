import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../../constants';



const CustomSearchBar = ({title, handelPress}) => {
  return (
    <View className="my-4">
      <TouchableOpacity onPress={handelPress} className="justify-between items-center flex-row items-center bg-background-shadow p-3 rounded-full shadow-sm opacity-[0.7]">
        <Text className="flex-1 color-offwhite text-bold">{title}</Text>
        <Image source={icons.search} className="w-6 h-6 mr-2" />
      </TouchableOpacity>
  </View>
  )
};

export default CustomSearchBar


// אפשר למחוק!!