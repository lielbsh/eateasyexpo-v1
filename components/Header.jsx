import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const Header = () => {
  return (
    <TouchableOpacity onPress={() => router.push('/home')}> 
      <View className="flex-row h-[60px] mt-[20px] ml-[20px]">
          <Text className="color-red text-3xl font-bold text-primary">Eat</Text>
          <Text className="color-red underline-[2px] text-3xl font-bold font-cursive leading-[42px]">Easy</Text>
          <Image source={require('../assets/images/logo2.png')} className="w-[45px] h-[45px] mt-[-4px]" />
      </View>
    </TouchableOpacity>
  )
}

export default Header