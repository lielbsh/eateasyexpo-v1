import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { icons } from '../../constants';


const CustomSearchBar = ({title}) => {
  return (
    <View className="my-4">
    <View className="flex-row items-center bg-background-shadow p-3 rounded-full shadow-sm opacity-[0.7]">
      <TextInput
        placeholder={title}
        className="flex-1 color-offwhite text-bold"
        placeholderTextColor={'white'}
        maxLength={15}
      />
      <Image source={icons.search} className="w-6 h-6 mr-2" />
    </View>
  </View>
  )
};

export default CustomSearchBar